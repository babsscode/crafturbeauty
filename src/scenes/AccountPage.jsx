import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { User, LogOut, Heart, Bookmark, Copy, Check } from 'lucide-react';
import ResultCard from './ResultCard';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


const AccountPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserData();
      loadSavedItems();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({ name: data.name, email: data.email });
      } else {
        // If user document doesn't exist, create it with basic info
        setUserData({ name: 'User', email: user.email });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const removeItem = (item) => {
    const newSavedItems = savedItems.filter(saved => 
      !(saved.Category === item.Category && saved.Subcategory === item.Subcategory)
    );
    setSavedItems(newSavedItems);
    saveSavedItems(newSavedItems);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');  
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          hello, {userData.name || 'User'}!
        </h1>
        <p className="text-gray-600">{userData.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center space-x-2 mx-auto text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>sign out</span>
        </button>
      </div>

      {savedItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-pink-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">no saved recipes yet</h3>
          <p className="text-gray-500">generate natural skincare recipes from trending videos. paste the link to any YouTube video to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Bookmark className="w-5 h-5 text-pink-400 mr-2" />
            Saved Recipes ({savedItems.length})
          </h2>
          {savedItems.map((item, idx) => (
            <ResultCard
              key={idx}
              item={item}
              onRemove={() => removeItem(item)}
              onCopy={copyToClipboard}
              copied={copied}
              showRemove={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountPage;