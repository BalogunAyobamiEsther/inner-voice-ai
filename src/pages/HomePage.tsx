import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">SafeSpace AI</h1>
        <p className="mt-4 text-xl text-muted-foreground font-medium">Stay Anonymous. Speak Freely. Find Support.</p>
        <p className="mt-6 text-lg text-foreground/80 max-w-lg mx-auto">
          Many young people carry burdens they never talk about. SafeSpace AI gives you a private space to begin.
        </p>
        <Button onClick={() => navigate('/why?mode=onboarding')} className="mt-10 px-8 py-6 text-lg rounded-full shadow-lg" size="lg">
          Start Journey
        </Button>
      </motion.div>
    </div>
  );
}
