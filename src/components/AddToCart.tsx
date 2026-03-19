import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingBag, Check, Sparkles } from "lucide-react";
import earbudSingle from "@/assets/earbud-single.png";

interface AddToCartProps {
  onOpenCart: () => void;
}

const AddToCart = ({ onOpenCart }: AddToCartProps) => {
  const [added, setAdded] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    const p = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i, x: (Math.random() - 0.5) * 180, y: -(Math.random() * 120 + 40),
    }));
    setParticles(p);
    setTimeout(() => setParticles([]), 900);
    setTimeout(() => onOpenCart(), 500);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section className="section-spacing">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neumorphic-box p-8 sm:p-12 md:p-14"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-28 h-28 sm:w-40 sm:h-40 flex-shrink-0">
              <img src={earbudSingle} alt="AURA Pro earbud" className="w-full h-full object-contain animate-float" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 font-body">Limited Edition</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold chrome-text mb-3">AURA Pro</h2>
              <div className="flex items-baseline gap-2.5 justify-center md:justify-start mb-2">
                <span className="text-3xl sm:text-4xl font-heading font-bold chrome-text">$349.99</span>
                <span className="text-sm text-muted-foreground line-through">$449.99</span>
              </div>
              <div className="flex items-center gap-2 mb-7 justify-center md:justify-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-xs text-muted-foreground font-body">Only 23 left in stock</span>
              </div>

              <div className="relative inline-block">
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-10 py-4 text-sm sm:text-base font-heading font-semibold rounded-xl overflow-hidden transition-all duration-500 ${
                    added ? "bg-primary/80 text-primary-foreground" : "btn-cta"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="done" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Check className="w-5 h-5" /> Added
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 8 }} className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.div key={p.id} initial={{ opacity: 1, x: 0, y: 0 }} animate={{ opacity: 0, x: p.x, y: p.y }} transition={{ duration: 0.7 }} className="absolute top-1/2 left-1/2 pointer-events-none">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AddToCart;
