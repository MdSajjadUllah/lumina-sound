import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const colors = [
  { name: "Midnight Chrome", color: "#2a2a2a", accent: "#c0c0c0", limited: true, stock: 12 },
  { name: "Arctic Silver", color: "#b0b0b0", accent: "#e0e0e0", limited: false, stock: 45 },
  { name: "Rose Titanium", color: "#b76e79", accent: "#d4a0a0", limited: true, stock: 8 },
  { name: "Deep Ocean", color: "#1a3a5c", accent: "#4d9fff", limited: true, stock: 5 },
  { name: "Obsidian Matte", color: "#0a0a0a", accent: "#333333", limited: false, stock: 67 },
  { name: "Sunset Gold", color: "#c4954a", accent: "#e8c88a", limited: true, stock: 3 },
];

const LimitedColors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(0);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="section-spacing overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            Exclusive Collection
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Limited Edition Colors
          </h2>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-end gap-2 mb-4 px-2">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent/20 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent/20 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {colors.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedColor(i)}
              className={`flex-shrink-0 w-[200px] sm:w-[240px] snap-center cursor-pointer neumorphic-box p-5 transition-all duration-300 ${
                selectedColor === i ? "neon-glow ring-1 ring-accent/30" : ""
              }`}
            >
              {/* Color swatch */}
              <div
                className="w-full aspect-square rounded-xl mb-4 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${item.color}, ${item.accent})`,
                }}
              >
                {item.limited && (
                  <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-heading font-semibold">
                    LIMITED
                  </div>
                )}
                {/* Iridescent overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/5 to-transparent" />
              </div>

              <h4 className="font-heading font-semibold text-sm text-foreground">{item.name}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground font-body">
                  {item.stock} left
                </span>
                {item.limited && (
                  <span className="text-[10px] text-accent font-heading animate-pulse-neon">
                    • Exclusive
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LimitedColors;
