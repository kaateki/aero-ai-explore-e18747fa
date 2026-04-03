import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const scrollLinks = [
  { label: "Aerospace", href: "#aerospace" },
  { label: "AI Impact", href: "#ai-impact" },
  { label: "The Project", href: "#project" },
  { label: "Quiz", href: "#quiz" },
  { label: "Team", href: "#team" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollTo = (href: string) => {
    setIsOpen(false);
    if (!isHome) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Plane className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-display font-bold text-lg text-foreground">AeroAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {scrollLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/demo"
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted ${
              location.pathname === "/demo" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Demo
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-left text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/demo"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-left text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
            >
              Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
