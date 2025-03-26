"use client"

import React from 'react';
import { QUESTIONNAIRE_SECTIONS, NEGATIVELY_CORRELATED_QUESTIONS } from '../consciousness-questionnaire';

// Define the population skew function at the module level so it can be used anywhere
const applyPopulationSkew = (normalizedScore) => {
  // Base calculation with reduced power function (less extreme curve)
  const baseScore = Math.pow(normalizedScore, 2.0); // Using 2.0 as per your latest change
  
  // Apply additional skew to match population distribution, but less extreme
  if (normalizedScore < 0.4) {
    // Lower consciousness (more common)
    return 20 + (baseScore * 180 + normalizedScore * 180) / 2; // Range ~20-200
  } else if (normalizedScore < 0.7) {
    // Middle consciousness (less common)
    const linearScore = 200 + (normalizedScore - 0.4) * 500;
    const curvedScore = 200 + Math.pow(normalizedScore - 0.4, 1.1) * 300;
    return (linearScore + curvedScore) / 2; // Range ~200-400
  } else if (normalizedScore < 0.9) {
    // Higher consciousness (rare)
    const linearScore = 400 + (normalizedScore - 0.7) * 1000;
    const curvedScore = 400 + Math.pow(normalizedScore - 0.7, 1.25) * 200;
    return (linearScore + curvedScore) / 2; // Range ~400-600
  } else {
    // Highest consciousness (extremely rare)
    const linearScore = 600 + (normalizedScore - 0.9) * 1000;
    const curvedScore = 600 + Math.pow(normalizedScore - 0.9, 1.5) * 100;
    return (linearScore + curvedScore) / 2; // Range ~600-700
  }
};

// Test utility to simulate different response patterns and calculate scores
function testConsciousnessCalculation(responses) {
  console.log("=======================================");
  console.log("Input Responses:", responses);
  
  // Calculate raw scores with reversed questions
  const rawScores = Object.entries(responses).map(([key, value]) => {
    const reversed = NEGATIVELY_CORRELATED_QUESTIONS.has(key);
    const adjustedScore = reversed ? 6 - value : value;
    
    // Add emojis for better visual distinction
    const questionType = reversed ? "🔄 NEGATIVE" : "✅ POSITIVE";
    const scoreChange = reversed 
      ? `${value} → ${adjustedScore} (reversed)` 
      : `${value} (unchanged)`;
    
    console.log(`${questionType} | Question ${key}: Raw Value = ${scoreChange}`);
    return adjustedScore;
  });
  
  // Calculate total and normalized scores
  const adjustedTotal = rawScores.reduce((sum, val) => sum + val, 0);
  const maxPossible = rawScores.length * 5;
  const normalized = adjustedTotal / maxPossible;
  
  // Use the module-level applyPopulationSkew function
  const estimatedLevel = Math.round(applyPopulationSkew(normalized));
  const finalLevel = Math.min(700, estimatedLevel);
  
  // Add emojis for score summary
  console.log("\n📊 SCORE SUMMARY:");
  console.log(`📈 Adjusted Total: ${adjustedTotal} / ${maxPossible}`);
  console.log(`📉 Normalized Score (0-1): ${normalized.toFixed(4)}`);
  console.log(`🔄 Population Distribution Applied: ${finalLevel}`);
  console.log(`📊 Linear Equivalent: ${Math.round(20 + normalized * 680)}`);
  
  // Add emoji based on consciousness level
  let levelEmoji = "🟣"; // Default
  if (finalLevel < 100) levelEmoji = "🔴"; // Very low
  else if (finalLevel < 200) levelEmoji = "🟠"; // Low
  else if (finalLevel < 350) levelEmoji = "🟡"; // Medium-low
  else if (finalLevel < 500) levelEmoji = "🟢"; // Medium
  else if (finalLevel < 600) levelEmoji = "🔵"; // Medium-high
  else if (finalLevel < 700) levelEmoji = "🟣"; // High
  else levelEmoji = "⚪"; // Very high
  
  // Add population percentile estimate
  let percentile = "";
  if (finalLevel <= 20) percentile = "Bottom 0.5%";
  else if (finalLevel <= 30) percentile = "Bottom 1-2%";
  else if (finalLevel <= 50) percentile = "Bottom 5%";
  else if (finalLevel <= 75) percentile = "Bottom 10%";
  else if (finalLevel <= 100) percentile = "~15-20%";
  else if (finalLevel <= 125) percentile = "~25-30%";
  else if (finalLevel <= 150) percentile = "~30-35%";
  else if (finalLevel <= 175) percentile = "~35-40%";
  else if (finalLevel <= 200) percentile = "~40-50%";
  else if (finalLevel <= 250) percentile = "~15% (above threshold)";
  else if (finalLevel <= 310) percentile = "~8%";
  else if (finalLevel <= 350) percentile = "~4%";
  else if (finalLevel <= 400) percentile = "~3%";
  else if (finalLevel <= 500) percentile = "~0.4-0.5%";
  else if (finalLevel <= 540) percentile = "~0.04%";
  else if (finalLevel <= 600) percentile = "~0.01%";
  else percentile = "Fewer than 1 in 10 million";
  
  console.log(`${levelEmoji} FINAL CONSCIOUSNESS LEVEL: ${finalLevel} (${percentile} of population)`);
  console.log("=======================================");
  
  return finalLevel;
}

