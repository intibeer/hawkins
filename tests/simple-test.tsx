"use client"

import React from 'react';

export default function SimpleTest() {
  return (
    <div>
      <h2>Simple Test Component</h2>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{
          backgroundColor: '#9c6644',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  );
} 