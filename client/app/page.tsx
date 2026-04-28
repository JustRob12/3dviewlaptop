"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, MonitorPlay, X, ScanLine, Cpu, Box, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const LAPTOP_DATA = {
  name: "ROG Strix SCAR 17",
  brand: "ASUS",
  description: "Beat the Best. Break all limits with the newest ROG Strix SCAR 17. The ultimate 17-inch gaming laptop with unprecedented performance.",
  features: ["NVIDIA® GeForce RTX™ 4090", "AMD Ryzen™ 9 7945HX", "17.3\" WQHD 240Hz Display", "ROG Intelligent Cooling"],
};

export default function Home() {
  const [showARModal, setShowARModal] = useState(false);
  const [arUrl, setArUrl] = useState("");

  useEffect(() => {
    // Generate the URL pointing to our new static AR.js page
    setArUrl(`${window.location.origin}/ar.html`);
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
            <ScanLine size={14} />
            <span>Marker-Based AR Experience</span>
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
              onClick={() => setShowARModal(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] hover:-translate-y-1"
            >
              <QrCode size={20} />
              Open AR Tracker
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
              <MonitorPlay className="w-full h-full text-slate-300 drop-shadow-2xl" strokeWidth={1} />
            </div>
            
            <div className="text-center z-10">
              <h3 className="text-xl font-bold">{LAPTOP_DATA.name}</h3>
              <p className="text-slate-400 text-sm mt-1">Ready for Marker-Based AR</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* AR Marker Setup Modal Overlay */}
      <AnimatePresence>
        {showARModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowARModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Step 1: Connect Phone */}
              <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Connect your Phone</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Scan this QR code with your phone's camera to open the AR view.
                </p>
                
                <div className="bg-white p-4 rounded-2xl shadow-inner">
                  {arUrl ? (
                    <QRCodeSVG 
                      value={arUrl} 
                      size={180}
                      bgColor="#ffffff"
                      fgColor="#0f172a"
                      level="H"
                      includeMargin={false}
                    />
                  ) : (
                    <div className="w-[180px] h-[180px] bg-slate-100 rounded-lg animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono mt-6 break-all">
                  {arUrl}
                </p>
              </div>

              {/* Step 2: Scan Marker */}
              <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center text-center bg-slate-800/20">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Scan the Marker</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Once the AR page opens on your phone, point it at this symbol. The 3D laptop will pop up exactly here!
                </p>
                
                <div className="bg-white p-4 rounded-2xl shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)]">
                  {/* Standard Hiro Marker Image for AR.js tracking */}
                  <img 
                    src="https://jeromeetienne.github.io/AR.js/data/images/hiro.png" 
                    alt="Hiro AR Marker" 
                    className="w-[180px] h-[180px] object-contain"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-6 flex items-center gap-2">
                  <Smartphone size={14} /> Keep this open on your screen
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
