import { motion, AnimatePresence } from "framer-motion";
import { useState, Suspense, useRef } from "react";
import { X, RotateCcw, Check, Type, Lightbulb, Palette } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface CustomizationModalProps {
  open: boolean;
  onClose: () => void;
}

const colorOptions = [
  { name: "Chrome", value: "#c0c0c0" },
  { name: "Obsidian", value: "#1a1a1a" },
  { name: "Titanium", value: "#8a8a8a" },
  { name: "Rose Gold", value: "#b76e79" },
  { name: "Deep Ocean", value: "#1a3a5c" },
  { name: "Sunset Gold", value: "#c4954a" },
];

const ledPatterns = [
  { name: "Pulse", color: "#4d9fff", speed: 1 },
  { name: "Breathe", color: "#00ff88", speed: 0.5 },
  { name: "Strobe", color: "#ff3366", speed: 3 },
  { name: "Rainbow", color: "#ff6600", speed: 0.8 },
  { name: "Off", color: "#333333", speed: 0 },
];

const engravings = [
  "None", "Initials", "Symbol ✦", "Wave ∿", "Dot Grid ⠿", "Custom Text",
];

const CustomEarbudModel = ({
  bodyColor,
  ledColor,
  ledSpeed,
  engraving,
}: {
  bodyColor: string;
  ledColor: string;
  ledSpeed: number;
  engraving: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
    if (ledRef.current && ledSpeed > 0) {
      const intensity = 1 + Math.sin(state.clock.elapsedTime * ledSpeed * 3) * 1.5;
      (ledRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.max(0.5, intensity);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Main body */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color={bodyColor}
            metalness={0.95}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Engraving area (decorative ring) */}
        {engraving !== "None" && (
          <mesh position={[0, 0, -0.98]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.5, 0.65, 32]} />
            <meshPhysicalMaterial
              color={bodyColor}
              metalness={0.8}
              roughness={0.3}
              clearcoat={0.5}
            />
          </mesh>
        )}

        {/* Stem */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 1.2, 32]} />
          <meshPhysicalMaterial
            color={bodyColor}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>

        {/* Ear tip */}
        <mesh position={[0, 0.7, 0.4]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshPhysicalMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} />
        </mesh>

        {/* LED ring */}
        <mesh ref={ledRef} position={[0, 0, -0.95]}>
          <torusGeometry args={[0.3, 0.04, 16, 32]} />
          <meshStandardMaterial
            color={ledColor}
            emissive={ledColor}
            emissiveIntensity={ledSpeed > 0 ? 2 : 0.2}
          />
        </mesh>

        {/* Secondary LED dot */}
        <mesh position={[0, -1.8, 0.15]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color={ledColor}
            emissive={ledColor}
            emissiveIntensity={ledSpeed > 0 ? 1.5 : 0}
          />
        </mesh>
      </group>
    </Float>
  );
};

