'use client';

export default function WhatDesignMeans() {
  return (
    <section 
      className="w-full" 
      style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '64px', paddingRight: '64px' }}
    >
      <div className="flex flex-col items-center" style={{ gap: '40px', maxWidth: '927px', margin: '0 auto' }}>
        <p 
          className="text-white text-center"
          style={{
            fontWeight: 200,
            fontSize: '16px',
            lineHeight: '1.4em',
            letterSpacing: '0.02em',
          }}
        >
          What design means to me —
        </p>

        <div className="flex flex-col w-full" style={{ gap: '1px' }}>
          <h2 
            className="text-white text-center"
            style={{
              fontWeight: 500,
              fontSize: '56px',
              lineHeight: '1.2em',
              letterSpacing: '-0.1em',
            }}
          >
            Crafting simple experiences, keeping all complexity
          </h2>
          <h2 
            className="text-white text-center"
            style={{
              fontWeight: 400,
              fontSize: '56px',
              lineHeight: '1.2em',
              letterSpacing: '-0.1em',
              textShadow: '0 0 1px #ED5C4E, 0 0 1px #ED5C4E',
            }}
          >
            {' '}behind the scenes
          </h2>
        </div>
      </div>
    </section>
  );
}
