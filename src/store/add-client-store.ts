import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { AddClientFormValues, defaultAddClientValues } from '@/schemas/client';

const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export interface AddClientStoreState {
  currentStep: number;
  formData: AddClientFormValues;
  hasHydrated: boolean;
  setStep: (step: number) => void;
  setFormData: (data: Partial<AddClientFormValues>) => void;
  resetProgress: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useAddClientStore = create<AddClientStoreState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: { ...defaultAddClientValues },
      hasHydrated: false,
      setStep: (step: number) => set({ currentStep: step }),
      setFormData: (data: Partial<AddClientFormValues>) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),
      resetProgress: () =>
        set({
          currentStep: 1,
          formData: { ...defaultAddClientValues },
        }),
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'narfit_add_client_draft',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
