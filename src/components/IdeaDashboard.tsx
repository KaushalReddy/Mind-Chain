import { useState } from "react";
import { Clock, Hash, ExternalLink, Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface RegisteredIdea {
  id: string;
  title: string;
  hash: string;
  timestamp: Date;
  ipfsUri?: string;
  nftMinted: boolean;
}

const IdeaDashboard = () => {
  const { toast } = useToast();
  
  // Mock data - in real app this would come from blockchain
  const [ideas] = useState<RegisteredIdea[]>([
    {
      id: "1",
      title: "Self-Healing Smart Contracts",
      hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef",
      timestamp: new Date("2024-01-15T10:30:00"),
      ipfsUri: "ipfs://QmX123...",
      nftMinted: false
    },
    {
      id: "2", 
      title: "Quantum-Resistant Encryption Method",
      hash: "0xb2c3d4e5f6789012345678901234567890abcdef1",
      timestamp: new Date("2024-01-10T14:20:00"),
      nftMinted: true
    },
    {
      id: "3",
      title: "Biodegradable Solar Panel Design",
      hash: "0xc3d4e5f6789012345678901234567890abcdef12",
      timestamp: new Date("2024-01-05T09:15:00"),
      ipfsUri: "ipfs://QmY456...",
      nftMinted: false
    }
  ]);

  const mintNFT = (ideaId: string, ideaTitle: string) => {
    toast({
      title: "NFT Minted! 🪙",
      description: `Your idea "${ideaTitle}" has been licensed as an NFT.`,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <section className="py-16 px-4 bg-gradient-bg/30" id="dashboard">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Registered Ideas</h2>
          <p className="text-muted-foreground">
            Manage your blockchain-protected intellectual property
          </p>
        </div>

        {ideas.length === 0 ? (
          <Card className="p-12 text-center bg-card/50 border-primary/20">
            <div className="mb-4">
              <Plus className="h-16 w-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Ideas Registered Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start protecting your intellectual property by registering your first idea.
            </p>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Register Your First Idea
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{idea.title}</h3>
                      {idea.nftMinted && (
                        <Badge className="bg-gradient-cyber text-black font-medium">
                          <Award className="h-3 w-3 mr-1" />
                          NFT Minted
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Registered: {formatDate(idea.timestamp)}
                      </div>
                      
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Hash className="h-4 w-4 mt-0.5" />
                        <span className="font-mono text-xs break-all">{idea.hash}</span>
                      </div>
                      
                      {idea.ipfsUri && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ExternalLink className="h-4 w-4" />
                          <a 
                            href={idea.ipfsUri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-glow hover:underline"
                          >
                            View Documentation
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {!idea.nftMinted ? (
                      <Button
                        onClick={() => mintNFT(idea.id, idea.title)}
                        className="bg-gradient-neural hover:shadow-neural transition-all duration-300"
                      >
                        <Award className="mr-2 h-4 w-4" />
                        Mint as NFT
                      </Button>
                    ) : (
                      <Button variant="outline" className="border-cyber/50 text-cyber-glow hover:border-cyber">
                        View NFT
                      </Button>
                    )}
                    
                    <Button variant="outline" className="hover:border-primary/50">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Plus className="mr-2 h-5 w-5" />
            Register Another Idea
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IdeaDashboard;