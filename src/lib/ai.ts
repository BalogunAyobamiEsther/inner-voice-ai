import {
  type FlowCategory,
  flowKeywords,
  flowQuestions,
  flowRecommendations,
  empatheticOpeners,
  recommendationIntro,
  recommendationFollowUp,
  supportPathways,
} from '@/lib/resources';
import {
  useChatStore,
  createFlowState,
  type FlowState,
  type Message,
  type Resource,
  type SupportOption,
} from '@/store/chat';

export type AIResponse = {
  text: string;
  recommendations?: Resource[];
  isConsentPrompt?: boolean;
  supportOptions?: SupportOption[];
  detectedCategories?: FlowCategory[];
};

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// Returns ALL matched categories, not just the first one
const detectCategories = (message: string): FlowCategory[] => {
  const lowerMessage = message.toLowerCase();
  const matched: FlowCategory[] = [];
  const searchOrder: FlowCategory[] = [
    'silent',
    'academic',
    'financial',
    'career',
    'relationship',
    'family',
    'isolation',
    'stress',
  ];
  for (const category of searchOrder) {
    const keywords = flowKeywords[category];
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        matched.push(category);
        break;
      }
    }
  }
  return matched;
};

const detectSevereDistress = (message: string): boolean => {
  const severeKeywords = [
    'giving up', 'hopeless', 'helpless', "can't go on",
    'cannot go on', 'end it', 'hurting myself', 'suicide',
    'self harm', 'severe', 'deeply affecting', 'breaking point',
    'want to die', 'better off dead',
  ];
  const lowerMessage = message.toLowerCase();
  return severeKeywords.some(keyword => lowerMessage.includes(keyword));
};

const disclaimer = `
SafeSpace is an AI companion, not a substitute for professional therapy or medical advice. If you're in crisis, please contact local emergency services or a crisis hotline.`;

// ======================
// SCENARIO-SPECIFIC FLOWS
// ======================

const scenarioFlows: Record<string, {
  openers: string[];
  questions: string[];
  summaries: string[];
  resources: string[];
  consentMessages: string[];
}> = {
  'academic-financial': {
    openers: [
      "I hear you. Balancing academics with financial pressure is one of the hardest challenges students face — and it's something too few people talk about openly. Let's break this down together.",
      "That's a lot to carry. When academic pressure and financial stress hit at the same time, it can feel like you're drowning in both. You're not alone in this — let's take it step by step.",
      "Thank you for sharing that. The intersection of school and money stress is incredibly tough. Many students feel this way but suffer in silence. Let's explore what's going on and find some practical ways forward.",
    ],
    questions: [
      "What aspect of your academic work is feeling most overwhelming right now?",
      "How have financial concerns been affecting your daily life and studies?",
      "Have you looked into any on-campus resources like financial aid advising or student support services?",
    ],
    summaries: [
      "you're navigating the tough intersection of academic pressure and financial strain.",
      "you're dealing with the compounded stress of school performance and money worries.",
    ],
    resources: [
      "Here are some resources that can help with both academic and financial challenges. Many universities offer emergency funds, mental health counseling, and academic support that students don't always know about.",
    ],
    consentMessages: [
      "Financial and academic stress can be deeply isolating, and having professional support can make a real difference. Would you be open to exploring some support options tailored to your situation?",
    ],
  },
  'career': {
    openers: [
      "Career uncertainty can feel like standing at a crossroads without a map. That's a really uncomfortable place to be — but it's also a sign that you care deeply about your future. Let's explore this together.",
      "I understand how unsettling career questions can be. Whether it's choosing a path, feeling stuck, or fearing the wrong move — these are some of the most common yet personal challenges out there. Let's talk through it.",
      "It takes courage to admit you're unsure about your career direction. Many people feel this way but don't voice it. Your willingness to explore this is a strength. Let's start unpacking what's on your mind.",
    ],
    questions: [
      "What does your ideal workday look like — even in a dream scenario?",
      "What aspects of your current job or field feel most draining or unfulfilling?",
      "Are there any skills or interests you've been curious about exploring professionally?",
    ],
    summaries: [
      "you're navigating a career crossroads and seeking clarity on your professional path.",
      "you're working through career uncertainty and the emotions that come with it.",
    ],
    resources: [
      "Here are some resources that can help you gain clarity on your career path. Whether you're exploring options or planning a transition, there are tools and communities that can support you.",
    ],
    consentMessages: [
      "Career transitions can bring up a lot of emotions — anxiety, doubt, even grief. Speaking with a career counselor or therapist who specializes in professional development can be incredibly helpful. Would you like to explore support options?",
    ],
  },
  'emotional-distress': {
    openers: [
      "I'm glad you reached out. Carrying emotional weight alone is exhausting, and you don't have to do that here. Whatever you're feeling — it's valid, and it matters. Let's sit with it together.",
      "Thank you for trusting me with this. Emotions can feel overwhelming, especially when they're hard to name or explain. You're in a safe space. Let's take it at your pace.",
      "I hear how much this is affecting you. Emotional pain is real, and it deserves attention and care. You've already taken the hardest step by reaching out. Let's talk about what's going on.",
    ],
    questions: [
      "Can you describe what this feeling has been like for you — when did it start or what tends to trigger it?",
      "How has this been affecting your daily life — your sleep, appetite, energy, or motivation?",
      "Have you been able to talk to anyone about what you're going through?",
    ],
    summaries: [
      "you're going through a period of emotional distress and seeking support to navigate it.",
      "you're dealing with heavy emotional challenges and reaching out for connection and understanding.",
    ],
    resources: [
      "Here are some resources that may help you navigate what you're feeling. These include calming exercises, community support options, and tools for emotional wellbeing.",
    ],
    consentMessages: [
      "What you're going through is significant, and sometimes professional support can provide the steady, trained guidance that makes all the difference. Would you be open to exploring some options for additional support?",
    ],
  },
};

