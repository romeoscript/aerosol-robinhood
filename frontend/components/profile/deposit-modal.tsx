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
import { usePublicClient, useWalletClient, useAccount, useConnect, useDisconnect } from "wagmi";
import { ethers } from "ethers";
import axios from "axios";
import { toast } from "sonner";
import { txExplorerUrl } from "@/lib/chain";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
  walletAddress: string;
}

export function DepositModal({
  open,
  onClose,
  walletAddress,
}: DepositModalProps) {
  const { user } = usePrivy();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Fetch wallet balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && address && publicClient && !isLoadingBalance) {
        try {
          setIsLoadingBalance(true);
          const balance = await publicClient.getBalance({
            address: address as `0x${string}`,
          });
          setWalletBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error("Error fetching wallet balance:", error);
          toast.error("Failed to load wallet balance");
        } finally {
          setIsLoadingBalance(false);
        }
      } else {
        setWalletBalance(null);
      }
    };

    // Only fetch once when wallet connects, no automatic refresh
    fetchBalance();
  }, [publicClient, address, isConnected]);

  const setMaxAmount = () => {
    if (walletBalance !== null) {
      // Reserve 0.001 ETH for L2 transaction fees and minimum balance
      const MAX_RESERVE = 0.001;
      const maxDeposit = Math.max(0, parseFloat(walletBalance) - MAX_RESERVE);
      // Round to 18 decimal places (ETH precision)
      const roundedMax = Math.floor(maxDeposit * 1e18) / 1e18;
      setAmount(roundedMax.toString());
    }
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!address || !walletClient) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!user?.twitter?.username) {
      toast.error("Please connect your Twitter account first");
      return;
    }

    // Check if amount exceeds available balance
    if (walletBalance !== null && Number(amount) > parseFloat(walletBalance) - 0.001) {
      toast.error("Insufficient balance for transaction (including fees)");
      return;
    }

    console.log("Starting deposit process:", {
      amount,
      address,
      twitterUsername: user.twitter.username,
    });

    setIsLoading(true);
    let hash: string = "";

    try {
      const amountInWei = ethers.parseEther(amount);
      console.log("Amount in wei:", amountInWei.toString());

      const botPublicKey = walletAddress;
      if (!botPublicKey) {
        throw new Error("Bot public key not configured");
      }
      console.log("Bot address:", botPublicKey);

      console.log("Sending transaction...");
      hash = await walletClient.sendTransaction({
        to: botPublicKey as `0x${string}`,
        value: amountInWei,
        chain: walletClient.chain,
        account: address,
      });
      console.log("Transaction sent, hash:", hash);

      console.log("Waiting for transaction confirmation...");
      const receipt = await publicClient!.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
        confirmations: 1,
      });

      console.log("Transaction confirmation receipt:", receipt);

      if (receipt.status !== 'success') {
        throw new Error('Transaction failed');
      }

      // Refresh wallet balance after successful transaction
      const newBalance = await publicClient!.getBalance({
        address: address as `0x${string}`,
      });
      setWalletBalance(ethers.formatEther(newBalance));

      console.log("Fetching current balance from API...");
      const response = await axios.get(
        `/api/userBalance?username=${user.twitter.username}`
      );

      let currentBalance = 0;
      if (response.data.data) {
        currentBalance = response.data.data.balance;
      }
      console.log("Current balance:", currentBalance);

      const newBalanceValue = currentBalance + Number(amount);
      console.log("New balance to be saved:", newBalanceValue);

      console.log("Updating balance in API...");
      const updateResponse = await axios.post("/api/userBalance", {
        username: user.twitter.username,
        balance: newBalanceValue,
      });
      console.log("Balance update API response:", updateResponse.data);

      // Create block explorer link
      const explorerUrl = txExplorerUrl(hash);

      toast.success(
        <div className="flex flex-col gap-2">
          <div>Deposit successful!</div>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            View transaction on explorer
          </a>
        </div>,
        {
          duration: 6000,
        }
      );

      onClose();
    } catch (error) {
      console.error("Error during deposit:", error);

      // Even if there was an error in our confirmation process,
      // check if we have a hash and the transaction might have gone through
      if (hash) {
        const explorerUrl = txExplorerUrl(hash);
        toast.error(
          <div className="flex flex-col gap-2">
            <div>
              {error instanceof Error
                ? error.message
                : "Failed to process deposit"}
            </div>
            <div className="text-sm">
              Your transaction might still have gone through.
            </div>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Check status on explorer
            </a>
          </div>,
          {
            duration: 8000,
          }
        );

        // Try to refresh balance even after error, in case transaction went through
        if (address) {
          try {
            const refreshedBalance = await publicClient!.getBalance({
              address: address as `0x${string}`,
            });
            setWalletBalance(ethers.formatEther(refreshedBalance));
          } catch (balanceError) {
            console.error(
              "Failed to refresh wallet balance after error:",
              balanceError
            );
          }
        }
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to process deposit";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletButtonClick = (connector: any) => {
    connect({ connector });
    // Don't close modal immediately, let user see the connection process
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {isConnected && address ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds</DialogTitle>
            <DialogDescription>
              Enter the amount of ETH you want to deposit into your EasyPay
              account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {walletBalance !== null && (
              <div className="text-sm text-muted-foreground flex justify-between items-center">
                <span>
                  Wallet Balance:{" "}
                  {isLoadingBalance
                    ? "Loading..."
                    : `${parseFloat(walletBalance).toFixed(4)} ETH`}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={setMaxAmount}
                  disabled={isLoadingBalance || parseFloat(walletBalance) <= 0}
                >
                  Max
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium flex justify-between"
              >
                <span>Amount (ETH)</span>
                {walletBalance !== null &&
                  Number(amount) > parseFloat(walletBalance) - 0.001 &&
                  Number(amount) > 0 && (
                    <span className="text-red-500 text-xs">
                      Insufficient balance
                    </span>
                  )}
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.000000000000000001"
                className={
                  walletBalance !== null &&
                  Number(amount) > parseFloat(walletBalance) - 0.001 &&
                  Number(amount) > 0
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
            <Button
              onClick={handleDeposit}
              className="w-full"
              disabled={
                isLoading ||
                isLoadingBalance ||
                (walletBalance !== null &&
                  Number(amount) > parseFloat(walletBalance) - 0.001) ||
                !amount ||
                Number(amount) <= 0
              }
            >
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full"
            >
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[440px] bg-gradient-to-br from-[#000000] via-[#11173d] to-[#000051] text-white rounded-3xl shadow-2xl border border-blue-700/30 backdrop-blur-xl p-0 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_60%)]" />

          <div className="relative z-10 p-8">
            <DialogHeader className="text-center mb-8">
              <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-200 bg-clip-text text-transparent mb-3">
                Connect Wallet
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-md leading-relaxed">
                Connect your Robinhood Chain wallet to access all features
                <br />
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Wallet connection buttons */}
              {connectors.map((connector) => (
                <Button
                  key={connector.id}
                  onClick={() => handleWalletButtonClick(connector)}
                  className="w-full !bg-gradient-to-r !from-blue-600 !via-blue-700 !to-blue-800 hover:!from-blue-500 hover:!via-blue-600 hover:!to-blue-700 !h-auto !py-5 !px-6 !rounded-2xl !text-lg !font-semibold !text-white !border-0 !shadow-xl !shadow-blue-500/20"
                >
                  Connect {connector.name}
                </Button>
              ))}

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-blue-800/40">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
