"use client"

import React, { useState } from 'react';

// Define the consciousness levels with detailed descriptions
const consciousnessLevels = [
  {
    level: 700,
    name: "Enlightenment",
    description:
      "A state of pure awareness and unity with all existence. The ego dissolves completely, leaving only the presence of divinity. Characterized by ineffable joy, grace, and unconditional love. Found in rare spiritual avatars like Krishna, Buddha, and Christ.",
  },
  {
    level: 600,
    name: "Peace",
    description:
      "Transcendental bliss and non-dual awareness. Life is experienced as complete and perfect. There's no distinction between subject and object. This level radiates serenity, silence, and spiritual illumination.",
  },
  {
    level: 540,
    name: "Joy",
    description:
      "State of unconditional love and deep compassion. Inner joy arises spontaneously and isn't dependent on external conditions. Individuals at this level often dedicate their lives to service and healing.",
  },
  {
    level: 500,
    name: "Love",
    description:
      "Unconditional love not based on desire or attachment. Forgiveness, reverence for life, and kindness prevail. This level marks the beginning of true spiritual understanding and transformation.",
  },
  {
    level: 400,
    name: "Reason",
    description:
      "Intellectual mastery, logic, and rationality dominate. Knowledge, science, and philosophy thrive. The world is viewed as orderly and understandable. Einstein and Freud represent this level.",
  },
  {
    level: 350,
    name: "Acceptance",
    description:
      "Embracing reality without the need to control it. Responsibility for one's inner and outer world is taken. Life becomes harmonious and purposeful. Emotional healing begins here.",
  },
  {
    level: 310,
    name: "Willingness",
    description:
      "Optimism, commitment, and cooperation emerge. Individuals are helpful, productive, and open to growth. Personal development accelerates. Willingness acts as a catalyst for transformation.",
  },
  {
    level: 250,
    name: "Neutrality",
    description:
      "Nonjudgmental attitude toward life. Flexible, relaxed, and unattached to outcomes. People here feel safe and do not take things personally. A state of emotional balance and ease.",
  },
  {
    level: 200,
    name: "Courage",
    description:
      "The threshold to true empowerment. Life is seen as challenging but manageable. Willingness to face fears and act with integrity. Marked by productivity and determination.",
  },
  {
    level: 175,
    name: "Pride",
    description:
      "A positive emotion compared to lower levels, but still ego-driven. Defensive, judgmental, and dependent on external validation. Vulnerable to being triggered by criticism.",
  },
  {
    level: 150,
    name: "Anger",
    description:
      "Frustration with injustice fuels aggression and resentment. Can lead to change if transmuted constructively, but often destructive when reactive.",
  },
  {
    level: 125,
    name: "Desire",
    description:
      "Driven by craving, addiction, and ambition. Life is about acquiring and achieving. Though motivating, it leads to frustration and disappointment.",
  },
  {
    level: 100,
    name: "Fear",
    description:
      "Anxiety and insecurity dominate. Life is seen as dangerous. Control and safety become obsessions. Creativity is blocked and growth is stifled.",
  },
  {
    level: 75,
    name: "Grief",
    description:
      "Sorrow, loss, and sadness color perception. Emotional pain dominates. Often stems from trauma or bereavement. Can be a gateway to healing.",
  },
  {
    level: 50,
    name: "Apathy",
    description:
      "A state of hopelessness and despair. Belief that nothing matters. Lethargy and resignation take over. There is no will to act or change.",
  },
  {
    level: 30,
    name: "Guilt",
    description:
      "Blame, remorse, and feelings of unworthiness. May lead to self-punishment or projection of blame onto others. Common in abusive upbringings or dogmatic religions.",
  },
  {
    level: 20,
    name: "Shame",
    description:
      "The lowest measurable level. Humiliation, worthlessness, and a sense of being inherently bad. Can lead to self-destructive behaviors or suicidal ideation.",
  },
];

