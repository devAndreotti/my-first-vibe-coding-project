
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserMessageProps {
  content: string;
}

export const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex gap-4 max-w-4xl ml-auto">
      <Card className="flex-1 bg-secondary/60 backdrop-blur-sm border-border/50 p-6">
        <div className="text-foreground leading-relaxed">
          {content}
        </div>
      </Card>
      
      <Avatar className="w-10 h-10 ring-2 ring-secondary/20">
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          <User className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