// ======================
// BRIDGE NARRATIVE ENGINE
// ======================

const categoryLabels: Record<FlowCategory, string> = {
  academic: 'academic',
  financial: 'financial',
  career: 'career',
  relationship: 'relationship',
  family: 'family',
  isolation: 'social',
  stress: 'stress-related',
  silent: 'emotional',
};

const categoryDisplayNames: Record<FlowCategory, string> = {
  academic: 'Academic',
  financial: 'Financial',
  career: 'Career',
  relationship: 'Relationship',
  family: 'Family',
  isolation: 'Isolation & Loneliness',
  stress: 'Stress & Overwhelm',
  silent: 'Silent Struggles',
};

const pairBridges: Record<string, string> = {
  'academic+financial': 'Financial pressure can make it much harder to focus on academic performance — worrying about fees or living expenses affects how well you can study and concentrate. These two challenges are deeply connected, and addressing both together often leads to the best outcomes.',
  'academic+career': "Academic concerns and career uncertainty often feed into each other. When you're unsure about your future career path, it can make school feel aimless or even more stressful. Let's explore both together.",
  'academic+stress': 'Academic pressure is one of the most common sources of stress for students. When school feels overwhelming, it can affect your sleep, health, and confidence. Understanding how these connect can help us find the right approach.',
  'financial+stress': "Financial worries are a major source of ongoing stress. The constant pressure of making ends meet can leave you feeling drained and anxious. Let's address both the practical and emotional sides of this.",
  'financial+career': 'Financial challenges and career concerns are often two sides of the same coin. Worrying about money can make career decisions feel more urgent, while career uncertainty can amplify financial stress. Looking at both together makes sense.',
  'stress+isolation': "When you're overwhelmed by stress, it's natural to withdraw from others — which can lead to feeling isolated and alone. Breaking that cycle starts with understanding both pieces.",
  'silent+stress': "When you can't quite name what you're feeling, it often comes with a background hum of stress and tension. The weight of not understanding your own emotions can be exhausting in itself.",
  'silent+isolation': "Not being able to name or express what you feel can be deeply isolating. It's hard to reach out when you don't know what to say — and that loneliness can make the silence even heavier.",
  'relationship+family': 'Relationship challenges often have roots in family dynamics, and family patterns can shape how we navigate our relationships. Understanding both contexts can reveal important insights.',
  'academic+family': 'Family expectations around school performance can add a layer of pressure to academic challenges. You might be carrying not just your own goals but also what your family hopes for you.',
  'financial+family': "Financial struggles often ripple through the whole family system. Whether it's contributing to household expenses or feeling guilt about family sacrifices, the weight is real.",
};

