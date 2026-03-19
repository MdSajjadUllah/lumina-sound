import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, Star } from "lucide-react";

const models = [
  {
    name: "AURA Lite",
    price: 149.99,
    badge: "",
    features: {
      driver: "10mm Dynamic",
      battery: "24h total",
      anc: "Standard ANC",
      waterproof: "IPX4",
      bluetooth: "5.3",
      spatial: false,
      wireless_charge: false,
      multipoint: false,
      material: "Polycarbonate",
    },
  },
  {
    name: "AURA Pro",
    price: 349.99,
    badge: "Best Seller",
    features: {
      driver: "12mm Titanium Planar",
      battery: "48h total",
      anc: "AI Adaptive ANC",
      waterproof: "IP68",
      bluetooth: "5.4 LE Audio",
      spatial: true,
      wireless_charge: true,
      multipoint: true,
      material: "Grade 5 Titanium",
    },
  },
  {
    name: "AURA Ultra",
    price: 549.99,
    badge: "New",
    features: {
      driver: "14mm Dual Planar",
      battery: "60h total",
      anc: "Neural ANC Pro",
      waterproof: "IP69K",
      bluetooth: "5.4 LE Audio",
      spatial: true,
      wireless_charge: true,
      multipoint: true,
      material: "Ceramic + Titanium",
    },
  },
];

const featureLabels: Record<string, string> = {
  driver: "Driver",
  battery: "Battery Life",
  anc: "Noise Cancellation",
  waterproof: "Water Resistance",
  bluetooth: "Bluetooth",
  spatial: "Spatial Audio",
  wireless_charge: "Wireless Charging",
  multipoint: "Multi-Device",
  material: "Material",
};

const CompareModels = () => {
  const [highlighted, setHighlighted] = useState(1);

  return (
    <section className="section-spacing">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            Find Your Match
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Compare Models
          </h2>
        </motion.div>

        {/* Mobile: swipeable cards */}
        <div className="sm:hidden space-y-4">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`neumorphic-box p-5 ${i === 1 ? "neon-glow ring-1 ring-accent/20" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-foreground">{model.name}</h3>
                  <span className="text-lg font-heading font-bold chrome-text">${model.price}</span>
                </div>
                {model.badge && (
                  <span className="text-[10px] bg-accent/20 text-accent px-2.5 py-1 rounded-full font-heading font-semibold">
                    {model.badge}
                  </span>
                )}
              </div>
              <div className="space-y-2.5">
                {Object.entries(model.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{featureLabels[key]}</span>
                    <span className="text-foreground font-medium">
                      {typeof value === "boolean" ? (
                        value ? <Check className="w-4 h-4 text-accent" /> : <X className="w-4 h-4 text-muted-foreground/40" />
                      ) : (
                        value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden sm:block neumorphic-box overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-0">
            <div className="p-5 border-b border-border/50" />
            {models.map((model, i) => (
              <div
                key={model.name}
                className={`p-5 text-center border-b border-border/50 cursor-pointer transition-colors ${
                  i === highlighted ? "bg-accent/5" : ""
                }`}
                onClick={() => setHighlighted(i)}
              >
                {model.badge && (
                  <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-heading font-semibold mb-2 inline-block">
                    {model.badge}
                  </span>
                )}
                <h3 className="font-heading font-bold text-sm md:text-base text-foreground">{model.name}</h3>
                <span className="text-lg md:text-xl font-heading font-bold chrome-text">${model.price}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {Object.keys(models[0].features).map((key) => (
            <div key={key} className="grid grid-cols-4 gap-0 border-b border-border/30 last:border-0">
              <div className="p-4 flex items-center">
                <span className="text-xs md:text-sm text-muted-foreground font-body">{featureLabels[key]}</span>
              </div>
              {models.map((model, i) => {
                const val = model.features[key as keyof typeof model.features];
                return (
                  <div
                    key={model.name}
                    className={`p-4 flex items-center justify-center text-center ${
                      i === highlighted ? "bg-accent/5" : ""
                    }`}
                  >
                    {typeof val === "boolean" ? (
                      val ? <Check className="w-4 h-4 text-accent" /> : <X className="w-4 h-4 text-muted-foreground/30" />
                    ) : (
                      <span className="text-xs md:text-sm text-foreground font-heading font-medium">{val}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompareModels;
