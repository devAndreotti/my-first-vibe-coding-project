
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  type: 'user' | 'chef';
  content: string;
  timestamp: Date;
}

interface WebhookResponse {
  response?: string;
  message?: string;
  content?: string;
  output?: string;
  result?: string;
  [key: string]: any;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      console.log('Enviando mensagem para N8n:', content);
      
      const response = await fetch('https://tekila.app.n8n.cloud/webhook-test/980501b5-c4cc-435a-9b34-f1a552519a6c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          timestamp: new Date().toISOString(),
          user_id: 'chef_ai_user'
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data: WebhookResponse = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText) as WebhookResponse;
        } catch (parseError) {
          console.error('Erro ao fazer parse do JSON:', parseError);
          throw new Error('Resposta inválida do servidor');
        }
      }

      console.log('Dados processados do N8n:', data);
      
      let aiResponse = '';
      if (data.response) {
        aiResponse = data.response;
      } else if (data.message && data.message !== 'Workflow was started') {
        aiResponse = data.message;
      } else if (data.content) {
        aiResponse = data.content;
      } else if (data.output) {
        aiResponse = data.output;
      } else if (data.result) {
        aiResponse = data.result;
      } else {
        aiResponse = 'Olá! Recebi sua mensagem sobre os ingredientes. Deixe-me pensar em uma receita deliciosa para você! 🍳✨';
      }

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

  return {
    messages,
    isTyping,
    sendMessage
  };
};
