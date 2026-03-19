import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SustainabilityBadges from "@/components/SustainabilityBadges";
import ProductViewer3D from "@/components/ProductViewer3D";
import KeyHighlights from "@/components/KeyHighlights";
import BehindTheDesign from "@/components/BehindTheDesign";
import AddToCart from "@/components/AddToCart";
import Testimonials from "@/components/Testimonials";
import CartSidebar from "@/components/CartSidebar";
import CustomizationModal from "@/components/CustomizationModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <SustainabilityBadges />
      <ProductViewer3D onCustomize={() => setCustomizeOpen(true)} />
      <KeyHighlights />
      <BehindTheDesign />
      <AddToCart onOpenCart={() => setCartOpen(true)} />
      <Testimonials />
      <Footer />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <CustomizationModal open={customizeOpen} onClose={() => setCustomizeOpen(false)} />
    </div>
  );
};

export default Index;
