import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

const heroSlides = [
  {
    image: '/public/carousel1.jpg',
    headline: 'Family Enjoying Train Ride',
    caption: 'Make every journey memorable and comfortable for your loved ones with RailBuddy.'
  },
  {
    image: '/public/carousel2.jpg',
    headline: 'Comfortable Train Journey',
    caption: 'Experience unmatched comfort and convenience with seamless seat exchanges.'
  },
  {
    image: '/public/carousel3.jpg',
    headline: 'RailBuddy App In Use',
    caption: 'Effortlessly manage your seat exchanges and connect with fellow travelers.'
  },
  {
    image: '/public/carousel4.jpg',
    headline: 'Safe and Inclusive Travel',
    caption: 'Travel with confidence—our platform prioritizes safety and inclusivity for all.'
  },
  {
    image: '/public/carousel5.jpg',
    headline: 'Hassle-Free Exchanges',
    caption: 'Say goodbye to awkward negotiations. Enjoy smooth, AI-powered seat swaps.'
  }
];

const HowItWorksPage = () => {
  const [current, setCurrent] = useState(0);
  const slideCount = heroSlides.length;

  const goToSlide = idx => setCurrent(idx);
  const prevSlide = () => setCurrent(current === 0 ? slideCount - 1 : current - 1);
  const nextSlide = () => setCurrent(current === slideCount - 1 ? 0 : current + 1);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const steps = [
    {
      title: "Sign Up & Verify",
      description: "Create your RailBuddy account, verify your identity, and link your journey using your PNR.",
      icon: (
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      ),
    },
    {
      title: "Set Preferences",
      description: "Tell us your seat preferences—like window seat, group seating, or more legroom.",
      icon: (
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
          </svg>
        </div>
      ),
    },
    {
      title: "AI Finds Matches",
      description: "Our intelligent system analyzes thousands of journeys to find travelers whose seats align with your preferences.",
      icon: (
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
      ),
    },
    {
      title: "Chat & Coordinate",
      description: "Message your matches to discuss a potential seat exchange. Share live GPS for added safety.",
      icon: (
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
      ),
    },
    {
      title: "Hassle-Free Exchange",
      description: "Easily confirm seat swaps within the app—no awkward negotiations or confusion.",
      icon: (
        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      ),
    },
  ];

  const features = [
    { 
      title: "AI-Powered Matching", 
      description: "Smart algorithms match you with travelers based on preferences, journeys, and PNR data.",
      icon: "🤖"
    },
    { 
      title: "Verified Travelers", 
      description: "All users undergo verification, making exchanges safer and more trustworthy.",
      icon: "✅"
    },
    { 
      title: "Real-Time Chat & GPS", 
      description: "Discuss exchanges instantly, share your live location for peace of mind.",
      icon: "💬"
    },
    { 
      title: "Inclusive Design", 
      description: "Built for elderly, pregnant women, and differently-abled travelers.",
      icon: "🤝"
    },
    { 
      title: "Data-Driven Insights", 
      description: "Helps railways optimize seat allocations and understand passenger trends.",
      icon: "📊"
    },
    { 
      title: "Multi-Language Support", 
      description: "Interface available in multiple Indian languages for a comfortable experience.",
      icon: "🌐"
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-blue-50">
        {/* Hero Carousel */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Slides */}
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className="w-full h-full flex-shrink-0 relative"
              >
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop&crop=center`;
                  }}
                />
                {/* Add a dark semi-transparent overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl px-8">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                      {slide.headline}
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed opacity-90 drop-shadow-md">
                      {slide.caption}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 z-10"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 z-10"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Learn how to use RailBuddy to exchange seats and earn karma points in just 5 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center h-full transform hover:-translate-y-2">
                    <div className="mb-6 flex justify-center">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Key Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover what makes RailBuddy the perfect travel companion for your railway journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center h-full transform hover:-translate-y-2 border border-gray-100">
                    <div className="text-4xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to experience hassle-free travel?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of travelers who have already transformed their railway journeys with RailBuddy.
            </p>
            <button className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;