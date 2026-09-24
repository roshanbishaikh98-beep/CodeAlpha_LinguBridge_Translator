import { getLanguageByCode } from '../utils/languages';

export default function HistoryPanel({ history, onClear }) {
  return (
    <section className="history" aria-label="Translation history">
      <div className="history__header">
        <h2 className="history__title">Session history</h2>
        {history.length > 0 && (
          <button type="button" className="history__clear" onClick={onClear}>
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="history__empty">Your translations from this session will show up here.</p>
      ) : (
        <ul className="history__list">
          {history.map((item) => (
            <li key={item.timestamp} className="history__item">
              <div className="history__meta">
                <span>{getLanguageByCode(item.sourceLang)?.name}</span>
                <ArrowIcon />
                <span>{getLanguageByCode(item.targetLang)?.name}</span>
                <time className="history__time">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
              <p className="history__source">{item.sourceText}</p>
              <p className="history__result">{item.translatedText}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
