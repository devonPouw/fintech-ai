"use client";

import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { useChatStore } from "@/hooks/use-chat-store";
import { ArrowUp, Square } from "lucide-react";
import { useState } from "react";

export function Prompt() {
  const [input, setInput] = useState("");
  const loading = useChatStore((state) => state.loading);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  return (
    <PromptInput
      value={input}
      onValueChange={handleValueChange}
      isLoading={loading}
      onSubmit={() => {
        sendMessage(input);
        setInput("");
      }}
      className="w-full max-w-(--breakpoint-xl)"
    >
      <PromptInputTextarea placeholder="Ask me anything..." />
      <PromptInputActions className="justify-end pt-2">
        <PromptInputAction
          tooltip={loading ? "Stop generation" : "Send message"}
        >
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => {
              sendMessage(input);
              setInput("");
            }}
          >
            {loading ? (
              <Square className="size-5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
