"use client"

import React, { useState, useRef, useEffect } from 'react';

// Questionnaire sections and questions
export const QUESTIONNAIRE_SECTIONS = {
  CORE_EMOTIONAL_TENDENCIES: [
    "I often feel ashamed of who I am.",
    "I frequently feel like I've done something wrong or unforgivable.",
    "I feel powerless to change my circumstances.",
    "I frequently dwell on past losses or regrets.",
    "I worry about the future and what could go wrong.",
    "I feel driven by desires I can't fully satisfy.",
    "I often feel angry at the world or other people.",
    "I take great pride in my status, appearance, or achievements.",
    "I feel capable of facing life's challenges.",
    "I'm okay with how things are, even if they're not perfect.",
    "I actively seek to grow and improve myself.",
    "I accept responsibility for my life and my choices.",
    "I value logic and reason above all else.",
    "I strive to act from love rather than fear.",
    "I feel deep peace even when things go wrong.",
    "I experience joy for no external reason.",
    "I feel connected to something greater than myself.",
    "I see all people as equal in worth.",
    "I surrender to the flow of life rather than resisting it.",
    "I sense that my true self is beyond thought or form."
  ],
  BELIEFS_WORLDVIEW: [
    "Life is fundamentally unfair and cruel.",
    "People can't be trusted and will take advantage of you.",
    "Only the strong survive; you have to fight for what's yours.",
    "Success is all about status, money, and recognition.",
    "Life is full of opportunities if you're willing to try.",
    "Everyone is doing their best based on their level of awareness.",
    "There's meaning and order behind everything, even suffering.",
    "Love is the most important guiding force in life.",
    "Reality is not just physical; there's something spiritual beyond it.",
    "All things are connected in a deep and mysterious way."
  ],
  REACTIONS_BEHAVIOR: [
    "I easily blame others for my problems.",
    "I often try to control or manipulate situations to get what I want.",
    "I retaliate when I feel wronged.",
    "I avoid conflict, even if it means suppressing myself.",
    "I speak up for myself without needing to dominate others.",
    "I try to uplift others whenever possible.",
    "I feel inspired by acts of kindness, beauty, or truth.",
    "I meditate, pray, or engage in inner practices regularly.",
    "I forgive others easily, even when it's hard.",
    "I value being over doing."
  ],
  STATES_OF_AWARENESS: [
    "I've experienced moments of profound stillness or unity with all life.",
    "My sense of identity has expanded beyond my personal story.",
    "I often observe my thoughts and emotions without becoming them.",
    "I no longer need to be right or prove myself.",
    "I trust in life, even without understanding it all.",
    "I see every moment as a potential teacher.",
    "I experience synchronicities or meaningful coincidences often.",
    "I am aware of an inner presence or stillness beneath thought.",
    "I feel less like 'me' and more like consciousness itself.",
    "There is no longer a 'seeker' in me — just being."
  ]
};

// Flag negatively correlated questions
export const NEGATIVELY_CORRELATED_QUESTIONS = new Set([
  "CORE_EMOTIONAL_TENDENCIES_0",
  "CORE_EMOTIONAL_TENDENCIES_1",
  "CORE_EMOTIONAL_TENDENCIES_2",
  "CORE_EMOTIONAL_TENDENCIES_3",
  "CORE_EMOTIONAL_TENDENCIES_4",
  "CORE_EMOTIONAL_TENDENCIES_5",
  "CORE_EMOTIONAL_TENDENCIES_6",
  "CORE_EMOTIONAL_TENDENCIES_7",
  "BELIEFS_WORLDVIEW_0",
  "BELIEFS_WORLDVIEW_1",
  "BELIEFS_WORLDVIEW_2",
  "BELIEFS_WORLDVIEW_3",
  "REACTIONS_BEHAVIOR_0",
  "REACTIONS_BEHAVIOR_1",
  "REACTIONS_BEHAVIOR_2",
  "REACTIONS_BEHAVIOR_3"
]);

// Consciousness levels mapped to their descriptions
const CONSCIOUSNESS_LEVELS = [
  { range: [0, 50], description: "Life is perceived as hopeless and dominated by shame and guilt. This level is characterized by feelings of unworthiness and self-destructive patterns." },
  { range: [50, 100], description: "Apathy, grief, and fear dominate awareness. Life feels overwhelming and unsafe. Survival anxiety and emotional pain are common experiences." },
  { range: [100, 200], description: "Driven by desire, anger, and pride. While more energetic than lower levels, these states are still reactive and ego-dominated." },
  { range: [200, 300], description: "The threshold to empowerment. Courage, neutrality, and willingness open the path to growth and taking responsibility for one's life." },
  { range: [300, 400], description: "Acceptance, reason, and understanding emerge. Life becomes meaningful, balanced, and manageable." },
  { range: [400, 500], description: "Intellectual understanding gives way to love and compassion. The heart opens and intuition begins to guide actions." },
  { range: [500, 600], description: "Joy, peace, and reverence for life. Transpersonal awareness and service to others become natural expressions." },
  { range: [600, 700], description: "Deep inner peace and nonduality. The world is experienced as perfect and complete as it is." },
  { range: [700, 1000], description: "Enlightened consciousness — beyond personal identity. Pure awareness and unity with all existence." }
];

