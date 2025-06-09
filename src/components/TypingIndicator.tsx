
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 max-w-4xl">
      <Avatar className="w-10 h-10 ring-2 ring-primary/20">
        <AvatarFallback className="neon-gradient text-background font-bold">
          <Sparkles className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      
      <Card className="bg-card/60 backdrop-blur-sm border-border/50 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="chef-title font-bold text-primary">Chef AI</span>
          <span className="text-xs text-muted-foreground">• pensando...</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Criando sua receita</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full typing-indicator" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full typing-indicator" style={{animationDelay: '0.3s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full typing-indicator" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
      </Card>
    </div>
  );
};
