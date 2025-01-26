'use client';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-800 dark:border-zinc-700">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Sensor Dashboard</h1>
        </div>
      </div>
    </header>
  );
} 