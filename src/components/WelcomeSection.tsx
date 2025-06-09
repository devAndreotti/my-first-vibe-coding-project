
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Users, Lightbulb } from "lucide-react";

interface WelcomeSectionProps {
  onExampleClick: (example: string) => void;
}

export const WelcomeSection = ({ onExampleClick }: WelcomeSectionProps) => {
  const examples = [
    {
      icon: Clock,
      title: "Receita Rápida",
      description: "Tenho ovos, queijo e pão, quero algo em 10 minutos",
      text: "Tenho ovos, queijo e pão. Preciso de algo rápido para o café da manhã!"
    },
    {
      icon: Users,
      title: "Para a Família",
      description: "Frango, arroz, tomate e cebola para 4 pessoas",
      text: "Tenho frango, arroz, tomate e cebola. Preciso alimentar 4 pessoas hoje!"
    },
    {
      icon: Lightbulb,
      title: "Seja Criativo",
      description: "Batata, brócolis e linguiça, surpreenda-me!",
      text: "Tenho batata, brócolis e linguiça. Me surpreenda com algo diferente!"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="neon-gradient p-4 rounded-full">
            <Sparkles className="w-12 h-12 text-background" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Olá! Eu sou o Chef AI 👨‍🍳
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transformo os ingredientes que você tem em casa em receitas incríveis! 
            Sem desperdício, só criatividade e sabor.
          </p>
        </div>
      </div>

      {/* Example Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {examples.map((example, index) => {
          const Icon = example.icon;
          return (
            <Card 
              key={index}
              className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer glow-on-hover group"
              onClick={() => onExampleClick(example.text)}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{example.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {example.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start text-xs text-primary hover:text-primary-foreground hover:bg-primary/10 group-hover:bg-primary/20"
                >
                  Experimentar →
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-3">
          <h3 className="font-semibold text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            O que eu posso fazer por você:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Criar receitas com ingredientes que você já tem</li>
            <li>• Sugerir substituições e alternativas</li>
            <li>• Adaptar para restrições alimentares</li>
            <li>• Calcular tempo e porções</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-semibold text-accent flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Dicas para melhores resultados:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Liste todos os ingredientes disponíveis</li>
            <li>• Me conte suas preferências</li>
            <li>• Mencione restrições ou alergias</li>
            <li>• Diga quanto tempo você tem</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
