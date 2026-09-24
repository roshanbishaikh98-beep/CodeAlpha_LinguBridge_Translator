export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <circle cx="16" cy="16" r="14" fill="none" stroke="url(#brandGrad)" strokeWidth="2" />
              <path d="M8 16h16M16 8v16" stroke="url(#brandGrad)" strokeWidth="1.4" opacity="0.6" />
              <circle cx="16" cy="16" r="3" fill="url(#brandGrad)" />
              <defs>
                <linearGradient id="brandGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0" stopColor="#4CC9F0" />
                  <stop offset="1" stopColor="#7B61FF" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand__text">LinguBridge</span>
        </div>
        <p className="header__tagline">AI Language Translation Tool · CodeAlpha Internship Project</p>
      </div>
    </header>
  );
}
