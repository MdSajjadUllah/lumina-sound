import { motion } from "framer-motion";

const Footer = () => (
  <footer className="border-t border-border/40 py-14 sm:py-18 px-5 sm:px-8">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
        {[
          { title: "Product", links: ["AURA Pro", "Accessories", "Compare"] },
          { title: "Support", links: ["Help Center", "Warranty", "Returns"] },
          { title: "Company", links: ["About", "Careers", "Press"] },
          { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-semibold text-xs text-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-body">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-heading font-bold text-base chrome-text">AURA</span>
        <p className="text-[10px] text-muted-foreground font-body">© 2026 AURA Audio. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
