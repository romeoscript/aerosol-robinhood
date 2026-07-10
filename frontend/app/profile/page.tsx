"use client";

import { UserInfoCard } from "@/components/profile/user-info-card";
import { BalanceCard } from "@/components/profile/balance-card";
import { WalletTransactionHistory } from "@/components/profile/wallet-transaction-history";
import { usePrivy } from "@privy-io/react-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import bg from "@/images/bg.svg";
import { usePublicClient } from "wagmi";
import { ethers } from "ethers";

// Loading spinner component
const LoadingSpinner = ({ size = "w-6 h-6" }) => (
  <svg
    className={`${size} animate-spin text-primary`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="white"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="white"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Mock data
const mockUserData = {
  name: "John Doe",
  twitterHandle: "@johndoe",
  walletAddress: "0x1234...5678",
  chain: "Robinhood Chain",
  balance: 145.32,
  deposits: [
    { amount: 50, date: "2024-03-20" },
    { amount: 25, date: "2024-03-15" },
    { amount: 70.32, date: "2024-03-10" },
  ],
};

export default function ProfilePage() {
  const { user, login, authenticated, ready } = usePrivy();
  const publicClient = usePublicClient();

  const [privyBalance, setPrivyBalance] = useState(0);
  const [balance, setBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingBalanceRef = useRef(false);
  const isLoadingDepositRef = useRef(false);
  const hasFetchedBalancesRef = useRef(false);

  // Determine current authentication state
  const getAuthState = () => {
    if (!ready) return "loading";
    if (isSigningIn) return "authenticating";
    if (!authenticated || !user) return "unauthenticated";
    return "authenticated";
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      await login();
    } catch (error) {
      console.error("Authentication failed:", error);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const getPrivyBalance = async () => {
    if (user?.wallet?.address && publicClient && !isLoadingBalanceRef.current) {
      try {
        isLoadingBalanceRef.current = true;
        setIsLoadingBalance(true);
        const balance = await publicClient.getBalance({
          address: user.wallet.address as `0x${string}`,
        });
        const balanceInBnb = parseFloat(ethers.formatEther(balance));
        setPrivyBalance(balanceInBnb);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      } finally {
        isLoadingBalanceRef.current = false;
        setIsLoadingBalance(false);
      }
    }
  };

  const getDepositBalance = async () => {
    if (user?.twitter?.username && !isLoadingDepositRef.current) {
      try {
        isLoadingDepositRef.current = true;
        console.log(
          "Fetching deposit balance for username:",
          user.twitter.username
        );
        const response = await axios.get(
          `/api/userBalance?username=${user?.twitter?.username}`
        );
        console.log("Deposit balance API response:", response.data);

        if (response.data.data == null) {
          console.log("No balance found, initializing to 0");
          setBalance(0);
          await axios.post("/api/userBalance", {
            username: user?.twitter?.username,
            balance: 0,
          });
        } else {
          console.log("Setting balance to:", response.data.data.balance);
          setBalance(response.data.data.balance);
        }
      } catch (error) {
        console.error("Error fetching deposit balance:", error);
      } finally {
        isLoadingDepositRef.current = false;
      }
    }
  };

  // Only fetch balances once when user data changes
  useEffect(() => {
    if ((user?.wallet?.address || user?.twitter?.username) && !hasFetchedBalancesRef.current) {
      hasFetchedBalancesRef.current = true;
      getPrivyBalance();
      getDepositBalance();
    }
  }, [user?.wallet?.address, user?.twitter?.username]);

  const renderAuthState = () => {
    const authState = getAuthState();

    switch (authState) {
      case "loading":
        return (
          <div className="flex justify-center items-center min-h-[80vh] px-2 sm:px-4">
            <Card className="py-8 px-6 sm:py-10 sm:px-8 lg:py-12 lg:px-16 text-center bg-content1 w-full max-w-md mx-auto shadow-medium border border-gray-500 border-divider/50">
              <div className="space-y-4 sm:space-y-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <LoadingSpinner />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Loading...
                </h3>
                <p className="text-gray-200/60 text-xs sm:text-sm leading-relaxed">
                  Checking your authentication status.
                </p>
              </div>
            </Card>
          </div>
        );

      case "unauthenticated":
        return (
          <div className="flex justify-center items-center min-h-[80vh] px-2 sm:px-4">
            <Card className="py-8 px-6 sm:py-10 sm:px-8 lg:py-12 lg:px-16 text-center bg-content1 w-full max-w-md mx-auto shadow-medium border border-divider/50">
              <div className="space-y-4 sm:space-y-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-warning/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-warning"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Authentication Required
                </h3>
                <p className="text-gray-200/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  Please sign in to view your profile.
                </p>
                {error && (
                  <p className="text-destructive text-xs sm:text-sm mb-4">{error}</p>
                )}
                <Button
                  onClick={handleSignIn}
                  className="w-full"
                  disabled={isSigningIn}
                >
                  {isSigningIn ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </Card>
          </div>
        );

      case "authenticating":
        return (
          <div className="flex justify-center items-center min-h-[80vh] px-2 sm:px-4">
            <Card className="py-8 px-6 sm:py-10 sm:px-8 lg:py-12 lg:px-16 text-center bg-content1 w-full max-w-md mx-auto shadow-medium border border-divider/50">
              <div className="space-y-4 sm:space-y-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <LoadingSpinner />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Signing In...
                </h3>
                <p className="text-gray-200/60 text-xs sm:text-sm leading-relaxed">
                  Please complete the authentication process.
                </p>
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "1s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case "authenticated":
        return (
          <div className="relative min-h-screen overflow-hidden">
            {/* Main content container */}
            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-20">
              <div className="space-y-4 sm:space-y-6">
                {/* User Info Card */}
                <div className="flex justify-center">
                  <UserInfoCard
                    name={user?.twitter?.name ?? "Unknown"}
                    twitterHandle={user?.twitter?.username ?? "Unknown"}
                    walletAddress={user?.wallet?.address ?? "Not Connected"}
                    chain={user?.wallet?.chainType ?? "Unknown"}
                    balance={privyBalance}
                    deposits={mockUserData.deposits}
                    getDepositBalance={getDepositBalance}
                    profilePictureUrl={user?.twitter?.profilePictureUrl ?? undefined}
                  />
                </div>

                {/* Transaction History */}
                {user?.wallet?.address && (
                  <WalletTransactionHistory walletAddress={user.wallet.address} />
                )}
              </div>
            </div>

            {/* Background image - fixed positioning to prevent overflow */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="relative w-full h-full">
                <img
                  src={bg.src}
                  alt="Romeo"
                  className="absolute bottom-0 left-0 w-full h-auto max-h-[70vh] object-cover opacity-60 sm:opacity-100"
                  style={{
                    transform: "translateY(20%)",
                    maxHeight: "70vh",
                  }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderAuthState();
}
