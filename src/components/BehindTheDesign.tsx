import { motion } from "framer-motion";
import heroImg from "@/assets/hero-navy.png";
import caseImg from "@/assets/earbuds-case.png";

const stories = [
  {
    title: "Forged in Titanium",
    text: "CNC-machined from a single block of Grade 5 titanium. 47 precision steps over 6 hours create the seamless unibody shell.",
    image: heroImg,
  },
  {
    title: "Sound, Perfected by AI",
    text: "Our neural DSP trains on 50,000+ acoustic environments, adapting EQ, ANC, and spatial audio in real-time to your ear geometry.",
    image: caseImg,
  },
];

const BehindTheDesign = () => {
  return (
    <section id="story" className="section-spacing overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">The Story</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">Behind the Design</h2>
        </motion.div>

        <div className="space-y-20 sm:space-y-28">
          {stories.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-14 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="neumorphic-box p-3 sm:p-4 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full rounded-xl" loading="lazy" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-6xl sm:text-8xl font-heading font-bold text-secondary/40">0{i + 1}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mt-1 mb-4">{s.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body font-light">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehindTheDesign;