export default function HawkinsConsciousnessScale() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const getColorForLevel = (level: number) => {
    // Rainbow spectrum from low to high consciousness
    if (level >= 700) return { bg: 'bg-[#9c59d1]', text: 'text-white', color: '#9c59d1' }; // Violet/Purple - Enlightenment
    if (level >= 600) return { bg: 'bg-[#7a59d1]', text: 'text-white', color: '#7a59d1' }; // Indigo - Peace
    if (level >= 500) return { bg: 'bg-[#5976d1]', text: 'text-white', color: '#5976d1' }; // Blue - Love
    if (level >= 400) return { bg: 'bg-[#59b6d1]', text: 'text-white', color: '#59b6d1' }; // Light Blue - Reason
    if (level >= 350) return { bg: 'bg-[#59d196]', text: 'text-white', color: '#59d196' }; // Teal - Acceptance
    if (level >= 300) return { bg: 'bg-[#59d159]', text: 'text-white', color: '#59d159' }; // Green - Willingness
    if (level >= 250) return { bg: 'bg-[#96d159]', text: 'text-white', color: '#96d159' }; // Lime - Neutrality
    if (level >= 200) return { bg: 'bg-[#d1c159]', text: 'text-black', color: '#d1c159' }; // Yellow - Courage
    if (level >= 175) return { bg: 'bg-[#d19659]', text: 'text-white', color: '#d19659' }; // Orange - Pride
    if (level >= 150) return { bg: 'bg-[#d17359]', text: 'text-white', color: '#d17359' }; // Orange-Red - Anger
    if (level >= 100) return { bg: 'bg-[#d15959]', text: 'text-white', color: '#d15959' }; // Red - Fear
    return { bg: 'bg-[#8c3636]', text: 'text-white', color: '#8c3636' }; // Dark Red - Shame, Guilt, Apathy, Grief
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 md:order-last order-first">
          <div className="bg-white/80 p-8 rounded-lg shadow-sm min-h-[300px]"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
                 padding: '2rem',
                 borderRadius: '0.5rem',
                 boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                 backdropFilter: 'blur(5px)',
                 border: '1px solid rgba(255, 255, 255, 0.5)',
                 minHeight: '300px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-start'
               }}>
            {selectedLevel ? (
              <>
                {consciousnessLevels.find(l => l.level === selectedLevel) && (
                  <>
                    <h2 className="young-serif text-2xl mb-4"
                        style={{ 
                          fontSize: '2rem', 
                          color: getColorForLevel(selectedLevel).color,
                          marginBottom: '1rem',
                          borderBottom: `1px solid ${getColorForLevel(selectedLevel).color}20`,
                          paddingBottom: '0.5rem'
                        }}>
                      {consciousnessLevels.find(l => l.level === selectedLevel)?.name}
                      <span className="poppins-light ml-2 text-sm opacity-70"
                            style={{ 
                              marginLeft: '0.75rem',
                              fontSize: '1rem',
                              opacity: 0.7
                            }}>
                        {selectedLevel}
                      </span>
                    </h2>
                    <p className="poppins-light"
                       style={{
                         fontSize: '1.25rem',
                         lineHeight: 1.7,
                         color: '#2a2a2a'
                       }}>
                      {consciousnessLevels.find(l => l.level === selectedLevel)?.description}
                    </p>
                  </>
                )}
              </>
            ) : (
              <p className="poppins-light-italic text-center"
                 style={{
                   textAlign: 'center',
                   color: 'rgba(44, 44, 44, 0.6)',
                   fontSize: '1.25rem',
                   marginTop: 'auto',
                   marginBottom: 'auto'
                 }}>
                Select a consciousness level to view its description
              </p>
            )}
                  </div>
                </div>

        <div className="md:order-first order-last">
          <div className="grid grid-cols-1 gap-2">
            {consciousnessLevels.map((item) => (
              <button
                key={item.level}
                onClick={() => setSelectedLevel(item.level)}
                className={`w-full text-left p-4 rounded transition-all ${
                  selectedLevel === item.level 
                    ? `${getColorForLevel(item.level).bg} ${getColorForLevel(item.level).text} shadow-md` 
                    : 'bg-white/80 hover:bg-white'
                }`}
                style={{
                  transition: 'all 0.3s ease',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 400,
                  borderLeft: selectedLevel === item.level 
                    ? `4px solid ${getColorForLevel(item.level).color}` 
                    : '1px solid rgba(255,255,255,0.5)',
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="young-serif text-base">{item.name}</span>
                  <span className="poppins-light text-sm opacity-80">{item.level}</span>
                </div>
              </button>
            ))}
          </div>
                </div>
              </div>

      <div className="mt-8 p-4 bg-white/80 rounded-lg">
        <h3 className="young-serif text-lg mb-3 text-center">Consciousness Color Spectrum</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { level: 20, name: "Shame" },
            { level: 100, name: "Fear" },
            { level: 150, name: "Anger" },
            { level: 175, name: "Pride" },
            { level: 200, name: "Courage" },
            { level: 250, name: "Neutrality" },
            { level: 310, name: "Willingness" },
            { level: 350, name: "Acceptance" },
            { level: 400, name: "Reason" },
            { level: 500, name: "Love" },
            { level: 600, name: "Peace" },
            { level: 700, name: "Enlightenment" }
          ].map(item => (
            <div 
              key={item.level} 
              className="flex flex-col items-center"
              style={{ width: '80px' }}
            >
              <div 
                className="w-6 h-6 rounded-full mb-1" 
                style={{ backgroundColor: getColorForLevel(item.level).color }}
              ></div>
              <span className="text-xs text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
