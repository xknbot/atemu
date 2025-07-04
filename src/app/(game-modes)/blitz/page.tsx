'use client';

import React from 'react';

export default function BlitzPage() {
  return (
    <main className="game-container">
      <div className="container">
        <div className="game-section">
          <h1 className="text-4xl font-heading font-bold text-center mb-8">
            Blitz Mode
          </h1>
          <div className="text-center text-text-secondary">
            <p className="text-lg mb-4">
              Fast-paced automated trading game mode.
            </p>
            <p className="mb-8">
              Compete with other players in real-time trading battles!
            </p>
            <div className="glass p-6 rounded-card max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
              <p className="text-sm text-text-tertiary">
                This game mode is currently in development. 
                Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}