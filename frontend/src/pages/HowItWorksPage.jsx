import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

const HowItWorksPage = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: "Sign Up & Verify",
      description: "Create your RailBuddy account, verify your identity, and link your journey using your PNR.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
    },
    {
      title: "Set Preferences",
      description: "Tell us your seat preferences—like window seat, group seating, or more legroom.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
        </svg>
      ),
    },
    {
      title: "AI Finds Matches",
      description: "Our intelligent system analyzes thousands of journeys to find travelers whose seats align with your preferences.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3m0 0c1.657 0 3-1.343 3-3s-1.343-3-3-3zm0 0v5m0 0l-3-3m3 3l3-3"></path>
        </svg>
      ),
    },
    {
      title: "Chat & Coordinate",
      description: "Message your matches to discuss a potential seat exchange. Share live GPS for added safety.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"></path>
        </svg>
      ),
    },
    {
      title: "Hassle-Free Exchange",
      description: "Easily confirm seat swaps within the app—no awkward negotiations or confusion.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
    },
  ];

  const features = [
    { title: "AI-Powered Matching", description: "Smart algorithms match you with travelers based on preferences, journeys, and PNR data." },
    { title: "Verified Travelers", description: "All users undergo verification, making exchanges safer and more trustworthy." },
    { title: "Real-Time Chat & GPS", description: "Discuss exchanges instantly, share your live location for peace of mind." },
    { title: "Inclusive Design", description: "Built for elderly, pregnant women, and differently-abled travelers." },
    { title: "Data-Driven Insights", description: "Helps railways optimize seat allocations and understand passenger trends." },
    { title: "Multi-Language Support", description: "Interface available in multiple Indian languages for a comfortable experience." },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">How RailBuddy Works</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Seamlessly connect, coordinate, and exchange seats for a more comfortable journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4 flex justify-center items-center">
                {step.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Step {index + 1}: {step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4">Ready to experience hassle-free travel?</p>
          <Button onClick={() => window.location.href = '/register'}>
            Get Started
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
