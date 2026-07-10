"use client";

import { Card } from "@/components/ui/card";
import {
  CircleUserRound,
  Wallet,
  Download,
  Minus,
  Plus,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useWallets } from "@privy-io/react-auth";
import { DepositModal } from "./deposit-modal";
import { WithdrawModal } from "./withdraw-modal";

// Utility function to truncate wallet address
const truncateAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string => {
  if (!address || address === "Not Connected") return address;
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

// Mobile-friendly truncate function
const truncateAddressMobile = (
  address: string,
  startLength: number = 4,
  endLength: number = 3
): string => {
  if (!address || address === "Not Connected") return address;
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

interface UserInfoCardProps {
  name: string;
  twitterHandle: string;
  walletAddress: string;
  chain: string;
  deposits: any[];
  balance: number;
  getDepositBalance: () => void;
  profilePictureUrl?: string;
}

export function UserInfoCard({
  name,
  twitterHandle,
  walletAddress,
  chain,
  deposits,
  balance,
  getDepositBalance,
  profilePictureUrl,
}: UserInfoCardProps) {
  const { wallets } = useWallets();
  
  const exportWallet = async () => {
    // For EVM wallets, export functionality
    const privyWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
    if (privyWallet) {
      // Implement export wallet for EVM
      console.log('Export wallet functionality for EVM');
    }
  };

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isContractCopied, setIsContractCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!walletAddress || walletAddress === "Not Connected") return;

    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <Card className="relative p-0 border-0 bg-gradient-to-br from-[#000000] via-[#11173d] to-[#000051] overflow-hidden w-full max-w-2xl mx-auto">
        {/* Chain Badge */}
        <div className="absolute top-4 right-4 z-10"></div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* User Profile Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto sm:mx-0 overflow-hidden">
              {profilePictureUrl ? (
                <img src={profilePictureUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <CircleUserRound className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">{name}</h2>
              <p className="text-sm sm:text-base text-gray-300">@{twitterHandle}</p>
            </div>
          </div>

          {/* Balance Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">$</span>
              </div>
              <span className="text-white font-medium text-sm sm:text-base">Your Balance</span>
            </div>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00FFE1] mb-4 sm:mb-6">
              {balance.toFixed(3)} ETH
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={() => setIsDepositModalOpen(true)}
                className="bg-[#1a237e] hover:bg-[#283593] border border-[#3949ab] text-white font-medium px-4 sm:px-6 py-2 sm:py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                Add Funds
              </Button>
              <Button
                onClick={() => setIsWithdrawModalOpen(true)}
                variant="outline"
                className="bg-[#1a237e] hover:bg-[#283593] border border-[#3949ab] text-white font-medium px-4 sm:px-6 py-2 sm:py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={balance <= 0}
              >
                <Minus className="w-4 h-4" />
                Withdraw
              </Button>
            </div>
          </div>

          {/* Wallet Address Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white font-medium text-sm sm:text-base">Wallet Address</span>
              </div>
              <div
                onClick={copyToClipboard}
                className="bg-gray-600 hover:bg-gray-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-mono cursor-pointer transition-all duration-200 flex items-center gap-1 sm:gap-2 group self-start sm:self-auto"
                title="Click to copy full address"
              >
                <span className="break-all sm:break-normal">
                  <span className="sm:hidden">{truncateAddressMobile(walletAddress)}</span>
                  <span className="hidden sm:inline">{truncateAddress(walletAddress)}</span>
                </span>
                {isCopied ? (
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                ) : (
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                )}
              </div>
              {isCopied && (
                <span className="text-green-400 text-xs animate-fade-in self-start sm:self-auto">
                  Copied!
                </span>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => exportWallet()}
              className="bg-transparent border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-auto"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Export Wallet</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>

          {/* Contract Address Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold">C</span>
                </div>
                <span className="text-white font-medium text-sm sm:text-base">Contract Address</span>
              </div>
              <div
                onClick={() => {
                  const contractAddress = "GEHJx1yb83BDdjWp6UJWWann9aAkVKwvzU49Qp7jpump";
                  navigator.clipboard.writeText(contractAddress);
                  setIsContractCopied(true);
                  setTimeout(() => setIsContractCopied(false), 2000);
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-mono cursor-pointer transition-all duration-200 flex items-center gap-1 sm:gap-2 group self-start sm:self-auto"
                title="Click to copy contract address"
              >
                <span className="break-all sm:break-normal">
                  <span className="sm:hidden">{truncateAddressMobile("GEHJx1yb83BDdjWp6UJWWann9aAkVKwvzU49Qp7jpump")}</span>
                  <span className="hidden sm:inline">{truncateAddress("GEHJx1yb83BDdjWp6UJWWann9aAkVKwvzU49Qp7jpump")}</span>
                </span>
                {isContractCopied ? (
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                ) : (
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                )}
              </div>
              {isContractCopied && (
                <span className="text-green-400 text-xs animate-fade-in self-start sm:self-auto">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      <DepositModal
        walletAddress={walletAddress}
        open={isDepositModalOpen}
        onClose={() => {
          setIsDepositModalOpen(false);
          getDepositBalance();
        }}
      />

      <WithdrawModal
        open={isWithdrawModalOpen}
        onClose={() => {
          setIsWithdrawModalOpen(false);
          getDepositBalance();
        }}
        balance={balance}
        getDepositBalance={getDepositBalance}
      />
    </>
  );
}
