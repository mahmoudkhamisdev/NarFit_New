import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AddClientFormValues } from "@/schemas/client";

export interface StoredClient extends AddClientFormValues {
  id: string;
  createdAt: string;
}

interface ClientState {
  clients: StoredClient[];
  isSubmitting: boolean;
  addClient: (data: AddClientFormValues) => Promise<StoredClient>;
  getClientById: (id: string) => StoredClient | undefined;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      clients: [],
      isSubmitting: false,
      addClient: async (data: AddClientFormValues) => {
        set({ isSubmitting: true });
        try {
          // Simulate network / API request submission before navigating
          await new Promise((resolve) => setTimeout(resolve, 800));

          const newClient: StoredClient = {
            ...data,
            id: `client_${Date.now()}`,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            clients: [newClient, ...state.clients],
            isSubmitting: false,
          }));

          return newClient;
        } catch (error) {
          set({ isSubmitting: false });
          throw error;
        }
      },
      getClientById: (id: string) => {
        return get().clients.find((c) => c.id === id);
      },
    }),
    {
      name: "narfit-clients-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
