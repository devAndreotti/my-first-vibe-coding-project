
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChefMessage } from "@/components/ChefMessage";
import { UserMessage } from "@/components/UserMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeSection } from "@/components/WelcomeSection";
import { Send, Sparkles } from "lucide-react";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateChefResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Simulação de respostas do Chef AI baseadas em ingredientes
    if (input.includes('frango') || input.includes('chicken')) {
      return `Ótimo! Frango é versátil demais! 🍗 Com esses ingredientes, posso sugerir:\n\n**Frango Refogado Especial**\n\n**Ingredientes:**\n• Frango em cubos\n• Cebola picada\n• Temperos a gosto\n\n**Modo de Preparo:**\n1. Tempere o frango com sal, pimenta e suas especiarias favoritas\n2. Aqueça uma panela com um fio de óleo\n3. Refogue a cebola até dourar\n4. Adicione o frango e cozinhe por 15-20 minutos\n\n⏱️ **Tempo:** 25 minutos\n✨ **Dica especial:** Uma pitada de páprica defumada dá um toque incrível!\n\nTem mais algum ingrediente específico que gostaria de usar?`;
    }
    
    if (input.includes('ovo') || input.includes('egg')) {
      return `Ovos são mágicos na cozinha! 🥚✨ Que tal uma:\n\n**Omelete Criativa**\n\n**Ingredientes básicos:**\n• 2-3 ovos\n• Sal e pimenta\n• Um fio de azeite\n\n**Modo de Preparo:**\n1. Bata os ovos com sal e pimenta\n2. Aqueça a frigideira com azeite\n3. Despeje os ovos e deixe cozinhar\n4. Adicione seus ingredientes favoritos!\n\n⏱️ **Tempo:** 10 minutos\n\nQue outros ingredientes você tem? Posso personalizar essa receita para ficar ainda mais saborosa! 👨‍🍳`;
    }

    if (input.includes('massa') || input.includes('macarrão') || input.includes('pasta')) {
      return `Massa é sempre uma boa pedida! 🍝 Vou te ajudar a criar algo delicioso:\n\n**Massa Simples e Saborosa**\n\n**Ingredientes:**\n• Sua massa favorita\n• Azeite de oliva\n• Alho\n• Temperos frescos\n\n**Modo de Preparo:**\n1. Cozinhe a massa em água fervente com sal\n2. Em outra panela, doure o alho no azeite\n3. Misture a massa escorrida com o azeite aromático\n4. Finalize com seus temperos favoritos\n\n⏱️ **Tempo:** 15 minutos\n\nTem algum molho especial em mente? Ou quer que eu sugira complementos? 🌿`;
    }

    // Resposta padrão encorajadora
    return `Que ingredientes interessantes! 🌟 Para criar a receita perfeita, me conte:\n\n• **Quanto tempo** você tem disponível?\n• Há alguma **restrição alimentar**?\n• Prefere algo mais **rápido** ou **elaborado**?\n• Tem algum **tempero favorito**?\n\nCom essas informações, posso criar uma receita personalizada que vai surpreender! 👨‍🍳✨\n\nVamos cozinhar juntos?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay de resposta da IA
    setTimeout(() => {
      const chefResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'chef',
        content: generateChefResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, chefResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
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
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
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
