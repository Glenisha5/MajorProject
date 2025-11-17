"use client"

import React, { useState, useCallback } from 'react';
import { DIYTopic } from './types';
import { INITIAL_DIY_TOPICS } from './constants';
import { generateDIYTopics } from './geminiService';
import DIYSearchBar from './DIYSearchBar';
import DIYProjectCard from './DIYProjectCard';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DIYUniverse: React.FC = () => {
  const [topics, setTopics] = useState<DIYTopic[]>(INITIAL_DIY_TOPICS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      const newTopics = await generateDIYTopics(query);
      setTopics(newTopics);
    } catch (err) {
      console.error(err);
      setError('Failed to generate DIY ideas. Please try again later or check if GEMINI API is configured.');
      setTopics(INITIAL_DIY_TOPICS); // Reset to default on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              DIY Universe
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your portal to creative construction, home decor, and repair projects.
          </p>
        </header>

        <main>
          <div className="sticky top-4 z-10 bg-background/50 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-10">
            <DIYSearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center space-x-2 p-10">
              <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-primary" style={{animationDelay: '0.2s'}}></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-primary" style={{animationDelay: '0.4s'}}></div>
              <p className="ml-2 text-muted-foreground">Generating fresh ideas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topics.map((topic, index) => (
                <DIYProjectCard key={`${topic.title}-${index}`} topic={topic} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DIYUniverse;
