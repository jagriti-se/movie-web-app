import React from 'react';

function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-cinematic-700 bg-cinematic-800 p-12 text-center">
      <svg
        className="h-16 w-16 text-cinematic-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
      <h3 className="mt-4 text-xl font-semibold text-cinematic-50">
        {title || 'No results found'}
      </h3>
      <p className="mt-2 text-sm text-cinematic-300">
        {message || 'Try adjusting your search or filters.'}
      </p>
      {action}
    </div>
  );
}

export default EmptyState;