"use client"

import { useState } from "react";
import HawkinsConsciousnessScale from "../hawkins-consciousness-scale";
import ConsciousnessQuestionnaire from "../consciousness-questionnaire";
import Disclaimer from "@/components/disclaimer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("scale"); // "scale" or "questionnaire"
  
  return (
    <>
      <Disclaimer />
      <div className="min-h-screen py-10 px-4 bg-[#f8f7f2]">
        <div className="zen-container pt-8">
          <header className="mb-12 text-center">
            <h1 className="prata-regular text-4xl md:text-5xl mb-6">
              Hawkins Consciousness Scale
            </h1>
            
            <p className="poppins-light text-lg md:text-xl max-w-2xl mx-auto text-[#5d4037]/80">
              Explore the levels of consciousness as described by Dr. David R. Hawkins.
              This scale maps human consciousness from lower states of fear and anger
              to higher states of peace and enlightenment.
            </p>
          </header>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md overflow-hidden" style={{ border: '1px solid rgba(156, 102, 68, 0.2)' }}>
              <button
                onClick={() => setActiveTab("scale")}
                className={`px-6 py-3 poppins-medium text-sm transition-all`}
                style={{
                  backgroundColor: activeTab === "scale" ? 'rgba(156, 102, 68, 0.1)' : 'transparent',
                  color: activeTab === "scale" ? '#5d4037' : 'rgba(93, 64, 55, 0.6)',
                  borderRight: '1px solid rgba(156, 102, 68, 0.2)'
                }}
              >
                Consciousness Scale
              </button>
              <button
                onClick={() => setActiveTab("questionnaire")}
                className={`px-6 py-3 poppins-medium text-sm transition-all`}
                style={{
                  backgroundColor: activeTab === "questionnaire" ? 'rgba(156, 102, 68, 0.1)' : 'transparent',
                  color: activeTab === "questionnaire" ? '#5d4037' : 'rgba(93, 64, 55, 0.6)',
                }}
              >
                Self-Assessment
              </button>
            </div>
          </div>
          
          <div className="zen-card mb-12">
            {activeTab === "scale" ? (
              <HawkinsConsciousnessScale />
            ) : (
              <ConsciousnessQuestionnaire />
            )}
          </div>
          
          <div className="zen-quote prata text-center">
            "The level of your consciousness determines how you experience life."
            <div className="zen-quote-author poppins-regular">— Dr. David R. Hawkins</div>
          </div>
          
          <footer className="text-center text-[#7d7d7d] mt-16 text-sm poppins-light">
            <p>Inspired by the work of Dr. David R. Hawkins</p>
          </footer>
        </div>
      </div>
    </>
  );
}