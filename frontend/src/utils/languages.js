// Language codes match ISO 639-1 (MyMemory's expected format), except
// Chinese which MyMemory expects as "zh-CN".
// `speechCode` is used for the Web Speech API (SpeechSynthesis) which wants
// full BCP-47 locale tags to pick a matching voice.
export const LANGUAGES = [
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'hi', name: 'Hindi', speechCode: 'hi-IN' },
  { code: 'mr', name: 'Marathi', speechCode: 'mr-IN' },
  { code: 'ur', name: 'Urdu', speechCode: 'ur-PK' },
  { code: 'gu', name: 'Gujarati', speechCode: 'gu-IN' },
  { code: 'bn', name: 'Bengali', speechCode: 'bn-IN' },
  { code: 'ta', name: 'Tamil', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', speechCode: 'te-IN' },
  { code: 'kn', name: 'Kannada', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', speechCode: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', speechCode: 'pa-IN' },
  { code: 'fr', name: 'French', speechCode: 'fr-FR' },
  { code: 'de', name: 'German', speechCode: 'de-DE' },
  { code: 'es', name: 'Spanish', speechCode: 'es-ES' },
  { code: 'ar', name: 'Arabic', speechCode: 'ar-SA' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', speechCode: 'zh-CN' },
  { code: 'ja', name: 'Japanese', speechCode: 'ja-JP' },
];

export const getLanguageByCode = (code) => LANGUAGES.find((l) => l.code === code);
