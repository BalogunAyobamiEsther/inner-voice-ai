import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WhyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOnboarding = searchParams.get('mode') === 'onboarding';

  return (
    <div className="container py-12 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Why SafeSpace AI Matters</h1>
          <p className="text-lg text-muted-foreground">Addressing challenges before they escalate into crises.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <AlertCircle className="w-10 h-10 mx-auto text-destructive" />
              <CardTitle className="mt-2">The Problem</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center text-foreground/80">
              Many young people struggle silently because they fear judgment, embarrassment, or exposure. Silent struggles can grow into larger problems when support is delayed.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <ShieldCheck className="w-10 h-10 mx-auto text-primary" />
              <CardTitle className="mt-2">Our Solution</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center text-foreground/80">
              SafeSpace AI addresses this problem by providing anonymity, privacy, and guidance before challenges escalate. We provide a safe first step toward support.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Heart className="w-10 h-10 mx-auto text-rose-500" />
              <CardTitle className="mt-2">The Impact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center text-foreground/80">
              By providing virtual support pathways early, we help young people gain clarity and discover resources, preventing silent burdens from becoming life-altering crises.
            </CardContent>
          </Card>
        </div>

        {isOnboarding && (
          <div className="flex justify-center pt-8">
            <Button onClick={() => navigate('/how-it-works?mode=onboarding')} size="lg" className="px-8">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
