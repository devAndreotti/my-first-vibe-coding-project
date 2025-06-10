
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserMessageProps {
  content: string;
}

export const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex gap-6 max-w-4xl ml-auto group">
      <Card className="flex-1 glass-morphism border-border/50 p-8 relative overflow-hidden group-hover:border-primary/30 transition-all duration-500">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/5 opacity-50" />
        
        <div className="relative text-foreground leading-relaxed text-lg">
          {content}
        </div>
        
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
      </Card>
      
      <Avatar className="w-12 h-12 ring-2 ring-secondary/30 group-hover:ring-primary/50 transition-all duration-500 shadow-lg">
        <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground font-semibold">
          <User className="w-6 h-6" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
