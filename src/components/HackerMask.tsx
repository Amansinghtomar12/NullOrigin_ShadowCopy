import React, { useState, useEffect } from "react";

export default function HackerMask() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // Check multiple filenames that the user might put in /public
    const potentialPaths = [
      "/mask.png",
      "/logo.png",
      "/hacker.png",
      "/null_origin_mask.png",
      "/mask.jpg",
      "/logo.jpg",
      "/hacker.jpg",
    ];

    const checkImage = async (path: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
      });
    };

    const findImage = async () => {
      for (const path of potentialPaths) {
        const exists = await checkImage(path);
        if (exists) {
          setImgSrc(path);
          break;
        }
      }
    };

    findImage();
  }, []);

  return (
    <div className="relative w-full max-w-[320px] md:max-w-[420px] aspect-[4/5] mx-auto select-none opacity-40 md:opacity-50 hover:opacity-85 transition-opacity duration-1000">
      {/* Glow Backing */}
      <div className="absolute inset-0 bg-red-600/5 rounded-full filter blur-3xl scale-75 animate-pulse"></div>
      
      {imgSrc ? (
        <div className="w-full h-full relative overflow-hidden border border-red-950/40 rounded flex items-center justify-center bg-black/40">
          <img
            src={imgSrc}
            alt="Null Origin CTF Mask"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255, 51, 85,0.25)] brightness-75 contrast-125"
          />
          {/* Cyber Overlay Details */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          
          {/* Scanline pattern mask over image */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-70"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)",
            }}
          ></div>

          {/* Cyber reticle corner markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-600"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-600"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-600"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-600"></div>
        </div>
      ) : (
        <svg
          viewBox="0 0 400 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255, 51, 85,0.15)]"
        >
          {/* Definitions for gradients and masking */}
          <defs>
            <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3355" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ff3355" stopOpacity="0.3" />
            </linearGradient>
            <pattern id="scanlines" width="100" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2="100" y2="2" stroke="#000000" strokeWidth="2.2" />
            </pattern>
          </defs>

          {/* The Guy Fawkes / Anonymous outline mask structure */}
          {/* Mask Head Shape */}
          <path
            d="M 100 130 C 100 70, 300 70, 300 130 C 300 220, 260 300, 240 370 C 225 415, 205 440, 200 440 C 195 440, 175 415, 160 370 C 140 300, 100 220, 100 130 Z"
            fill="url(#maskGrad)"
            stroke="#ff3355"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Highly stylized narrow eyes */}
          <path
            d="M 140 175 C 150 160, 185 165, 180 185 C 170 190, 145 185, 140 175 Z"
            fill="#111"
            stroke="#ff3355"
            strokeWidth="2"
          />
          <path
            d="M 260 175 C 250 160, 215 165, 220 185 C 230 190, 255 185, 260 175 Z"
            fill="#111"
            stroke="#ff3355"
            strokeWidth="2"
          />

          {/* Arched dramatic eyebrows */}
          <path
            d="M 130 160 Q 160 135 185 165"
            stroke="#ff3355"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 270 160 Q 240 135 215 165"
            stroke="#ff3355"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Hollow eye glint */}
          <circle cx="162" cy="177" r="2" fill="#ff3355" />
          <circle cx="238" cy="177" r="2" fill="#ff3355" />

          {/* Pointy cheeks with rouge accents */}
          <path
            d="M 115 220 Q 135 240 155 215"
            stroke="#ff3355"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 285 220 Q 265 240 245 215"
            stroke="#ff3355"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />

          {/* Long dynamic thin nose */}
          <path
            d="M 200 175 L 195 270 L 200 278 L 205 270 Z"
            fill="url(#maskGrad)"
            stroke="#ff3355"
            strokeWidth="1.5"
          />

          {/* Smiling stylized mustache */}
          <path
            d="M 150 280 C 170 290, 190 285, 200 295 C 210 285, 230 290, 250 280 Q 285 260 300 295 C 265 315, 215 315, 200 315 C 185 315, 135 315, 100 295 Q 115 260 150 280 Z"
            fill="#0c0a09"
            stroke="#ff3355"
            strokeWidth="2.5"
          />

          {/* Stylized direct smile beneath mustache */}
          <path
            d="M 170 330 Q 200 350 230 330"
            stroke="#ff3355"
            strokeWidth="2"
            fill="none"
          />

          {/* Sharp pointed goatee beard */}
          <path
            d="M 185 365 L 200 450 L 215 365 Q 200 375 185 365 Z"
            fill="#ff3355"
            stroke="#ff3355"
            strokeWidth="1.5"
            opacity="0.85"
          />

          {/* Cyber overlay elements - targeted grid lines around mask */}
          <line x1="40" y1="250" x2="110" y2="250" stroke="#ff3355" strokeWidth="0.5" strokeDasharray="3 3; 1 1" opacity="0.6"/>
          <line x1="290" y1="250" x2="360" y2="250" stroke="#ff3355" strokeWidth="0.5" strokeDasharray="3 3; 1 1" opacity="0.6"/>
          <circle cx="200" cy="50" r="4" stroke="#ff3355" strokeWidth="1" fill="none" />
          <line x1="200" y1="10" x2="200" y2="40" stroke="#ff3355" strokeWidth="1" strokeDasharray="2 2" />

          {/* Horizontal Scanline Overlay (applied over the whole mask to perfectly duplicate the scanline effect) */}
          <rect x="0" y="0" width="400" height="500" fill="url(#scanlines)" style={{ mixBlendMode: "multiply" }} />
        </svg>
      )}
    </div>
  );
}
