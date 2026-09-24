import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TranslatorWorkspace from './components/TranslatorWorkspace';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';

export default function App() {
  const [history, setHistory] = useState([]);

  const handleTranslated = (entry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 25));
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <TranslatorWorkspace onTranslated={handleTranslated} />
        <HistoryPanel history={history} onClear={() => setHistory([])} />
      </main>
      <Footer />
    </div>
  );
}
