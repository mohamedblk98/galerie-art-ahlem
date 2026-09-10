import { useTranslation, type Lang } from '../i18n';
import '../styles/artists.css';

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          className={`lang-switcher__btn ${lang === code ? 'lang-switcher__btn--active' : ''}`}
          onClick={() => setLang(code)}
          aria-label={label}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
