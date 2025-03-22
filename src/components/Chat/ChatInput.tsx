
import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '' || disabled) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex w-full items-center gap-1.5 transition-opacity duration-300 ease-in-out"
      style={{ opacity: disabled ? 0.7 : 1 }}
    >
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about cars, maintenance, or recommendations..."
        className="pr-12 bg-background/60 backdrop-blur-sm border-border/60 focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300"
        disabled={disabled}
        autoComplete="off"
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={message.trim() === '' || disabled}
        className="absolute right-1 h-8 w-8 transition-all duration-200"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
