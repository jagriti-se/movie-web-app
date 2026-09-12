import React from 'react';

function LoadingSkeleton({ rows = 4, columns = 5 }) {
  return (
    <div className="space-y-6" aria-label="Loading">
      <div className="h-8 w-48 rounded bg-cinematic-700" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: rows * columns }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] rounded-lg bg-cinematic-700" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-3/4 rounded bg-cinematic-700" />
              <div className="h-3 w-1/2 rounded bg-cinematic-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;