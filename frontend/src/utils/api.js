// Thin wrapper around the backend translation endpoint.
// The browser never talks to the translation provider directly, and never
// sees any API key — it only ever calls our own /api/translate route.
export async function translateText({ text, source, target }) {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, source, target }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('Received an unexpected response from the server.');
  }

  if (!response.ok || !payload.success) {
    throw new Error(payload.error || 'Translation failed. Please try again.');
  }

  return payload.translatedText;
}
