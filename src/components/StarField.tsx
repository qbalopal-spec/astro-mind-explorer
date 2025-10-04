import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Star[] = [];
    const nebulas: Nebula[] = [];
    const starCount = 600;
    const nebulaCount = 20;

    // Star colors for variety
    const starColors = [
      'rgba(255, 255, 255,',
      'rgba(200, 220, 255,',
      'rgba(255, 230, 200,',
      'rgba(180, 200, 255,',
    ];

    // Create stars with varied properties
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }

    // Create nebula clouds for Milky Way effect
    for (let i = 0; i < nebulaCount; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 80,
        color: `hsl(${260 + Math.random() * 40}, 70%, 40%)`,
        opacity: Math.random() * 0.15 + 0.05,
        pulseSpeed: Math.random() * 0.001 + 0.0005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw Milky Way band
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(100, 80, 150, 0.05)');
      gradient.addColorStop(0.3, 'rgba(150, 120, 200, 0.15)');
      gradient.addColorStop(0.5, 'rgba(180, 150, 230, 0.2)');
      gradient.addColorStop(0.7, 'rgba(150, 120, 200, 0.15)');
      gradient.addColorStop(1, 'rgba(100, 80, 150, 0.05)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height * 0.3, canvas.width, canvas.height * 0.4);

      // Draw nebulas
      nebulas.forEach(nebula => {
        const pulse = Math.sin(time * nebula.pulseSpeed + nebula.pulsePhase) * 0.3 + 0.7;
        const nebulaGradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius * pulse
        );
        nebulaGradient.addColorStop(0, nebula.color.replace(')', `, ${nebula.opacity * pulse})`));
        nebulaGradient.addColorStop(0.5, nebula.color.replace(')', `, ${nebula.opacity * 0.5 * pulse})`));
        nebulaGradient.addColorStop(1, nebula.color.replace(')', ', 0)'));
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Slow drift
        nebula.x -= 0.05;
        if (nebula.x < -nebula.radius) {
          nebula.x = canvas.width + nebula.radius;
        }
      });

      // Draw stars
      stars.forEach(star => {
        // Twinkling effect
        star.opacity += Math.sin(time * star.twinkleSpeed) * 0.01;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        // Glow effect for brighter stars
        if (star.size > 1.5) {
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          glowGradient.addColorStop(0, star.color + `${star.opacity})`);
          glowGradient.addColorStop(0.5, star.color + `${star.opacity * 0.3})`);
          glowGradient.addColorStop(1, star.color + '0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + `${star.opacity})`;
        ctx.fill();

        // Star drift
        star.y += star.speed;
        star.x -= star.speed * 0.3;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        if (star.x < 0) {
          star.x = canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default StarField;
