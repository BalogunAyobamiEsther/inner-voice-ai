import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MessageSquare, Shield, CircleAlert } from "lucide-react";
import { useChatStore } from "@/store/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DateGroup = "Today" | "Yesterday" | "Previous 7 days" | "Older";

function getDateGroup(date: Date): DateGroup {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Previous 7 days";
  return "Older";
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

interface DeleteConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

function DeleteConfirm({ open, onOpenChange, onConfirm, title, description }: DeleteConfirmProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function ChatHistory() {
  const { sessions, currentSessionId, startNewChat, loadSession, deleteSession, clearAllHistory } = useChatStore();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [clearAllOpen, setClearAllOpen] = useState(false);

  const groupedSessions = useMemo(() => {
    const groups: Record<DateGroup, typeof sessions> = {
      "Today": [],
      "Yesterday": [],
      "Previous 7 days": [],
      "Older": [],
    };

    const sorted = [...sessions].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    for (const session of sorted) {
      const group = getDateGroup(new Date(session.updatedAt));
      groups[group].push(session);
    }

    return Object.entries(groups).filter(([, s]) => s.length > 0) as [DateGroup, typeof sessions][];
  }, [sessions]);

  const handleDelete = (sessionId: string) => {
    deleteSession(sessionId);
    setDeleteTarget(null);
    toast.success("Conversation deleted");
  };

  const handleClearAll = () => {
    clearAllHistory();
    setClearAllOpen(false);
    toast.success("All history cleared");
  };

  return (
    <div className="p-4 h-full flex flex-col bg-muted/30 border-r">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Conversations {sessions.length > 0 && `(${sessions.length})`}
        </h2>
        {sessions.length > 0 && (
          <AlertDialog open={clearAllOpen} onOpenChange={setClearAllOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all conversations. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearAll}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* New Chat Button */}
      <Button
        variant="outline"
        className="mb-4 w-full justify-start gap-2 bg-background hover:bg-accent group"
        onClick={startNewChat}
      >
        <Plus className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
        <span>New Chat</span>
      </Button>

      {/* Sessions List */}
      <ScrollArea className="flex-1 -mx-2 px-2">
        {sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-12 text-center"
          >
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground/20" />
            <p className="text-xs text-muted-foreground">No past conversations yet.</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">
              Start a chat and it'll appear here.
            </p>
          </motion.div>
        ) : (
          <>
            {groupedSessions.map(([group, groupSessions]) => (
              <div key={group} className="mb-3">
                <h3 className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider px-2 mb-1">
                  {group}
                </h3>
                <div className="space-y-0.5">
                  <AnimatePresence mode="popLayout">
                    {groupSessions.map((session) => {
                      const isActive = currentSessionId === session.id;
                      const confirmOpen = deleteTarget === session.id;

                      return (
                        <motion.div
                          key={session.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, x: -20 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="group relative overflow-hidden"
                        >
                          {/* Active glow indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="activeGlow"
                              className="absolute inset-0 rounded-lg bg-primary/5 border border-primary/10"
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}

                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-sm font-normal py-2.5 px-3 h-auto truncate pr-8 rounded-lg relative z-10",
                              isActive
                                ? "text-accent-foreground"
                                : "hover:bg-accent/50 hover:text-foreground"
                            )}
                            onClick={() => loadSession(session.id)}
                          >
                            <div className="flex flex-col items-start overflow-hidden text-left w-full">
                              <span className="truncate w-full text-[13px] leading-tight">
                                {session.title || "Untitled Chat"}
                              </span>
                              <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1.5 mt-0.5">
                                {formatTime(new Date(session.updatedAt))}
                                <span aria-hidden="true" className="text-[6px]">•</span>
                                {session.messages.length} {session.messages.length === 1 ? "msg" : "msgs"}
                              </span>
                            </div>
                          </Button>

                          {/* Delete button */}
                          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <DeleteConfirm
                              open={confirmOpen}
                              onOpenChange={(open) => {
                                if (!open) setDeleteTarget(null);
                              }}
                              onConfirm={() => handleDelete(session.id)}
                              title="Delete conversation?"
                              description={`This will permanently delete "${session.title || "Untitled Chat"}" and all its messages.`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTarget(session.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </>
        )}
      </ScrollArea>

      {/* Privacy banner */}
      <div className="mt-3 pt-2 border-t border-border/40">
        <div className="flex items-start gap-2 px-2 py-2 text-[10px] text-muted-foreground/50">
          <Shield className="h-3 w-3 mt-0.5 shrink-0 text-emerald-500/60" />
          <span>Your conversations are stored locally and never leave your device.</span>
        </div>
      </div>
    </div>
  );
}