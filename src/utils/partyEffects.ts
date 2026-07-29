import confetti from "canvas-confetti";

/**
 * Plays a realistic festive pop / party popper explosion sound using Web Audio API.
 * Synthesizes a crisp impact pop, pressure burst, and festive sparkle.
 */
export function playPartyPopperSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // --- 1. POP / ESTAMPIDO (Crisp impact noise & low end pulse) ---
    const bufferSize = ctx.sampleRate * 0.12; // 120ms burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Exponentially decaying white noise
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1200, now);
    noiseFilter.Q.setValueAtTime(1.5, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(120, now + 0.12);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // --- 2. PRESSURE DROP OSCILLATOR (Low impact thud) ---
    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(500, now);
    thud.frequency.exponentialRampToValueAtTime(40, now + 0.1);

    thudGain.gain.setValueAtTime(1.8, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    thud.connect(thudGain);
    thudGain.connect(ctx.destination);

    // --- 3. FESTIVE SHIMMER / SPARKLE (High metallic whistle after burst) ---
    const sparkleCount = 3;
    for (let s = 0; s < sparkleCount; s++) {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      const delay = s * 0.04;

      sparkle.type = "triangle";
      sparkle.frequency.setValueAtTime(1800 + s * 400, now + delay);
      sparkle.frequency.exponentialRampToValueAtTime(3200 + s * 500, now + delay + 0.15);

      sparkleGain.gain.setValueAtTime(0.001, now);
      sparkleGain.gain.setValueAtTime(0.2, now + delay);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);

      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);

      sparkle.start(now + delay);
      sparkle.stop(now + delay + 0.2);
    }

    noise.start(now);
    thud.start(now);
    noise.stop(now + 0.13);
    thud.stop(now + 0.11);
  } catch (err) {
    console.error("Audio synthesis error:", err);
  }
}

/**
 * Triggers a multi-stage celebration animation featuring confetti, 
 * party hats (chapeuzinhos de aniversário), poppers, ribbons and streamers!
 */
export function triggerFestiveExplosion() {
  playPartyPopperSound();

  try {
    // Custom shape emojis for party hats, poppers, ribbons
    const hatShape1 = confetti.shapeFromText({ text: "🥳", scalar: 2.5 });
    const hatShape2 = confetti.shapeFromText({ text: "🎩", scalar: 2.5 });
    const hatShape3 = confetti.shapeFromText({ text: "👑", scalar: 2.5 });
    const popperShape = confetti.shapeFromText({ text: "🎉", scalar: 2.5 });
    const streamerShape = confetti.shapeFromText({ text: "🎊", scalar: 2.5 });
    const ribbonShape = confetti.shapeFromText({ text: "🎀", scalar: 2.2 });
    const starShape = confetti.shapeFromText({ text: "✨", scalar: 2.0 });

    const celebrationColors = [
      "#38BDF8", // Sky blue
      "#F472B6", // Soft Pink
      "#FBBF24", // Gold
      "#34D399", // Emerald
      "#A78BFA", // Lavender
      "#F43F5E", // Rose
      "#FFFFFF"  // White
    ];

    // Burst 1: Cannon from Left Side
    confetti({
      particleCount: 65,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.65 },
      colors: celebrationColors,
      shapes: [hatShape1, hatShape2, streamerShape, ribbonShape, "circle", "square"],
      scalar: 1.4,
    });

    // Burst 2: Cannon from Right Side
    confetti({
      particleCount: 65,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.65 },
      colors: celebrationColors,
      shapes: [hatShape3, popperShape, streamerShape, starShape, "circle", "square"],
      scalar: 1.4,
    });

    // Burst 3: Central High-Pop (Center explosion of hats and confetti)
    setTimeout(() => {
      playPartyPopperSound();
      confetti({
        particleCount: 90,
        spread: 120,
        origin: { y: 0.5 },
        colors: celebrationColors,
        shapes: [hatShape1, hatShape2, hatShape3, popperShape, streamerShape, ribbonShape, starShape],
        scalar: 1.6,
        drift: 0,
        ticks: 250,
      });
    }, 250);

    // Burst 4: Gentle Rain of Streamers & Glitter (Falling slow)
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 90,
        spread: 160,
        origin: { y: 0.2 },
        colors: celebrationColors,
        shapes: [streamerShape, ribbonShape, starShape, "circle"],
        scalar: 1.2,
        gravity: 0.6,
        drift: 0.2,
        ticks: 300,
      });
    }, 600);
  } catch (err) {
    console.error("Confetti explosion error:", err);
  }
}
