// store/useChatStore.ts
import axios from "axios";
import { create } from "zustand";

interface ChatMessage {
  chatMessage: string;
  personId: string;
}

interface User {
  name: string;
  personId: string;
  country: string;
  currency: string;
  createdAt: string;
  avatarImageUrl: string;
}

interface ChatState {
  messages: ChatMessage[];
  users: User[];
  loading: boolean;
  error: string | null;
  activePersonId: string | null;
  setActivePersonId: (id: string) => void;
  sendMessage: (userMessage: string) => Promise<void>;
  getFilteredMessages: () => ChatMessage[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [
    {
      name: "Devon Newone",
      personId: "e0c268c9-1320-4e18-8c5c-1769c40a594c",
      country: "USA",
      currency: "USD",
      createdAt: "2025-06-15",
      avatarImageUrl: "/avatars/devon_newone.jpeg",
    },
    {
      name: "Ralph Lauren",
      personId: "e45448e6-bd65-4556-9d9d-f69150d5e8a8",
      country: "GB",
      currency: "GBP",
      createdAt: "2025-06-15",
      avatarImageUrl: "/avatars/ralph_lauren.jpeg",
    },
    {
      name: "Resul Wonderboy",
      personId: "39250001-f9ad-4e61-9803-b6f9ae6cd95f",
      country: "IN",
      currency: "INR",
      createdAt: "2025-06-15",
      avatarImageUrl: "/avatars/resul_wonderboy.jpeg",
    },
    {
      name: "Jan Omniscient",
      personId: "b7df0e5e-e9eb-449e-b2fd-52837c4f6a1e",
      country: "DE",
      currency: "EUR",
      createdAt: "2025-06-15",
      avatarImageUrl: "/avatars/jan_omniscient.jpeg",
    },
    {
      name: "Sam Bashful",
      personId: "64643c10-ade3-466f-8125-271578d1430b",
      country: "JP",
      currency: "JPY",
      createdAt: "2025-06-15",
      avatarImageUrl: "/avatars/sam_bashfull.jpeg",
    },
  ],
  loading: false,
  error: null,
  activePersonId: "e0c268c9-1320-4e18-8c5c-1769c40a594c",

  setActivePersonId: (id: string) => {
    console.log("Setting active person ID:", id);
    set({ activePersonId: id });
  },
  sendMessage: async (userMessage: string) => {
    const personId = get().activePersonId;
    if (!personId) return;

    const userMsg: ChatMessage = {
      chatMessage: userMessage,
      personId,
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      loading: true,
      error: null,
    }));

    try {
      const response = await axios.post("https://api.example.com/chat", {
        message: userMessage,
        personId,
      });

      set((state) => ({
        messages: [...state.messages, response.data],
        loading: false,
      }));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({
          error: err.message || "Failed to fetch response",
          loading: false,
        });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },

  getFilteredMessages: () => {
    const { messages, activePersonId } = get();
    return messages.filter((msg) => msg.personId === activePersonId);
  },
}));