const buildGenericBridge = (cats: FlowCategory[]): string => {
  const names = cats.map(c => categoryDisplayNames[c].toLowerCase());
  if (cats.length === 2) {
    return `I notice that both ${names[0]} and ${names[1]} challenges are present, and often one can heavily influence the other. Let's look into both so we can find the right path forward.`;
  }
  const last = names.pop();
  return `I notice that ${names.join(', ')}, and ${last} challenges are all connected. These different areas of life rarely exist in isolation, and addressing them together can lead to more meaningful support.`;
};

const buildBridgeNarrative = (categories: FlowCategory[]): string => {
  if (categories.length <= 1) return '';
  if (categories.length === 2) {
    const key = [...categories].sort().join('+');
    if (pairBridges[key]) return pairBridges[key];
  }
  return buildGenericBridge(categories);
};

// ======================
// MULTI-CATEGORY OPENER
// ======================

const buildMultiCategoryOpener = (categories: FlowCategory[]): string => {
  if (categories.length === 1) {
    return getRandomItem(empatheticOpeners[categories[0]]);
  }
  const displayNames = categories.map(c => categoryDisplayNames[c]);
  if (categories.length === 2) {
    return `I can see that both ${displayNames[0].toLowerCase()} and ${displayNames[1].toLowerCase()} challenges are affecting you right now. It's not uncommon for these to overlap, and I want to make sure we address both.`;
  }
  const last = displayNames.pop();
  return `I can see that several challenges are present — ${displayNames.join(', ')}, and ${last?.toLowerCase()}. Carrying all of this at once is a lot, and I'm here to support you through each one.`;
};

// ======================
// COMBINED FOLLOW-UP QUESTIONS
// ======================

const getCombinedFollowUps = (categories: FlowCategory[]): string[] => {
  if (categories.length === 1) {
    return flowQuestions[categories[0]];
  }
  const questions: string[] = [];
  const maxLen = Math.max(...categories.map(c => flowQuestions[c].length));
  for (let i = 0; i < maxLen; i++) {
    for (const cat of categories) {
      if (i < flowQuestions[cat].length) {
        questions.push(flowQuestions[cat][i]);
      }
    }
  }
  return questions;
};

// ======================
// MULTI-CATEGORY SUMMARY
// ======================

const buildMultiCategorySummary = (categories: FlowCategory[], answers: string[]): string => {
  if (categories.length === 1) {
    const primaryIssue = answers[0] || '';
    const additionalContext = answers.length > 1 ? answers.slice(1).join(' ') : '';
    const label = categoryLabels[categories[0]] || 'challenges';
    return `you're dealing with ${label} challenges. You've mentioned: "${primaryIssue}"${additionalContext ? `. You also shared: "${additionalContext}"` : '.'}`;
  }
  const displayNames = categories.map(c => categoryDisplayNames[c]);
  const parts: string[] = [];
  if (categories.length === 2) {
    parts.push(`you're dealing with both ${displayNames[0].toLowerCase()} and ${displayNames[1].toLowerCase()} challenges`);
  } else {
    const last = displayNames.pop();
    parts.push(`you're dealing with multiple challenges: ${displayNames.join(', ')}, and ${last?.toLowerCase()}`);
  }
  if (answers[0]) {
    parts.push(`You've shared: "${answers[0]}"`);
  }
  if (answers.length > 1) {
    const extra = answers.slice(1).filter(a => a.length > 0);
    if (extra.length > 0) {
      parts.push(`You also mentioned: "${extra.join('. ')}"`);
    }
  }
  return parts.join('. ');
};

