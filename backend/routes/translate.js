const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SUPPORTED_CODES = new Set([
  'en', 'hi', 'mr', 'ur', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa',
  'fr', 'de', 'es', 'ar', 'zh-CN', 'ja',
]);

const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  ur: 'Urdu',
  gu: 'Gujarati',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  ar: 'Arabic',
  'zh-CN': 'Chinese (Simplified)',
  ja: 'Japanese',
};

router.post('/', async (req, res) => {
  try {
    const { text, source, target } = req.body || {};

    if (typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter some text to translate.',
      });
    }

    if (text.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Text is too long. Please keep it under 2000 characters.',
      });
    }

    if (
      !SUPPORTED_CODES.has(source) ||
      !SUPPORTED_CODES.has(target)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Unsupported source or target language.',
      });
    }

    if (source === target) {
      return res.json({
        success: true,
        translatedText: text,
        matchQuality: null,
      });
    }

    const sourceLanguage = LANGUAGE_NAMES[source];
    const targetLanguage = LANGUAGE_NAMES[target];

    const prompt = `
Translate the following text from ${sourceLanguage} to ${targetLanguage}.

IMPORTANT RULES:
- Return ONLY the translated text.
- Do not explain the translation.
- Do not add quotation marks.
- Preserve the original meaning exactly.
- Do not change dates, numbers, names, or facts.
- Use natural and grammatically correct ${targetLanguage}.
- Do not invent information.

Text:
${text}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const translated = response.text?.trim();

    if (!translated) {
      return res.status(502).json({
        success: false,
        error: 'Gemini returned an empty translation.',
      });
    }

    return res.json({
      success: true,
      translatedText: translated,
      matchQuality: null,
    });

  } catch (error) {
    console.error('Gemini translation error:', error);

    return res.status(500).json({
      success: false,
      error: 'Translation failed. Please try again.',
    });
  }
});

module.exports = router;