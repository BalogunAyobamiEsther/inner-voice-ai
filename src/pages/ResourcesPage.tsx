import { motion } from 'framer-motion';
import {
  GraduationCap, Briefcase, Heart, BookOpen, ExternalLink,
  Video, Users, Brain, Lightbulb, Target, Sparkles, Wallet,
  Rocket, HandHeart, Compass,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';

/* ─── Types ─── */
interface ResourceCard {
  title: string;
  description: string;
  type: string;
  icon: ReactNode;
  href?: string;
}

interface ResourceSection {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  accent: string;
  cards: ResourceCard[];
}

/* ─── Data ─── */
const sections: ResourceSection[] = [
  {
    id: 'academic-financial',
    title: 'Academic & Financial Support',
    subtitle: 'Practical tools and guidance to manage academic pressure and financial stress.',
    icon: <GraduationCap className="w-6 h-6" />,
    accent: 'from-blue-500/20 to-indigo-500/10 border-blue-200 dark:border-blue-800',
    cards: [
      {
        title: 'Study Smarter, Not Harder',
        description: 'Evidence-based techniques for time management, active recall, and beating procrastination — tailored for students juggling multiple responsibilities.',
        type: 'Guide',
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        title: 'Student Budgeting Masterclass',
        description: 'A step-by-step video walkthrough on building a realistic student budget, finding hidden savings, and managing unexpected expenses without panic.',
        type: 'Video',
        icon: <Video className="w-4 h-4" />,
      },
      {
        title: 'Financial Aid & Scholarship Finder',
        description: 'Discover emergency funds, bursaries, and scholarships you may not know about. Many students leave money on the table every year.',
        type: 'Tool',
        icon: <Wallet className="w-4 h-4" />,
      },
      {
        title: 'Academic Advising & Tutoring',
        description: 'Connect with academic advisors and peer tutors who can help you navigate difficult courses, plan your schedule, and stay on track.',
        type: 'Support',
        icon: <Users className="w-4 h-4" />,
      },
      {
        title: 'Managing Exam Anxiety',
        description: 'Practical breathing exercises, grounding techniques, and cognitive reframing strategies specifically designed for high-pressure exam periods.',
        type: 'Article',
        icon: <Lightbulb className="w-4 h-4" />,
      },
    ],
  },
  {
    id: 'career',
    title: 'Career Development',
    subtitle: 'Explore your path, build confidence, and take meaningful steps toward your professional future.',
    icon: <Briefcase className="w-6 h-6" />,
    accent: 'from-amber-500/20 to-orange-500/10 border-amber-200 dark:border-amber-800',
    cards: [
      {
        title: 'Career Clarity Workshop',
        description: 'An interactive guide to help you identify your strengths, values, and interests — and map them to real-world career possibilities.',
        type: 'Workshop',
        icon: <Target className="w-4 h-4" />,
      },
      {
        title: 'Building Your Professional Brand',
        description: 'Learn how to craft a compelling LinkedIn profile, write effective cover letters, and present yourself confidently in interviews.',
        type: 'Guide',
        icon: <Rocket className="w-4 h-4" />,
      },
      {
        title: 'Networking Without the Awkwardness',
        description: 'Practical tips for introverts and students on building genuine professional connections — both online and on campus.',
        type: 'Article',
        icon: <Users className="w-4 h-4" />,
      },
      {
        title: 'Mentorship & Career Counseling',
        description: 'Connect with mentors and career counselors who can provide personalized guidance, feedback, and accountability on your journey.',
        type: 'Support',
        icon: <Compass className="w-4 h-4" />,
      },
      {
        title: 'TED Talks: Finding Your Path',
        description: 'A curated playlist of inspiring talks from people who navigated career uncertainty and found fulfilling, unconventional paths.',
        type: 'Video',
        icon: <Video className="w-4 h-4" />,
      },
    ],
  },
  {
    id: 'emotional',
    title: 'Emotional Wellbeing',
    subtitle: 'Compassionate resources to help you understand, process, and care for your emotional health.',
    icon: <Heart className="w-6 h-6" />,
    accent: 'from-rose-500/20 to-pink-500/10 border-rose-200 dark:border-rose-800',
    cards: [
      {
        title: 'Understanding Your Emotions',
        description: "A gentle introduction to emotional literacy — learning to name, understand, and respond to what you're feeling without judgment.",
        type: 'Guide',
        icon: <Brain className="w-4 h-4" />,
      },
      {
        title: 'Guided Mindfulness & Meditation',
        description: 'Short, accessible audio sessions for anxiety relief, better sleep, and emotional regulation — no experience required.',
        type: 'Audio',
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        title: 'Journaling for Mental Health',
        description: 'Structured prompts and free-writing exercises that help you process difficult emotions, track patterns, and celebrate small wins.',
        type: 'Tool',
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        title: 'Peer Support Communities',
        description: "Safe, moderated spaces where you can share experiences, find solidarity, and learn from others who understand what you're going through.",
        type: 'Community',
        icon: <HandHeart className="w-4 h-4" />,
      },
      {
        title: 'When to Seek Professional Help',
        description: "A compassionate guide to recognizing when self-care isn't enough — and how to take the first step toward counseling or therapy.",
        type: 'Article',
        icon: <Lightbulb className="w-4 h-4" />,
      },
      {
        title: 'Crisis Support & Hotlines',
        description: 'Immediate, confidential support if you or someone you know is in distress. You are never alone — help is available 24/7.',
        type: 'Urgent',
        icon: <ExternalLink className="w-4 h-4" />,
      },
    ],
  },
];

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

/* ─── Component ─── */
export default function ResourcesPage() {
  return (
    <div className="container py-12 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Support Pathways & Resources
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Curated tools, guides, and communities to help you navigate academic pressure,
            career uncertainty, and emotional wellbeing.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <motion.section
            key={section.id}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-5"
          >
            {/* Section header */}
            <div className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${section.accent} border`}>
              <div className="text-foreground/80">{section.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.subtitle}</p>
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((card) => (
                <motion.div key={card.title} variants={cardVariants}>
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {card.icon}
                          <Badge variant="secondary" className="text-xs font-medium">
                            {card.type}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-base leading-snug">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="text-sm leading-relaxed">
                        {card.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-muted/60 p-6 rounded-xl text-center border border-border/50"
        >
          <p className="font-medium text-foreground/90 italic">
            "You are not alone. Your privacy is respected. Your voice matters. Support is within reach."
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}