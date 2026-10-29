import { useOnboardingStore } from '@/store/onboarding';

export const useOnboarding = () => {
  return useOnboardingStore((state) => state);
};