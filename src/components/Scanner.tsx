import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, RefreshCcw, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { scanPlant } from '../lib/gemini';
import { ScanResult } from '../types';

export function Scanner() {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!image) return;
    setIsScanning(true);
    setError(null);
    try {
      const base64Data = image.split(',')[1];
      const data = await scanPlant(base64Data);
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Please check your connection and try again.");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Diagnostic Scanner</h2>
        <p className="text-slate-500">Scan leaves or crops to identify diseases using computer vision</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload/Preview Zone */}
        <div className="space-y-6">
          <div 
            className={`relative aspect-square rounded-[32px] overflow-hidden border-2 border-dashed transition-all duration-300 flex items-center justify-center
              ${image ? 'border-emerald-500 bg-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'}`}
          >
            {image ? (
              <>
                <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
                {isScanning && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
                    <motion.div 
                      className="w-full h-1 bg-emerald-500 shadow-[0_0_20px_#10b981]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ position: 'absolute' }}
                    />
                    <Sparkles className="text-emerald-400 animate-pulse" size={48} />
                    <span className="text-white font-bold tracking-widest uppercase text-sm">Deep Scanning...</span>
                  </div>
                )}
              </>
            ) : (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-4 text-slate-400 group"
              >
                <div className="p-6 rounded-full bg-white shadow-xl shadow-slate-200/50 group-hover:scale-110 transition-transform">
                  <Camera size={40} className="text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800">Upload Crop Image</p>
                  <p className="text-xs">Supports JPG, PNG (Max 10MB)</p>
                </div>
              </button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <div className="flex gap-4">
            {!result && image && !isScanning && (
               <button 
                onClick={startScan}
                className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
                >
                <Sparkles size={20} />
                Analyze Health
               </button>
            )}
            {image && !isScanning && (
               <button 
                onClick={reset}
                className="p-4 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
               >
                 <RefreshCcw size={20} />
               </button>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <AnimatePresence>
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                    result.severity === 'Low' ? 'bg-emerald-100 text-emerald-700' : 
                    result.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {result.severity} Risk Detected
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">{result.disease}</h3>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Confidence</p>
                    <p className="text-xl font-bold text-emerald-600">{(result.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    Recommended Actions
                </p>
                <div className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[10px] font-bold">{i+1}</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{rec}</p>
                        </div>
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-4">
                 <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                    Add to Field Log
                 </button>
                 <button className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                    Share
                 </button>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-rose-50 border border-rose-100 p-8 rounded-[32px] flex flex-col items-center justify-center text-center gap-4"
            >
              <AlertCircle size={48} className="text-rose-500" />
              <div className="space-y-1">
                <p className="font-bold text-rose-900">Analysis Error</p>
                <p className="text-sm text-rose-600">{error}</p>
              </div>
              <button 
                onClick={startScan}
                className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold"
              >
                Retry Scan
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-100 rounded-[32px] opacity-40">
                <ImageIcon size={64} className="text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Capture or upload an image to start high-precision diagnostic analysis.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Cards */}
      {!result && !isScanning && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/50 p-6 rounded-3xl space-y-3">
                <CheckCircle2 className="text-emerald-500" />
                <h4 className="font-bold text-emerald-900">Disease Detection</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">Early identification of fungal, bacterial, and viral pathogens with 98% accuracy.</p>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-3xl space-y-3">
                <Droplets className="text-blue-500" />
                <h4 className="font-bold text-blue-900">Nutrient Analysis</h4>
                <p className="text-xs text-blue-700 leading-relaxed">Visual cues of Nitrogen, Phosphorus, and Potassium deficiencies mapped instantly.</p>
            </div>
            <div className="bg-amber-50/50 p-6 rounded-3xl space-y-3">
                <Sparkles className="text-amber-500" />
                <h4 className="font-bold text-amber-900">Smart Prescriptions</h4>
                <p className="text-xs text-amber-700 leading-relaxed">Targeted treatment advice to reduce chemical use while maximizing yield.</p>
            </div>
          </div>
      )}
    </div>
  );
}
