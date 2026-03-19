import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface NavbarProps {
  onCartOpen: () => void;
}

const Navbar = ({ onCartOpen }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3"
    >
      <div className="max-w-5xl mx-auto glass-panel px-5 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-lg sm:text-xl chrome-text">
          AURA
        </a>
        <div className="hidden sm:flex items-center gap-7">
          <a href="#product" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors font-body">Product</a>
          <a href="#highlights" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors font-body">Features</a>
          <a href="#story" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors font-body">Story</a>
        </div>
        <button onClick={onCartOpen} className="relative p-2 hover:bg-secondary/50 rounded-lg transition-colors" aria-label="Open cart">
          <ShoppingBag className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
