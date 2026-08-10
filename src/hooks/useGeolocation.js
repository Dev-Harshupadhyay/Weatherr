import { useCallback, useState } from 'react';

export function useGeolocation() {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const locate = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const msg = 'Geolocation is not supported in this browser.';
        setGeoError(msg);
        reject(new Error(msg));
        return;
      }
      setLocating(true);
      setGeoError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocating(false);
          resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        (err) => {
          setLocating(false);
          setGeoError(err.message || 'Unable to retrieve your location.');
          reject(err);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, []);

  return { locate, locating, geoError };
}
