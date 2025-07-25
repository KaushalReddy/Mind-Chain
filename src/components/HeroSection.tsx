import { ArrowRight, Shield, Clock, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 text-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-bg opacity-50" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-neural/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-cyber/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary-glow font-medium">
            🌐 Decentralized IP Protection
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Protect Your{" "}
          <span className="bg-gradient-neural bg-clip-text text-transparent">
            Original Ideas
          </span>
          <br />
          Before Anyone Else
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Timestamp and verify your inventions, concepts, and creative works on the blockchain. 
          Get immutable proof of ownership before patents, before publishing, before sharing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            variant="gradient" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => {
              const registerSection = document.getElementById('register');
              registerSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Register Your Idea
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 hover:border-primary/50"
            onClick={() => {
              const dashboardSection = document.getElementById('dashboard');
              dashboardSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Dashboard
          </Button>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="mb-4">
              <Shield className="h-8 w-8 text-neural mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Immutable Proof</h3>
            <p className="text-muted-foreground text-sm">
              Your idea hash is permanently recorded on the blockchain with timestamp verification
            </p>
          </Card>
          
          <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="mb-4">
              <Clock className="h-8 w-8 text-cyber mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Protection</h3>
            <p className="text-muted-foreground text-sm">
              Get immediate proof of concept ownership without expensive patent processes
            </p>
          </Card>
          
          <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="mb-4">
              <Coins className="h-8 w-8 text-primary-glow mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">License as NFTs</h3>
            <p className="text-muted-foreground text-sm">
              Transform your protected ideas into tradeable intellectual property tokens
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;