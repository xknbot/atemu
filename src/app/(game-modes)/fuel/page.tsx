'use client';

import React from 'react';

export default function FuelPage() {
  return (
    <main className="game-container">
      <div className="container">
        <div className="game-section">
          <h1 className="text-4xl font-heading font-bold text-center mb-8">
            Fuel Mode
          </h1>
          <div className="text-center text-text-secondary">
            <p className="text-lg mb-4">
              Lottery-style pool game with winner selection.
            </p>
            <p className="mb-8">
              Join pools, contribute fuel, and win big prizes!
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