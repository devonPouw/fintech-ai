// store/useChatStore.ts
import axios from "axios";
import { create } from "zustand";

interface Message {
  content: string;
  id: string;
  role: string;
}

interface User {
  name: string;
  personId: string;
  country: string;
  currency: string;
  createdAt: string;
  avatarImageUrl: string;
  messages: Message[];
}

interface ChatState {
  users: User[];
  loading: boolean;
  error: string | null;
  activePersonId: string | null;
  setActivePersonId: (id: string) => void;
  sendMessage: (userMessage: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  users: [
    {
      name: "Devon Newone",
      personId: "e0c268c9-1320-4e18-8c5c-1769c40a594c",
      country: "USA",
      currency: "USD",
      createdAt: "2025-06-15",
      avatarImageUrl: "avatars/devon_newone.jpeg",
      messages: [],
    },
    {
      name: "Ralph Lauren",
      personId: "e45448e6-bd65-4556-9d9d-f69150d5e8a8",
      country: "GB",
      currency: "GBP",
      createdAt: "2025-06-15",
      avatarImageUrl: "avatars/ralph_lauren.jpeg",
      messages: [],
    },
    {
      name: "Resul Wonderboy",
      personId: "39250001-f9ad-4e61-9803-b6f9ae6cd95f",
      country: "IN",
      currency: "INR",
      createdAt: "2025-06-15",
      avatarImageUrl: "avatars/resul_wonderboy.jpeg",
      messages: [],
    },
    {
      name: "Jan Omniscient",
      personId: "b7df0e5e-e9eb-449e-b2fd-52837c4f6a1e",
      country: "DE",
      currency: "EUR",
      createdAt: "2025-06-15",
      avatarImageUrl: "avatars/jan_omniscient.jpeg",
      messages: [],
    },
    {
      name: "Sam Bashful",
      personId: "64643c10-ade3-466f-8125-271578d1430b",
      country: "JP",
      currency: "JPY",
      createdAt: "2025-06-15",
      avatarImageUrl: "avatars/sam_bashfull.jpeg",
      messages: [],
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

    const userMsg: Message = {
      content: userMessage,
      id: Date.now().toString() + "-user",
      role: "user",
    };
    const pendingAssistantId = Date.now().toString() + "-pending";
    const pendingAssistantMsg: Message & { pending?: boolean } = {
      content: "",
      id: pendingAssistantId,
      role: "assistant",
      pending: true,
    };
    const messages =
      get().users.find((user) => user.personId === personId)?.messages || [];

    set((state) => ({
      users: state.users.map((user) =>
        user.personId === personId
          ? { ...user, messages: [...messages, userMsg, pendingAssistantMsg] }
          : user
      ),
      loading: true,
      error: null,
    }));

    try {
      const response = await axios.post(
        "https://fin-coach-ai.apps.cfd06.rabobank.nl/try-a-thon/api/chat",
        {
          chatMessage: userMessage,
          personId,
        }
      );

      set((state) => ({
        users: state.users.map((user) => {
          if (user.personId !== personId) return user;
          // Replace the pending assistant message with the real one
          const updatedMessages = user.messages.map((msg) =>
            msg.id === pendingAssistantId
              ? { ...msg, content: response.data, pending: false }
              : msg
          );
          return { ...user, messages: updatedMessages };
        }),
        loading: false,
      }));
    } catch (err: unknown) {
      // Remove the pending assistant message on error
      set((state) => ({
        users: state.users.map((user) => {
          if (user.personId !== personId) return user;
          const filteredMessages = user.messages.filter(
            (msg) => msg.id !== pendingAssistantId
          );
          return { ...user, messages: filteredMessages };
        }),
        loading: false,
        error: axios.isAxiosError(err)
          ? err.message || "Failed to fetch response"
          : "An unexpected error occurred",
      }));
    }
  },
}));
