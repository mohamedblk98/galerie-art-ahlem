import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../i18n';
import '../styles/loading.css';

interface Props {
  onComplete: () => void;
}

/**
 * Full-screen loading overlay with spinning logo + progress bar.
 * Simulates loading progress from 0 → 100%, then fades out.
 */
export default function LoadingScreen({ onComplete }: Props) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    done.current = false;
    let elapsed = 0;
    const step = 20; // ms per tick
    const total = 1400; // ms total
    const increment = (step / total) * 100;

    const id = setInterval(() => {
      if (done.current) return;
      elapsed += step;
      const pct = Math.min(Math.round((elapsed / total) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(id);
        done.current = true;
        setTimeout(() => setFading(true), 250);
        setTimeout(() => onComplete(), 800);
      }
    }, step);

    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fading ? 'loading-screen--fade' : ''}`}>
      <div className="loading-screen__content">
        <img
          src="/logo.png"
          alt={t('loading')}
          className="loading-screen__logo"
        />
        <span className="loading-screen__pct">{progress}%</span>
      </div>
      <div className="loading-screen__bar">
        <div
          className="loading-screen__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
