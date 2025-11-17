import React from 'react';
import { DIYTopic } from './types';
import { Youtube } from 'lucide-react';

interface DIYProjectCardProps {
  topic: DIYTopic;
}

const DIYProjectCard: React.FC<DIYProjectCardProps> = ({ topic }) => {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent('DIY ' + topic.title)}`;

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-6 flex flex-col justify-between h-full transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-bold text-primary mb-2">{topic.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{topic.description}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Find videos for ${topic.title} on YouTube`}
          className="group inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-full hover:bg-red-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-red-500"
        >
          <Youtube className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>
    </div>
  );
};

export default DIYProjectCard;
