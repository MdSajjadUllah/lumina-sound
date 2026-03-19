import { motion } from "framer-motion";
import { Battery, Shield, Headphones, Zap } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "AI Noise Cancel",
    value: "99.7%",
    desc: "Neural engine with 50K+ sound profiles",
  },
  {
    icon: Battery,
    title: "48h Battery",
    value: "48hrs",
    desc: "15 min charge = 8 hours playback",
  },
  {
    icon: Headphones,
    title: "Spatial Audio",
    value: "360°",
    desc: "Head-tracked Dolby Atmos immersion",
  },
  {
    icon: Zap,
    title: "Ultra Low Latency",
    value: "32ms",
    desc: "Bluetooth 5.4 LE Audio gaming mode",
  },
];

const KeyHighlights = () => {
  return (
    <section id="highlights" className="section-spacing">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">
            Performance
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Why AURA Pro
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -3 }}
              className="neumorphic-box p-7 sm:p-9 group cursor-default"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <h.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl sm:text-4xl font-heading font-bold chrome-text">
                  {h.value}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-1.5">{h.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-body font-light leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;
