'use client';

import { useNotes } from '@/context/NotesContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { notes, setNotes, saveNotes } = useNotes();

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <Textarea
              placeholder="Add your notes here..."
              className="min-h-[200px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={saveNotes} className="mt-2">
              Save Notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 