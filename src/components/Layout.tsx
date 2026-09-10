import { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

/**
 * Layout wrapper with loading screen on every page transition.
 */
export default function Layout() {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setShowLoading(true);
  }, [location.key]);

  const handleLoadComplete = useCallback(() => {
    setShowLoading(false);
  }, []);

  return (
    <main>
      {showLoading && (
        <LoadingScreen key={location.key} onComplete={handleLoadComplete} />
      )}
      <Outlet />
    </main>
  );
}
