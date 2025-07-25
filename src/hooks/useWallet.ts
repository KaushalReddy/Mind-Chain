import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface WalletState {
  isConnected: boolean;
  account: string | null;
  isLoading: boolean;
}

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    };
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    account: null,
    isLoading: false,
  });
  const { toast } = useToast();

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setWalletState({
            isConnected: false,
            account: null,
            isLoading: false,
          });
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected.",
          });
        } else {
          setWalletState({
            isConnected: true,
            account: accounts[0],
            isLoading: false,
          });
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [toast]);

  const checkConnection = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length > 0) {
        setWalletState({
          isConnected: true,
          account: accounts[0],
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Metamask Not Found",
        description: "Please install Metamask to connect your wallet.",
        variant: "destructive",
      });
      // Open Metamask website
      window.open('https://metamask.io/', '_blank');
      return;
    }

    setWalletState(prev => ({ ...prev, isLoading: true }));

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setWalletState({
        isConnected: true,
        account: accounts[0],
        isLoading: false,
      });

      toast({
        title: "Wallet Connected! 🦊",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      setWalletState(prev => ({ ...prev, isLoading: false }));
      
      if (error.code === 4001) {
        toast({
          title: "Connection Rejected",
          description: "You rejected the wallet connection request.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to your wallet. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      account: null,
      isLoading: false,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    formatAddress,
    hasMetamask: !!window.ethereum?.isMetaMask,
  };
};