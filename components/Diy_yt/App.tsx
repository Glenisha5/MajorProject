
import React, { useState, useCallback } from 'react';
import { DIYTopic } from './types';
import { INITIAL_DIY_TOPICS } from './constants';
import { generateDIYTopics } from './services/geminiService';
import SearchBar from './components/SearchBar';
import DIYCard from './components/DIYCard';
import { SparklesIcon, ExclamationTriangleIcon } from './components/icons/Icons';

const App: React.FC = () => {
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
      setError('Failed to generate DIY ideas. Please try again later.');
      setTopics(INITIAL_DIY_TOPICS); // Reset to default on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-2">
            <SparklesIcon className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              EasyConstruct DIY
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your portal to creative construction, home decor, and repair projects.
          </p>
        </header>

        <main>
          <div className="sticky top-4 z-10 bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-10">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <div className="flex items-center justify-center bg-red-900/50 text-red-300 border border-red-700 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <ExclamationTriangleIcon className="w-6 h-6 mr-3" />
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center space-x-2 p-10">
                <div className="w-4 h-4 rounded-full animate-pulse bg-yellow-400"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-yellow-400" style={{animationDelay: '0.2s'}}></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-yellow-400" style={{animationDelay: '0.4s'}}></div>
                <p className="ml-2 text-gray-300">Generating fresh ideas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topics.map((topic, index) => (
                <DIYCard key={`${topic.title}-${index}`} topic={topic} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
