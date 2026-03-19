import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Check, Plus, Minus, ShoppingBag } from "lucide-react";
import earbudSingle from "@/assets/earbud-single.png";
import earbudsCase from "@/assets/earbuds-case.png";

interface BundleBuilderProps {
  open: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const accessories = [
  { id: "case", name: "Leather Charging Case", price: 79.99, image: earbudsCase, selected: false },
  { id: "tips", name: "Memory Foam Tips (6-pack)", price: 24.99, image: earbudSingle, selected: false },
  { id: "cable", name: "USB-C Braided Cable (2m)", price: 19.99, image: earbudSingle, selected: false },
  { id: "stand", name: "Wireless Charging Stand", price: 49.99, image: earbudSingle, selected: false },
];

const BundleBuilder = ({ open, onClose, onAddToCart }: BundleBuilderProps) => {
  const [items, setItems] = useState(accessories);
  const earbudsPrice = 349.99;

  const toggle = (id: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const selectedItems = items.filter((i) => i.selected);
  const accessoryTotal = selectedItems.reduce((sum, i) => sum + i.price, 0);
  const discount = selectedItems.length >= 2 ? 0.15 : selectedItems.length >= 1 ? 0.1 : 0;
  const discountedAccessories = accessoryTotal * (1 - discount);
  const total = earbudsPrice + discountedAccessories;

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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-5 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">Bundle Builder</h3>
                <p className="text-xs text-muted-foreground">Add accessories and save up to 15%</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="Close">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Base product */}
            <div className="neumorphic-box p-4 mb-4 flex items-center gap-4">
              <img src={earbudSingle} alt="AURA Pro" className="w-12 h-12 object-contain" />
              <div className="flex-1">
                <p className="font-heading font-semibold text-sm text-foreground">AURA Pro Earbuds</p>
                <p className="text-xs text-muted-foreground">Base product — included</p>
              </div>
              <span className="font-heading font-bold text-sm chrome-text">${earbudsPrice}</span>
            </div>

            {/* Accessories */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full neumorphic-box p-4 flex items-center gap-4 text-left transition-all duration-300 ${
                    item.selected ? "ring-1 ring-accent/30 neon-glow" : ""
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                    item.selected
                      ? "bg-accent border-accent"
                      : "border-border"
                  }`}>
                    {item.selected && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Summary */}
            <div className="neumorphic-box p-4 sm:p-5 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>AURA Pro</span>
                <span>${earbudsPrice.toFixed(2)}</span>
              </div>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              {discount > 0 && (
                <div className="flex justify-between text-xs text-accent">
                  <span>Bundle discount ({Math.round(discount * 100)}%)</span>
                  <span>-${(accessoryTotal * discount).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border/50 pt-2 flex justify-between">
                <span className="font-heading font-semibold text-sm text-foreground">Total</span>
                <span className="font-heading font-bold text-lg chrome-text">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => { onAddToCart(); onClose(); }}
              className="btn-accent w-full py-3.5 mt-4 text-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add Bundle to Cart
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BundleBuilder;
