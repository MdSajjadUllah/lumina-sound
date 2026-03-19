import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import heroImg from "@/assets/hero-navy.png";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[105vh] flex items-center justify-center overflow-hidden">
      {/* Navy gradient base */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #041F2A 0%, #0A3D5E 40%, #041F2A 100%)",
      }} />

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 4 === 0 ? 'w-1.5 h-1.5 bg-primary/15' : 'w-0.5 h-0.5 bg-foreground/8'}`}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -(15 + Math.random() * 30), 0],
              opacity: [0.05, 0.35, 0.05],
            }}
            transition={{ duration: 5 + Math.random() * 7, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto w-full text-center px-5">
        {/* Large centered product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: imageScale }}
          className="mb-8 sm:mb-12"
        >
          <img
            src={heroImg}
            alt="AURA Pro wireless earbuds floating in cinematic navy studio lighting with iridescent reflections"
            className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
            loading="eager"
          />
        </motion.div>

        {/* Tagline box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="neumorphic-box p-7 sm:p-10 md:p-12 max-w-xl sm:max-w-2xl mx-auto teal-glow"
          style={{ borderImage: "linear-gradient(135deg, hsl(170 100% 39% / 0.3), hsl(185 100% 50% / 0.1), transparent) 1" }}
        >
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-body"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          >
            Introducing AURA Pro
          </motion.p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05]">
            <span className="chrome-text">Elevate Your </span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Sound
            </span>
          </h1>
          <motion.p
            className="mt-5 text-sm sm:text-base text-muted-foreground max-w-sm mx-auto font-body leading-relaxed font-light"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          >
            Aerospace-grade titanium. AI noise cancellation. 48-hour battery. Crafted for those who demand perfection.
          </motion.p>
          <motion.div
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
          >
            <a href="#product" className="btn-cta px-9 py-3.5 text-sm sm:text-base inline-flex items-center justify-center">
              Experience Now
            </a>
            <a href="#highlights" className="btn-secondary px-9 py-3.5 text-sm sm:text-base inline-flex items-center justify-center">
              Discover More
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div className="mt-14 sm:mt-20" animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <div className="w-5 h-8 border border-muted-foreground/20 rounded-full mx-auto flex justify-center pt-2">
            <div className="w-0.5 h-2 bg-primary/50 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
