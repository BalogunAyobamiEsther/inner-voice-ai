import { motion } from "framer-motion";
import { useChatStore } from "@/store/chat";
import {
  GraduationCap,
  Briefcase,
  Heart,
  ArrowRight,
  Shield,
  Sparkles,
  Compass,
} from "lucide-react";

const showcaseScenarios = [
  {
    id: "academic-financial" as const,
    icon: GraduationCap,
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    borderGlow: "group-hover:border-blue-400/40",
    accentColor: "blue",
    title: "Academic & Financial",
    description: "Navigate tuition pressure, grades & budgeting stress.",
    badge: "Most Common",
    prompt: "I'm struggling to balance my part-time job and coursework",
  },
  {
    id: "career" as const,
    icon: Briefcase,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "group-hover:border-emerald-400/40",
    accentColor: "emerald",
    title: "Career Crossroads",
    description: "Find clarity when you're uncertain about your next move.",
    badge: "Trending",
    prompt: "I don't know what career path is right for me",
  },
  {
    id: "emotional-distress" as const,
    icon: Heart,
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    borderGlow: "group-hover:border-rose-400/40",
    accentColor: "rose",
    title: "Emotional Wellbeing",
    description: "A safe space for anxiety, loneliness & emotional weight.",
    badge: "New",
    prompt: "I've been feeling really anxious and can't shake it",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SuggestedPrompts() {
  const { addMessage, setIsTyping, setFlowState } = useChatStore();

  const handleScenarioSelect = async (
    scenarioId: "academic-financial" | "career" | "emotional-distress",
    prompt: string
  ) => {
    setFlowState({
      categories: [],
      answers: [],
      summarized: false,
      questionIndex: 0,
      sessionScenario: scenarioId,
    });

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: prompt,
    };
    addMessage(userMsg);

    setIsTyping(true);
    const { getAIResponse } = await import("@/lib/ai");
    const response = await getAIResponse(userMsg);
    setIsTyping(false);

    addMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      content: response.text,
      recommendations: response.recommendations,
      isConsentPrompt: response.isConsentPrompt,
      supportOptions: response.supportOptions,
      detectedCategories: response.detectedCategories,
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6 py-6 px-4 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          Try SafeSpace AI
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome to SafeSpace AI
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Stay Anonymous. Speak Freely. Find Support.
        </p>
      </motion.div>

      {/* Scenario Cards — 3-col desktop, 1-col mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {showcaseScenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <motion.div
              key={scenario.id}
              variants={cardVariants}
              className="relative group"
            >
              <div
                className={`relative rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md ${scenario.borderGlow} overflow-hidden`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-4 flex flex-col gap-3">
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-background/80 border shadow-sm">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        scenario.accentColor === "blue"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : scenario.accentColor === "emerald"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                      }`}
                    >
                      {scenario.badge}
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() =>
                      handleScenarioSelect(scenario.id, scenario.prompt)
                    }
                    className="flex items-center justify-center gap-2 w-full text-xs font-medium px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 text-primary"
                  >
                    Start Conversation
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex items-center gap-4 text-[11px] text-muted-foreground/60"
      >
        <span className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Private & anonymous
        </span>
        <span className="flex items-center gap-1">
          <Compass className="h-3 w-3" />
          Judgment-free
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-3 w-3" />
          Compassionate AI
        </span>
      </motion.div>
    </motion.div>
  );
}
