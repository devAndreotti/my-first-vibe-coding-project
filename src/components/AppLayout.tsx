
import React from 'react';
import { AppHeader } from "@/components/AppHeader";
import { MessagesContainer } from "@/components/MessagesContainer";
import { ChatInput } from "@/components/ChatInput";
import type { Message } from "@/hooks/useMessages";

interface AppLayoutProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onExampleClick: (example: string) => void;
}

export const AppLayout = ({ messages, isTyping, onSendMessage, onExampleClick }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="chef-grid-bg absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto">
        <AppHeader />
        
        <MessagesContainer 
          messages={messages}
          isTyping={isTyping}
          onExampleClick={onExampleClick}
        />

        <ChatInput 
          onSendMessage={onSendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};
