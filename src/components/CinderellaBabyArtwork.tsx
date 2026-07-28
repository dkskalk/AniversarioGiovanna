import React from "react";

export function CinderellaBabyArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 1000"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Background Gradients */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d0e8ff" />
          <stop offset="40%" stopColor="#a3d2ff" />
          <stop offset="100%" stopColor="#7cb9f7" />
        </linearGradient>

        <linearGradient id="castleWallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4ebdc" />
          <stop offset="50%" stopColor="#e3d4c1" />
          <stop offset="100%" stopColor="#c5b298" />
        </linearGradient>

        <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#edd8c7" />
          <stop offset="100%" stopColor="#d1b097" />
        </linearGradient>

        <linearGradient id="stairCarpet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e63956" />
          <stop offset="100%" stopColor="#a81a32" />
        </linearGradient>

        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe993" />
          <stop offset="50%" stopColor="#e0ac38" />
          <stop offset="100%" stopColor="#9e6d0a" />
        </linearGradient>

        <linearGradient id="cinderellaBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cce5ff" />
          <stop offset="50%" stopColor="#71b7ff" />
          <stop offset="100%" stopColor="#3d8ee6" />
        </linearGradient>

        <linearGradient id="skirtGlitter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eaf4ff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#9bcaff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5fa8fa" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="carriageBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b3d9ff" />
          <stop offset="50%" stopColor="#66adff" />
          <stop offset="100%" stopColor="#2b6cb0" />
        </linearGradient>

        {/* Glow & Shadow Filters */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1e293b" floodOpacity="0.35" />
        </filter>

        <filter id="sparkleGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. CASTLE BALLROOM BACKGROUND */}
      <rect width="800" height="1000" fill="url(#castleWallGrad)" />

      {/* Arched Windows to Sky */}
      <g opacity="0.85">
        <path d="M 80,100 Q 80,20 180,20 Q 280,20 280,100 L 280,450 L 80,450 Z" fill="url(#skyGrad)" />
        <path d="M 320,80 Q 320,10 400,10 Q 480,10 480,80 L 480,450 L 320,450 Z" fill="url(#skyGrad)" />
        <path d="M 520,100 Q 520,20 620,20 Q 720,20 720,100 L 720,450 L 520,450 Z" fill="url(#skyGrad)" />
      </g>

      {/* Window Frames */}
      <path
        d="M 80,100 Q 80,20 180,20 Q 280,20 280,100 L 280,450 M 180,20 L 180,450 M 80,220 L 280,220"
        stroke="#ffffff"
        strokeWidth="8"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 520,100 Q 520,20 620,20 Q 720,20 720,100 L 720,450 M 620,20 L 620,450 M 520,220 L 720,220"
        stroke="#ffffff"
        strokeWidth="8"
        fill="none"
        opacity="0.7"
      />

      {/* Grand Columns */}
      <rect x="0" y="0" width="70" height="750" fill="#f8f1e5" stroke="#d5c1a5" strokeWidth="3" />
      <rect x="280" y="0" width="40" height="750" fill="#f8f1e5" opacity="0.8" />
      <rect x="480" y="0" width="40" height="750" fill="#f8f1e5" opacity="0.8" />
      <rect x="730" y="0" width="70" height="750" fill="#f8f1e5" stroke="#d5c1a5" strokeWidth="3" />

      {/* Floor with Polish Reflection */}
      <rect x="0" y="700" width="800" height="300" fill="url(#floorGrad)" />
      <line x1="0" y1="700" x2="800" y2="700" stroke="#b89a80" strokeWidth="4" />

      {/* 2. RED CARPET STAIRS (LEFT) */}
      <g opacity="0.95">
        <path d="M 0,300 L 220,500 L 200,750 L 0,800 Z" fill="#d0bba7" />
        {/* Red Carpet Steps */}
        <path d="M 0,380 L 180,530 L 150,770 L 0,810 Z" fill="url(#stairCarpet)" />
        <path d="M 0,420 L 170,550 L 160,570 L 0,435 Z" fill="#911227" opacity="0.4" />
        <path d="M 0,500 L 160,610 L 152,630 L 0,515 Z" fill="#911227" opacity="0.4" />
        {/* Golden Balustrade */}
        <path d="M 180,480 L 220,500 L 200,750" stroke="url(#goldGrad)" strokeWidth="12" fill="none" />
      </g>

      {/* 3. CINDERELLA GOLDEN CARRIAGE (RIGHT) */}
      <g transform="translate(540, 220)" filter="url(#softShadow)">
        {/* Wheels */}
        <circle cx="40" cy="300" r="65" fill="none" stroke="url(#goldGrad)" strokeWidth="10" />
        <circle cx="40" cy="300" r="12" fill="url(#goldGrad)" />
        <path d="M 40,235 L 40,365 M -25,300 L 105,300 M -6,254 L 86,346 M -6,346 L 86,254" stroke="url(#goldGrad)" strokeWidth="4" />

        <circle cx="190" cy="300" r="65" fill="none" stroke="url(#goldGrad)" strokeWidth="10" />
        <circle cx="190" cy="300" r="12" fill="url(#goldGrad)" />
        <path d="M 190,235 L 190,365 M 125,300 L 255,300" stroke="url(#goldGrad)" strokeWidth="4" />

        {/* Carriage Body (Pumpkin Shape) */}
        <circle cx="115" cy="200" r="110" fill="url(#carriageBlue)" stroke="url(#goldGrad)" strokeWidth="12" />
        <ellipse cx="115" cy="200" rx="75" ry="110" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
        <ellipse cx="115" cy="200" rx="35" ry="110" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />

        {/* Oval Window */}
        <ellipse cx="115" cy="190" rx="40" ry="50" fill="#1e3a8a" stroke="url(#goldGrad)" strokeWidth="8" />
        <ellipse cx="115" cy="190" rx="35" ry="45" fill="#dbeafe" opacity="0.3" />

        {/* Crown on Carriage Roof */}
        <path d="M 95,85 L 100,60 L 115,75 L 130,60 L 135,85 Z" fill="url(#goldGrad)" />
        <circle cx="115" cy="55" r="7" fill="#3b82f6" />
      </g>

      {/* 4. PRINCESS GIOVANNA (CENTER) */}
      <g transform="translate(400, 520)" filter="url(#softShadow)">
        
        {/* Shadows under shoes */}
        <ellipse cx="-40" cy="360" rx="45" ry="12" fill="#1e293b" opacity="0.3" />
        <ellipse cx="40" cy="360" rx="45" ry="12" fill="#1e293b" opacity="0.3" />

        {/* A. Cute Blue Pearl Sneakers */}
        <g id="shoes">
          {/* Left Shoe */}
          <path d="M -80,310 Q -85,340 -70,355 L -20,355 Q -10,340 -15,310 Z" fill="url(#cinderellaBlue)" stroke="#3b82f6" strokeWidth="2" />
          <path d="M -75,350 L -15,350" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <circle cx="-65" cy="335" r="3" fill="#ffffff" />
          <circle cx="-50" cy="335" r="3" fill="#ffffff" />
          <circle cx="-35" cy="335" r="3" fill="#ffffff" />
          {/* Pearl Ribbon Bow */}
          <circle cx="-45" cy="315" r="6" fill="#ffffff" />

          {/* Right Shoe */}
          <path d="M 15,310 Q 10,340 20,355 L 70,355 Q 85,340 80,310 Z" fill="url(#cinderellaBlue)" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 15,350 L 75,350" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <circle cx="35" cy="335" r="3" fill="#ffffff" />
          <circle cx="50" cy="335" r="3" fill="#ffffff" />
          <circle cx="65" cy="335" r="3" fill="#ffffff" />
          {/* Pearl Ribbon Bow */}
          <circle cx="45" cy="315" r="6" fill="#ffffff" />
        </g>

        {/* B. Cinderella Multi-Layer Glitter Dress */}
        <g id="dress">
          {/* Under skirt layer */}
          <path d="M -50,110 Q -180,260 -150,300 Q 0,330 150,300 Q 180,260 50,110 Z" fill="url(#cinderellaBlue)" />
          
          {/* Sparkly Tulle Outer Layers (Ruffles) */}
          <path d="M -55,120 Q -210,250 -160,290 Q 0,325 160,290 Q 210,250 55,120 Z" fill="url(#skirtGlitter)" />
          
          {/* Tiered Ruffles */}
          <path d="M -140,240 Q 0,270 140,240 Q 155,270 130,285 Q 0,315 -130,285 Q -155,270 -140,240 Z" fill="#ffffff" opacity="0.6" />
          <path d="M -120,200 Q 0,230 120,200 Q 135,225 110,240 Q 0,265 -110,240 Q -135,225 -120,200 Z" fill="#ffffff" opacity="0.5" />
          <path d="M -90,160 Q 0,185 90,160 Q 105,180 85,195 Q 0,215 -85,195 Q -105,180 -90,160 Z" fill="#ffffff" opacity="0.4" />

          {/* Waist Band & Large Center Bow */}
          <rect x="-55" y="100" width="110" height="18" fill="#60a5fa" rx="6" />
          {/* Waist Bow */}
          <path d="M -30,109 Q -50,95 -25,120 Z" fill="#3b82f6" />
          <path d="M 30,109 Q 50,95 25,120 Z" fill="#3b82f6" />
          <circle cx="0" cy="109" r="8" fill="#93c5fd" />

          {/* Bodice with Delicate Embroidery */}
          <path d="M -50,20 L -55,105 L 55,105 L 50,20 Z" fill="url(#cinderellaBlue)" />
          <path d="M -30,30 Q 0,60 30,30 M -25,50 Q 0,80 25,50 M -20,70 Q 0,95 20,70" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" />

          {/* Puff Sleeves */}
          <circle cx="-65" cy="30" r="28" fill="url(#skirtGlitter)" />
          <circle cx="65" cy="30" r="28" fill="url(#skirtGlitter)" />
        </g>

        {/* C. Cute Arms & Hands */}
        <g id="arms">
          {/* Left Arm */}
          <path d="M -70,40 Q -100,90 -85,120 Q -70,120 -60,80 Z" fill="#fcd34d" opacity="0.2" />
          <path d="M -70,40 Q -105,95 -80,125" stroke="#f3a683" strokeWidth="22" strokeLinecap="round" fill="none" />
          {/* Right Arm */}
          <path d="M 70,40 Q 105,95 80,125" stroke="#f3a683" strokeWidth="22" strokeLinecap="round" fill="none" />
        </g>

        {/* D. Baby Face & Head */}
        <g id="head">
          {/* Neck */}
          <rect x="-18" y="0" width="36" height="25" fill="#f3a683" rx="8" />

          {/* Adorable Baby Face */}
          <ellipse cx="0" cy="-45" rx="72" ry="68" fill="#f8be98" />
          {/* Chubby Cheeks */}
          <ellipse cx="-42" cy="-35" rx="18" ry="12" fill="#f43f5e" opacity="0.25" />
          <ellipse cx="42" cy="-35" rx="18" ry="12" fill="#f43f5e" opacity="0.25" />

          {/* Big Warm Brown Eyes */}
          {/* Left Eye */}
          <ellipse cx="-28" cy="-52" rx="12" ry="15" fill="#ffffff" />
          <ellipse cx="-27" cy="-51" rx="9" ry="12" fill="#3d2314" />
          <circle cx="-24" cy="-55" r="4" fill="#ffffff" />
          <path d="M -40,-66 Q -28,-72 -16,-66" stroke="#261206" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Right Eye */}
          <ellipse cx="28" cy="-52" rx="12" ry="15" fill="#ffffff" />
          <ellipse cx="27" cy="-51" rx="9" ry="12" fill="#3d2314" />
          <circle cx="30" cy="-55" r="4" fill="#ffffff" />
          <path d="M 16,-66 Q 28,-72 40,-66" stroke="#261206" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Tiny Nose */}
          <ellipse cx="0" cy="-38" rx="4" ry="3" fill="#e08a68" />

          {/* Sweet 2-Tooth Baby Smile */}
          <path d="M -22,-22 Q 0,-2 22,-22 Z" fill="#be123c" />
          {/* 2 Cute Bottom/Top Teeth */}
          <rect x="-6" y="-21" width="5" height="6" fill="#ffffff" rx="1" />
          <rect x="1" y="-21" width="5" height="6" fill="#ffffff" rx="1" />

          {/* E. Dark Curly Hair */}
          <g id="curlyHair">
            {/* Background Hair Volume */}
            <circle cx="-65" cy="-80" r="22" fill="#311a0e" />
            <circle cx="-75" cy="-55" r="20" fill="#311a0e" />
            <circle cx="-70" cy="-30" r="18" fill="#311a0e" />
            <circle cx="65" cy="-80" r="22" fill="#311a0e" />
            <circle cx="75" cy="-55" r="20" fill="#311a0e" />
            <circle cx="70" cy="-30" r="18" fill="#311a0e" />
            <circle cx="0" cy="-105" r="35" fill="#311a0e" />
            <circle cx="-35" cy="-100" r="28" fill="#311a0e" />
            <circle cx="35" cy="-100" r="28" fill="#311a0e" />

            {/* Individual Cute Curls */}
            <circle cx="-50" cy="-95" r="14" fill="#4a2a18" />
            <circle cx="-20" cy="-108" r="15" fill="#4a2a18" />
            <circle cx="20" cy="-108" r="15" fill="#4a2a18" />
            <circle cx="50" cy="-95" r="14" fill="#4a2a18" />
          </g>

          {/* F. Blue Headband with Bow and Princess Tiara Crown */}
          <g id="headbandCrown">
            {/* Satin Blue Headband Strap */}
            <path d="M -68,-65 Q 0,-115 68,-65" stroke="#3b82f6" strokeWidth="14" fill="none" strokeLinecap="round" />

            {/* Big Powder Blue Ribbon Bow on Headband */}
            <path d="M 0,-100 Q -35,-120 -5,-88 Z" fill="#60a5fa" />
            <path d="M 0,-100 Q 35,-120 5,-88 Z" fill="#60a5fa" />
            <circle cx="0" cy="-98" r="9" fill="#2563eb" />

            {/* Sparkling Princess Crown / Tiara */}
            <g transform="translate(0, -125)" filter="url(#goldGlow)">
              <path d="M -28,12 L -35,-15 L -15,-2 L 0,-28 L 15,-2 L 35,-15 L 28,12 Z" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="1.5" />
              {/* Blue Gem in Crown Center */}
              <polygon points="0,-20 -8,-10 0,0 8,-10" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
              <circle cx="-33" cy="-16" r="3" fill="#ffffff" />
              <circle cx="33" cy="-16" r="3" fill="#ffffff" />
              <circle cx="-14" cy="-3" r="2.5" fill="#ffffff" />
              <circle cx="14" cy="-3" r="2.5" fill="#ffffff" />
            </g>
          </g>
        </g>
      </g>

      {/* 5. MAGICAL FAIRY SPARKLES & STARS OVERLAY */}
      <g id="sparkles" filter="url(#sparkleGlow)" opacity="0.85">
        <path d="M 200,200 L 205,215 L 220,220 L 205,225 L 200,240 L 195,225 L 180,220 L 195,215 Z" fill="#ffffff" />
        <path d="M 600,150 L 604,162 L 616,166 L 604,170 L 600,182 L 596,170 L 584,166 L 596,162 Z" fill="#ffe28a" />
        <path d="M 120,650 L 124,660 L 134,664 L 124,668 L 120,678 L 116,668 L 106,664 L 116,660 Z" fill="#ffffff" />
        <path d="M 680,620 L 685,632 L 697,636 L 685,640 L 680,652 L 675,640 L 663,636 L 675,632 Z" fill="#93c5fd" />
        <path d="M 380,420 L 383,430 L 393,433 L 383,436 L 380,446 L 377,436 L 367,433 L 377,430 Z" fill="#ffffff" />

        {/* Little Floating Magic Lights */}
        <circle cx="250" cy="350" r="4" fill="#ffffff" opacity="0.9" />
        <circle cx="550" cy="400" r="5" fill="#fef08a" opacity="0.8" />
        <circle cx="180" cy="550" r="3" fill="#bae6fd" opacity="0.9" />
        <circle cx="620" cy="520" r="4" fill="#ffffff" opacity="0.8" />
        <circle cx="300" cy="620" r="3" fill="#fef08a" opacity="0.9" />
        <circle cx="500" cy="650" r="4" fill="#93c5fd" opacity="0.8" />
      </g>
    </svg>
  );
}
