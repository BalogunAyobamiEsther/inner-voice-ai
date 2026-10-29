import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MessageSquare, Heart, Compass, Lightbulb, Link as LinkIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/use-onboarding';

const steps = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Share your experience",
    description: "Type or speak freely about what you're going through. Your identity remains completely anonymous."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "SafeSpace AI listens",
    description: "The AI provides a non-judgmental space to express yourself and gather context about your situation."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Gain clarity",
    description: "AI helps you understand your challenge by asking reflective questions and summarizing your situation."
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "Get support options",
    description: "Receive practical next steps and recommendations tailored to your specific academic, career, or personal needs."
  },
  {
    icon: <LinkIcon className="w-6 h-6" />,
    title: "Connect to resources",
    description: "Discover helpful communities, advisors, and educational materials to support your journey."
  }
];

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeOnboarding } = useOnboarding();
  const isOnboarding = searchParams.get('mode') === 'onboarding';

  const handleStartChat = () => {
    completeOnboarding();
    navigate('/chat');
  };

  return (
    <div className="container py-12 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h1>
          <p className="text-lg text-muted-foreground font-medium">A simple, safe process toward better support.</p>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {step.icon}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-card shadow-sm">
                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {isOnboarding && (
          <div className="flex justify-center pt-8">
            <Button onClick={handleStartChat} size="lg" className="px-8">
              Start Conversation <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
