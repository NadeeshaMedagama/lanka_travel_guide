import { useState } from 'react';

const getErrorMessage = (err) => {
  // err.code === 1: user clicked "Block" on the browser permission prompt
  if (err.code === 1) return 'Permission denied. Use 127.0.0.1:5173 instead of localhost, then allow location when prompted.'
  // err.code === 2: device GPS unavailable (indoors, airplane mode, hardware issue)
  if (err.code === 2) return 'Location unavailable. Check your device GPS or network settings.'
  // err.code === 3: location found but timed out before returning
  if (err.code === 3) return 'Request timed out. Please try again.'
  return err.message || 'Unknown location error.'
}

/**
 * Custom hook to interact with the HTML5 Geolocation API.
 * 
 * WHAT IT IS: The HTML5 Geolocation API is a W3C browser hardware API that accesses device GPS/network positioning.
 * WHY A CUSTOM HOOK: It encapsulates 3 states (coords, error, loading) and an async flow, making it reusable across components.
 * SECURITY: User permission is required because websites cannot silently track a user's physical location.
 */
export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    // Feature detection — not all browsers/devices support it (older browsers, some headless environments)
    if (!('geolocation' in navigator)) {
      setError('Geolocation API is not supported by this browser.');
      return;
    }
    setLoading(true);
    setError(null);
    
    // asynchronous — registers callbacks, does not block the UI thread
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          // decimal degrees, WGS84 coordinate system (same as Google Maps)
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(getErrorMessage(err));
        setLoading(false);
      },
      { 
        // requests GPS chip (more accurate, more battery) vs network triangulation (faster, less accurate)
        enableHighAccuracy: true, 
        // if no response in 10 seconds, fires the error callback with err.code === 3
        timeout: 10000, 
        // do not use cached location data — always get fresh coordinates
        maximumAge: 0 
      }
    );
  };

  return { coords, error, loading, getLocation };
}
