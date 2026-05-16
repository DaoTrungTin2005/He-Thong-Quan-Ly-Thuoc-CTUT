import { useState, useEffect } from "react";

const BASE_WIDTH = 1920;

export function useViewportScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function calcScale() {
      const s = window.innerWidth / BASE_WIDTH;
      setScale(Math.min(1, Math.max(0.4, s)));
    }
    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, []);

  return scale;
}
