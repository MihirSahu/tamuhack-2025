'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNotes } from '@/context/NotesContext';

export default function DataSummary({ data }: { data: any[] }) {
  const { notes } = useNotes();
  const [summary, setSummary] = useState('Analyzing conditions...');

  useEffect(() => {
    async function generateSummary() {
      if (!data?.length) return;
      const latestReading = data[data.length - 1];

      const response = await fetch('/api/generatechat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latestReading, notes })
      });

      const result = await response.json();
      setSummary(result.text);
    }

    generateSummary();
  }, [data, notes]);

  return (
    <Card className="w-full mb-8">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Current Conditions</h2>
            <div className="text-zinc-600 dark:text-zinc-300">{summary}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 