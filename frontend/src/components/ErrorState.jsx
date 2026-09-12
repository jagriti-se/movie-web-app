import React from 'react';

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-cinematic-700 bg-cinematic-800 p-8 text-center">
      <svg
        className="h-12 w-12 text-accent-ember"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <h3 className="mt-4 text-lg font-semibold text-cinematic-50">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm text-cinematic-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-accent-gold px-6 py-2 text-sm font-semibold text-cinematic-950 transition-colors hover:bg-accent-ember focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-cinematic-950"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;