
import React, { useState } from 'react';
import { MarketingAsset } from '../types';

interface AssetCardProps {
  asset: MarketingAsset;
  onUpdate: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(asset.content);

  const handleSave = () => {
    onUpdate(asset.id, localContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border-2 border-black neubrutalism-shadow-lg flex flex-col">
      <div className="bg-yellow-400 border-b-2 border-black p-4 flex justify-between items-center">
        <h3 className="font-black uppercase text-sm tracking-wider">{asset.type}</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold underline decoration-2 hover:text-slate-700"
          >
            {isEditing ? 'CANCEL' : 'EDIT'}
          </button>
          <button 
            onClick={() => onDelete(asset.id)}
            className="text-xs font-bold text-red-600 underline decoration-2 hover:text-red-800"
          >
            DELETE
          </button>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col gap-4">
        {asset.headline && (
          <div className="font-black text-lg leading-tight">
            {asset.headline}
          </div>
        )}
        
        {isEditing ? (
          <textarea
            className="w-full h-48 border-2 border-black p-3 font-mono text-sm focus:outline-none focus:ring-0 focus:border-yellow-400 transition-colors"
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {asset.content}
          </p>
        )}

        {!isEditing && asset.hashtags && asset.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {asset.hashtags.map((tag, i) => (
              <span key={i} className="bg-slate-100 border border-black px-2 py-1 text-[10px] font-bold">
                #{tag.replace('#', '')}
              </span>
            ))}
          </div>
        )}

        {isEditing && (
          <button
            onClick={handleSave}
            className="mt-2 bg-black text-white font-black py-2 px-4 text-xs neubrutalism-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            SAVE CHANGES
          </button>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t-2 border-black flex justify-end">
        <button 
          onClick={() => {
            navigator.clipboard.writeText(`${asset.headline ? asset.headline + '\n\n' : ''}${asset.content}\n\n${asset.hashtags?.map(t => '#' + t).join(' ')}`);
            alert('Copied to clipboard!');
          }}
          className="bg-white border-2 border-black px-4 py-1 text-xs font-black neubrutalism-shadow-hover transition-all"
        >
          COPY TEXT
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
