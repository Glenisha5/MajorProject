import React from "react";

type Topic = {
  title?: string;
  // other fields if any...
};

interface DIYCardProps {
  topic?: Topic;
}

const DIYCard: React.FC<DIYCardProps> = ({ topic }) => {
  // guard against missing topic and provide a sensible default title
  const title = topic?.title?.trim() || "Projects";
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("DIY " + title)}`;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 flex flex-col justify-between h-full transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10 hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{`DIY ${title}`}</h3>
        <p className="text-sm text-gray-300 mb-4">Quick access to curated DIY videos and guides.</p>
        <div className="flex gap-2">
          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-amber-500 text-black rounded-md hover:opacity-90"
          >
            Open YouTube Search
          </a>
          <button
            onClick={() => window.open(youtubeSearchUrl, "_blank", "noopener")}
            className="inline-flex items-center px-4 py-2 border border-gray-600 text-white rounded-md hover:bg-white/5"
          >
            Open
          </button>
        </div>
      </div>

      {/* keep any existing UI like cards/list here */}
    </div>
  );
};

export default DIYCard;
