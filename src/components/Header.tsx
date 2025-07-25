import { Brain, Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";

const Header = () => {
  const { isConnected, account, isLoading, connectWallet, disconnectWallet, formatAddress, hasMetamask } = useWallet();

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
        
        {isConnected ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-primary-glow">
                {formatAddress(account!)}
              </p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
            <Button 
              variant="outline" 
              onClick={disconnectWallet}
              className="flex items-center gap-2 group hover:border-destructive/50"
            >
              <LogOut className="h-4 w-4 group-hover:text-destructive transition-colors" />
              Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={connectWallet}
            disabled={isLoading}
            className="flex items-center gap-2 group"
          >
            <Wallet className="h-4 w-4 group-hover:text-primary transition-colors" />
            {isLoading ? "Connecting..." : hasMetamask ? "Connect Wallet" : "Install Metamask"}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;