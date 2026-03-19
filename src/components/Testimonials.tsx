import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  { name: "Alex Chen", role: "Audio Engineer", text: "The spatial audio is unreal. AURA Pro is in a different class entirely.", rating: 5 },
  { name: "Sarah Mitchell", role: "Marathon Runner", text: "48 hours of battery and completely waterproof. Survived a monsoon.", rating: 5 },
  { name: "David Park", role: "Tech Reviewer", text: "The noise cancellation adapts instantly. Best ANC I've ever tested.", rating: 5 },
];

const Testimonials = () => {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-spacing-sm">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">Reviews</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold chrome-text">What They Say</h2>
        </motion.div>

        <div className="neumorphic-box p-8 sm:p-12 relative overflow-hidden min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div key={cur} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }} className="text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[cur].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-sm sm:text-lg text-foreground font-body leading-relaxed mb-5 max-w-xl mx-auto font-light">
                "{testimonials[cur].text}"
              </blockquote>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-heading font-semibold text-foreground">{testimonials[cur].name}</span>
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">· {testimonials[cur].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCur(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === cur ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/25"}`} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
