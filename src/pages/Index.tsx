
import React from 'react';
import { ChatContainer } from '@/components/Chat/ChatContainer';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Auto Genius
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered automotive assistant. Ask anything about cars, maintenance, or buying advice.
          </p>
        </div>
        
        <div className="h-[600px] w-full rounded-2xl overflow-hidden">
          <ChatContainer className="w-full h-full" />
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Powered by Gemini AI • Designed with simplicity in mind</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
