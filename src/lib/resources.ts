import type { Resource, SupportOption } from '@/store/chat';

// ============================================================
// FLOW CATEGORIES
// ============================================================

export type FlowCategory =
  | 'academic'
  | 'financial'
  | 'career'
  | 'relationship'
  | 'family'
  | 'isolation'
  | 'stress'
  | 'silent';

// ============================================================
// TRIGGER KEYWORDS PER CATEGORY
// ============================================================

export const flowKeywords: Record<FlowCategory, string[]> = {
  academic: [
    'poor grades', 'bad grades', 'failing', 'exam stress', 'exam anxiety',
    'academic pressure', 'carryover', 'carryovers', 'lack of concentration',
    'cannot concentrate', 'cant concentrate', 'fear of failure', 'project challenge',
    'assignment', 'thesis', 'grades', 'exam', 'study', 'homework', 'university',
    'college', 'school pressure', 'academic', 'class', 'lecture', 'gpa',
    'dropout', 'scholarship', 'academic stress', 'school work', 'schoolwork',
    'procrastination', 'deadline', 'coursework'
  ],
  financial: [
    'lack of money', 'no money', 'broke', 'rent issues', 'rent', 'school fees',
    'tuition', 'debt', 'unemployment', 'financial pressure', 'financial stress',
    'cant pay', 'cannot pay', 'bills', 'expenses', 'income', 'budget',
    'financial', 'money problems', 'poverty', 'afford', 'savings',
    'financial challenge', 'money stress', 'cost of living', 'overdue'
  ],
  career: [
    'unemployment', 'unemployed', 'job search', 'job hunting', 'career confusion',
    'lack of opportunities', 'cv issues', 'cv', 'resume', 'no job',
    'career', 'job', 'hiring', 'interview', 'work opportunity', 'promotion',
    'career change', 'career path', 'job market', 'application', 'rejected',
    'skills', 'qualification', 'profession', 'workplace', 'employer'
  ],
  relationship: [
    'relationship problems', 'relationship', 'breakup', 'break up', 'broken up',
    'trust issues', 'trust', 'friendship issues', 'friendship', 'partner',
    'boyfriend', 'girlfriend', 'spouse', 'cheating', 'betrayal', 'conflict with friend',
    'fighting with', 'argument', 'disagreement', 'dating', 'love', 'romantic',
    'ex', 'divorce', 'separation'
  ],
  family: [
    'family conflict', 'family pressure', 'parent issues', 'parent', 'parents',
    'home challenges', 'family problems', 'family', 'mother', 'father',
    'sibling', 'brother', 'sister', 'household', 'family stress', 'family tension',
    'domestic', 'home life', 'family expectations', 'disappointed my family',
    'family disappointment', 'generational', 'upbringing'
  ],
  isolation: [
    'loneliness', 'lonely', 'isolation', 'isolated', 'no friends', 'friendless',
    'feeling alone', 'all alone', 'no one', 'nobody', 'outcast', 'left out',
    'excluded', 'disconnected', 'social anxiety', 'dont belong', 'dont fit in',
    'no social life', 'solitude', 'abandoned', 'invisible'
  ],
  stress: [
    'stress', 'stressed', 'overwhelm', 'overwhelmed', 'burnout', 'burnt out',
    'pressure', 'pressured', 'exhausted', 'exhaustion', 'cant cope', 'cannot cope',
    'breaking down', 'falling apart', 'too much', 'struggling', 'mental health',
    'anxiety', 'panic', 'overthinking', 'insomnia', 'tired of everything',
    'fed up', 'done with', 'giving up', 'hopeless', 'helpless'
  ],
  silent: [
    'i dont know', 'not sure', 'cant explain', 'cannot explain', 'hard to describe',
    'feeling empty', 'numb', 'disconnected from myself', 'dont feel like myself',
    'dont know what i feel', 'cant name it', 'just tired', 'feeling off',
    'not okay but fine', 'nothing feels real', 'everything feels heavy',
    'drained', 'no energy', 'going through the motions', 'lost', 'confused inside',
    'something is wrong but i cant say', 'feeling stuck', 'trapped in my head',
    'quiet quitting life', 'just existing', 'zoning out', 'dissociating',
    'i feel like crying but i cant', 'empty inside', 'no motivation', 'apathetic'
  ]
};

