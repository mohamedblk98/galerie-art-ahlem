import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import translations, { type Lang } from './translations';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

/** Detect initial language from localStorage or browser */
function detectLang(): Lang {
  try {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored && ['fr', 'en', 'ar'].includes(stored)) return stored;
  } catch {}
  return 'fr';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {}
    // Set dir attribute for RTL support
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  }, []);

  // Set initial dir on mount
  if (typeof document !== 'undefined') {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang] as Record<string, string>;
      return dict[key] ?? key;
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useTranslation must be used within a LangProvider');
  return ctx;
}
