import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Link, Sparkle, Sparkles, Heart, Copy, Check, Search } from 'lucide-react';
import ResultCard from './ResultCard';
import { useAuth } from '../AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchMode, setSearchMode] = useState('url'); // 'url' or 'phrase'

  // Load saved items when component mounts
  useEffect(() => {
    if (user) {
      loadSavedItems();
    }
  }, [user]);

  const loadSavedItems = async () => {
    try {
      const savedDoc = await getDoc(doc(db, 'savedItems', user.uid));
      if (savedDoc.exists()) {
        const data = savedDoc.data();
        setSavedItems(data.items || []);
      }
    } catch (error) {
      console.error('Error loading saved items:', error);
    }
  };

  const saveSavedItems = async (items) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'savedItems', user.uid), {
        items: items,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError('');

    try {
      const endpoint = searchMode === 'url' ? '/url' : '/phrase';
      const bodyKey = searchMode === 'url' ? 'url' : 'phrase';
      
      const response = await fetch(`https://skincare-api-m8tt.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [bodyKey]: input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error during API call:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveItem = (item) => {
    if (!savedItems.find(saved => saved.Category === item.Category && saved.Subcategory === item.Subcategory)) {
      const newSavedItems = [...savedItems, item];
      setSavedItems(newSavedItems);
      saveSavedItems(newSavedItems);
    }
  };

  const removeItem = (item) => {
    const newSavedItems = savedItems.filter(saved => !(saved.Category === item.Category && saved.Subcategory === item.Subcategory));
    setSavedItems(newSavedItems);
    saveSavedItems(newSavedItems);
  };

  const isItemSaved = (item) => {
    return savedItems.find(saved => saved.Category === item.Category && saved.Subcategory === item.Subcategory);
  };

  const toggleSaveItem = (item) => {
    if (isItemSaved(item)) {
      removeItem(item);
    } else {
      saveItem(item);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = (mode) => {
    if (mode !== searchMode) {
      setSearchMode(mode);
      setInput('');
      setResults([]);
      setError('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent mb-2">
          generate recipes
        </h1>
        <p className="text-gray-600">making skincare clean and accessible 🌿</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {searchMode === 'url' ? (
              <Link strokeWidth={2.75} className="w-5 h-5 text-pink-400" />
            ) : (
              <Search strokeWidth={2.75} className="w-5 h-5 text-pink-400" />
            )}
            <h2 className="text-lg font-semibold text-gray-800">
              {searchMode === 'url' ? 'paste video url' : 'find skincare recipes'}
            </h2>
          </div>
          
          {/* Aesthetic Toggle Switch */}
          <div className="relative">
            <div className="flex items-center bg-pink-50 rounded-full p-1 border border-pink-200">
              <button
                onClick={() => switchMode('url')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  searchMode === 'url'
                    ? 'bg-gradient-to-r from-pink-400 to-red-500 text-white shadow-lg transform scale-105'
                    : 'text-pink-600 hover:text-pink-700'
                }`}
              >
                <Link strokeWidth={2} className="w-4 h-4" />
              </button>
              <button
                onClick={() => switchMode('phrase')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  searchMode === 'phrase'
                    ? 'bg-gradient-to-r from-pink-400 to-red-500 text-white shadow-lg transform scale-105'
                    : 'text-pink-600 hover:text-pink-700'
                }`}
              >
                <Search strokeWidth={2} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={searchMode === 'url' ? 'Paste YouTube Shorts URL here...' : 'Search for skincare products or ingredients...'}
              className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="w-full bg-gradient-to-r from-pink-400 to-red-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-pink-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Sparkle strokeWidth={2.25} className="w-5 h-5"/>
                <span>generate</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Sparkles className="w-6 h-6 text-pink-400 mr-2" />
            DIY Alternatives
          </h2>
          {results.map((item, idx) => (
            <ResultCard
              key={idx}
              item={item}
              isItemSaved={isItemSaved(item)}
              onToggleSave={() => toggleSaveItem(item)}
              onCopy={copyToClipboard}
              copied={copied}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;