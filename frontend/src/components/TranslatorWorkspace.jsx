import { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import TextPanel from './TextPanel';
import { getLanguageByCode } from '../utils/languages';
import { translateText } from '../utils/api';

export default function TranslatorWorkspace({ onTranslated }) {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    setError('');
    setCopied(false);

    if (!sourceText.trim()) {
      setError('Please enter some text before translating.');
      return;
    }

    if (sourceLang === targetLang) {
      setError(
        'Source and target languages are the same — pick a different target language.'
      );
      return;
    }

    setLoading(true);

    try {
      const result = await translateText({
        text: sourceText,
        source: sourceLang,
        target: targetLang,
      });

      setTranslatedText(result);

      onTranslated?.({
        sourceLang,
        targetLang,
        sourceText,
        translatedText: result,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(
        err.message ||
          'Translation failed. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setError('');
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setError('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setError('Could not copy to clipboard. Please copy manually.');
    }
  };

  const handleSpeak = () => {
    if (!translatedText.trim()) {
      setError('There is no translated text to speak.');
      return;
    }

    if (!('speechSynthesis' in window)) {
      setError('Text-to-speech is not supported in this browser.');
      return;
    }

    const lang = getLanguageByCode(targetLang);
    const speechCode = lang?.speechCode || 'en-US';

    const speakText = () => {
      const voices = window.speechSynthesis.getVoices();

      // Find exact voice for selected language
      const selectedVoice = voices.find(
        (voice) =>
          voice.lang.toLowerCase() === speechCode.toLowerCase()
      );

      // Do not use another language's voice
      if (!selectedVoice) {
        setError(
          `Voice is not available for ${
            lang?.name || targetLang
          } on this device.`
        );
        return;
      }

      const utterance = new SpeechSynthesisUtterance(translatedText);

      utterance.lang = speechCode;
      utterance.voice = selectedVoice;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setError('');
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', event);

        setError(
          `Could not speak this language. Speech error: ${
            event.error || 'unknown error'
          }`
        );
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();

    // Chrome may load voices after the page loads
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakText();
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      speakText();
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <section className="workspace" aria-label="Translation workspace">
      <div className="workspace__controls">
        <LanguageSelector
          id="source-lang"
          label="From"
          value={sourceLang}
          onChange={setSourceLang}
        />

        <button
          type="button"
          className="swap-btn"
          onClick={handleSwap}
          aria-label="Swap languages"
          title="Swap languages"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <LanguageSelector
          id="target-lang"
          label="To"
          value={targetLang}
          onChange={setTargetLang}
        />
      </div>

      <div
        className="workspace__panels"
        onKeyDown={handleKeyDown}
      >
        <TextPanel
          heading={getLanguageByCode(sourceLang)?.name}
          value={sourceText}
          onChange={setSourceText}
          placeholder="Type or paste text here…"
          onClear={handleClear}
        />

        <TextPanel
          heading={getLanguageByCode(targetLang)?.name}
          value={translatedText}
          readOnly
          loading={loading}
          placeholder="Translation will appear here."
          onCopy={handleCopy}
          onSpeak={handleSpeak}
          copied={copied}
        />
      </div>

      {error && (
        <p className="workspace__error" role="alert">
          {error}
        </p>
      )}

      <div className="workspace__footer">
        <span className="workspace__hint">
          Tip: Ctrl / ⌘ + Enter to translate
        </span>

        <button
          type="button"
          className="translate-btn"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? 'Translating…' : 'Translate'}
        </button>
      </div>
    </section>
  );
}