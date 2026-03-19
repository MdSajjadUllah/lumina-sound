import { motion } from "framer-motion";
import { ShieldCheck, Award, Droplets, Zap, Radio, Leaf } from "lucide-react";

const certs = [
  { icon: Droplets, label: "IP68 Waterproof", detail: "2m submersible" },
  { icon: ShieldCheck, label: "MIL-STD-810H", detail: "Military grade" },
  { icon: Award, label: "Hi-Res Audio", detail: "JAS certified" },
  { icon: Zap, label: "Qi2 Certified", detail: "Wireless charging" },
  { icon: Radio, label: "BT 5.4 LE", detail: "Low energy audio" },
  { icon: Leaf, label: "Carbon Neutral", detail: "Net zero production" },
];

const Certifications = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2 font-body">
            Certified Excellence
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="neumorphic-box p-3 sm:p-4 text-center group cursor-default"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                <cert.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-[10px] sm:text-xs font-heading font-semibold text-foreground">{cert.label}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">{cert.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
