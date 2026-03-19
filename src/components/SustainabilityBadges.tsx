import { motion } from "framer-motion";
import { Brain, Leaf, Droplets, Fingerprint, Cpu, Ear } from "lucide-react";

const badges = [
  { icon: Brain, label: "AI Noise Cancel" },
  { icon: Ear, label: "Spatial Audio" },
  { icon: Cpu, label: "Neural DSP" },
  { icon: Droplets, label: "IP68 Waterproof" },
  { icon: Leaf, label: "Carbon Neutral" },
  { icon: Fingerprint, label: "Biometric Fit" },
];

const SustainabilityBadges = () => (
  <section className="py-10 sm:py-14 px-5">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="neumorphic-box px-4 py-2.5 flex items-center gap-2"
          >
            <b.icon className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] sm:text-xs font-heading font-medium text-foreground whitespace-nowrap">{b.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SustainabilityBadges;
