'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type NotesContextType = {
  notes: string;
  setNotes: (notes: string) => void;
  saveNotes: () => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('firesense-notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const saveNotes = () => {
    localStorage.setItem('firesense-notes', notes);
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, saveNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
} 