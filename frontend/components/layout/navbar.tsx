"use client";

import { Github, MessageCircle, Twitter, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLogout, usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const { ready, authenticated, login, user } = usePrivy();
  const { wallets } = useWallets();
  const { logout } = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function createEVMWallet() {
    // EVM wallet creation is handled automatically by Privy
    console.log('EVM wallet creation');
  }

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  // Handle login redirect to profile
  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      // Only redirect if not already on profile page, homepage, approval page, privacy, or terms
      const allowedPages = ["/profile", "/", "/privacy", "/terms"];
      const isAllowedPage = pathname && (allowedPages.includes(pathname) || pathname.startsWith("/approve/"));
      
      if (pathname && !isAllowedPage) {
        router.push("/profile");
      }
    }
  }, [ready, authenticated, user?.wallet?.address, pathname, router]);

  if (ready && authenticated) {
    if (!user?.wallet) createEVMWallet();
  }

  // Handle logout redirect to homepage
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="relative z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-semibold text-white">
            EasyPay
          </span>
        </Link>

        {/* Navigation Links - Desktop */}

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Social Icons - Desktop */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            {/* <Github className="w-4 h-4 lg:w-5 lg:h-5 text-white hover:text-cyan-400 cursor-pointer transition-colors" /> */}
            {/* <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-white hover:text-cyan-400 cursor-pointer transition-colors" /> */}
            <a href="https://x.com/easypay_app">
              <Twitter className="w-4 h-4 lg:w-5 lg:h-5 text-white hover:text-cyan-400 cursor-pointer transition-colors" />
            </a>
          </div>

          {/* Auth Button */}
          <div className="ml-1 sm:ml-2">
            {!authenticated ? (
              <Button
                disabled={disableLogin}
                onClick={async () => {
                  login();
                }}
                className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
              >
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Out</span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-sm">
          <div className="px-4 sm:px-6 py-4 space-y-3">
            {/* <Link
              href="#"
              className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Supported Chains
            </Link> */}
            {/* <Link
              href="#"
              className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Whitepaper
            </Link> */}
            {authenticated && (
              <Link
                href="/profile"
                className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
              {/* <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /> */}
              {/* <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /> */}
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
