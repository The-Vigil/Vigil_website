import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  baseRadius: number;
  size: number;
  speed: number;
  hue: number;
  offset: number;
  energy: number;
  type?: string;
  alpha?: number;
}

interface CosmicRingComponentProps {
  className?: string;
}

const CosmicRingComponent: React.FC<CosmicRingComponentProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]); // Store particles here
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<number>(100); // Track canvas size

  // Function to determine the canvas size based on the screen width
  const getCanvasSize = (): number => {
    const screenWidth = window.innerWidth;
    return screenWidth < 600 ? 60 : 100; // For mobile devices, reduce canvas size
  };

  useEffect(() => {
    let ctx: CanvasRenderingContext2D | null = null;
    let time = 0;

    // Initialize the canvas and set its size
    const initCanvas = (): boolean => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      ctx = canvas.getContext('2d');
      if (!ctx) return false;

      const size = getCanvasSize();
      canvas.width = size * 2;
      canvas.height = size * 2;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(2, 2); // Double the scale for better resolution

      return true;
    };

    // Create the particles for the cosmic ring and nebula
    const createParticles = (): void => {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) return;

      const size = canvas.width / 2;
      const particles = []; // Local particles array

      // Create ring particles
      for (let i = 0; i < 200; i++) {
        const angle = (Math.PI * 2 * i) / 200;
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

      // Create nebula particles
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * size * 0.4 + size * 0.2;
        particles.push({
          x: size / 2 + Math.cos(angle) * radius,
          y: size / 2 + Math.sin(angle) * radius,
          angle,
          radius,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.005 + 0.002,
          hue: Math.random() < 0.5 ? 180 + Math.random() * 40 : 290 + Math.random() * 40,
          alpha: Math.random() * 0.5,
          type: 'nebula',
          baseRadius: radius,
          offset: Math.random() * Math.PI * 2,
          energy: Math.random(),
        });
      }

      // Assign particles to the ref
      particlesRef.current = particles;
    };

    // Animate the particles and the cosmic ring
    const animate = (): void => {
      if (!ctx || !canvasRef.current) return;

      const size = canvasRef.current.width / 2;

      // Clear the canvas
      ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
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
      bgGradient.addColorStop(0, 'rgba(20, 0, 50, 0)');
      bgGradient.addColorStop(0.5, 'rgba(30, 0, 60, 0.1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 20, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        if (particle.type === 'nebula') {
          particle.angle += particle.speed;
          particle.x = size / 2 + Math.cos(particle.angle) * particle.radius;
          particle.y = size / 2 + Math.sin(particle.angle) * particle.radius;

          const gradient = ctx!.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`);
          gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

          ctx!.fillStyle = gradient;
          ctx!.beginPath();
          ctx!.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          const wave = Math.sin(time * 0.05 + particle.offset) * 5;
          const wave2 = Math.cos(time * 0.03 + particle.offset) * 3;

          particle.energy += (isHovered ? 1 : 0.5 - particle.energy) * 0.1;

          const currentRadius =
            particle.baseRadius +
            wave +
            (isHovered ? Math.sin(time * 0.1 + particle.offset) * 8 : 0);

          particle.x = size / 2 + Math.cos(particle.angle) * (currentRadius + wave2);
          particle.y = size / 2 + Math.sin(particle.angle) * (currentRadius + wave);

          const gradient = ctx!.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * (2 + particle.energy)
          );

          const alpha = 0.6 + particle.energy * 0.4;
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha})`);
          gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

          ctx!.fillStyle = gradient;
          ctx!.beginPath();
          ctx!.arc(
            particle.x,
            particle.y,
            particle.size * (1 + particle.energy),
            0,
            Math.PI * 2
          );
          ctx!.fill();
        }
      });

      // Draw outer glow ring
      const ringGradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        size * 0.3,
        size / 2,
        size / 2,
        size * 0.4
      );
      ringGradient.addColorStop(0, `hsla(200, 100%, 70%, ${0.1 + Math.sin(time * 0.05) * 0.05})`);
      ringGradient.addColorStop(0.5, `hsla(280, 100%, 70%, ${0.2 + Math.sin(time * 0.03) * 0.05})`);
      ringGradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (initCanvas()) {
      createParticles();
      animate();
    }

    // Add resize event listener to update canvas size
    const handleResize = () => {
      setCanvasSize(getCanvasSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered, canvasSize]);

  return (
    <button
      className={`relative ${className || ''}`}
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
