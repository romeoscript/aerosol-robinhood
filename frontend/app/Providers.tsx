"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { robinhoodChain, RPC_URL } from "@/lib/chain";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Privy/wagmi are browser-only. Rendering their consumers (e.g. the Navbar's
  // usePrivy) during the server prerender pass crashes the build ("Cannot read
  // properties of null (reading 'useContext')"). Gate the app on a client mount:
  // `mounted` is false on both the server and the first client render, so there
  // is no hydration mismatch, then it flips to true and renders the real tree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const network = robinhoodChain;
  const rpcUrl = RPC_URL;

  const config = createConfig({
    chains: [network],
    transports: {
      [network.id]: http(rpcUrl),
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
          clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || ""}
          onSuccess={(user) => {
            // Only redirect to profile from home page, not from other pages
            if (typeof window !== "undefined") {
              const currentPath = window.location.pathname;
              console.log("Privy onSuccess - Current path:", currentPath);
              if (currentPath === "/" || currentPath === "/home") {
                console.log("Redirecting to profile from home page");
                router.push("/profile");
              } else {
                console.log("Not redirecting, staying on current page:", currentPath);
              }
            }
          }}
          config={{
            appearance: {
              walletChainType: "ethereum-only",
              theme: "light",
              accentColor: "#676FFF",
            },
            loginMethods: ["twitter"],
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            supportedChains: [
              {
                name: network.name,
                id: network.id,
                rpcUrls: {
                  default: {
                    http: [rpcUrl],
                  },
                },
                nativeCurrency: {
                  name: "Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
              },
            ],
            defaultChain: {
              name: network.name,
              id: network.id,
              rpcUrls: {
                default: {
                  http: [rpcUrl],
                },
              },
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
            },
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
