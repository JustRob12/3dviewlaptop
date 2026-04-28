"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { ArrowLeft, ScanLine, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ScannerPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Initialize the scanner when the component mounts
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        // Handle the successful scan
        if (decodedText.includes("/ar/")) {
          // If it's a URL to our AR page, redirect to it
          window.location.href = decodedText;
        } else {
          // Otherwise, just show an error
          setError("Invalid QR Code. Please scan a valid AR Vision code.");
        }
      },
      (errorMessage) => {
        // Ignore normal scan errors (e.g., when no QR code is in frame)
      }
    );

    // Cleanup when the component unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="p-6 flex items-center gap-4 z-10">
        <button
          onClick={() => router.push("/")}
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Scan AR Code</h1>
      </header>

      {/* Main Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full glass rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-4">
              <ScanLine size={32} />
            </div>
            <h2 className="text-2xl font-bold">Point Camera at QR</h2>
            <p className="text-slate-400 text-sm mt-2">
              Align the QR code within the frame to view the 3D model in AR.
            </p>
          </div>

          {/* Scanner Container */}
          <div className="w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800">
            {/* The Html5QrcodeScanner will mount its UI inside this div */}
            <div id="reader" className="w-full h-full object-cover"></div>
            
            {/* Custom Overlay for Scanner */}
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl pointer-events-none m-4" />
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl pointer-events-none" />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-200">{error}</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Custom Styles for the HTML5 Scanner library to override its default ugly UI */}
      <style jsx global>{`
        #reader {
          border: none !important;
        }
        #reader__dashboard_section_csr span {
          color: white !important;
          font-family: var(--font-sans);
        }
        #reader__dashboard_section_csr select {
          background: #1e293b !important;
          color: white !important;
          border: 1px solid #334155 !important;
          padding: 8px !important;
          border-radius: 8px !important;
          margin: 8px 0 !important;
        }
        #reader__dashboard_section_csr button {
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
        }
        #reader__scan_region {
          background: transparent !important;
        }
        #reader__dashboard_section_swaplink {
          display: none !important; /* Hide "Scan an Image File" link */
        }
        #reader__dashboard_section_csr > div > span {
          display: none !important; /* Hide default "Camera request permissions" text if possible */
        }
      `}</style>
    </main>
  );
}
