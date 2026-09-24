const MAX_CHARS = 2000;

export default function TextPanel({
  heading,
  value,
  onChange,
  readOnly = false,
  placeholder = '',
  loading = false,
  onCopy,
  onSpeak,
  onClear,
  copied = false,
}) {
  const charCount = value.length;
  const nearLimit = charCount > MAX_CHARS * 0.9;

  return (
    <div className="text-panel">
      <div className="text-panel__toolbar">
        <span className="text-panel__heading">{heading}</span>
        <div className="text-panel__actions">
          {onSpeak && (
            <button
              type="button"
              className="icon-btn"
              onClick={onSpeak}
              disabled={!value.trim()}
              aria-label="Listen to text"
              title="Listen"
            >
              <SpeakerIcon />
            </button>
          )}
          {onCopy && (
            <button
              type="button"
              className="icon-btn"
              onClick={onCopy}
              disabled={!value.trim()}
              aria-label="Copy text"
              title="Copy"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          )}
          {onClear && (
            <button
              type="button"
              className="icon-btn"
              onClick={onClear}
              disabled={!value.trim()}
              aria-label="Clear text"
              title="Clear"
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </div>

      <div className="text-panel__body">
        <textarea
          className="text-panel__textarea"
          value={value}
          onChange={readOnly ? undefined : (e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={MAX_CHARS}
          aria-label={heading}
        />
        {loading && (
          <div className="text-panel__loading" role="status" aria-live="polite">
            <span className="spinner" />
            <span>Translating…</span>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className={`text-panel__counter ${nearLimit ? 'text-panel__counter--warn' : ''}`}>
          {charCount} / {MAX_CHARS}
        </div>
      )}
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 6a9 9 0 010 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
