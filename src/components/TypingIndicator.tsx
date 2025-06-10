
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-6 max-w-4xl group">
      <Avatar className="w-12 h-12 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-500 shadow-lg pulse-glow">
        <AvatarFallback className="neon-gradient text-background font-bold relative overflow-hidden">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </AvatarFallback>
      </Avatar>
      
      <Card className="glass-morphism border-border/50 p-8 relative overflow-hidden group-hover:border-primary/30 transition-all duration-500">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-pulse" />
        
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <span className="chef-title font-bold text-xl text-primary">Chef AI</span>
            <span className="text-sm text-muted-foreground animate-pulse">• criando sua receita...</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-lg">Pensando em algo delicioso</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full typing-indicator shadow-lg" style={{animationDelay: '0s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full typing-indicator shadow-lg" style={{animationDelay: '0.3s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full typing-indicator shadow-lg" style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full" />
      </Card>
    </div>
  );
};
