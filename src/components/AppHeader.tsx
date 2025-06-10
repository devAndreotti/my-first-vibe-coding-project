
import React from 'react';
import { Sparkles } from "lucide-react";

export const AppHeader = () => {
  return (
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
  );
};
