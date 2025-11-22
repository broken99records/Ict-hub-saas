"use client";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";




export default function Home() {
  useEffect(() => {
    // --- Canvas Firefly effect ---
    const canvas = document.getElementById(
      "firefly-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx = ctxRaw as CanvasRenderingContext2D;

    let particles: Particle[] = [];
    const particleCount = 70;
    let width: number, height: number;

    function resizeCanvas() {
      const hero = document.querySelector(".hero-section") as HTMLElement;
      if (!hero) return;
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }

    class Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
        this.opacity = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3 + 0.5;
      }
      draw() {
        ctx.beginPath();
        const glowColor = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillStyle = glowColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    function initParticles() {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
    window.addEventListener("resize", initParticles);
    return () => window.removeEventListener("resize", initParticles);
  }, []);

  return (
    <>
      <Head>
        <title>Become Superhuman</title>
        <meta name="description" content="Manage your subscriptions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <canvas
        id="firefly-canvas"
        className="fixed top-0 left-0 w-full h-full z-0 opacity-80 pointer-events-none"
      />

      <section className="hero-section personal-visual-gradient  text-white relative bg-[--color-primary-bg]">
        <div className="person-visual-gradient fixed inset-0 opacity-90 z-10 mt-15 mx-auto">
          {/* Header/Nav */}

          {/* Hero Text */}
          <div className="py-16 md:py-24 lg:py-32 flex flex-col items-center text-center relative z-10">
            <div className="flex flex-col items-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                Superpowers, for your work
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light mt-4 md:mt-6 opacity-80">
                Sign up and Manage your subscription.
              </h2>
              <Link
                href="/"
                className="mt-10 md:mt-12 group flex items-center justify-center space-x-4 p-3 md:p-4 rounded-xl shadow-2xl transition-all duration-300 transform bg-[--color-button-dark] hover:bg-[#34375b] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-[--color-primary-bg] focus:ring-[--color-button-accent]"
              >
                <span className="text-lg md:text-xl font-semibold">
                  Get Superhuman
                </span>
                <span className="p-2 md:p-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg group-hover:bg-white/20 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    fill="none"
                    viewBox="0 0 20 18"
                    className="text-white"
                  >
                    <path
                      d="M10.833 3.667L16.5 9l-5.667 5.333M16.5 9H3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Person Silhouette */}
        </div>
      </section>

      <style jsx global>{`
        :root {
          --color-primary-bg: #24314c;
          --color-button-dark: #2c2f4d;
          --color-button-accent: #555f9f;
          --color-glow-purple: #6e4b85;
          --color-glow-blue: #32367a;
        }

        body {
          font-family: "Inter", sans-serif;
        }

        .person-visual-gradient {
          background: linear-gradient(
            180deg,
            #0f172a 0%,
            #1e1b4b 50%,
            #4c1d95 100%
          );
        }
      `}</style>
    </>
  );
}
