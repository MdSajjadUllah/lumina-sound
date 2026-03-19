import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Lock, Tag } from "lucide-react";
import { useState } from "react";
import earbudSingle from "@/assets/earbud-single.png";

interface CartSidebarProps { open: boolean; onClose: () => void; }

const CartSidebar = ({ open, onClose }: CartSidebarProps) => {
  const [qty, setQty] = useState(1);
  const price = 349.99;
  const subtotal = price * qty;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 glass-panel border-l border-border/40 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border/40">
              <h3 className="font-heading font-semibold text-base text-foreground">Your Cart</h3>
              <button onClick={onClose} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors" aria-label="Close cart">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="neumorphic-box p-4 flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-secondary/50 flex-shrink-0 flex items-center justify-center">
                  <img src={earbudSingle} alt="AURA Pro" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-sm text-foreground">AURA Pro</h4>
                  <p className="text-[10px] text-muted-foreground">Chrome · Standard</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="Decrease"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-heading font-medium w-4 text-center">{qty}</span>
                    <button onClick={() => setQty(Math.min(5, qty + 1))} className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="Increase"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
                <span className="font-heading font-semibold text-sm chrome-text">${(price * qty).toFixed(2)}</span>
              </div>
            </div>
            <div className="p-5 border-t border-border/40 space-y-3">
              <div className="neumorphic-box p-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs text-muted-foreground"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
                <div className="border-t border-border/40 pt-2 flex justify-between">
                  <span className="font-heading font-semibold text-sm text-foreground">Total</span>
                  <span className="font-heading font-bold text-lg chrome-text">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="btn-cta w-full py-3.5 text-sm flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Secure Checkout
              </button>
              <p className="text-[9px] text-center text-muted-foreground">Encrypted payment · Free 30-day returns</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
