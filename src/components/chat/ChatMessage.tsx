import { User, Bot, ArrowUpRight, CheckCircle2, CircleCheck, Info, Lightbulb, Heart, BookOpen, Target, Sparkles, Brain, GraduationCap, Briefcase, Shield, Compass, ExternalLink, Users, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Message, Resource, SupportOption, useChatStore } from '@/store/chat';
import { motion } from 'framer-motion';
import type { FlowCategory } from '@/lib/resources';

interface ResourceCardProps {
    resource: Resource;
    index: number;
}

interface ChatMessageProps {
    message: Message;
}

const categoryIcons: Record<string, typeof Lightbulb> = {
    academic: GraduationCap,
    financial: Shield,
    career: Briefcase,
    relationship: Heart,
    family: Users,
    isolation: MessageCircle,
    stress: Brain,
    silent: Compass,
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

const resourceCardVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.15 + i * 0.1,
            duration: 0.35,
            ease: 'easeOut'
        }
    })
};

const supportOptionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.2 + i * 0.08,
            duration: 0.3,
            ease: 'easeOut'
        }
    })
};

function getCategoryFromMessage(message: Message): FlowCategory | null {
    const { flowState } = useChatStore.getState();
    return flowState?.categories?.[0] || null;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const { flowState, handleConsent } = useChatStore();
    const isUser = message.role === 'user';

    const parts = message.content.split(`

SafeSpace is an AI companion`);
    const hasDisclaimer = !isUser && parts.length > 1;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn('flex items-start gap-4', isUser && 'justify-end')}
        >
            <Avatar className={cn('h-8 w-8 shrink-0', isUser && 'order-2')}>
                <AvatarFallback className={cn(isUser ? 'bg-primary/10' : 'bg-muted')}>
                    {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </AvatarFallback>
            </Avatar>
            <div className={cn('flex flex-col gap-2 max-w-[85%]', isUser ? 'items-end' : 'items-start')}>
                <div className={cn(
                    'rounded-lg px-4 py-2 text-sm',
                    isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                    <div className="whitespace-pre-wrap">{hasDisclaimer ? parts[0] : message.content}</div>
                    {hasDisclaimer && (
                        <div className="mt-2 pt-2 border-t border-muted-foreground/10 text-[10px] text-muted-foreground/80 italic leading-tight">
                            SafeSpace is an AI companion{parts[1]}
                        </div>
                    )}
                </div>

                {!isUser && message.detectedCategories && message.detectedCategories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex flex-wrap gap-1.5 mt-0.5"
                    >
                        {message.detectedCategories.map((cat) => {
                            const label: Record<string, string> = {
                                academic: 'Academic',
                                financial: 'Financial',
                                career: 'Career',
                                relationship: 'Relationship',
                                family: 'Family',
                                isolation: 'Isolation & Loneliness',
                                stress: 'Stress & Overwhelm',
                                silent: 'Silent Struggles',
                            };
                            const colors: Record<string, string> = {
                                academic: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                                financial: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                                career: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                                relationship: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
                                family: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                                isolation: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
                                stress: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                                silent: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300',
                            };
                            return (
                                <span
                                    key={cat}
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${colors[cat] || 'bg-muted text-muted-foreground'}`}
                                >
                                    {label[cat] || cat}
                                </span>
                            );
                        })}
                    </motion.div>
                )}

                {!isUser && message.recommendations && message.recommendations.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-3 w-full mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Recommended Resources
                            </p>
                        </div>
                        {message.recommendations.map((rec, idx) => (
                            <motion.div
                                key={rec.url || idx}
                                variants={resourceCardVariants}
                                custom={idx}
                            >
                                <ResourceCard resource={rec} index={idx} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!isUser && message.isConsentPrompt && flowState?.pendingConsent && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
                        className="flex flex-col gap-3 mt-2 w-full"
                    >
                        <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-sm">
                            Your wellbeing matters. Would you like to explore
                            professional support options tailored to your situation?
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button
                                    size="sm"
                                    onClick={() => handleConsent(true)}
                                    className="gap-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <Heart className="h-3.5 w-3.5" />
                                    Yes, show support options
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleConsent(false)}
                                    className="rounded-full"
                                >
                                    Not right now
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {!isUser && message.supportOptions && flowState?.showSupportOptions && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-3 w-full mt-4 p-4 rounded-xl border bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <CircleCheck className="h-4 w-4 text-primary" />
                            <h4 className="text-sm font-bold">Professional Support Pathways</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                            Based on your current challenge, these specialized support options are available:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            {message.supportOptions.map((opt, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={supportOptionVariants}
                                    custom={idx}
                                >
                                    <SupportOptionCard option={opt} />
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 italic">
                            Seeking support is a sign of strength. These professionals are trained to help you navigate these specific challenges.
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

function ResourceCard({ resource, index }: ResourceCardProps) {
    const category = getCategoryFromMessage(resource);
    const IconComponent = category ? (categoryIcons[category] || Lightbulb) : Lightbulb;

    return (
        <Card className="w-full max-w-sm bg-card/60 border shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/20 group">
            <a
                href={resource.url || '#'}
                target={resource.url ? "_blank" : undefined}
                rel={resource.url ? "noopener noreferrer" : undefined}
                className={cn(
                    "block",
                    !resource.url && "cursor-default pointer-events-none"
                )}
            >
                {resource.thumbnail ? (
                    <div className="relative overflow-hidden rounded-t-lg">
                        <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                ) : (
                    <div className="h-20 w-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center rounded-t-lg">
                        <IconComponent className="h-8 w-8 text-primary/40" />
                    </div>
                )}
                <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                        <div className="flex items-start gap-2">
                            <IconComponent className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <h5 className="text-sm font-semibold leading-tight">{resource.title}</h5>
                        </div>
                        {resource.type && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 h-5 shrink-0">
                                {resource.type}
                            </Badge>
                        )}
                    </div>
                    {resource.whyItHelps && (
                        <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <Info className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>{resource.whyItHelps}</span>
                        </p>
                    )}
                </CardContent>
                {resource.url && (
                    <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center justify-end gap-1">
                        {resource.url.includes('youtube') ? 'Watch on YouTube'
                            : resource.url.includes('ted.com') ? 'Watch on TED'
                            : 'Explore resource'}
                        <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </CardFooter>
                )}
            </a>
        </Card>
    );
}

function SupportOptionCard({ option }: { option: SupportOption }) {
    return (
        <div className="p-3 rounded-lg bg-card border shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-center mb-1">
                <h5 className="text-sm font-semibold">{option.title}</h5>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">{option.type}</span>
            </div>
            <p className="text-xs text-muted-foreground">{option.description}</p>
        </div>
    );
}