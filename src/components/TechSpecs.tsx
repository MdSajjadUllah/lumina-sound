import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Battery, Wifi, Shield, Mic, Droplets, Cpu, Headphones, Zap } from "lucide-react";

const specs = [
  {
    icon: Headphones, title: "Audio",
    items: [
      { label: "Driver", value: "12mm Titanium Planar Magnetic" },
      { label: "Frequency Response", value: "5Hz — 40kHz" },
      { label: "Impedance", value: "32Ω" },
      { label: "Codec Support", value: "LDAC, aptX Adaptive, AAC, SBC" },
      { label: "Spatial Audio", value: "Head-tracked Dolby Atmos" },
    ],
  },
  {
    icon: Shield, title: "Noise Cancellation",
    items: [
      { label: "ANC Type", value: "Hybrid Feedforward + Feedback" },
      { label: "Reduction", value: "Up to 48dB / 99.7%" },
      { label: "Modes", value: "Adaptive, Transport, Focus, Transparency" },
      { label: "Mics for ANC", value: "6 MEMS + 1 Bone Conduction" },
    ],
  },
  {
    icon: Battery, title: "Battery & Charging",
    items: [
      { label: "Earbuds Battery", value: "8h ANC on / 12h ANC off" },
      { label: "Case Total", value: "48 hours" },
      { label: "Quick Charge", value: "15 min = 8 hours" },
      { label: "Wireless Charging", value: "Qi2 / MagSafe compatible" },
    ],
  },
  {
    icon: Wifi, title: "Connectivity",
    items: [
      { label: "Bluetooth", value: "5.4 with LE Audio" },
      { label: "Range", value: "40m (open field)" },
      { label: "Multipoint", value: "2 devices simultaneous" },
      { label: "Latency", value: "32ms (gaming mode)" },
    ],
  },
  {
    icon: Cpu, title: "Processing",
    items: [
      { label: "Chipset", value: "AURA Neural Engine N1" },
      { label: "DSP", value: "AI-adaptive EQ + personalized HRTF" },
      { label: "Voice Assistant", value: "Hey AURA + Siri/Google/Alexa" },
    ],
  },
  {
    icon: Droplets, title: "Build & Durability",
    items: [
      { label: "Material", value: "Grade 5 Titanium + Silicone" },
      { label: "Water Rating", value: "IP68 (2m/30min)" },
      { label: "Weight", value: "4.8g per earbud" },
      { label: "Ear Tips", value: "XS/S/M/L memory foam" },
    ],
  },
];

const TechSpecs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="tech-specs" className="section-spacing">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            Full Technical Details
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Tech Specs
          </h2>
        </motion.div>

        <div className="space-y-3">
          {specs.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="neumorphic-box overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 group"
                aria-expanded={openIndex === i}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors ${
                    openIndex === i ? "bg-accent/20" : "bg-secondary"
                  }`}>
                    <section.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      openIndex === i ? "text-accent" : "text-muted-foreground"
                    }`} />
                  </div>
                  <span className="font-heading font-semibold text-sm sm:text-base text-foreground">
                    {section.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                      <div className="border-t border-border/50 pt-4 space-y-3">
                        {section.items.map((item) => (
                          <div key={item.label} className="flex items-start justify-between gap-4">
                            <span className="text-xs sm:text-sm text-muted-foreground font-body">{item.label}</span>
                            <span className="text-xs sm:text-sm text-foreground font-heading font-medium text-right">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
