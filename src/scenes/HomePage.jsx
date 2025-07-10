import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Share2, Search, Sparkles, Heart, Copy, Check } from 'lucide-react';
import ResultCard from './ResultCard';
import { useAuth } from '../AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleUrlSubmit = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://skincare-api-m8tt.onrender.com/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
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

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent mb-2">
          generate a skincare recipe
        </h1>
        <p className="text-gray-600">making skincare clean and accessible 🌿</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100">
        <div className="flex items-center space-x-2 mb-4">
          <Share2 className="w-5 h-5 text-pink-400" />
          <h2 className="text-lg font-semibold text-gray-800">paste url</h2>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube Shorts URL here..."
              className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleUrlSubmit}
            disabled={loading || !url.trim()}
            className="w-full bg-gradient-to-r from-pink-400 to-red-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-pink-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>generate natural alternatives</span>
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