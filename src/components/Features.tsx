import { motion } from "framer-motion";
import { Wifi, Battery, Shield, Mic, Zap, Droplets } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AI Noise Cancel",
    description: "Neural engine adapts to 50,000+ sound profiles in real-time, isolating your world.",
    stat: "99.7%",
    statLabel: "noise reduction",
  },
  {
    icon: Battery,
    title: "48-Hour Power",
    description: "Graphene-enhanced battery with wireless Qi2 charging. 15 min = 8 hours.",
    stat: "48h",
    statLabel: "total battery",
  },
  {
    icon: Wifi,
    title: "Bluetooth 5.4",
    description: "Lossless hi-res audio with 40m range. Dual-device simultaneous pairing.",
    stat: "40m",
    statLabel: "range",
  },
  {
    icon: Mic,
    title: "Crystal Voice",
    description: "6-mic beamforming array with bone conduction sensor for call clarity.",
    stat: "6",
    statLabel: "microphones",
  },
  {
    icon: Zap,
    title: "Spatial Audio",
    description: "Head-tracked Dolby Atmos with personalized HRTF for immersive 3D sound.",
    stat: "360°",
    statLabel: "soundstage",
  },
  {
    icon: Droplets,
    title: "IP68 Sealed",
    description: "Fully submersible to 2m. Sweat, rain, and dust proof titanium casing.",
    stat: "IP68",
    statLabel: "rating",
  },
];

const Features = () => {
  return (
    <section className="section-spacing">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            Engineered to Perfection
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Technology Unleashed
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="neumorphic-box p-6 sm:p-8 group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-heading font-bold chrome-text">{feature.stat}</span>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{feature.statLabel}</p>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
