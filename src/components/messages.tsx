"use client";

import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/ui/chat-container";
import { Markdown } from "@/components/ui/markdown";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { ScrollButton } from "@/components/ui/scroll-button";
import { useRef } from "react";
import { useChatStore } from "@/hooks/use-chat-store";
import { useTextStream } from "./ui/response-stream";
import { useEffect } from "react";

export function Messages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeUser = useChatStore((state) =>
    state.users.find((user) => user.personId === state.activePersonId)
  );
  const messages = activeUser?.messages || [];
  const lastAssistantMsg = messages
    .filter((msg) => msg.role === "assistant")
    .pop();

  const { displayedText, startStreaming } = useTextStream({
    textStream: lastAssistantMsg?.content || "",
    mode: "typewriter",
    speed: 50,
  });

  useEffect(() => {
    if (lastAssistantMsg) startStreaming();
  }, [lastAssistantMsg, startStreaming]);

  return (
    <div className="relative flex h-[85%] max-h-(--breakpoint-md) w-full max-w-(--breakpoint-xl) flex-col overflow-hidden">
      <div ref={containerRef} className="flex-1 overflow-auto">
        <ChatContainerRoot className="h-full">
          <ChatContainerContent className="space-y-4 p-4">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";
              const isLastAssistant = message === lastAssistantMsg;

              return (
                <Message
                  key={message.id}
                  className={isAssistant ? "justify-start" : "justify-end"}
                >
                  {isAssistant && (
                    <MessageAvatar
                      src="avatars/ai.png"
                      alt="AI Assistant"
                      fallback="AI"
                    />
                  )}
                  <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
                    {isAssistant ? (
                      <div className="bg-secondary text-foreground prose rounded-lg p-2">
                        <div className="overflow-x-auto">
                          <Markdown>
                            {isLastAssistant ? displayedText : message.content}
                          </Markdown>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <MessageContent className="bg-primary text-primary-foreground w-[60%]">
                          {message.content}
                        </MessageContent>
                      </div>
                    )}
                  </div>
                  {!isAssistant && (
                    <MessageAvatar
                      src={activeUser?.avatarImageUrl || ""}
                      alt="User"
                      fallback="User"
                    />
                  )}
                </Message>
              );
            })}
          </ChatContainerContent>
          <div className="absolute right-7 bottom-4">
            <ScrollButton className="shadow-sm" />
          </div>
        </ChatContainerRoot>
      </div>
    </div>
  );
}
