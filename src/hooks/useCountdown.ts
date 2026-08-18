import { useState, useEffect } from "react";

function calc(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: String(Math.floor(diff / 864e5)).padStart(2, "0"),
    hours: String(Math.floor((diff % 864e5) / 36e5)).padStart(2, "0"),
    minutes: String(Math.floor((diff % 36e5) / 6e4)).padStart(2, "0"),
    seconds: String(Math.floor((diff % 6e4) / 1e3)).padStart(2, "0"),
  };
}

export function useCountdown(target: Date) {
  const [t, setT] = useState(() => calc(target));
  useEffect(() => {
    const iv = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(iv);
  }, [target]);
  return t;
}