// ======================
// COMBINED RECOMMENDATIONS
// ======================

const getCombinedRecommendations = (categories: FlowCategory[]): Resource[] => {
  const seen = new Set<string>();
  const combined: Resource[] = [];
  for (const cat of categories) {
    const recs = flowRecommendations[cat] || [];
    for (const rec of recs) {
      if (!seen.has(rec.resource.title)) {
        seen.add(rec.resource.title);
        combined.push(rec.resource);
      }
    }
  }
  return combined;
};

// ======================
// COMBINED SUPPORT PATHWAYS
// ======================

const getCombinedSupportPathways = (categories: FlowCategory[]): SupportOption[] => {
  const seen = new Set<string>();
  const combined: SupportOption[] = [];
  for (const cat of categories) {
    const pathways = supportPathways[cat] || [];
    for (const option of pathways) {
      if (!seen.has(option.title)) {
        seen.add(option.title);
        combined.push(option);
      }
    }
  }
  return combined;
};

// ======================
// COMBINED RECOMMENDATION INTRO
// ======================

const buildMultiCategoryRecommendationIntro = (categories: FlowCategory[], summary: string): string => {
  if (categories.length === 1) {
    return recommendationIntro(categories[0], summary);
  }
  const displayNames = categories.map(c => categoryLabels[c]);
  if (categories.length === 2) {
    return `From what you've shared, ${summary}

Here are some support options that may help with your ${displayNames[0]} and ${displayNames[1]} challenges:`;
  }
  const last = displayNames.pop();
  return `From what you've shared, ${summary}

Here are some support options that may help with your ${displayNames.join(', ')}, and ${last} challenges:`;
};

// ======================
// SCENARIO-SPECIFIC HANDLER
// ======================

const handleScenarioFlow = (
  scenarioId: string,
  flowState: FlowState,
  userMessage: Message
): AIResponse | null => {
  const scenario = scenarioFlows[scenarioId];
  if (!scenario) return null;

  const { questionIndex, answers } = flowState;
  const updatedAnswers = [...answers, userMessage.content];
  const { setFlowState } = useChatStore.getState();

  // If all scenario questions answered, move to summary + recommendations
  if (questionIndex >= scenario.questions.length) {
    const isDistressed = updatedAnswers.some(ans => detectSevereDistress(ans));

    if (isDistressed) {
      setFlowState({
        ...flowState,
        answers: updatedAnswers,
        summarized: true,
        pendingConsent: true,
      });
      return {
        text: getRandomItem(scenario.consentMessages),
        isConsentPrompt: true,
        supportOptions: getCombinedSupportPathways(flowState.categories),
        detectedCategories: flowState.categories,
      };
    }

    setFlowState({
      ...flowState,
      answers: updatedAnswers,
      summarized: true,
    });

    const summary = getRandomItem(scenario.summaries);
    const intro = `From what you've shared, ${summary}

${getRandomItem(scenario.resources)}`;
    const recommendations = flowState.categories.length > 0
      ? getCombinedRecommendations(flowState.categories)
      : [];

    return {
      text: `${intro}

${recommendationFollowUp}${disclaimer}`,
      recommendations,
      detectedCategories: flowState.categories,
    };
  }

  // Ask next scenario-specific question
  const nextQuestion = scenario.questions[questionIndex];
  setFlowState({
    ...flowState,
    questionIndex: questionIndex + 1,
    answers: updatedAnswers,
  });
  return { text: nextQuestion, detectedCategories: flowState.categories };
};

// ======================
// MAIN AI RESPONSE
// ======================

