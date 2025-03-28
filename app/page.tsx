"use client"

import { useState } from "react";
import HawkinsConsciousnessScale from "../hawkins-consciousness-scale";
import ConsciousnessQuestionnaire from "../consciousness-questionnaire";
import Disclaimer from "@/components/disclaimer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("questionnaire");
  
  return (
    <>
      <Disclaimer />
      <div className="min-h-screen py-10 px-4 bg-[#f8f7f2]">
        <div className="zen-container pt-8">
          <header className="mb-12 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24 order-1 overflow-hidden rounded-full shadow-lg border-2 border-[#9c6644]/10">
                <Image 
                  src="/hawkings.png" 
                  alt="Dr. David R. Hawkins" 
                  width={96} 
                  height={96}
                  className="object-cover"
                  priority
                  style={{
                    filter: "sepia(50%) hue-rotate(320deg) brightness(0.95) contrast(1.1)",
                  }}
                />
                <div className="absolute inset-0 rounded-full shadow-inner border border-white/10"></div>
              </div>
              
              <h1 className="prata-regular text-3xl md:text-4xl lg:text-5xl order-2">
                Hawkins Consciousness Scale
              </h1>
            </div>
            
            <p className="poppins-light text-base md:text-lg max-w-2xl mx-auto text-[#5d4037]/80">
              Explore the levels of consciousness as described by Dr. David R. Hawkins.
              This scale maps human consciousness from lower states of fear and anger
              to higher states of peace and enlightenment.
            </p>
          </header>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md overflow-hidden w-full max-w-md" 
                 style={{ border: '1px solid rgba(156, 102, 68, 0.2)' }}>
              <button
                onClick={() => setActiveTab("scale")}
                className="flex-1 py-3 px-4 text-center transition-all"
                style={{
                  backgroundColor: activeTab === "scale" ? 'rgba(156, 102, 68, 0.1)' : 'transparent',
                  color: activeTab === "scale" ? '#5d4037' : 'rgba(93, 64, 55, 0.6)',
                }}
              >
                View Scale
              </button>
              <button
                onClick={() => setActiveTab("questionnaire")}
                className="flex-1 py-3 px-4 text-center transition-all"
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
            <div className="flex justify-center mb-4">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#9c6644]/10 shadow-sm">
                <Image 
                  src="/hawkings.png" 
                  alt="Dr. David R. Hawkins" 
                  width={40} 
                  height={40}
                  className="object-cover"
                  style={{
                    filter: "sepia(50%) hue-rotate(320deg) brightness(0.95) contrast(1.1)",
                  }}
                />
              </div>
            </div>
            <p>Inspired by the work of Dr. David R. Hawkins</p>
            <div className="mt-4 flex justify-center space-x-4">
              <Link href="/privacy-policy" className="text-[#9c6644] hover:text-[#875839]">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="text-[#9c6644] hover:text-[#875839]">
                Cookie Policy
              </Link>
              <Link href="/terms-of-service" className="text-[#9c6644] hover:text-[#875839]">
                Terms of Service
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}