// ============================================================
// FOLLOW-UP QUESTIONS PER CATEGORY (asked sequentially)
// ============================================================

export const flowQuestions: Record<FlowCategory, string[]> = {
  academic: [
    'What academic challenge are you currently facing?',
    'How long has this been affecting you?',
    'What have you tried so far?',
    'What outcome are you hoping to achieve?'
  ],
  financial: [
    'Are you currently a student, graduate, employed, or self-employed?',
    'What is your biggest financial concern right now?',
    'How long has this challenge existed?',
    'Do you currently have any source of income?'
  ],
  career: [
    'What did you study or what field are you interested in?',
    'How long have you been searching?',
    'What jobs have you applied for?',
    'What skills do you currently possess?'
  ],
  relationship: [
    'Is this challenge related to family, friendship, or a romantic relationship?',
    'What specifically happened?',
    'How has this situation affected you?',
    'What outcome would you like?'
  ],
  family: [
    'Who is involved in the challenge?',
    'How long has this been happening?',
    'How has it affected your daily life?',
    'What support do you currently have?'
  ],
  isolation: [
    'How long have you been feeling this way?',
    'Do you currently have people you trust?',
    'What activities do you enjoy?',
    'What kind of connections are you looking for?'
  ],
  stress: [
    'What is causing the stress?',
    'Which area of life is most affected?',
    'How long have you felt this way?',
    'What coping strategies have you tried?'
  ],
  silent: [
    'Take your time. Can you describe what the feeling reminds you of, even vaguely?',
    'Has there been a moment recently when you felt a little different from usual?',
    'When does this feeling tend to show up most?',
    'What would a small step toward feeling better look like for you?'
  ]
};

// ============================================================
// RECOMMENDATION POOLS PER CATEGORY
// ============================================================

export interface FlowRecommendation {
  title: string;
  description: string;
  resource: Resource;
}

export const supportPathways: Record<FlowCategory, SupportOption[]> = {
  academic: [
    { title: 'Student Counselors', description: 'Available through your university health services for academic-related stress.', type: 'Academic' },
    { title: 'Academic Advisors', description: 'Can help with course loads, degree planning, and institutional support.', type: 'Academic' },
    { title: 'Educational Mentors', description: 'Experienced students or professionals who can provide study guidance.', type: 'Academic' }
  ],
  financial: [
    { title: 'Financial Aid Office', description: 'University resources for grants, loans, and emergency funding.', type: 'Financial' },
    { title: 'Financial Advisors', description: 'Professional guidance on budgeting and debt management.', type: 'Financial' }
  ],
  career: [
    { title: 'Career Coaches', description: 'One-on-one sessions to help define your path and improve search strategy.', type: 'Career' },
    { title: 'Professional Mentors', description: 'Industry experts who can offer guidance and networking.', type: 'Career' }
  ],
  relationship: [
    { title: 'Licensed Relationship Counselors', description: 'Specialized support for interpersonal and romantic challenges.', type: 'Emotional' },
    { title: 'Family Support Services', description: 'Resources for navigating domestic and family dynamics.', type: 'Family' }
  ],
  family: [
    { title: 'Family Counselors', description: 'Professional mediation and support for home challenges.', type: 'Family' },
    { title: 'Domestic Support Organizations', description: 'Community resources for family wellbeing.', type: 'Family' }
  ],
  isolation: [
    { title: 'Social Groups & Clubs', description: 'Local communities aligned with your interests to build connection.', type: 'Social' },
    { title: 'Community Support Groups', description: 'Peer groups for sharing experiences and reducing isolation.', type: 'Social' }
  ],
  stress: [
    { title: 'Licensed Therapists', description: 'Professional support for managing severe stress and anxiety.', type: 'Emotional' },
    { title: 'Healthcare Professionals', description: 'Clinical assessment and support for mental wellbeing.', type: 'Medical' },
    { title: 'Crisis Hotlines', description: 'Immediate, 24/7 support for when things feel overwhelming.', type: 'Crisis' }
  ],
  silent: [
    { title: 'Talk Therapists', description: 'Professional counselors skilled in helping you explore and name what feels unclear.', type: 'Emotional' },
    { title: 'Supportive Listening Services', description: 'Trained listeners who can sit with you in the uncertainty without pushing for answers.', type: 'Emotional' },
    { title: 'Peer Support Groups', description: 'Safe spaces where others share their own experiences of feeling lost or disconnected.', type: 'Social' }
  ]
};

