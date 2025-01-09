import React, { useEffect, useRef, useState } from "react";

const CosmicRingComponent = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ctx = null;
    let particles = [];
    let time = 0;

    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      ctx = canvas.getContext("2d");
      if (!ctx) return false;

      const size = 200;
      canvas.width = size * 2;
      canvas.height = size * 2;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(2, 2);

      return true;
    };

    const createParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const size = canvas.width / 2;
      particles = [];

      // Ring particles
      for (let i = 0; i < 150; i++) {
        const angle = (Math.PI * 2 * i) / 150;
        const radius = size * 0.35;
        particles.push({
          x: size / 2 + Math.cos(angle) * radius,
          y: size / 2 + Math.sin(angle) * radius,
          angle,
          radius,
          baseRadius: radius,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.02 + 0.01,
          hue: Math.random() < 0.5 ? 170 + Math.random() * 40 : 280 + Math.random() * 40,
          offset: Math.random() * Math.PI * 2,
          energy: Math.random(),
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvasRef.current) return;

      const size = canvasRef.current.width / 2;

      ctx.fillStyle = "rgba(0, 0, 10, 0.1)";
      ctx.fillRect(0, 0, size, size);

      // Draw background glow
      const bgGradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        size * 0.2,
        size / 2,
        size / 2,
        size * 0.5
      );
      bgGradient.addColorStop(0, "rgba(20, 0, 50, 0)");
      bgGradient.addColorStop(0.5, "rgba(30, 0, 60, 0.1)");
      bgGradient.addColorStop(1, "rgba(0, 0, 20, 0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);

      // Update and draw particles
      particles.forEach((particle) => {
        const wave = Math.sin(time * 0.05 + particle.offset) * 5;
        const wave2 = Math.cos(time * 0.03 + particle.offset) * 3;

        particle.energy += (isHovered ? 1 : 0.5 - particle.energy) * 0.1;

        const currentRadius =
          particle.baseRadius +
          wave +
          (isHovered ? Math.sin(time * 0.1 + particle.offset) * 8 : 0);

        particle.x = size / 2 + Math.cos(particle.angle) * (currentRadius + wave2);
        particle.y = size / 2 + Math.sin(particle.angle) * (currentRadius + wave);

        // Draw ring particle with plasma effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * (2 + particle.energy)
        );

        const alpha = 0.6 + particle.energy * 0.4;
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(1, "hsla(0, 0%, 0%, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * (1 + particle.energy),
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (initCanvas()) {
      createParticles();
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <button
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl transition-all duration-500" />
      <canvas
        ref={canvasRef}
        className="rounded-full cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
      />
    </button>
  );
};

export default CosmicRingComponent;
