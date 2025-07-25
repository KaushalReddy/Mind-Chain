import { Brain, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-secondary/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MindChain
            </h1>
            <p className="text-xs text-muted-foreground">Decentralized Thought Licensing</p>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2 group">
          <Wallet className="h-4 w-4 group-hover:text-primary transition-colors" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Header;