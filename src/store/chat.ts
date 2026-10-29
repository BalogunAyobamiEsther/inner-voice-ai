import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { FlowCategory } from '@/lib/resources';
import { supportPathways } from '@/lib/resources'; // Import support pathways


export type FlowState = {
  categories: FlowCategory[];
  answers: string[];
  summarized: boolean;
  pendingConsent?: boolean;
  showSupportOptions?: boolean;
  supportCategory?: string;
  questionIndex: number;
  sessionScenario?: 'academic-financial' | 'career' | 'emotional-distress';
  // Legacy single-category accessor (derived from first category)
  get category(): FlowCategory;
};

// Helper to create FlowState from single or multiple categories
export function createFlowState(
  categories: FlowCategory[],
  initialMessage: string,
): FlowState {
  return {
    categories,
    answers: [initialMessage],
    summarized: false,
    questionIndex: 1,
    get category() {
      return this.categories[0];
    },
  };
}

export type Resource = {
  title: string;
  url?: string;
  thumbnail?: string;
  type?: 'ted' | 'video' | 'podcast' | 'book' | 'article' | 'exercise' | 'activity' | 'tool';
  whyItHelps?: string;
};

export type SupportOption = {
  title: string;
  description: string;
  type: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Resource[];
  isConsentPrompt?: boolean;
  supportOptions?: SupportOption[];
  detectedCategories?: FlowCategory[];
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
  flowState?: FlowState | null;
};

interface ChatState {
  currentSessionId: string | null;
  messages: Message[];
  sessions: ChatSession[];
  isTyping: boolean;
  flowState: FlowState | null;
  isHistoryOpen: boolean;
  addMessage: (message: Message) => void;
  setIsTyping: (isTyping: boolean) => void;
  startNewChat: () => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllHistory: () => void;
  clearMessages: () => void;
  setFlowState: (flowState: FlowState | null) => void;
  handleConsent: (consent: boolean) => void;
  toggleHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      currentSessionId: null,
      messages: [],
      sessions: [],
      isTyping: false,
      flowState: null,
      isHistoryOpen: false,

      addMessage: (message) => {
        const state = get();
        const newMessage = { ...message, id: uuidv4() };
        const updatedMessages = [...state.messages, newMessage];
        
        let currentSessionId = state.currentSessionId;
        let sessions = [...state.sessions];

        if (!currentSessionId) {
          currentSessionId = uuidv4();
          const newSession: ChatSession = {
            id: currentSessionId,
            title: message.content.slice(0, 30) + (message.content.length > 30 ? '...' : ''),
            messages: updatedMessages,
            flowState: state.flowState,
            updatedAt: Date.now(),
          };
          sessions = [newSession, ...sessions];
        } else {
          const sessionIndex = sessions.findIndex(s => s.id === currentSessionId);
          if (sessionIndex !== -1) {
            sessions[sessionIndex] = {
              ...sessions[sessionIndex],
              messages: updatedMessages,
              flowState: state.flowState,
              updatedAt: Date.now(),
            };
          }
        }

        set({
          messages: updatedMessages,
          currentSessionId,
          sessions,
        });
      },

      setFlowState: (flowState) => set({ flowState }),
      setIsTyping: (isTyping) => set({ isTyping }),

      startNewChat: () => {
        set({
          currentSessionId: null,
          messages: [],
          flowState: null,
        });
      },

      loadSession: (sessionId) => {
        const session = get().sessions.find(s => s.id === sessionId);
        if (session) {
          set({
            currentSessionId: sessionId,
            messages: session.messages,
            flowState: session.flowState || null,
          });
        }
      },

      deleteSession: (sessionId) => {
        const state = get();
        const updatedSessions = state.sessions.filter(s => s.id !== sessionId);
        
        if (state.currentSessionId === sessionId) {
          set({
            currentSessionId: null,
            messages: [],
            sessions: updatedSessions,
            flowState: null,
          });
        } else {
          set({ sessions: updatedSessions });
        }
      },

      clearAllHistory: () => {
        set({
          currentSessionId: null,
          messages: [],
          sessions: [],
          flowState: null,
        });
      },

      clearMessages: () => {
        set({
          currentSessionId: null,
          messages: [],
          flowState: null,
        });
      },

      toggleHistory: () => {
        set({ isHistoryOpen: !get().isHistoryOpen });
      },


      handleConsent: (consent) => {
        const state = get();
        if (!state.flowState || !state.flowState.categories || state.flowState.categories.length === 0) return;

        const { categories } = state.flowState;

        if (consent) {
          set({
            flowState: {
              ...state.flowState,
              pendingConsent: false,
              showSupportOptions: true,
            },
          });
          
          // Add a new assistant message with support options
          // Combine support pathways from all detected categories
          const combinedSupportOptions = categories.flatMap(c => supportPathways[c] || []);
          const uniqueSupportOptions = combinedSupportOptions.filter(
            (opt, i, arr) => arr.findIndex(o => o.title === opt.title) === i
          );
          const supportMessage: Message = {
            id: uuidv4(),
            role: 'assistant',
            content: "I appreciate you being open to this. It shows a lot of self-awareness. Here are some professional support pathways that are tailored to what you're going through.",
            supportOptions: uniqueSupportOptions,
          };
          state.addMessage(supportMessage);

        } else {
          // User declined consent
          set({
            flowState: {
              ...state.flowState,
              pendingConsent: false,
              showSupportOptions: false,
            }
          });

          const declineMessage: Message = {
            id: uuidv4(),
            role: 'assistant',
            content: "I completely understand. Your comfort is the most important thing. We can continue to explore other resources, or we can talk about something else. What feels right to you?",
          };
          state.addMessage(declineMessage);
        }
      }
    }),
    {
      name: 'safespace-chat-storage-v2', // Increment version to avoid schema conflicts
      storage: createJSONStorage(() => localStorage),
    }
  )
);