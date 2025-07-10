import React from 'react';
import { Heart, Sparkles, Copy, Check, X } from 'lucide-react';

const ResultCard = ({ 
  item, 
  isItemSaved, 
  onToggleSave, 
  onRemove, 
  onCopy, 
  copied, 
  showRemove = false 
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100 mb-4 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-pink-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-200">
            {item.Subcategory} {item.Category}
          </h3>
        </div>
        {showRemove ? (
          <button
            onClick={onRemove}
            className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        ) : (
          <button
            onClick={onToggleSave}
            className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition-all duration-200 hover:scale-110"
          >
            <Heart className={`w-5 h-5 transition-all duration-200 ${
              isItemSaved ? 'text-pink-500 fill-pink-500' : 'text-pink-400'
            }`} />
          </button>
        )}
      </div>
      
      <p className="text-gray-600 mb-4 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
        {item.Function}
      </p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center group-hover:text-pink-600 transition-colors duration-200">
          <Sparkles className="w-4 h-4 text-pink-400 mr-2 group-hover:text-pink-500 transition-colors duration-200" />
          Ingredients
        </h4>
        <div className="flex flex-wrap gap-2">
          {item["DIY Ingredients"].map((ingredient, idx) => (
            <span 
              key={idx} 
              className="bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium hover:from-pink-200 hover:to-red-200 transition-all duration-200 hover:scale-105"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-4 group-hover:from-pink-100 group-hover:to-red-100 transition-all duration-200">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center group-hover:text-pink-600 transition-colors duration-200">
          <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mr-2 group-hover:scale-110 transition-transform duration-200"></div>
          Recipe
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-200">
          {item["DIY Recipe"]}
        </p>
        <button
          onClick={() => onCopy(item["DIY Recipe"])}
          className="mt-2 flex items-center space-x-1 text-pink-600 hover:text-pink-700 text-sm transition-all duration-200 hover:scale-105"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Recipe'}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultCard;