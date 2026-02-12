import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Demo", href: "#demo" },
  { label: "Architecture", href: "#architecture" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#hero" className="flex items-center gap-2 font-bold text-lg text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Plane className="h-5 w-5 text-primary" />
          AirML
        </a>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            >
              {item.label}
            </a>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-card border-b px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
