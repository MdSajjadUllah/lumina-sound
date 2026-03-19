import { motion } from "framer-motion";
import { useState } from "react";

const specs = [
  { label: "Battery Life", ours: 48, competitor: 30, unit: "hrs" },
  { label: "Noise Cancellation", ours: 99.7, competitor: 92, unit: "%" },
  { label: "Driver Size", ours: 12, competitor: 11, unit: "mm" },
  { label: "Bluetooth Range", ours: 40, competitor: 15, unit: "m" },
  { label: "Weight", ours: 4.8, competitor: 5.4, unit: "g", lower: true },
  { label: "Charging Speed", ours: 15, competitor: 30, unit: "min", lower: true },
];

const SpecComparison = () => {
  const [activeTab, setActiveTab] = useState<"specs" | "compare">("specs");

  return (
    <section id="specs" className="section-spacing">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            The Numbers Speak
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Superior Specs
          </h2>
        </motion.div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-8">
          <div className="neumorphic-box p-1 flex gap-1">
            {(["specs", "compare"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-heading font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-accent text-accent-foreground neon-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "specs" ? "Specifications" : "vs Competition"}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4"
        >
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="neumorphic-box p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm sm:text-base font-heading font-medium text-foreground">
                  {spec.label}
                </span>
                <span className="text-sm sm:text-base font-heading font-bold chrome-text">
                  {spec.ours}{spec.unit}
                </span>
              </div>
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(210, 100%, 65%), hsl(210, 100%, 45%))",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${spec.lower
                      ? (spec.competitor / spec.ours) * 100
                      : (spec.ours / Math.max(spec.ours, spec.competitor) ) * 100
                    }%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
              {activeTab === "compare" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Competitor avg.</span>
                    <span className="text-xs text-muted-foreground">
                      {spec.competitor}{spec.unit}
                    </span>
                  </div>
                  <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/40"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${spec.lower
                          ? (spec.ours / spec.competitor) * 100
                          : (spec.competitor / Math.max(spec.ours, spec.competitor)) * 100
                        }%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecComparison;
