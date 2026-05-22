"use client";
import { useState } from "react";
import Link from "next/link";

export default function Verify() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock Blockchain verification query
    setTimeout(() => {
      setLoading(false);
      setResult({
        batchId: batchId || "BAT-8829",
        drugName: "Amoxicillin 500mg",
        manufacturer: "Pfizer Inc.",
        status: "VERIFIED",
        authentic: true,
        history: [
          { date: "Oct 12, 2026", action: "CREATED", owner: "Pfizer Inc." },
          { date: "Oct 14, 2026", action: "IN_TRANSIT", owner: "Global Logistics" },
          { date: "Oct 16, 2026", action: "DELIVERED", owner: "City Pharmacy" }
        ]
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-20 relative overflow-hidden px-4">
      {/* Background Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[120px]"></div>

      <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
        ← Back to Home
      </Link>

      <div className="text-center mb-12 animate-fade-in-up z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Verify <span className="text-emerald-400">Authenticity</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Scan the QR code on your medicine packaging or manually enter the batch ID to trace its origin on the blockchain.
        </p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        {/* Input Card */}
        <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center mb-6 text-slate-500 hover:border-primary/50 hover:text-primary/80 transition-colors cursor-pointer bg-black/20">
            <span className="text-4xl mb-2">📷</span>
            <span className="font-medium">Tap to Scan QR</span>
          </div>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <form onSubmit={handleVerify} className="mt-4">
            <label className="block text-sm text-slate-400 mb-2">Enter Batch ID manually</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. BAT-1234"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-hover px-6 rounded-lg font-medium shadow-lg transition-all w-[100px] flex justify-center items-center"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Verify"}
              </button>
            </div>
          </form>
        </div>

        {/* Results Card */}
        <div className="glass-card p-8 animate-fade-in-up flex flex-col h-full" style={{ animationDelay: '0.2s' }}>
          {!result && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center">
              <span className="text-5xl mb-4">🔍</span>
              <p>Verification results will appear here</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="animate-pulse font-mono text-sm">Querying Blockchain Ledger...</p>
            </div>
          )}

          {result && !loading && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg text-emerald-400">Authentic Medicine</h3>
                  <p className="text-xs text-slate-400 font-mono">Blockchain Hash Verified</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Drug Name</p>
                  <p className="font-medium text-lg">{result.drugName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Batch ID</p>
                    <p className="font-mono text-slate-300">{result.batchId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Manufacturer</p>
                    <p className="text-slate-300">{result.manufacturer}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Provenance History</p>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {result.history.map((step: any, idx: number) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-slate-900 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-emerald-50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow md:mx-auto z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] glass-card p-3 rounded-lg border-white/5">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-sm text-slate-200">{step.owner}</div>
                          <time className="font-mono text-[10px] text-slate-500">{step.date}</time>
                        </div>
                        <div className="text-xs text-primary">{step.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