// Generate test scenarios
function runTests() {
  // Get all question keys
  const allQuestions = [];
  const sections = Object.keys(QUESTIONNAIRE_SECTIONS);
  
  sections.forEach(section => {
    const questions = QUESTIONNAIRE_SECTIONS[section];
    questions.forEach((_, index) => {
      allQuestions.push(`${section}_${index}`);
    });
  });
  
  console.log(`📋 Total questions: ${allQuestions.length}`);
  console.log(`🔄 Negative questions: ${NEGATIVELY_CORRELATED_QUESTIONS.size}`);
  console.log(`✅ Positive questions: ${allQuestions.length - NEGATIVELY_CORRELATED_QUESTIONS.size}`);
  
  // Test Scenario 1: All minimum values (1)
  console.log("\n🔴 === Testing Minimum Consciousness Profile === 🔴");
  const minResponses = {};
  allQuestions.forEach(q => minResponses[q] = 1);
  testConsciousnessCalculation(minResponses);
  
  // Test Scenario 2: All maximum values (5)
  console.log("\n⚪ === Testing Maximum Consciousness Profile === ⚪");
  const maxResponses = {};
  allQuestions.forEach(q => maxResponses[q] = 5);
  testConsciousnessCalculation(maxResponses);
  
  // Test Scenario 3: All middle values (3)
  console.log("\n🟠 === Testing Middle Consciousness Profile === 🟠");
  const midResponses = {};
  allQuestions.forEach(q => midResponses[q] = 3);
  testConsciousnessCalculation(midResponses);
  
  // Test Scenario 4: Higher values for positive questions, lower for negative
  console.log("\n🟣 === Testing Balanced Consciousness Profile === 🟣");
  const balancedResponses = {};
  allQuestions.forEach(q => {
    if (NEGATIVELY_CORRELATED_QUESTIONS.has(q)) {
      balancedResponses[q] = 1; // Low score for negative questions (will be reversed)
    } else {
      balancedResponses[q] = 5; // High score for positive questions
    }
  });
  testConsciousnessCalculation(balancedResponses);
  
  // Test Scenario 5: Random values
  console.log("\n🟡 === Testing Random Consciousness Profile === 🟡");
  const randomResponses = {};
  allQuestions.forEach(q => {
    randomResponses[q] = Math.floor(Math.random() * 5) + 1; // Random 1-5
  });
  testConsciousnessCalculation(randomResponses);
  
  // Test Scenario 6: Gradually increasing values
  console.log("\n🌈 === Testing Gradient Consciousness Profile === 🌈");
  const gradualResponses = {};
  allQuestions.forEach((q, i) => {
    // Distribute values from 1 to 5 across all questions
    const value = Math.max(1, Math.min(5, Math.ceil((i + 1) / (allQuestions.length / 5))));
    gradualResponses[q] = value;
  });
  testConsciousnessCalculation(gradualResponses);
  
  // Test Scenario 7: Simulate low consciousness profile
  console.log("\n🟠 === Testing Low Consciousness Profile === 🟠");
  const lowConsciousnessResponses = {};
  allQuestions.forEach(q => {
    if (NEGATIVELY_CORRELATED_QUESTIONS.has(q)) {
      lowConsciousnessResponses[q] = 4; // High score for negative questions
    } else {
      lowConsciousnessResponses[q] = 2; // Low score for positive questions
    }
  });
  testConsciousnessCalculation(lowConsciousnessResponses);
  
  // Test Scenario 8: Simulate high consciousness profile
  console.log("\n🟣 === Testing High Consciousness Profile === 🟣");
  const highConsciousnessResponses = {};
  allQuestions.forEach(q => {
    if (NEGATIVELY_CORRELATED_QUESTIONS.has(q)) {
      highConsciousnessResponses[q] = 1; // Low score for negative questions
    } else {
      highConsciousnessResponses[q] = 5; // High score for positive questions
    }
  });
  testConsciousnessCalculation(highConsciousnessResponses);
  
  // Test Scenario 9: Absolute Minimum Consciousness Profile
  // This test creates the worst possible response pattern to achieve the lowest score
  console.log("\n⚫ === Testing Absolute Minimum Consciousness Profile === ⚫");
  const absoluteMinResponses = {};
  allQuestions.forEach(q => {
    if (NEGATIVELY_CORRELATED_QUESTIONS.has(q)) {
      absoluteMinResponses[q] = 5; // Highest score for negative questions (will be reversed to 1)
    } else {
      absoluteMinResponses[q] = 1; // Lowest score for positive questions
    }
  });
  const lowestPossibleScore = testConsciousnessCalculation(absoluteMinResponses);
  
  console.log("\n🔍 === LOWEST POSSIBLE SCORE ANALYSIS === 🔍");
  console.log(`The absolute minimum consciousness score possible is: ${lowestPossibleScore}`);
  console.log(`This corresponds to the level of ${lowestPossibleScore <= 20 ? 'Shame' : 
    lowestPossibleScore <= 30 ? 'Guilt' : 
    lowestPossibleScore <= 50 ? 'Apathy' : 
    lowestPossibleScore <= 75 ? 'Grief' : 
    lowestPossibleScore <= 100 ? 'Fear' : 'Higher than expected'}`);
  
  // Test Scenario 10: Theoretical Minimum (all raw scores = 1)
  console.log("\n🧪 === Testing Theoretical Minimum (Raw Score Analysis) === 🧪");
  // Calculate with a normalized score of 0.2 (1 out of 5)
  const theoreticalMin = applyPopulationSkew(0.2);
  console.log(`With all responses giving raw scores of 1 (normalized = 0.2):`);
  console.log(`Theoretical minimum score: ${Math.round(theoreticalMin)}`);
  
  // Test Scenario 11: Theoretical Zero (normalized score = 0)
  console.log("\n🧪 === Testing Theoretical Zero === 🧪");
  // Calculate with a normalized score of 0
  const theoreticalZero = applyPopulationSkew(0);
  console.log(`With a normalized score of 0 (impossible in practice):`);
  console.log(`Theoretical zero score: ${Math.round(theoreticalZero)}`);
}

