"use client"; // Mark this as a Client Component

import { useState, useEffect } from 'react';

const Offlineindication = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    setOnline(navigator.onLine); // Set initial state

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center p-2">
      You are offline. Please check your internet connection.
    </div>
  );
};

export default Offlineindication;