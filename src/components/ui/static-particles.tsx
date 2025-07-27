import React from "react";
import { cn } from "@/lib/utils";

interface StaticParticlesProps {
  variant?: "divine" | "sacred" | "minimal" | "spiritual";
  density?: "low" | "medium" | "high";
  className?: string;
}

export default function StaticParticles({
  variant = "divine",
  density = "medium",
  className = "",
}: StaticParticlesProps) {
  // Generate particle count based on density
  const particleCount = {
    low: 12,
    medium: 20,
    high: 35,
  }[density];

  // Create array of particles with deterministic positions to prevent hydration mismatches
  const particles = Array.from({ length: particleCount }, (_, index) => {
    // Use predetermined static positions based on density
    const positions = density === "low" 
      ? [
          { x: 20, y: 25 }, { x: 80, y: 30 }, { x: 40, y: 70 }, { x: 60, y: 15 }, 
          { x: 15, y: 85 }, { x: 75, y: 60 }, { x: 30, y: 45 }, { x: 90, y: 75 },
          { x: 50, y: 90 }, { x: 10, y: 50 }, { x: 70, y: 20 }, { x: 35, y: 80 }
        ]
      : density === "medium"
      ? [
          { x: 25, y: 15 }, { x: 75, y: 20 }, { x: 45, y: 35 }, { x: 85, y: 45 }, 
          { x: 15, y: 55 }, { x: 65, y: 65 }, { x: 35, y: 75 }, { x: 55, y: 25 },
          { x: 95, y: 30 }, { x: 5, y: 40 }, { x: 80, y: 60 }, { x: 40, y: 10 },
          { x: 20, y: 80 }, { x: 70, y: 50 }, { x: 90, y: 70 }, { x: 10, y: 25 },
          { x: 60, y: 85 }, { x: 30, y: 45 }, { x: 85, y: 15 }, { x: 50, y: 90 }
        ]
      : [
          { x: 12, y: 18 }, { x: 88, y: 22 }, { x: 34, y: 41 }, { x: 76, y: 33 },
          { x: 23, y: 67 }, { x: 91, y: 55 }, { x: 45, y: 12 }, { x: 67, y: 88 },
          { x: 8, y: 76 }, { x: 82, y: 44 }, { x: 56, y: 29 }, { x: 29, y: 91 },
          { x: 73, y: 17 }, { x: 41, y: 83 }, { x: 95, y: 38 }, { x: 17, y: 52 },
          { x: 63, y: 71 }, { x: 39, y: 26 }, { x: 85, y: 94 }, { x: 51, y: 8 },
          { x: 24, y: 62 }, { x: 78, y: 47 }, { x: 46, y: 85 }, { x: 92, y: 31 },
          { x: 18, y: 74 }, { x: 64, y: 19 }, { x: 37, y: 56 }, { x: 81, y: 89 },
          { x: 53, y: 43 }, { x: 26, y: 77 }, { x: 89, y: 14 }, { x: 42, y: 68 },
          { x: 75, y: 92 }, { x: 31, y: 35 }, { x: 87, y: 59 }
        ];
    
    const position = positions[index % positions.length];
    
    return {
      id: index,
      x: position.x,
      y: position.y,
      size: 1 + (index % 3), // Deterministic size variation
      opacity: 0.3 + (index % 4) * 0.15, // Deterministic opacity 0.3-0.75
      duration: 3 + (index % 5), // Deterministic duration 3-7 seconds
      delay: (index * 0.4) % 6, // Deterministic delay 0-6 seconds
    };
  });

  // Variant-specific configurations
  const variantConfig = {
    divine: {
      colors: ["bg-yellow-400", "bg-purple-400", "bg-blue-400", "bg-pink-400"],
      glowClass: "shadow-lg shadow-yellow-400/20",
      animationClass: "animate-float-divine",
    },
    sacred: {
      colors: ["bg-blue-400", "bg-indigo-400", "bg-purple-400"],
      glowClass: "shadow-lg shadow-blue-400/20",
      animationClass: "animate-float-sacred",
    },
    minimal: {
      colors: ["bg-gray-300", "bg-white", "bg-gray-400"],
      glowClass: "shadow-sm shadow-white/10",
      animationClass: "animate-float-minimal",
    },
    spiritual: {
      colors: ["bg-green-400", "bg-teal-400", "bg-emerald-400"],
      glowClass: "shadow-lg shadow-green-400/20",
      animationClass: "animate-float-spiritual",
    },
  };

  const config = variantConfig[variant];

  return (
    <>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-divine {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -60px) rotate(180deg) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(-25px, -30px) rotate(270deg) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes float-sacred {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-40px) scale(1.1);
            opacity: 0.6;
          }
          66% {
            transform: translateY(-20px) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes float-minimal {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(10px, -20px) scale(1.05);
            opacity: 0.3;
          }
        }

        @keyframes float-spiritual {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.25;
          }
          25% {
            transform: translate(15px, -25px) rotate(45deg);
            opacity: 0.5;
          }
          75% {
            transform: translate(-15px, -45px) rotate(-45deg);
            opacity: 0.4;
          }
        }

        .animate-float-divine {
          animation: float-divine var(--duration, 20s) infinite ease-in-out;
        }
        .animate-float-sacred {
          animation: float-sacred var(--duration, 18s) infinite ease-in-out;
        }
        .animate-float-minimal {
          animation: float-minimal var(--duration, 25s) infinite ease-in-out;
        }
        .animate-float-spiritual {
          animation: float-spiritual var(--duration, 22s) infinite ease-in-out;
        }
      `}</style>

      {/* Particle Container */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden",
          className,
        )}
        aria-hidden="true"
      >
        {/* Background Gradient Overlay for depth */}
        <div
          className={cn("absolute inset-0 opacity-20", {
            "bg-gradient-radial from-yellow-400/5 via-transparent to-purple-400/5":
              variant === "divine",
            "bg-gradient-radial from-blue-400/5 via-transparent to-indigo-400/5":
              variant === "sacred",
            "bg-gradient-radial from-gray-300/3 via-transparent to-white/3":
              variant === "minimal",
            "bg-gradient-radial from-green-400/5 via-transparent to-teal-400/5":
              variant === "spiritual",
          })}
        />

        {/* Animated Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={cn(
              "absolute rounded-full blur-sm",
              config.colors[particle.id % config.colors.length],
              config.glowClass,
              config.animationClass,
            )}
            style={
              {
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animationDelay: `${particle.delay}s`,
                "--duration": `${particle.duration}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Large floating orbs for visual interest */}
        {density !== "low" && (
          <>
            <div
              className={cn(
                "absolute w-24 h-24 rounded-full blur-xl opacity-10",
                config.colors[0],
                "animate-pulse",
              )}
              style={{
                left: "10%",
                top: "20%",
                animationDuration: "8s",
              }}
            />
            <div
              className={cn(
                "absolute w-32 h-32 rounded-full blur-2xl opacity-5",
                config.colors[1],
                "animate-pulse",
              )}
              style={{
                right: "15%",
                bottom: "25%",
                animationDuration: "12s",
                animationDelay: "4s",
              }}
            />
          </>
        )}

        {/* Subtle sparkle effects */}
        {variant === "divine" && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => {
              // Use predetermined static positions for sparkles
              const sparklePositions = [
                { left: 20, top: 30, delay: 0 },
                { left: 80, top: 15, delay: 1.2 },
                { left: 45, top: 70, delay: 2.4 },
                { left: 90, top: 55, delay: 3.6 },
                { left: 10, top: 85, delay: 4.8 },
                { left: 65, top: 25, delay: 6.0 },
                { left: 35, top: 60, delay: 7.2 },
                { left: 75, top: 40, delay: 8.4 },
              ];
              const sparkle = sparklePositions[i];
              
              return (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                  style={{
                    left: `${sparkle.left}%`,
                    top: `${sparkle.top}%`,
                    animationDelay: `${sparkle.delay}s`,
                    animationDuration: "2s",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
