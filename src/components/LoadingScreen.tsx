import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../i18n';
import '../styles/loading.css';

interface Props {
  onComplete: () => void;
}

/**
 * Full-screen cinematic loading overlay.
 * Opening: gold curtains slide in + content reveals with zoom/blur.
 * Closing: content lifts away, then the two gold panels split apart
 * like theater curtains to reveal the site.
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
    const total = 1500; // ms total — long enough for the show, short enough for navigation
    void step; void total;

    const id = setInterval(() => {
      if (done.current) return;
      elapsed += step;
      const pct = Math.min(Math.round((elapsed / total) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(id);
        done.current = true;
        // Let the "100%" + bar glow register, then open the curtains
        setTimeout(() => setFading(true), 400);
        // Curtain choreography finishes ~1.45s after fading starts
        setTimeout(() => onComplete(), 1750);
      }
    }, step);

    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div
      className={`loading-screen ${fading ? 'loading-screen--fade' : ''}`}
      aria-hidden={fading}
    >
      <div className="loading-screen__content">
        <img
          src="/logo.png"
          alt={t('loading')}
          className="loading-screen__logo"
        />
        <span className="loading-screen__pct">
          {progress}
          <span className="loading-screen__pct-sign">%</span>
        </span>
        <span className="loading-screen__tag">{t('loading')}</span>
      </div>
      <div className="loading-screen__bar">
        <div
          className="loading-screen__fill"
          style={{ width: `${progress}%` }}
        />
        <div className="loading-screen__bar-glow" style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
}
