
import React from 'react';
import { AppLayout } from "@/components/AppLayout";
import { useMessages } from "@/hooks/useMessages";

const Index = () => {
  const { messages, isTyping, sendMessage } = useMessages();

  const handleExampleClick = (example: string) => {
    sendMessage(example);
  };

  return (
    <AppLayout
      messages={messages}
      isTyping={isTyping}
      onSendMessage={sendMessage}
      onExampleClick={handleExampleClick}
    />
  );
};

export default Index;
