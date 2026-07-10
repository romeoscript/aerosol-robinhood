"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import axios from "axios";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ethers } from "ethers";
import { txExplorerUrl } from "@/lib/chain";

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  balance: number;
  getDepositBalance: () => void;
}

export function WithdrawModal({ open, onClose, balance, getDepositBalance }: WithdrawModalProps) {
  const { user } = usePrivy();
  const { wallets } = useWallets();
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);
  
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    hash: string;
    explorerUrl: string;
  } | null>(null);

  // Find the Privy embedded wallet when wallets are loaded
  useEffect(() => {
    const privyWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
    setEmbeddedWallet(privyWallet);
  }, [wallets]);

  const handleWithdraw = async () => {
    if (!embeddedWallet) {
      toast.error("No Privy embedded wallet found");
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!recipientAddress) {
      toast.error("Please enter a recipient address");
      return;
    }

    try {
      // Validate EVM address
      if (!ethers.isAddress(recipientAddress)) {
        toast.error("Invalid wallet address");
        return;
      }
    } catch (error) {
      toast.error("Invalid wallet address");
      return;
    }

    if (!user?.twitter?.username) {
      toast.error("Please connect your Twitter account first");
      return;
    }

    if (!user?.wallet?.address) {
      toast.error("No wallet found for your account");
      return;
    }

    setIsLoading(true);
    try {
      console.log('Initiating withdrawal with data:', {
        username: user.twitter.username,
        amount: Number(amount),
        recipientAddress: recipientAddress,
        walletAddress: user.wallet.address
      });

      // Send the transaction directly from the Privy embedded wallet.
      // Custody is client-side — no backend signing involved.
      const provider = await embeddedWallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.parseEther(amount),
      });

      console.log('Transaction sent, hash:', tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      if (receipt?.status !== 1) {
        throw new Error('Transaction failed');
      }

      // Best-effort: update the off-chain balance ledger in the backend.
      try {
        const balanceResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'}/api/userBalance?username=${user.twitter.username}`
        );
        const currentBalance = balanceResponse.data?.data?.balance ?? 0;
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'}/api/userBalance`,
          {
            username: user.twitter.username,
            balance: Math.max(0, currentBalance - Number(amount)),
          }
        );
      } catch (confirmError) {
        console.error("Error updating balance ledger with backend:", confirmError);
        // Continue anyway since the transaction succeeded on-chain
      }

      // Update the UI
      setTransactionDetails({
        hash: tx.hash,
        explorerUrl: txExplorerUrl(tx.hash),
      });
      toast.success("Withdrawal successful!");
      getDepositBalance();
    } catch (error) {
      console.error("Error during withdrawal:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
        if (errorMessage.includes('Insufficient wallet balance')) {
          toast.error("Your wallet needs some ETH to cover transaction fees. Please deposit a small amount of ETH to your wallet first.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : "Failed to process withdrawal";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTransactionDetails(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            {transactionDetails ? (
              <div className="space-y-4">
                <p>Your withdrawal was successful!</p>
                <div className="flex items-center gap-2">
                  <Link
                    href={transactionDetails.explorerUrl}
                    target="_blank"

                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    View transaction on explorer
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              "Enter the amount of ETH you want to withdraw and the recipient address."
            )}
          </DialogDescription>
        </DialogHeader>
        {!transactionDetails && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (ETH)
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                max={balance}
                step="0.000000000000000001"
              />
              <p className="text-sm text-muted-foreground">
                Available balance: {balance.toFixed(4)} ETH
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium">
                Recipient Address
              </label>
              <Input
                id="recipient"
                placeholder="Enter wallet address (0x...)"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleWithdraw} 
              className="w-full"
              disabled={isLoading || !embeddedWallet}
            >
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
            {!embeddedWallet && (
              <p className="text-sm text-red-500">
                No Privy embedded wallet found. Please refresh or contact support.
              </p>
            )}
          </div>
        )}
        {transactionDetails && (
          <div className="flex justify-end">
            <Button onClick={handleClose} variant="outline">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
