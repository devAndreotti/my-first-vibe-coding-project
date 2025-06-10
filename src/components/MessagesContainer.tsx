
import React, { useRef, useEffect } from 'react';
import { ChefMessage } from "@/components/ChefMessage";
import { UserMessage } from "@/components/UserMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeSection } from "@/components/WelcomeSection";
import type { Message } from "@/hooks/useMessages";

interface MessagesContainerProps {
  messages: Message[];
  isTyping: boolean;
  onExampleClick: (example: string) => void;
}

export const MessagesContainer = ({ messages, isTyping, onExampleClick }: MessagesContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 ? (
        <WelcomeSection onExampleClick={onExampleClick} />
      ) : (
        messages.map((message) => (
          <div key={message.id} className="message-enter">
            {message.type === 'user' ? (
              <UserMessage content={message.content} />
            ) : (
              <ChefMessage content={message.content} />
            )}
          </div>
        ))
      )}
      
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