export const getAIResponse = async (
  userMessage: Message
): Promise<AIResponse> => {
  const { flowState, setFlowState } = useChatStore.getState();
  const lowerMessage = userMessage.content.toLowerCase();

  // === RESET COMMAND ===
  if (lowerMessage.includes('stop') || lowerMessage.includes('reset') || lowerMessage.includes('start over')) {
    setFlowState(null);
    return {
      text: "I've reset our conversation. We can start fresh. What's on your mind?",
    };
  }

  // === IN-FLOW PROCESSING ===
  if (flowState) {
    const { categories, questionIndex, answers, sessionScenario } = flowState;

    // If we have a session scenario, route through scenario-specific flow
    if (sessionScenario) {
      const scenarioResult = handleScenarioFlow(sessionScenario, flowState, userMessage);
      if (scenarioResult) return scenarioResult;
    }

    // If the flow was summarized, handle the post-summary response
    if (flowState.summarized) {
      setFlowState(null);
      const nextCategories = detectCategories(userMessage.content);
      if (nextCategories.length > 0) {
        const newFlowState = createFlowState(nextCategories, userMessage.content);
        setFlowState(newFlowState);
        const opener = buildMultiCategoryOpener(nextCategories);
        const bridge = buildBridgeNarrative(nextCategories);
        const firstQuestion = getCombinedFollowUps(nextCategories)[0];
        const bridgeText = bridge ? `

${bridge}` : '';
        return { text: `${opener}${bridgeText}

${firstQuestion}`, detectedCategories: nextCategories };
      } else {
        return { text: "Thank you for sharing. If there's another challenge you'd like to discuss, please let me know. I'm here to listen." };
      }
    }

    // Append the user's latest answer
    const updatedAnswers = [...answers, userMessage.content];
    const followUps = getCombinedFollowUps(categories);

    // Still gathering info — ask the next question
    if (questionIndex < followUps.length) {
      const nextQuestion = followUps[questionIndex];
      setFlowState({ ...flowState, questionIndex: questionIndex + 1, answers: updatedAnswers });
      return { text: nextQuestion, detectedCategories: categories };
    }

    // === ALL QUESTIONS ANSWERED — BUILD SUMMARY & RECOMMENDATIONS ===
    const isDistressed = updatedAnswers.some(ans => detectSevereDistress(ans));

    if (isDistressed) {
      setFlowState({ ...flowState, answers: updatedAnswers, summarized: true, pendingConsent: true });
      return {
        text: `It sounds like this situation has been affecting you deeply. Many challenges become more difficult when faced alone, and seeking support is a sign of strength, not weakness.

In addition to the resources we've discussed, there may be value in speaking with someone trained to provide support. Would you be comfortable exploring professional support options?`,
        isConsentPrompt: true,
        supportOptions: getCombinedSupportPathways(categories),
        detectedCategories: categories,
      };
    }

    // === CONVERSATION QUALITY RULES: Summarize before recommending ===
    setFlowState({ ...flowState, answers: updatedAnswers, summarized: true });

    const summary = buildMultiCategorySummary(categories, updatedAnswers);
    const intro = buildMultiCategoryRecommendationIntro(categories, summary);
    const recommendations = getCombinedRecommendations(categories);

    return {
      text: `${intro}

${recommendationFollowUp}${disclaimer}`,
      recommendations,
      detectedCategories: categories,
    };
  }

  // === NEW FLOW DETECTION ===
  const categories = detectCategories(userMessage.content);
  if (categories.length > 0) {
    const newFlowState = createFlowState(categories, userMessage.content);
    setFlowState(newFlowState);

    const opener = buildMultiCategoryOpener(categories);
    const bridge = buildBridgeNarrative(categories);
    const firstQuestion = getCombinedFollowUps(categories)[0];
    const bridgeText = bridge ? `

${bridge}` : '';

    return { text: `${opener}${bridgeText}

${firstQuestion}`, detectedCategories: categories };
  }

  // === FALLBACK ===
  return {
    text: `I'm here to listen. Tell me what's on your mind. Whether it's about school, work, or just life in general, I can help you find resources and support.${disclaimer}`,
  };
};