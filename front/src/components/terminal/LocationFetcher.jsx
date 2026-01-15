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
          // 📡 Using OpenStreetMap (Nominatim) for street-level details
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          
          // Extract specific details
          const address = data.address || {};
          const street = address.road || address.pedestrian || "";
          const area = address.suburb || address.neighbourhood || address.residential || "";
          const city = address.city || address.town || address.village || "";
          const zip = address.postcode || "";

          // Construct a detailed location string
          const detailedLoc = [street, area, city, zip].filter(Boolean).join(", ");

          setLocation({
            lat: latitude.toFixed(6), // Higher precision coords
            lng: longitude.toFixed(6),
            fullAddress: detailedLoc || data.display_name, // Fallback to full string
          });
        } catch (err) {
          setLocation({ lat: latitude.toFixed(6), lng: longitude.toFixed(6) });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Access denied. Target is using VPN.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  if (loading) {
    return <div className="animate-pulse text-yellow-500">Triangulating signal [||||||....]</div>;
  }

  if (error) {
    return <div className="text-red-500/80">Error: {error}</div>;
  }

  return (
    <div className="mb-2">
      <div className="opacity-50 text-xs">[ SAT-LINK ESTABLISHED ]</div>
      <div className="flex gap-4 text-xs opacity-75 mb-2">
         <span>LAT: {location.lat}</span>
         <span>LNG: {location.lng}</span>
      </div>
      
      {location.fullAddress && (
        <div className="mt-2 border-l-2 border-red-500 pl-3">
           <span className="text-red-500 font-bold animate-pulse">
             I know where you live ... 
           </span>
           <br />
           <span className="text-red-400 max-w-md block"> 
                >> {location.fullAddress}
           </span>
        </div>
      )}
    </div>
  );
}