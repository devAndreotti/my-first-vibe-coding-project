
import React from 'react';
import { Sparkles } from "lucide-react";
import { MessagesContainer } from "@/components/MessagesContainer";
import { ChatInput } from "@/components/ChatInput";
import { useMessages } from "@/hooks/useMessages";

const Index = () => {
  const { messages, isTyping, sendMessage } = useMessages();

  const handleExampleClick = (example: string) => {
    sendMessage(example);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="chef-grid-bg absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <header className="p-6 border-b border-border/50 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="chef-title text-3xl font-bold tracking-tight">
              Chef AI
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-center text-muted-foreground mt-2 text-sm">
            Seu assistente culinário inteligente
          </p>
        </header>

        {/* Messages Area */}
        <MessagesContainer 
          messages={messages}
          isTyping={isTyping}
          onExampleClick={handleExampleClick}
        />

        {/* Input Area */}
        <ChatInput 
          onSendMessage={sendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default Index;
