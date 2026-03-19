import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const EarbudModel = ({ color, ledColor }: { color: string; ledColor: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    if (ledRef.current) {
      const i = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 1.2;
      (ledRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.max(0.5, i);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <mesh><sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial color={color} metalness={0.95} roughness={0.05} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={2.5} />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 1.2, 32]} />
          <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0.7, 0.4]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshPhysicalMaterial color="#0a1a2a" metalness={0.1} roughness={0.7} />
        </mesh>
        <mesh ref={ledRef} position={[0, 0, -0.95]}>
          <torusGeometry args={[0.3, 0.035, 16, 32]} />
          <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
};

const colors = [
  { name: "Chrome", value: "#c0c0c0", led: "#00C2A8" },
  { name: "Obsidian", value: "#1a1a1a", led: "#00E5FF" },
  { name: "Titanium", value: "#8a8a8a", led: "#00C2A8" },
  { name: "Navy", value: "#1a3050", led: "#00E5FF" },
];

const ProductViewer3D = ({ onCustomize }: { onCustomize?: () => void }) => {
  const [sel, setSel] = useState(colors[0]);

  return (
    <section id="product" className="section-spacing">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary mb-3 font-body">
            360° Interactive
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Every Angle. Every Detail.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="neumorphic-box p-2 sm:p-4 teal-glow"
        >
          <div className="aspect-square sm:aspect-[4/3] md:aspect-[16/10] w-full rounded-xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, -2, -5]} intensity={0.25} color="#00C2A8" />
                <pointLight position={[0, 3, 0]} intensity={0.4} />
                <EarbudModel color={sel.value} ledColor={sel.led} />
                <Environment preset="studio" />
                <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 pb-2 flex-wrap">
            <div className="flex gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSel(c)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-300 ${
                    sel.name === c.name ? "border-primary scale-110 teal-glow" : "border-border hover:border-muted-foreground"
                  }`}
                  style={{ backgroundColor: c.value }}
                  aria-label={`Select ${c.name} color`}
                />
              ))}
            </div>
            {onCustomize && (
              <button onClick={onCustomize} className="btn-secondary px-5 py-2 text-xs">
                Customize
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductViewer3D;
