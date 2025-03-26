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
  const [calculatedScore, setCalculatedScore] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '' });
  const [formTouched, setFormTouched] = useState({ email: false });
  const questionnaireRef = useRef(null);

  const sections = Object.keys(QUESTIONNAIRE_SECTIONS);
  const currentQuestions = QUESTIONNAIRE_SECTIONS[sections[currentSection]];

  // Calculate progress percentage
  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  // Add effect to scroll to top when section changes
  useEffect(() => {
    if (questionnaireRef.current) {
      // Smooth scroll to the top of the questionnaire
      questionnaireRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentSection]);

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
    const applyPopulationSkew = (normalizedScore) => {
      // Base calculation with reduced power function (less extreme curve)
      const baseScore = Math.pow(normalizedScore, 2.0);
      
      // Apply additional skew to match population distribution, but less extreme
      if (normalizedScore < 0.4) {
        return 20 + (baseScore * 180 + normalizedScore * 180) / 2;
      } else if (normalizedScore < 0.7) {
        const linearScore = 200 + (normalizedScore - 0.4) * 500;
        const curvedScore = 200 + Math.pow(normalizedScore - 0.4, 1.1) * 300;
        return (linearScore + curvedScore) / 2;
      } else if (normalizedScore < 0.9) {
        const linearScore = 400 + (normalizedScore - 0.7) * 1000;
        const curvedScore = 400 + Math.pow(normalizedScore - 0.7, 1.25) * 200;
        return (linearScore + curvedScore) / 2;
      } else {
        const linearScore = 600 + (normalizedScore - 0.9) * 1000;
        const curvedScore = 600 + Math.pow(normalizedScore - 0.9, 1.5) * 100;
        return (linearScore + curvedScore) / 2;
      }
    };
    
    const estimatedLevel = Math.round(applyPopulationSkew(normalized));
    const finalLevel = Math.min(700, estimatedLevel);
    
    setCalculatedScore(finalLevel);
    setShowEmailForm(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    if (!formTouched[name]) {
      setFormTouched(prev => ({ ...prev, [name]: true }));
    }
    
    // Validate email
    if (name === 'email') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFormTouched(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = () => {
    return validateEmail(userInfo.email) && !formErrors.email;
  };

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    
    // Final validation check
    if (!validateEmail(userInfo.email)) {
      setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      setFormTouched(prev => ({ ...prev, email: true }));
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      console.log('Submitting score:', { name: userInfo.name, email: userInfo.email, score: calculatedScore });
      
      // Try the App Router API route first
      let response = await fetch('/api/submit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          score: calculatedScore
        }),
      });
      
      // If App Router API fails, try the Pages Router API
      if (!response.ok && response.status === 404) {
        console.log('App Router API not found, trying Pages Router API');
        response = await fetch('/api/submit-score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            score: calculatedScore
          }),
        });
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error submitting score:', data);
        throw new Error(data.message || 'Failed to submit score');
      }
      
      console.log('Score submitted successfully:', data);
      setSubmitSuccess(true);
      setFinalScore(calculatedScore);
      setShowEmailForm(false);
      
      // Track form submission in Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          'event_category': 'engagement',
          'event_label': 'consciousness_score',
          'value': calculatedScore
        });
      }
    } catch (error) {
      console.error('Error in handleSubmitScore:', error);
      setSubmitError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

{/* 
  const skipEmailCollection = () => {
    setFinalScore(calculatedScore);
    setShowEmailForm(false);
    
    // Track skip in Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'skip_email_collection', {
        'event_category': 'engagement',
        'event_label': 'consciousness_score',
        'value': calculatedScore
      });
    }
  };
*/}

  const getLevelDescription = (score) => {
    const level = CONSCIOUSNESS_LEVELS.find(l => 
      score >= l.range[0] && score < l.range[1]
    );
    return level ? level.description : "No description available for this level.";
  };

  const getColorForLevel = (score) => {
    // Rainbow spectrum from low to high consciousness
    if (score >= 700) return '#9c59d1'; // Violet/Purple - Enlightenment
    if (score >= 600) return '#7a59d1'; // Indigo - Peace
    if (score >= 500) return '#5976d1'; // Blue - Joy/Love
    if (score >= 400) return '#59b6d1'; // Light Blue - Reason
    if (score >= 350) return '#59d1a2'; // Teal - Acceptance
    if (score >= 300) return '#59d159'; // Green - Willingness
    if (score >= 250) return '#a2d159'; // Light Green - Neutrality
    if (score >= 200) return '#d1c359'; // Yellow - Courage
    if (score >= 175) return '#d19c59'; // Orange - Pride
    if (score >= 150) return '#d17a59'; // Light Red - Anger
    if (score >= 125) return '#d15959'; // Red - Desire
    if (score >= 100) return '#d1597a'; // Pink - Fear
    if (score >= 75) return '#d159a2'; // Magenta - Grief
    if (score >= 50) return '#b659d1'; // Purple - Apathy
    if (score >= 30) return '#9c59d1'; // Violet - Guilt
    return '#7a59d1'; // Indigo - Shame
  };

  const renderQuestions = () => {
    return currentQuestions.map((question, index) => (
      <div key={index} className="mb-8 max-w-2xl mx-auto">
        <p className="poppins-light mb-4" style={{ 
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: '#5d4037',
        }}>
          {question}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              onClick={() => handleResponse(index, val)}
              style={{
                width: '4rem',
                padding: '0.75rem 0',
                margin: '0 0.25rem',
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
            </button>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-[#7d7d7d] mt-2 px-4">
          <span>Rarely/Never</span>
          <span>Always/Often</span>
        </div>
      </div>
    ));
  };

  return (
    <div ref={questionnaireRef} className="max-w-3xl mx-auto">
      {!finalScore && !showEmailForm && (
        <>
          <div className="mb-8">
            <h2 className="young-serif text-xl sm:text-2xl md:text-3xl mb-2" style={{ color: '#5d4037' }}>
              Consciousness Self-Assessment
            </h2>
            <p className="poppins-light text-base" style={{ color: '#7d7d7d' }}>
              Answer honestly based on your typical state of being, not how you wish to be.
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="poppins-medium text-sm text-[#9c6644]">
                Section {currentSection + 1} of {sections.length}
              </span>
              <span className="poppins-medium text-sm text-[#9c6644]">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-[#f0ebe5] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#9c6644] transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="poppins-light text-xs text-[#7d7d7d]">
                {sections[currentSection].replace(/_/g, ' ').toLowerCase()}
              </span>
            </div>
          </div>
          
          <div className="mb-6 text-center">
            <h3 className="poppins-medium text-lg text-[#5d4037]">
              {sections[currentSection].split('_').map(word => 
                word.charAt(0) + word.slice(1).toLowerCase()
              ).join(' ')}
            </h3>
          </div>
          
          <div className="mb-8">
            {renderQuestions()}
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              style={{
                backgroundColor: currentSection === 0 ? '#f0ebe5' : 'white',
                color: currentSection === 0 ? '#bdb9b3' : '#9c6644',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor: currentSection === 0 ? '#f0ebe5' : '#9c6644',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 500,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                cursor: currentSection === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>
            
            {currentSection < sections.length - 1 ? (
              <button
                onClick={() => setCurrentSection(prev => prev + 1)}
                disabled={currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`])}
                style={{
                  backgroundColor: currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`]) ? '#f0ebe5' : '#9c6644',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  cursor: currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`]) ? 'not-allowed' : 'pointer',
                  boxShadow: currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`]) ? 'none' : '0 4px 12px rgba(156, 102, 68, 0.2)',
                }}
              >
                Next Section
              </button>
            ) : (
              <button
                onClick={calculateScore}
                disabled={currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`])}
                style={{
                  backgroundColor: currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`]) ? '#f0ebe5' : '#9c6644',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  cursor: currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`]) ? 'not-allowed' : 'pointer',
                  boxShadow: currentQuestions.some((_, index) => !responses[`${sections[currentSection]}_${index}`]) ? 'none' : '0 4px 12px rgba(156, 102, 68, 0.2)',
                }}
              >
                Calculate My Score
              </button>
            )}
          </div>
        </>
      )}
      
      {showEmailForm && !finalScore && (
        <div className="text-center">
          <h2 className="young-serif text-xl sm:text-2xl md:text-3xl mb-6" style={{ color: '#5d4037' }}>
            Your Score is Ready!
          </h2>
          
          <p className="poppins-light mb-8" style={{ 
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: '#5d4037',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Enter your email to view your consciousness level and receive additional insights.
          </p>
          
          <form onSubmit={handleSubmitScore} className="max-w-md mx-auto text-left">
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 poppins-medium text-[#5d4037]">
                Your Name <span className="text-[#9c6644]/60">(optional)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#d3cec4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c6644]"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-left mb-2 poppins-medium text-[#5d4037]">
                Your Email Address <span className="text-[#d15959]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c6644] ${
                  formTouched.email && formErrors.email ? 'border-[#d15959]' : 'border-[#d3cec4]'
                }`}
                placeholder="Enter your email"
                required
              />
              {formTouched.email && formErrors.email && (
                <p className="mt-1 text-[#d15959] text-sm">{formErrors.email}</p>
              )}
            </div>
            
            {submitError && (
              <div className="mb-4 p-3 bg-[#ffebee] text-[#d32f2f] rounded-md">
                {submitError}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#9c6644] focus:ring-offset-2 ${
                  isSubmitting || !isFormValid() 
                    ? 'bg-[#d3cec4] text-white cursor-not-allowed' 
                    : 'bg-[#9c6644] text-white hover:bg-[#875839] cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'View My Results'}
              </button>
              
              {/* <button
                type="button"
                onClick={skipEmailCollection}
                className="py-3 px-6 border border-[#9c6644] text-[#9c6644] rounded-md hover:bg-[#f8f5f0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9c6644] focus:ring-offset-2"
              >
                Skip & View Results
              </button> */}

            </div>
            
            <p className="mt-4 text-xs text-[#7d7d7d] max-w-sm mx-auto">
              By submitting, you agree to receive occasional insights about consciousness. 
              We respect your privacy and will never share your information with third parties.
            </p>
          </form>
        </div>
      )}
      
      {finalScore && (
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
          
          {submitSuccess && (
            <div className="mb-6 p-3 bg-[#e8f5e9] text-[#2e7d32] rounded-md max-w-md mx-auto">
              Thank you for submitting your information! We've sent additional insights to your email.
            </div>
          )}
          
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