const CustomizationModal = ({ open, onClose }: CustomizationModalProps) => {
  const [tab, setTab] = useState<"color" | "led" | "engrave">("color");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedLed, setSelectedLed] = useState(ledPatterns[0]);
  const [selectedEngraving, setSelectedEngraving] = useState(engravings[0]);
  const [customText, setCustomText] = useState("");

  const reset = () => {
    setSelectedColor(colorOptions[0]);
    setSelectedLed(ledPatterns[0]);
    setSelectedEngraving(engravings[0]);
    setCustomText("");
  };

  const tabs = [
    { id: "color" as const, label: "Color", icon: Palette },
    { id: "led" as const, label: "LED", icon: Lightbulb },
    { id: "engrave" as const, label: "Engrave", icon: Type },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/50">
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                  Customize Your AURA Pro
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Real-time 3D preview</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={reset}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Reset customization"
                >
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="Close">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* 3D Preview */}
              <div className="lg:flex-1 p-4 sm:p-6">
                <div className="neumorphic-box p-2 overflow-hidden neon-glow">
                  <div className="aspect-square w-full rounded-xl overflow-hidden">
                    <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 2]}>
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#4d9fff" />
                        <CustomEarbudModel
                          bodyColor={selectedColor.value}
                          ledColor={selectedLed.color}
                          ledSpeed={selectedLed.speed}
                          engraving={selectedEngraving}
                        />
                        <Environment preset="studio" />
                        <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={7} autoRotate autoRotateSpeed={0.3} />
                      </Suspense>
                    </Canvas>
                  </div>
                </div>

                {/* Current config summary */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-[10px] bg-secondary px-2.5 py-1 rounded-full text-foreground font-heading">
                    {selectedColor.name}
                  </span>
                  <span className="text-[10px] bg-secondary px-2.5 py-1 rounded-full text-foreground font-heading">
                    LED: {selectedLed.name}
                  </span>
                  <span className="text-[10px] bg-secondary px-2.5 py-1 rounded-full text-foreground font-heading">
                    {selectedEngraving === "Custom Text" ? customText || "Custom" : selectedEngraving}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="lg:flex-1 border-t lg:border-t-0 lg:border-l border-border/50 p-4 sm:p-6">
                {/* Tabs */}
                <div className="flex gap-1 mb-6 neumorphic-box p-1">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-heading font-medium transition-all duration-300 ${
                        tab === t.id
                          ? "bg-accent text-accent-foreground neon-glow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <t.icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* Color tab */}
                  {tab === "color" && (
                    <motion.div
                      key="color"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <p className="text-xs text-muted-foreground font-body mb-4">
                        Select a finish for your earbuds
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {colorOptions.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c)}
                            className={`neumorphic-box p-3 flex items-center gap-3 transition-all duration-300 ${
                              selectedColor.name === c.name ? "ring-1 ring-accent/30 neon-glow" : ""
                            }`}
                          >
                            <div
                              className="w-8 h-8 rounded-full border border-border/50 flex-shrink-0"
                              style={{ background: `linear-gradient(135deg, ${c.value}, ${c.value}dd)` }}
                            />
                            <span className="text-xs font-heading font-medium text-foreground">{c.name}</span>
                            {selectedColor.name === c.name && (
                              <Check className="w-3.5 h-3.5 text-accent ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* LED tab */}
                  {tab === "led" && (
                    <motion.div
                      key="led"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <p className="text-xs text-muted-foreground font-body mb-4">
                        Choose an LED pattern for the indicator ring
                      </p>
                      {ledPatterns.map((led) => (
                        <button
                          key={led.name}
                          onClick={() => setSelectedLed(led)}
                          className={`w-full neumorphic-box p-3.5 flex items-center gap-3 transition-all duration-300 ${
                            selectedLed.name === led.name ? "ring-1 ring-accent/20 neon-glow" : ""
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: led.color,
                              boxShadow: led.speed > 0 ? `0 0 12px ${led.color}80` : "none",
                            }}
                          />
                          <span className="text-xs font-heading font-medium text-foreground">{led.name}</span>
                          {led.speed > 0 && (
                            <span className="text-[10px] text-muted-foreground ml-auto">
                              {led.speed < 1 ? "Slow" : led.speed < 2 ? "Medium" : "Fast"}
                            </span>
                          )}
                          {selectedLed.name === led.name && (
                            <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Engrave tab */}
                  {tab === "engrave" && (
                    <motion.div
                      key="engrave"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <p className="text-xs text-muted-foreground font-body mb-4">
                        Add a personal engraving to the outer shell
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {engravings.map((eng) => (
                          <button
                            key={eng}
                            onClick={() => setSelectedEngraving(eng)}
                            className={`neumorphic-box p-3 text-center transition-all duration-300 ${
                              selectedEngraving === eng ? "ring-1 ring-accent/20 neon-glow" : ""
                            }`}
                          >
                            <span className="text-xs font-heading font-medium text-foreground">{eng}</span>
                          </button>
                        ))}
                      </div>
                      {selectedEngraving === "Custom Text" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3"
                        >
                          <input
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value.slice(0, 12))}
                            placeholder="Max 12 characters"
                            className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-1 focus:ring-accent font-heading"
                            maxLength={12}
                          />
                          <p className="text-[10px] text-muted-foreground mt-1.5 text-right">
                            {customText.length}/12
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Price & CTA */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs text-muted-foreground font-body">Your configuration</span>
                    <div className="text-right">
                      <span className="text-xl font-heading font-bold chrome-text">
                        ${selectedEngraving !== "None" ? "369.99" : "349.99"}
                      </span>
                      {selectedEngraving !== "None" && (
                        <p className="text-[10px] text-accent">+$20 engraving</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="btn-accent w-full py-3.5 text-sm flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Apply & Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomizationModal;
