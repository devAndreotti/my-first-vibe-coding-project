
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChefMessage } from "@/components/ChefMessage";
import { UserMessage } from "@/components/UserMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeSection } from "@/components/WelcomeSection";
import { Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'chef';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      console.log('Enviando mensagem para N8n:', currentInput);
      
      const response = await fetch('https://tekila.app.n8n.cloud/webhook-test/980501b5-c4cc-435a-9b34-f1a552519a6c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          timestamp: new Date().toISOString(),
          user_id: 'chef_ai_user'
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Resposta recebida do N8n:', data);
      
      // Assumindo que a resposta vem no campo 'response' ou 'message'
      const aiResponse = data.response || data.message || data.content || 'Desculpe, não consegui processar sua solicitação no momento.';

      const chefResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'chef',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, chefResponse]);
    } catch (error) {
      console.error('Erro ao enviar para N8n:', error);
      
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao Chef AI. Tente novamente.",
        variant: "destructive",
      });

      // Fallback para uma resposta padrão em caso de erro
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'chef',
        content: `Ops! Parece que tive um probleminha técnico. 🤖 Mas não desista! Me conte novamente quais ingredientes você tem e vamos criar algo delicioso juntos! ✨`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
    inputRef.current?.focus();
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <WelcomeSection onExampleClick={handleExampleClick} />
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

        {/* Input Area */}
        <div className="p-6 border-t border-border/50 backdrop-blur-sm">
          <Card className="neon-border bg-card/80 backdrop-blur-sm">
            <div className="flex gap-3 p-4">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Quais ingredientes você tem aí? Me diga e eu crio uma receita incrível para você!"
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-base placeholder:text-muted-foreground/70"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="neon-gradient hover:opacity-90 transition-opacity glow-on-hover px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
