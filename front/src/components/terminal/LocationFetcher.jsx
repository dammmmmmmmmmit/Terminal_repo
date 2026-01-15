import { useState, useEffect } from "react";

export default function LocationFetcher() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation hardware not detected.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          
          setLocation({
            lat: latitude.toFixed(4),
            lng: longitude.toFixed(4),
            city: data.city || data.locality || "Unknown Sector",
            country: data.countryName || "Unknown Territory"
          });
        } catch (err) {
          // If the API fails, just show coordinates
          setLocation({ lat: latitude.toFixed(4), lng: longitude.toFixed(4) });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Access denied. User blocked satellite uplink.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div className="animate-pulse">Triangulating signal...</div>;
  }

  if (error) {
    return <div className="text-red-500/80">Error: {error}</div>;
  }

  return (
    <div className="mb-2">
      <div>[ SAT-LINK ESTABLISHED ]</div>
      <div className="ml-2">LAT : {location.lat}</div>
      <div className="ml-2">LNG : {location.lng}</div>
      {location.city && (
        <div className="ml-2">LOC : {location.city}, {location.country}</div>
      )}
    </div>
  );
}