export default function ConsciousnessQuestionnaireTest() {
  const [testRun, setTestRun] = React.useState(false);
  const [showDistribution, setShowDistribution] = React.useState(false);
  
  const handleRunTests = () => {
    console.clear(); // Clear previous test results
    console.log("🧪 STARTING CONSCIOUSNESS QUESTIONNAIRE TESTS 🧪");
    runTests();
    setTestRun(true);
  };
  
  function renderDistributionCurve() {
    // Generate data points for the curve
    const dataPoints = [];
    for (let i = 0; i <= 100; i++) {
      const normalizedScore = i / 100;
      const consciousnessLevel = applyPopulationSkew(normalizedScore);
      dataPoints.push({ x: normalizedScore, y: consciousnessLevel });
    }
    
    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="young-serif text-lg mb-4">Consciousness Distribution Curve</h3>
        <div className="relative h-64 w-full border-l border-b border-gray-300">
          {/* Y-axis labels */}
          <div className="absolute -left-10 bottom-0 text-xs">20</div>
          <div className="absolute -left-10 bottom-1/4 text-xs">200</div>
          <div className="absolute -left-10 bottom-1/2 text-xs">400</div>
          <div className="absolute -left-10 bottom-3/4 text-xs">600</div>
          <div className="absolute -left-10 bottom-full text-xs">700</div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 text-xs">0</div>
          <div className="absolute bottom-0 left-1/4 text-xs">0.25</div>
          <div className="absolute bottom-0 left-1/2 text-xs">0.5</div>
          <div className="absolute bottom-0 left-3/4 text-xs">0.75</div>
          <div className="absolute bottom-0 left-full text-xs">1.0</div>
          
          {/* Plot the curve */}
          <svg className="absolute inset-0 h-full w-full">
            <path
              d={dataPoints.map((point, i) => {
                // Scale points to fit in the container
                const x = point.x * 100 + '%';
                const y = (1 - (point.y - 20) / 680) * 100 + '%';
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#9c6644"
              strokeWidth="2"
            />
          </svg>
          
          {/* Add reference line for linear distribution */}
          <svg className="absolute inset-0 h-full w-full">
            <path
              d="M 0% 100% L 100% 0%"
              stroke="rgba(156, 102, 68, 0.3)"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </svg>
        </div>
        <div className="mt-2 text-sm text-center text-gray-600">
          Normalized Score (0-1) vs. Consciousness Level (20-700)
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="young-serif text-xl mb-4">Consciousness Questionnaire Test</h2>
      
      <p className="poppins-light mb-6">
        This test runs various scenarios to verify the consciousness level calculation algorithm.
        Click the button below to run the tests and check the browser console for detailed results.
      </p>
      
      <div className="mb-6 p-4 bg-[#fff8e1] rounded-lg border border-[#ffe082]">
        <p className="poppins-regular text-[#5d4037]">
          <span className="poppins-semibold">Legend:</span>
        </p>
        <ul className="mt-2 space-y-1">
          <li>✅ <span className="poppins-medium">Positive questions</span> - Scores used as-is</li>
          <li>🔄 <span className="poppins-medium">Negative questions</span> - Scores reversed (6 minus value)</li>
          <li>🔴 Very low consciousness (20-100) - Bottom 20% of population</li>
          <li>🟠 Low consciousness (100-200) - ~30-50% of population</li>
          <li>🟡 Medium-low consciousness (200-350) - ~15-20% of population</li>
          <li>🟢 Medium consciousness (350-500) - ~3-4% of population</li>
          <li>🔵 High consciousness (500-600) - ~0.4% of population</li>
          <li>🟣 Very high consciousness (600-700) - ~0.01% of population</li>
          <li>⚪ Enlightened consciousness (700) - Fewer than 1 in 10 million</li>
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={handleRunTests}
          style={{
            backgroundColor: testRun ? '#7d8c6d' : '#9c6644',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            fontFamily: 'var(--font-poppins)',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            cursor: testRun ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(156, 102, 68, 0.2)'
          }}
          disabled={testRun}
        >
          {testRun ? 'Tests Completed' : 'Run Tests'}
        </button>
        
        <button 
          onClick={() => setShowDistribution(!showDistribution)}
          style={{
            backgroundColor: 'transparent',
            color: '#9c6644',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            fontFamily: 'var(--font-poppins)',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid #9c6644'
          }}
        >
          {showDistribution ? 'Hide Distribution Curve' : 'Show Distribution Curve'}
        </button>
      </div>
      
      {testRun && (
        <div className="mt-6 p-4 bg-[#f0f8ff] rounded-lg border border-[#d1e3ff]">
          <p className="poppins-regular text-[#2a5885]">
            ✅ Tests completed! Check the browser console (F12) for detailed results.
          </p>
        </div>
      )}
      
      {showDistribution && renderDistributionCurve()}
    </div>
  );
} 