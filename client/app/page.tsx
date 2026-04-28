"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, MonitorPlay, X, Smartphone, Cpu, Box } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const LAPTOP_DATA = {
  id: "asus_rog_strix_scar_17_2023_g733_gaming_laptop",
  name: "ROG Strix SCAR 17",
  brand: "ASUS",
  description: "Beat the Best. Break all limits with the newest ROG Strix SCAR 17. The ultimate 17-inch gaming laptop with unprecedented performance.",
  features: ["NVIDIA® GeForce RTX™ 4090", "AMD Ryzen™ 9 7945HX", "17.3\" WQHD 240Hz Display", "ROG Intelligent Cooling"],
};

export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // Generate the URL pointing to the AR Viewer screen
    // We use the current origin to ensure it works whether on localhost or a local IP
    setQrUrl(`${window.location.origin}/ar/${LAPTOP_DATA.id}`);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Background ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 w-full p-6 flex justify-between items-center z-10"
      >
        <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <Box className="text-blue-500" />
          <span>XR<span className="text-blue-500">Vision</span></span>
        </div>
        <button 
          onClick={() => window.location.href = '/scanner'}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors text-sm font-medium backdrop-blur-md"
        >
          <Smartphone size={16} />
          Open Scanner
        </button>
      </motion.header>

      {/* Main Content */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 mt-16 lg:mt-0">
        
        {/* Left Column: Text & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit text-sm font-medium mb-2">
            <Cpu size={14} />
            <span>Next-Gen AR Experience</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
            {LAPTOP_DATA.brand} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {LAPTOP_DATA.name}
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            {LAPTOP_DATA.description}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {LAPTOP_DATA.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setShowQR(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] hover:-translate-y-1"
            >
              <QrCode size={20} />
              Generate AR QR Code
            </button>
            <button 
              onClick={() => window.location.href = `/ar/${LAPTOP_DATA.id}`}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all border border-slate-700 hover:border-slate-600"
            >
              <MonitorPlay size={20} />
              View Here
            </button>
          </div>
        </motion.div>

        {/* Right Column: Visual Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative w-full aspect-square max-w-lg mx-auto lg:ml-auto flex items-center justify-center"
        >
          {/* Subtle glowing ring */}
          <div className="absolute inset-0 rounded-full border border-slate-800/50 shadow-[inset_0_0_100px_-20px_rgba(59,130,246,0.1)] animate-[spin_60s_linear_infinite]" />
          
          <div className="relative w-full h-full glass rounded-3xl p-6 flex items-center justify-center flex-col overflow-hidden group">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-50 text-xs font-mono">
              <span>SCAN READY</span>
              <span>100% SCALE</span>
            </div>
            
            <div className="w-48 h-48 sm:w-64 sm:h-64 relative mb-4 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              {/* Fallback visual if model viewer isn't here - a sleek laptop icon */}
              <MonitorPlay className="w-full h-full text-slate-300 drop-shadow-2xl" strokeWidth={1} />
            </div>
            
            <div className="text-center z-10">
              <h3 className="text-xl font-bold">{LAPTOP_DATA.name}</h3>
              <p className="text-slate-400 text-sm mt-1">3D Interactive Model</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* QR Code Modal Overlay */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mt-4 mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Scan to View AR</h3>
                <p className="text-slate-400 text-sm">
                  Point your phone's camera at this code, or use our built-in scanner.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl mx-auto w-fit shadow-inner">
                {qrUrl ? (
                  <QRCodeSVG 
                    value={qrUrl} 
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="Q"
                    includeMargin={false}
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-100 rounded-lg">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-center text-xs text-slate-500 font-mono break-all bg-slate-950 p-3 rounded-xl border border-slate-800">
                {qrUrl}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
