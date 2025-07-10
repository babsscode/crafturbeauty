import React, { useState } from 'react';
import { Home, Sparkles, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppLayout = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50">
      {/* Header */}
        <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="w-full px-4 py-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-start">
            <div className="flex items-center space-x-2">
                <div  
                  onClick={() => {
                    setActiveTab('home');
                    navigate('/home');
                  }}
              className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span
                  onClick={() => {
                    setActiveTab('home');
                    navigate('/home');
                  }} 
                className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
                craft ur beauty
                </span>
            </div>
            </div>
        </div>
        </div>


      {/* Main Content */}
      <div className="max-w-md mx-auto min-h-screen pt-6 pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                setActiveTab('home');
                navigate('/home');
              }}
              className={`flex flex-col items-center space-y-1 p-2 rounded-2xl transition-all duration-300 ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-600'
                  : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <Home className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => {
                setActiveTab('account');
                navigate('/account');
              }}
              className={`flex flex-col items-center space-y-1 p-2 rounded-2xl transition-all duration-300 ${
                activeTab === 'account'
                  ? 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-600'
                  : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <Bookmark className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;