export const flowRecommendations: Record<FlowCategory, FlowRecommendation[]> = {
  academic: [
    {
      title: 'Growth Mindset for Learning',
      description: 'Understand how your mindset shapes academic performance.',
      resource: {
        title: 'The Power of Believing You Can Improve',
        url: 'https://www.ted.com/talks/carol_dweck_the_power_of_believing_that_you_can_improve',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Carol Dweck explains how shifting from a fixed to a growth mindset can transform your approach to challenges and learning.'
      }
    },
    {
      title: 'Reframing Academic Anxiety',
      description: 'A guided journaling exercise to process academic stress.',
      resource: {
        title: 'Reframing Academic Anxiety: Journaling Exercise',
        url: '',
        thumbnail: '',
        type: 'exercise',
        whyItHelps: 'Writing down your specific academic fears helps you separate what is real from what feels overwhelming, giving you actionable clarity.'
      }
    },
    {
      title: 'Stress Management for Students',
      description: 'Practical techniques to stay calm under academic pressure.',
      resource: {
        title: 'How to Stay Calm When You Know You Will Be Stressed',
        url: 'https://www.ted.com/talks/daniel_levitin_how_to_stay_calm_when_you_know_you_ll_be_stressed',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Daniel Levitin shares brain-based strategies to perform better under pressure by planning ahead for stressful moments.'
      }
    },
    {
      title: 'Focus & Concentration Guide',
      description: 'Evidence-based methods to improve focus and reduce procrastination.',
      resource: {
        title: 'Deep Focus: How to Train Your Brain to Concentrate',
        url: 'https://www.youtube.com/watch?v=Hu4Yvq-g7_Y',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Teaches practical techniques to build deep focus habits and reduce the urge to procrastinate during study sessions.'
      }
    },
    {
      title: 'The Student Mental Health Toolkit',
      description: 'A curated collection of articles on managing academic pressure.',
      resource: {
        title: 'Student Mental Health Toolkit',
        url: '',
        thumbnail: '',
        type: 'article',
        whyItHelps: 'Covers burnout prevention, study-life balance, and knowing when to ask for help in an academic environment.'
      }
    }
  ],
  financial: [
    {
      title: 'Financial Resilience Mindset',
      description: 'Reframe your relationship with financial stress.',
      resource: {
        title: 'The Psychology of Financial Wellbeing',
        url: 'https://www.ted.com/talks/elinor_ostrom_economic_governance_and_the_psychology_of_scarcity',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Explores how scarcity mindset affects decision-making and how to build financial resilience from the inside out.'
      }
    },
    {
      title: 'Practical Budgeting for Students',
      description: 'A step-by-step budgeting workbook for young adults.',
      resource: {
        title: 'My First Budget: A Student Workbook',
        url: '',
        thumbnail: '',
        type: 'exercise',
        whyItHelps: 'Walks you through tracking expenses, identifying spending patterns, and creating a realistic budget that works for your situation.'
      }
    },
    {
      title: 'Managing Money Anxiety',
      description: 'Understanding the emotional side of financial stress.',
      resource: {
        title: 'How to Handle Financial Anxiety',
        url: 'https://www.youtube.com/watch?v=wK7IslY-I4A',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Provides actionable strategies to separate emotional reactions from financial realities, reducing the overwhelm.'
      }
    },
    {
      title: 'Financial Aid & Scholarship Guide',
      description: 'A comprehensive guide to finding financial support.',
      resource: {
        title: 'The Complete Guide to Scholarships and Grants',
        url: '',
        thumbnail: '',
        type: 'article',
        whyItHelps: 'Covers where to find scholarships, how to write compelling applications, and what to do when aid falls short.'
      }
    },
    {
      title: 'Community Support Networks',
      description: 'Connect with others navigating similar financial challenges.',
      resource: {
        title: 'Financial Peer Support Communities',
        url: '',
        thumbnail: '',
        type: 'tool',
        whyItHelps: 'Being part of a community that shares financial tips and encouragement can reduce the isolation of money struggles.'
      }
    }
  ],
  career: [
    {
      title: 'Discovering Your Career Path',
      description: 'Find clarity on what career direction fits you.',
      resource: {
        title: 'The Career Identity Exercise',
        url: '',
        thumbnail: '',
        type: 'exercise',
        whyItHelps: 'A structured self-reflection exercise that helps you map your skills, values, and interests to real career possibilities.'
      }
    },
    {
      title: 'Resilience in Job Searching',
      description: 'Build the mental strength to handle rejection.',
      resource: {
        title: 'The Art of Job Search Resilience',
        url: 'https://www.ted.com/talks/angela_lee_duckworth_grit_the_power_of_passion_and_perseverance',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Angela Duckworth explains how grit and perseverance are better predictors of success than talent alone.'
      }
    },
    {
      title: 'CV & Resume Masterclass',
      description: 'Build a compelling CV that gets noticed.',
      resource: {
        title: 'How to Write a Standout CV',
        url: 'https://www.youtube.com/watch?v=BPJn_4DjbYg',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Step-by-step guide to crafting a CV that highlights your strengths and passes applicant tracking systems.'
      }
    },
    {
      title: 'Networking for Introverts',
      description: 'Build professional connections without the overwhelm.',
      resource: {
        title: 'Networking Without the Fear',
        url: '',
        thumbnail: '',
        type: 'article',
        whyItHelps: 'Provides low-pressure networking strategies that feel authentic and sustainable, especially for introverts.'
      }
    },
    {
      title: 'Career Communities & Mentorship',
      description: 'Find mentors and peers in your field of interest.',
      resource: {
        title: 'Career Support Communities',
        url: '',
        thumbnail: '',
        type: 'tool',
        whyItHelps: 'Connects you with professionals who can offer guidance, feedback, and opportunities in your target industry.'
      }
    }
  ],
  silent: [
    {
      title: 'The Power of Vulnerability',
      description: 'Understanding why it is okay to not have all the answers.',
      resource: {
        title: 'The Power of Vulnerability',
        url: 'https://www.ted.com/talks/brene_brown_the_power_of_vulnerability',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Brené Brown explains that vulnerability is not weakness — it is the birthplace of connection and clarity.'
      }
    },
    {
      title: 'Naming the Unnameable',
      description: 'A gentle journaling exercise for when words are hard to find.',
      resource: {
        title: 'Journaling Through the Fog',
        url: '',
        thumbnail: '',
        type: 'exercise',
        whyItHelps: 'A guided journaling practice that uses prompts to help you explore feelings you cannot yet name, without pressure.'
      }
    },
    {
      title: 'Understanding Emotional Numbness',
      description: 'Learn why you might feel empty or disconnected.',
      resource: {
        title: 'What to Do When You Feel Nothing',
        url: 'https://www.youtube.com/watch?v=z8j5Gsljcdc',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Psychologists explain the roots of emotional numbness and offer gentle steps to reconnect with your feelings.'
      }
    },
    {
      title: 'The Art of Rest',
      description: 'A guide to true rest when you are just going through the motions.',
      resource: {
        title: 'The Art of Rest: Reclaiming Your Energy',
        url: '',
        thumbnail: '',
        type: 'article',
        whyItHelps: 'Explores the difference between being tired and being drained, with practical rest practices that restore your spirit.'
      }
    },
    {
      title: 'Quiet Support Communities',
      description: 'Safe spaces for people who are not okay but cannot explain why.',
      resource: {
        title: 'The Quiet Space Community',
        url: '',
        thumbnail: '',
        type: 'tool',
        whyItHelps: 'A private, moderated community where you can simply be, without needing to perform wellness or have all the answers.'
      }
    }
  ],
  relationship: [
    {
      title: 'Communication Skills',
      description: 'Learn to communicate effectively in relationships.',
      resource: {
        title: 'How to Communicate Better in Relationships',
        url: 'https://www.youtube.com/watch?v=Hx6PGNsIe1s',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Teaches how to express your needs clearly and listen with empathy.'
      }
    },
    {
      title: 'Healing After a Breakup',
      description: 'Guidance on moving forward after a relationship ends.',
      resource: {
        title: 'How to Heal from a Breakup',
        url: 'https://www.youtube.com/watch?v=I2Z33eCKfAQ',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Validates your feelings and provides a roadmap for emotional recovery.'
      }
    }
  ],
  family: [
    {
      title: 'Family Communication',
      description: 'Improve dialogue and understanding within your family.',
      resource: {
        title: 'How to Talk to Your Family',
        url: 'https://www.youtube.com/watch?v=Vj5FBZfB4qE',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Offers strategies for communicating with family members who have different perspectives.'
      }
    },
    {
      title: 'Conflict Resolution at Home',
      description: 'Navigate family conflicts with empathy and clarity.',
      resource: {
        title: 'Resolving Family Conflicts',
        url: 'https://www.youtube.com/watch?v=2e3a7bJz4qE',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Helps maintain family bonds while addressing underlying tensions.'
      }
    }
  ],
  isolation: [
    {
      title: 'Understanding Loneliness',
      description: 'Learn why loneliness happens and how to address it.',
      resource: {
        title: 'The Power of Vulnerability',
        url: 'https://www.youtube.com/watch?v=iCvmsMzlF7o',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Brené Brown explains how embracing vulnerability leads to deeper connection.'
      }
    },
    {
      title: 'Building Social Connections',
      description: 'Practical steps to build meaningful connections.',
      resource: {
        title: 'How to Make Friends as an Adult',
        url: 'https://www.youtube.com/watch?v=8UzrWbFy6SQ',
        thumbnail: '',
        type: 'video',
        whyItHelps: 'Practical steps to find your people outside of school or work settings.'
      }
    }
  ],
  stress: [
    {
      title: 'Making Stress Your Friend',
      description: 'Reframe your relationship with stress for better outcomes.',
      resource: {
        title: 'How to Make Stress Your Friend',
        url: 'https://www.youtube.com/watch?v=RcGyVTAoXEU',
        thumbnail: '',
        type: 'ted',
        whyItHelps: 'Kelly McGonigal explains how your perception of stress changes its physical impact.'
      }
    },
    {
      title: 'Mindfulness & Relaxation',
      description: 'Techniques to calm your mind and reduce overwhelm.',
      resource: {
        title: 'Guided Meditation for Stress Relief',
        url: 'https://www.youtube.com/watch?v=inpok4MKVLM',
        thumbnail: '',
        type: 'activity',
        whyItHelps: 'Immediately lowers cortisol and provides a mental reset during high-pressure moments.'
      }
    }
  ]
};

