'use client';

import { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAgentHelperProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrompt?: string;
  targetLLM?: string;
}

export default function AIAgentHelper({
  isOpen,
  onClose,
  currentPrompt,
  targetLLM,
}: AIAgentHelperProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your PromptForge Assistant. I can help you improve your prompts, explain concepts, or suggest better approaches. What would you like help with?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('promptforge-agent-messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('promptforge-agent-messages', JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          currentPrompt,
          targetLLM,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: 'Improve my prompt', action: 'Can you suggest improvements for my current prompt?' },
    { label: 'Add examples', action: 'Help me add few-shot examples to my prompt' },
    { label: 'Make it clearer', action: 'How can I make my prompt clearer and more specific?' },
    { label: 'Best practices', action: 'What are the best practices for prompt engineering?' },
  ];

  const handleClearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! How can I help you with your prompts?",
      timestamp: new Date(),
    }]);
    localStorage.removeItem('promptforge-agent-messages');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-[#0f2137] border-l border-[#1e3a5f] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center">
            <Icons.bot className="w-6 h-6 text-[#0a1929]" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Assistant</h3>
            <p className="text-xs text-[#64748b]">Prompt engineering help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="p-2 text-[#64748b] hover:text-white transition-colors"
            title="Clear chat"
          >
            <Icons.trash className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-[#64748b] hover:text-white transition-colors"
          >
            <Icons.close className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                message.role === 'user'
                  ? 'bg-[#d4a853] text-[#0a1929]'
                  : 'bg-[#1e3a5f] text-white'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-[#0a1929]/60' : 'text-[#64748b]'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1e3a5f] rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#d4a853] animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 rounded-full bg-[#d4a853] animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-[#d4a853] animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-1">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(action.action);
              }}
              className="text-xs px-2 py-1 rounded-full bg-[#1e3a5f] text-[#94a3b8] hover:text-white hover:bg-[#2d4a6f] transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#1e3a5f]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2.5 bg-[#0a1929] border border-[#1e3a5f] rounded-xl text-white placeholder-[#64748b] focus:border-[#d4a853] focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-2.5 rounded-xl transition-colors ${
              isLoading || !input.trim()
                ? 'bg-[#1e3a5f] text-[#64748b] cursor-not-allowed'
                : 'bg-[#d4a853] text-[#0a1929] hover:bg-[#c49843]'
            }`}
          >
            <Icons.send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
