import { LANGUAGES } from '../utils/languages';

export default function LanguageSelector({ id, label, value, onChange }) {
  return (
    <div className="lang-select">
      <label htmlFor={id} className="lang-select__label">
        {label}
      </label>
      <select
        id={id}
        className="lang-select__control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