// ============================================================
// FORBIDDEN REPETITIVE PHRASES
// ============================================================

export const forbiddenPhrases: string[] = [
  'Tell me more.',
  'Thank you for sharing.',
  'Can you elaborate?',
  'I understand.',
  'That makes sense.',
  'I see.',
  'Go on.',
  'And then?',
  'What else?',
  'How does that make you feel?',
  'That sounds difficult.',
  'I appreciate you telling me.',
  'I hear what you are saying.',
  'That is really interesting.',
  'Please continue.',
  'Is there anything else?',
  'What do you think?',
  'Tell me about that.',
  'I am here for you.',
  'You are not alone.'
];

// ============================================================
// EMPATHETIC OPENERS PER CATEGORY
// ============================================================

export const empatheticOpeners: Record<FlowCategory, string[]> = {
  academic: [
    "It sounds like you're carrying a heavy academic load right now. That pressure is real, and your feelings about it are completely valid.",
    "Academic challenges can feel overwhelming, especially when it seems like everything is piling up. I'm here to help you work through this.",
    "I hear that school is weighing on you. It takes strength to acknowledge when things feel like too much."
  ],
  financial: [
    "Financial stress can feel all-consuming, affecting every part of your life. What you're experiencing is valid, and there are pathways forward.",
    "Money worries are one of the heaviest burdens to carry. I want to help you explore some options that might ease this pressure.",
    "I understand that financial challenges can feel isolating and overwhelming. Let's look at this together."
  ],
  career: [
    "Navigating your career path can feel uncertain and frustrating, especially when you're putting in effort without seeing results. Your determination is commendable.",
    "Career confusion is more common than you might think, and it doesn't mean you're lost — it means you're searching for something meaningful.",
    "The job search can be exhausting. It's okay to feel discouraged, and it's brave of you to keep looking for answers."
  ],
  relationship: [
    "It takes courage to open up about relationship struggles. What you're feeling is a natural response to a difficult situation.",
    "Relationship challenges can cut deep because they involve the people closest to us. Your pain is valid, and healing is possible.",
    "I hear that this relationship situation is weighing heavily on you. Let's explore what support might look like for you."
  ],
  family: [
    "Family dynamics can be incredibly complex, and when things feel strained at home, it affects everything else in your life.",
    "It's painful when the people who are supposed to support us become a source of stress. Your feelings about this are completely understandable.",
    "Family challenges can feel especially heavy because they touch on identity and belonging. I'm here to listen without judgment."
  ],
  isolation: [
    "Feeling isolated is one of the most painful human experiences. You reaching out here shows incredible strength.",
    "Loneliness can feel like a weight that no one else can see. I want you to know that your desire for connection is natural and important.",
    "It takes real courage to admit you're feeling alone. That awareness is the first step toward building the connections you deserve."
  ],
  stress: [
    "When everything feels like too much, it's your mind and body telling you something needs to change. That signal deserves attention.",
    "Burnout and overwhelm are not signs of weakness — they're signs that you've been strong for too long without adequate support.",
    "I hear that you're under tremendous pressure. It's okay to pause, breathe, and explore what might help you find some relief."
  ],
  silent: [
    "It takes a lot of courage to say you're not okay when you can't even find the words to describe why. You don't need to explain perfectly right now.",
    "Sometimes the hardest feelings to carry are the ones we cannot name. Whatever is there, even if it feels shapeless, it matters. I'm here to sit with you in it.",
    "Not knowing what you're feeling is not a failure — it's a sign that something deep inside needs attention. Let's explore it gently, at your pace."
  ]
};

export const recommendationIntro = (
  category: FlowCategory,
  summary: string
) => {
  const categoryLabels: Record<FlowCategory, string> = {
    academic: 'academic',
    financial: 'financial',
    career: 'career',
    relationship: 'relationship',
    family: 'family',
    isolation: 'social',
    stress: 'stress-related',
    silent: 'emotional'
  };

  return `From what you've shared, ${summary}

Here are some support options that may help with your ${categoryLabels[category]} challenges:`;
};

export const recommendationFollowUp =
  'Which of these would you like to explore first?';