export default function ConsciousnessQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [finalScore, setFinalScore] = useState(null);

  const sections = Object.keys(QUESTIONNAIRE_SECTIONS);
  const currentQuestions = QUESTIONNAIRE_SECTIONS[sections[currentSection]];

  const handleResponse = (questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [`${sections[currentSection]}_${questionIndex}`]: value
    }));
  };

  const calculateScore = () => {
    const rawScores = Object.entries(responses).map(([key, value]) => {
      const reversed = NEGATIVELY_CORRELATED_QUESTIONS.has(key);
      return reversed ? 6 - value : value;
    });

    const adjustedTotal = rawScores.reduce((sum, val) => sum + val, 0);
    const maxPossible = rawScores.length * 5;

    // Calculate normalized score (0-1)
    const normalized = adjustedTotal / maxPossible;
    
    // Apply population distribution skew
    // This function will make higher consciousness levels increasingly rare
    // but with half the weighting of the original skew
    const applyPopulationSkew = (normalizedScore) => {
      // Base calculation with reduced power function (less extreme curve)
      const baseScore = Math.pow(normalizedScore, 2.0); // Reduced from 2.5
      
      // Apply additional skew to match population distribution, but less extreme
      if (normalizedScore < 0.4) {
        // Lower consciousness (more common)
        return 20 + (baseScore * 180 + normalizedScore * 180) / 2; // Range ~20-200
      } else if (normalizedScore < 0.7) {
        // Middle consciousness (less common)
        const linearScore = 200 + (normalizedScore - 0.4) * 500;
        const curvedScore = 200 + Math.pow(normalizedScore - 0.4, 1.1) * 300; // Reduced from 1.2
        return (linearScore + curvedScore) / 2; // Range ~200-400
      } else if (normalizedScore < 0.9) {
        // Higher consciousness (rare)
        const linearScore = 400 + (normalizedScore - 0.7) * 1000;
        const curvedScore = 400 + Math.pow(normalizedScore - 0.7, 1.25) * 200; // Reduced from 1.5
        return (linearScore + curvedScore) / 2; // Range ~400-600
      } else {
        // Highest consciousness (extremely rare)
        const linearScore = 600 + (normalizedScore - 0.9) * 1000;
        const curvedScore = 600 + Math.pow(normalizedScore - 0.9, 1.5) * 100; // Reduced from 2.0
        return (linearScore + curvedScore) / 2; // Range ~600-700
      }
    };
    
    const estimatedLevel = Math.round(applyPopulationSkew(normalized));
    
    // Cap at 700 (enlightenment)
    const finalLevel = Math.min(700, estimatedLevel);
    
    setFinalScore(finalLevel);
  };

  const getLevelDescription = (score) => {
    const level = CONSCIOUSNESS_LEVELS.find(l => 
      score >= l.range[0] && score < l.range[1]
    );
    return level ? level.description : "Unknown level";
  };

  const getColorForLevel = (score) => {
    // Rainbow spectrum from low to high consciousness
    if (score >= 700) return '#9c59d1'; // Violet/Purple - Enlightenment
    if (score >= 600) return '#7a59d1'; // Indigo - Peace
    if (score >= 500) return '#5976d1'; // Blue - Love
    if (score >= 400) return '#59b6d1'; // Light Blue - Reason
    if (score >= 350) return '#59d196'; // Teal - Acceptance
    if (score >= 300) return '#59d159'; // Green - Willingness
    if (score >= 250) return '#96d159'; // Lime - Neutrality
    if (score >= 200) return '#d1c159'; // Yellow - Courage
    if (score >= 175) return '#d19659'; // Orange - Pride
    if (score >= 150) return '#d17359'; // Orange-Red - Anger
    if (score >= 100) return '#d15959'; // Red - Fear
    return '#8c3636'; // Dark Red - Shame, Guilt, Apathy, Grief
  };

  const renderQuestions = () => {
    return currentQuestions.map((question, index) => (
      <div key={index} className="mb-8">
        <p className="poppins-light mb-4" style={{ 
          fontSize: '1.1rem',
          lineHeight: 1.5,
          color: '#2a2a2a'
        }}>
          {question}
        </p>
        
        <div className="flex flex-wrap justify-between gap-2">
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              onClick={() => handleResponse(index, val)}
              className="flex-1 min-w-[60px] py-3 transition-all"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                backgroundColor: responses[`${sections[currentSection]}_${index}`] === val 
                  ? '#9c6644' 
                  : 'rgba(255, 255, 255, 0.8)',
                color: responses[`${sections[currentSection]}_${index}`] === val 
                  ? 'white' 
                  : '#5d4037',
                border: '1px solid',
                borderColor: responses[`${sections[currentSection]}_${index}`] === val 
                  ? '#9c6644' 
                  : 'rgba(156, 102, 68, 0.3)',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 500,
                boxShadow: responses[`${sections[currentSection]}_${index}`] === val 
                  ? '0 4px 8px rgba(156, 102, 68, 0.2)' 
                  : 'none',
              }}
            >
              {val}
              <span className="text-xs mt-1 opacity-80">
                {val === 1 ? 'Disagree' : 
                 val === 3 ? 'Neutral' : 
                 val === 5 ? 'Agree' : ''}
              </span>
            </button>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div className="zen-card" style={{ 
        padding: '2.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {finalScore === null ? (
          <>
            <h2 className="young-serif text-xl sm:text-2xl text-center" style={{ 
              color: '#5d4037',
              marginBottom: '2rem',
              position: 'relative',
              paddingBottom: '0.75rem'
            }}>
              {sections[currentSection].replace(/_/g, ' ')}
            </h2>
            
            <p style={{ 
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.1rem',
              textAlign: 'center',
              color: 'rgba(93, 64, 55, 0.8)',
              marginBottom: '2rem',
              fontStyle: 'italic'
            }}>
              Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)
            </p>
            
            <div className="space-y-6">
              {renderQuestions()}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              {currentSection > 0 && (
                <button 
                  onClick={() => {
                    setCurrentSection(prev => prev - 1);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#9c6644',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #9c6644',
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                >
                  ← Previous Section
                </button>
              )}
              
              <div className="flex-1 text-center text-sm text-[#5d4037]/60 hidden sm:block">
                Section {currentSection + 1} of {sections.length}
              </div>
              
              {currentSection < sections.length - 1 ? (
                <button 
                  onClick={() => {
                    setCurrentSection(prev => prev + 1);
                  }}
                  disabled={Object.keys(responses)
                    .filter(key => key.startsWith(sections[currentSection]))
                    .length !== currentQuestions.length}
                  style={{
                    backgroundColor: Object.keys(responses)
                      .filter(key => key.startsWith(sections[currentSection]))
                      .length === currentQuestions.length ? '#9c6644' : 'rgba(156, 102, 68, 0.3)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontFamily: 'var(--font-zen-maru-gothic)',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    cursor: Object.keys(responses)
                      .filter(key => key.startsWith(sections[currentSection]))
                      .length === currentQuestions.length ? 'pointer' : 'not-allowed',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                >
                  Next Section →
                </button>
              ) : (
                <button 
                  onClick={calculateScore}
                  disabled={Object.keys(responses)
                    .filter(key => key.startsWith(sections[currentSection]))
                    .length !== currentQuestions.length}
                  style={{
                    backgroundColor: Object.keys(responses)
                      .filter(key => key.startsWith(sections[currentSection]))
                      .length === currentQuestions.length ? '#9c6644' : 'rgba(156, 102, 68, 0.3)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontFamily: 'var(--font-young-serif)',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    cursor: Object.keys(responses)
                      .filter(key => key.startsWith(sections[currentSection]))
                      .length === currentQuestions.length ? 'pointer' : 'not-allowed',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                >
                  Calculate Score →
                </button>
              )}
            </div>

            {/* Add section progress indicator for mobile */}
            <div className="text-center text-sm text-[#5d4037]/60 mt-4 sm:hidden">
              Section {currentSection + 1} of {sections.length}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="young-serif text-xl sm:text-2xl md:text-3xl" style={{ 
              color: '#5d4037',
              marginBottom: '2rem'
            }}>
              Your Consciousness Level
            </h2>
            
            <div className="young-serif" style={{
              fontSize: 'clamp(3rem, 10vw, 5rem)',
              color: getColorForLevel(finalScore),
              marginBottom: '1.5rem',
              position: 'relative',
              display: 'inline-block',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              {finalScore}
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${getColorForLevel(finalScore)}, transparent)`
              }}></div>
            </div>
            
            <p className="poppins-light text-base sm:text-lg md:text-xl" style={{ 
              lineHeight: 1.7,
              color: '#2a2a2a',
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>
              {getLevelDescription(finalScore)}
            </p>
            
            <button 
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#9c6644',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                fontFamily: 'var(--font-zen-maru-gothic)',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(156, 102, 68, 0.2)'
              }}
            >
              Retake Questionnaire
            </button>
          </div>
        )}
      </div>
      
      <div style={{
        backgroundColor: 'rgba(255, 248, 225, 0.8)',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginTop: '2rem',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(156, 102, 68, 0.1)',
        textAlign: 'center',
        fontFamily: 'var(--font-cormorant)',
        fontSize: '0.9rem',
        color: '#5d4037',
        fontStyle: 'italic',
        lineHeight: 1.6
      }}>
        <div className="disclaimer">
        Disclaimer: This questionnaire is for self-reflection purposes only. 
        It is not a scientific or clinical assessment of consciousness. 
        The results are a speculative interpretation based on David Hawkins' 
        theoretical consciousness scale and should not be considered 
        medical or psychological advice.
        </div>

      </div>
    </div>
  );
} 