'use client';

import { useChat } from 'ai/react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { useNotes } from '@/context/NotesContext';

export default function Chat() {
  const [isMinimized, setIsMinimized] = useState(true);
  const { notes } = useNotes();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { notes }, // Pass notes to the API
    api: '/api/chat',
  });

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 flex flex-col w-96 max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        isMinimized ? 'h-[60px]' : 'h-[600px]'
      }`}
    >
      {/* Chat header */}
      <div className="p-4 border-b dark:border-zinc-700 flex justify-between items-center cursor-pointer"
           onClick={() => setIsMinimized(!isMinimized)}>
        <h2 className="text-lg font-semibold">FireGrid Assistant</h2>
        <button
          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-full transition-colors"
        >
          {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
        </button>
      </div>

      {/* Messages container - hidden when minimized */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isMinimized ? 'hidden' : ''}`}>
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                m.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input form - hidden when minimized */}
      <form 
        onSubmit={handleChatSubmit} 
        className={`p-4 border-t dark:border-zinc-700 ${isMinimized ? 'hidden' : ''}`}
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg border dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}