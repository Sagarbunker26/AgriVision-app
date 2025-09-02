'use client';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SendHorizonal, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RagBasedAgriculturalQAInput, RagBasedAgriculturalQAOutput } from '@/ai/flows/rag-based-agricultural-qa';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type QAChatProps = {
  getAnswer: (input: RagBasedAgriculturalQAInput) => Promise<RagBasedAgriculturalQAOutput>;
};

export function QAChat({ getAnswer }: QAChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await getAnswer({ query: inputValue });
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get answer:', error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I couldn't get an answer. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col flex-1">
        <CardHeader className="border-b">
            <h2 className="font-semibold">AI Farming Expert</h2>
        </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-18rem)]" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : '')}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className='bg-primary text-primary-foreground'><Bot className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-4">
                 <Avatar className="h-8 w-8 border">
                    <AvatarFallback className='bg-primary text-primary-foreground'><Bot className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                <div className="max-w-md rounded-lg p-3 text-sm bg-muted">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-0"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-300"></span>
                    </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !inputValue.trim()}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
