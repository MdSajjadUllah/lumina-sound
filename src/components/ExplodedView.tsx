import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import earbudsExploded from "@/assets/earbuds-exploded.png";

const componentData = [
  { label: "Titanium Shell", detail: "Grade 5 aerospace titanium CNC-machined unibody", yOffset: 2.5 },
  { label: "Planar Driver", detail: "12mm titanium diaphragm, 5Hz–40kHz response", yOffset: 1.2 },
  { label: "Neural DSP", detail: "AURA N1 chip — AI-adaptive EQ & ANC processing", yOffset: 0 },
  { label: "Battery Cell", detail: "Graphene-enhanced, 15 min quick charge to 8h", yOffset: -1.2 },
  { label: "Mic Array", detail: "6 MEMS mics + bone conduction for 99.7% ANC", yOffset: -2.4 },
];

const ExplodedPart = ({ yOffset, spread, color, size, shape }: {
  yOffset: number; spread: number; color: string; size: [number, number, number] | number; shape: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = yOffset * spread;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, yOffset * spread, 0]}>
      {shape === "sphere" && <sphereGeometry args={[size as number, 48, 48]} />}
      {shape === "cylinder" && <cylinderGeometry args={size as any} />}
      {shape === "torus" && <torusGeometry args={size as any} />}
      {shape === "box" && <boxGeometry args={size as any} />}
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        clearcoat={1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

const ExplodedScene = ({ spread }: { spread: number }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -2, -5]} intensity={0.3} color="#4d9fff" />
      {/* Shell top */}
      <ExplodedPart yOffset={2} spread={spread} color="#888888" size={0.7} shape="sphere" />
      {/* Driver */}
      <ExplodedPart yOffset={1} spread={spread} color="#c0c0c0" size={[0.55, 0.08, 32] as any} shape="cylinder" />
      {/* DSP Chip */}
      <ExplodedPart yOffset={0} spread={spread} color="#1a3a5c" size={[0.4, 0.1, 0.4] as any} shape="box" />
      {/* Battery */}
      <ExplodedPart yOffset={-1} spread={spread} color="#2a2a2a" size={[0.3, 0.4, 32] as any} shape="cylinder" />
      {/* Mic ring */}
      <ExplodedPart yOffset={-2} spread={spread} color="#4d9fff" size={[0.4, 0.05, 16, 32] as any} shape="torus" />
      <Environment preset="studio" />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </>
  );
};

const ExplodedView = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const spread = useTransform(scrollYProgress, [0.1, 0.5], [0.2, 1.2]);
  const imageX = useTransform(scrollYProgress, [0, 0.5], [-60, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  // We need a state proxy since useTransform returns a MotionValue
  const [spreadVal, setSpreadVal] = useState(0.2);
  spread.on("change", (v) => setSpreadVal(v));

  return (
    <section ref={sectionRef} className="section-spacing overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            Inside the Machine
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Engineered Within
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-body max-w-md mx-auto">
            Scroll to explode the view and reveal what's inside
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* 3D Exploded viewer */}
          <motion.div
            style={{ x: imageX, opacity: imageOpacity }}
            className="flex-1 w-full"
          >
            <div className="neumorphic-box p-2 sm:p-4 neon-glow overflow-hidden">
              <div className="aspect-square sm:aspect-[4/3] w-full rounded-xl overflow-hidden">
                <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
                  <Suspense fallback={null}>
                    <ExplodedScene spread={spreadVal} />
                  </Suspense>
                </Canvas>
              </div>
            </div>

            {/* Static exploded image fallback on very small screens */}
            <div className="neumorphic-box p-4 overflow-hidden mt-4 sm:hidden">
              <img
                src={earbudsExploded}
                alt="Exploded view of AURA Pro internals"
                className="w-full rounded-xl"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Component list with scroll-triggered reveals */}
          <div className="flex-1 w-full space-y-3">
            {componentData.map((comp, i) => (
              <motion.div
                key={comp.label}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                onHoverStart={() => setActiveComponent(i)}
                onHoverEnd={() => setActiveComponent(null)}
                className={`neumorphic-box p-4 sm:p-5 flex items-start gap-4 cursor-default transition-all duration-300 ${
                  activeComponent === i ? "neon-glow ring-1 ring-accent/20" : ""
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  activeComponent === i ? "bg-accent/20" : "bg-accent/10"
                }`}>
                  <span className="text-xs font-heading font-bold text-accent">0{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-foreground">{comp.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-body">{comp.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplodedView;
