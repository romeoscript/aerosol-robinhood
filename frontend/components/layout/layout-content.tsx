"use client";

import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = pathname !== "/profile";
  
  // Pages that should have their own full-screen layout
  const fullScreenPages = ["/privacy", "/terms", "/"];
  const isFullScreenPage = pathname && fullScreenPages.includes(pathname);

  return (
    <>
      <Navbar />
      {isFullScreenPage ? (
        children
      ) : (
        <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      )}
      
      {/* Footer */}
      {showFooter && <Footer />}
      
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1f2937',
            border: '1px solid #374151',
            color: '#ffffff',
          },
        }}
      />
    </>
  );
} 