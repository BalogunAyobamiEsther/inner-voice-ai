import { useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useChatStore } from "@/store/chat";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingIndicator from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { CirclePlus, History } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

export default function ChatLayout() {
  const { messages, isTyping, startNewChat, isHistoryOpen, toggleHistory } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30} className="hidden md:block">
        <ChatHistory />
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden md:flex" />
      <ResizablePanel defaultSize={75}>
        <div className="flex flex-col h-full">
          <div className="p-2 border-b flex justify-between items-center md:hidden">
            <div className="flex items-center gap-2">
              <Sheet open={isHistoryOpen} onOpenChange={toggleHistory}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <History className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Conversations</SheetTitle>
                  </SheetHeader>
                  <ChatHistory />
                </SheetContent>
              </Sheet>
              <span className="font-semibold">SafeSpace Chat</span>
            </div>
            <Button variant="ghost" size="sm" onClick={startNewChat}>
              <CirclePlus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {messages.length === 0 ? (
                <SuggestedPrompts />
              ) : (
                messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4">
            <ChatInput />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}