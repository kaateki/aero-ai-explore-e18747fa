import { Plane, ArrowUp, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-foreground">AeroAI</span>
            <span className="text-sm text-muted-foreground ml-2">by Aditya & Divyanshu</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all"
          >
            <ArrowUp className="h-4 w-4 mr-1" /> Back to Top
          </Button>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2025 AI in Aerospace Engineering. Built with passion for innovation.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
