
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, LoadingIndicator, Message } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { generateCarResponse } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';
import { Sparkles } from 'lucide-react';

interface ChatContainerProps {
  className?: string;
  carInfo?: any;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ className, carInfo }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: carInfo
        ? `Hi there! I'm your automotive assistant. I see you're asking about your ${carInfo.year || ''} ${carInfo.make || ''} ${carInfo.model || ''} ${carInfo.vin ? `(VIN: ${carInfo.vin})` : ''}. What problem are you experiencing?`
        : 'Hi there! I\'m your automotive assistant powered by Gemini AI. Ask me anything about cars, maintenance, buying advice, or technical specifications.',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Get response from Gemini
      const response = await generateCarResponse(content);

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I couldn't process your request right now. Please try again later.",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`flex flex-col h-full glass-panel rounded-2xl chat-container-shadow overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h2 className="text-lg font-medium flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
          Gemini Car Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isProcessing && <LoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border/50">
        <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
      </div>
    </div>
  );
};
