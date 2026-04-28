"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Box, Maximize, RotateCcw } from "lucide-react";

// Add TypeScript definitions for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "ar-scale"?: string;
          "camera-controls"?: boolean;
          "touch-action"?: string;
          "shadow-intensity"?: string;
          scale?: string;
          "animation-name"?: string;
          autoplay?: boolean;
          // Add ref type for accessing properties
          ref?: React.RefObject<any>;
        },
        HTMLElement
      >;
    }
  }
}

const ModelViewer = "model-viewer" as any;

export default function ARViewerPage() {
  const router = useRouter();
  const params = useParams();
  const modelId = params.modelId as string;
  const modelViewerRef = useRef<any>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Dynamically import model-viewer on client side only
    import("@google/model-viewer").catch(console.error);
  }, []);

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    // Animate scale from 0 to 1 (100%) when loaded
    const handleLoad = () => {
      setIsLoaded(true);
      
      // We start at 0 0 0, and animate to 1 1 1 using JS
      let startScale = 0;
      const targetScale = 1;
      const duration = 1500; // 1.5 seconds
      const startTime = performance.now();

      // Custom GSAP-like easing function for bouncy pop effect
      const easeOutElastic = (x: number): number => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
      };

      const animateScale = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutElastic(progress);
        
        const currentScale = startScale + (targetScale - startScale) * easedProgress;
        
        // Update the scale attribute on the model-viewer
        viewer.setAttribute("scale", `${currentScale} ${currentScale} ${currentScale}`);

        if (progress < 1) {
          requestAnimationFrame(animateScale);
        }
      };

      requestAnimationFrame(animateScale);
    };

    const handleError = () => {
      console.error("Error loading model");
      setError(true);
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <main className="fixed inset-0 bg-slate-950 text-slate-50 flex flex-col overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header overlay */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-20 pointer-events-auto">
        <button
          onClick={() => router.push("/")}
          className="p-3 bg-slate-900/50 backdrop-blur-md rounded-full hover:bg-slate-800 transition-colors border border-slate-700 shadow-xl"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="px-4 py-2 bg-slate-900/50 backdrop-blur-md rounded-full border border-slate-700 shadow-xl text-sm font-medium flex items-center gap-2">
          <Box size={16} className="text-blue-400" />
          <span>Interactive 3D View</span>
        </div>
      </header>

      {/* Model Viewer Container */}
      <div className="flex-1 w-full relative z-10">
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 animate-pulse font-medium">Preparing AR Experience...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center p-6">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-2">
              <RotateCcw size={32} />
            </div>
            <h2 className="text-xl font-bold">Failed to load model</h2>
            <p className="text-slate-400 max-w-xs">Could not find the requested 3D model. Please return to the display screen.</p>
            <button 
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 bg-blue-600 rounded-full font-medium"
            >
              Go Back
            </button>
          </div>
        )}

        <ModelViewer
          ref={modelViewerRef}
          src={`/models/${modelId}/scene.gltf`}
          alt="A 3D model of a laptop"
          ar={true}
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          camera-controls={true}
          touch-action="pan-y"
          shadow-intensity="1"
          scale="0 0 0" // Initial scale for the pop animation
          class="w-full h-full outline-none"
        >
          {/* Custom AR Button */}
          <button 
            slot="ar-button" 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-transform hover:scale-105 pointer-events-auto"
          >
            <Maximize size={20} />
            View on your table (AR)
          </button>
        </ModelViewer>
      </div>
    </main>
  );
}
