import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/use-onboarding';

const onboardingSteps = [
  {
    title: 'Why SafeSpace AI Matters',
    subtitle: 'Because silent struggles should never become crises.',
    text: 'Many young people struggle silently because they fear judgment, embarrassment, or exposure. Unfortunately, silent struggles can grow into larger problems when support is delayed. SafeSpace AI provides a safe first step toward support.',
    buttonText: 'Continue',
  },
  {
    title: 'How It Works',
    subtitle: 'A simple, safe process.',
    text: 'Share what you\'re experiencing. SafeSpace AI listens, helps you understand your challenge, recommends suitable support options, and connects you to helpful resources and communities.',
    buttonText: 'Start Conversation',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboarding();

  const currentStep = onboardingSteps[step];

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      navigate('/chat');
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{currentStep.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{currentStep.subtitle}</p>
          <p className="mt-6 text-base text-foreground/80">{currentStep.text}</p>
          <Button onClick={handleNext} className="mt-8" size="lg">
            {currentStep.buttonText}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}