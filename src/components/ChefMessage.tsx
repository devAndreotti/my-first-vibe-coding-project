
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

interface ChefMessageProps {
  content: string;
}

export const ChefMessage = ({ content }: ChefMessageProps) => {
  const formatContent = (text: string) => {
    // Convert markdown-like formatting to JSX
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-lg mb-2 text-primary">
            {line.slice(2, -2)}
          </h3>
        );
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-accent">{part}</strong> : part
            )}
          </p>
        );
      }
      
      // List items
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 mb-1 text-foreground/90">
            {line.slice(2)}
          </li>
        );
      }
      
      // Numbered lists
      if (/^\d+\./.test(line)) {
        return (
          <li key={index} className="ml-4 mb-1 text-foreground/90 list-decimal">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular text
      return (
        <p key={index} className="mb-2 text-foreground/90 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex gap-4 max-w-4xl">
      <Avatar className="w-10 h-10 ring-2 ring-primary/20">
        <AvatarFallback className="neon-gradient text-background font-bold">
          <Sparkles className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      
      <Card className="flex-1 bg-card/60 backdrop-blur-sm border-border/50 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="chef-title font-bold text-primary">Chef AI</span>
          <span className="text-xs text-muted-foreground">• agora</span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          {formatContent(content)}
        </div>
      </Card>
    </div>
  );
};
