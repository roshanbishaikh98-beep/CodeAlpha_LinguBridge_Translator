export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__signal" aria-hidden="true">
        <svg viewBox="0 0 600 40" preserveAspectRatio="none">
          <path
            id="signalPath"
            d="M0 20 C 100 0, 200 40, 300 20 S 500 0, 600 20"
            fill="none"
            stroke="url(#signalGrad)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="signalGrad" x1="0" y1="0" x2="600" y2="0">
              <stop offset="0" stopColor="#4CC9F0" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#7B61FF" stopOpacity="0.7" />
              <stop offset="1" stopColor="#4CC9F0" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <circle r="3.5" fill="#4CC9F0" className="hero__pulse">
            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#signalPath" />
            </animateMotion>
          </circle>
        </svg>
      </div>
      <h1 className="hero__title">
        Translate. Connect. Understand.
      </h1>
      <p className="hero__subtitle">
        Translate text across 17 languages with the power of AI. Simple, fast, and easy to use.
      </p>
    </section>
  );
}
