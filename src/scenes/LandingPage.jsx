import React, { useState } from 'react';
import { Sparkle, Sparkles, Heart, Search, Shield, Droplet, Leaf, Zap, Star, ArrowRight, Youtube, Play, DollarSign, Hand, HandHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  const heroFeatures = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Search by Concern",
      description: "Type 'acne' - get instant recipes",
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "YouTube Analysis",
      description: "Paste video URLs for DIY alternatives",
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Harsh Chemicals",
      description: "Skip irritating ingredients",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Gentle & Effective",
      description: "Works with your skin naturally",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budget-Friendly",
      description: "Premium results, kitchen ingredients",
      color: "from-purple-400 to-violet-500"
    },
    {
      icon: <HandHeart className="w-8 h-8" />,
      title: "Better for Planet",
      description: "Recipes that are better for the environment",
      color: "from-green-400 to-emerald-500"    
    }
  ];

  const testimonials = [
    {
      name: "Sarah",
      text: "My acne has finally cleared after I replaced harsh products with natural alternatives!",
    },
    {
      name: "Emma",
      text: "I have literally saved hundreds of dollars on expensive skincare products.",
    }
  ];


  const sampleRecipes = [
    {
      category: "Smooth Skin",
      subcategory: "Physical Scrub Exfoliator",
      ingredients: ["Yogurt", "Oatmeal"],
      benefit: "Manually scrubs and removes dead skin to even texture"
    },
    {
      category: "Glowing Skin",
      subcategory: "Turmeric Brightening Mask",
      ingredients: ["Turmeric powder", "Greek yogurt", "Honey"],
      benefit: "Brightens complexion and evens skin tone"
    },
    {
      category: "Oily Skin",
      subcategory: "Clay Face Mask",
      ingredients: ["Vitamin C powder", "Rose water", "Glycerin"],
      benefit: "Deep-cleans skin and absorbs excess sebum from pores"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section - Optimized for mobile */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4">
        {/* Simplified background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-4 w-16 h-16 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-32 right-6 w-12 h-12 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-20 left-6 w-20 h-20 bg-gradient-to-r from-red-200 to-rose-200 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 leading-tight">
            Skip the{' '}
            <span className="bg-gradient-to-r from-pink-600 to-red-700 bg-clip-text text-transparent">
              $100 serums
            </span>
            <br />
            Make them at{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              home
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-2 font-medium">
            🌿 Making skincare clean and accessible! 🌿
          </p>
          <p className="text-sm text-gray-500 mb-6 max-w-lg mx-auto leading-relaxed">
            Get instant DIY recipes for any skin concern or recreate expensive products with natural ingredients
          </p>
          
          {/* Compact Demo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
            {heroFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-4 shadow-lg border transition-all duration-300 cursor-pointer ${
                  activeFeature === index ? 'border-pink-400 scale-105' : 'border-pink-100 hover:border-pink-200'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`inline-flex p-2 rounded-xl mb-2 ${
                  activeFeature === index ? 'bg-gradient-to-r from-pink-400 to-red-500 text-white' : 'bg-pink-50 text-pink-500'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <button 
            onClick={() => {
                    navigate('/login');
                  }}
            className="group w-full sm:w-auto bg-gradient-to-r from-pink-500 to-red-600 text-white px-8 py-3 rounded-2xl font-bold text-base hover:from-pink-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="flex items-center justify-center space-x-2">
                <Sparkle className="w-5 h-5" />
                <span>Generate Recipes</span>
              </div>
            </button>
            {/**<div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
              <span>🎉 50,000+ users</span>
              <div className="flex items-center ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className="ml-1">4.9/5</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>


      {/* Benefits - Compact Mobile Grid */}
      <section className="py-8 px-4 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why Go{' '}
              <span className="bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
                Natural
              </span>
              ?
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center text-white mb-3 mx-auto`}>
                  {React.cloneElement(benefit.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-600 leading-tight">{benefit.description}</p>
              </div>
            ))}
          </div>

          
        </div>
      </section>

{/* Sample Recipes - Responsive Design */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mr-2 sm:mr-3" />
              Recipes That Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600">Real results from your kitchen</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
            {sampleRecipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group min-h-[280px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{recipe.category}</h3>
                    <p className="text-pink-500 font-medium text-sm sm:text-base">{recipe.subcategory}</p>
                  </div>
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400 group-hover:fill-current transition-all duration-300 flex-shrink-0 ml-3" />
                </div>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-pink-50 to-red-50 text-pink-700 px-3 py-2 rounded-full text-sm font-medium border border-pink-100 hover:border-pink-200 transition-colors">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-pink-100 pt-4 mt-auto">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{recipe.benefit}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
            onClick={() => {
                    navigate('/login');
                  }}
            className="bg-gradient-to-r from-pink-400 to-red-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-lg hover:from-pink-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 sm:space-x-3 mx-auto shadow-xl">
              <span>Find More Recipes</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

    {/**
     * 

      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Real Results</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-2xl border border-pink-100 shadow-lg">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-sm text-gray-700 mb-3 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     */}

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 px-4 bg-gradient-to-r from-pink-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 left-5 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-5 right-5 w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Ready to Glow Up?
          </h2>
          <p className="text-base text-white/90 mb-1 font-semibold">
            Your skin deserves better than chemicals.
          </p>
          <p className="text-sm text-white/80 mb-6">
            Discover natural recipes to replace your expensive skincare products.
          </p>
          
          <div className="space-y-4">
            <button 
            onClick={() => {
                    navigate('/login');
                  }}
            className="group bg-white text-pink-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto">
              <div className="flex items-center justify-center space-x-2">
                <Sparkle className="w-5 h-5" />
                <span>Start Your Journey</span>
              </div>
            </button>
            
            {/**<div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/90 text-xs">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                <span>Instant access</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                <span>Cancel anytime</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;