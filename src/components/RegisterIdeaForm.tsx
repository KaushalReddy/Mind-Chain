import { useState } from "react";
import { Hash, Upload, Lightbulb, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";

const RegisterIdeaForm = () => {
  const { isConnected, account, formatAddress } = useWallet();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ipfsUri: ""
  });
  const [isHashing, setIsHashing] = useState(false);
  const [ideaHash, setIdeaHash] = useState("");
  const { toast } = useToast();

  const generateIdeaHash = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and description to generate a hash.",
        variant: "destructive"
      });
      return;
    }

    setIsHashing(true);
    
    // Simulate hash generation (in real app, this would be actual crypto hashing)
    setTimeout(() => {
      const content = `${formData.title}:${formData.description}:${Date.now()}`;
      const hash = "0x" + btoa(content).slice(0, 32).replace(/[^a-zA-Z0-9]/g, '0').toLowerCase();
      setIdeaHash(hash);
      setIsHashing(false);
      
      toast({
        title: "Hash Generated",
        description: "Your idea has been hashed and is ready for registration.",
      });
    }, 2000);
  };

  const registerIdea = () => {
    if (!isConnected || !account) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before registering an idea.",
        variant: "destructive"
      });
      return;
    }

    if (!ideaHash) {
      toast({
        title: "Generate Hash First",
        description: "Please generate your idea hash before registering.",
        variant: "destructive"
      });
      return;
    }

    // Simulate blockchain transaction
    toast({
      title: "Idea Registered! 🎉",
      description: `Your idea has been timestamped on the blockchain from wallet ${formatAddress(account)}.`,
    });
    
    // Reset form
    setFormData({ title: "", description: "", ipfsUri: "" });
    setIdeaHash("");
  };

  return (
    <section className="py-16 px-4" id="register">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="mb-4">
            <Lightbulb className="h-12 w-12 text-neural mx-auto animate-pulse-glow" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Register Your Idea</h2>
          <p className="text-muted-foreground">
            Create an immutable timestamp for your original thought or invention
          </p>
        </div>

        <Card className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm">
          {!isConnected && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-yellow-500">Wallet Not Connected</p>
                <p className="text-xs text-muted-foreground">Please connect your wallet to register ideas on the blockchain.</p>
              </div>
            </div>
          )}
          
          {isConnected && account && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary-glow">
                Connected Wallet: {formatAddress(account)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ideas will be registered to this wallet address
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Idea Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter your idea title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2 bg-secondary/50 border-primary/20 focus:border-primary/50"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Detailed Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your idea in detail. This will be part of the hash..."
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 bg-secondary/50 border-primary/20 focus:border-primary/50 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="ipfs" className="text-sm font-medium">
                IPFS URI (Optional)
              </Label>
              <Input
                id="ipfs"
                placeholder="ipfs://... (for detailed documentation)"
                value={formData.ipfsUri}
                onChange={(e) => setFormData({ ...formData, ipfsUri: e.target.value })}
                className="mt-2 bg-secondary/50 border-primary/20 focus:border-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Link to external documentation stored on IPFS
              </p>
            </div>

            {ideaHash && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Generated Hash
                </Label>
                <p className="text-sm font-mono text-primary-glow mt-1 break-all">
                  {ideaHash}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={generateIdeaHash}
                disabled={isHashing}
                variant="neural"
                className="flex-1"
              >
                {isHashing ? (
                  <>Generating Hash...</>
                ) : (
                  <>
                    <Hash className="mr-2 h-4 w-4" />
                    Generate Hash
                  </>
                )}
              </Button>
              
              <Button
                onClick={registerIdea}
                disabled={!ideaHash || !isConnected}
                variant="gradient"
                className="flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                {!isConnected ? "Connect Wallet First" : "Register on Blockchain"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RegisterIdeaForm;