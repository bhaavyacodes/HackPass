import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

interface PosterModalProps {
  posterUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  posterUrl,
  title,
  onClose,
}) => {
  if (!posterUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-2xl max-h-[92vh] flex flex-col items-center">
        
        {/* Floating Controls Bar */}
        <div className="flex items-center justify-between w-full mb-3 px-2">
          <div className="text-left">
            <h4 className="text-white font-bold text-sm sm:text-base font-display">
              {title || 'Event Promotional Poster'}
            </h4>
            <p className="text-[11px] text-cyan-400 font-mono">Official Hack4Tech Artwork</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={posterUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700 transition-colors"
              title="Open full image"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Poster Image */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-700 shadow-2xl bg-black max-h-[82vh]">
          <img
            src={posterUrl}
            alt={title || 'Event Poster'}
            className="w-auto max-h-[80vh] object-contain mx-auto"
          />
        </div>

      </div>
    </div>
  );
};
