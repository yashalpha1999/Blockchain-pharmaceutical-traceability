"use client";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("batches");

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 glass-card m-4 border-white/5 flex flex-col rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold tracking-tight">
            Pharma<span className="text-primary">Chain</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manufacturer Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("batches")}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'batches' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-300 hover:bg-white/5'}`}
          >
            📦 My Batches
          </button>
          <button 
            onClick={() => setActiveTab("create")}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'create' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-300 hover:bg-white/5'}`}
          >
            ✨ Create Batch
          </button>
          <button 
            onClick={() => setActiveTab("audit")}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'audit' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-300 hover:bg-white/5'}`}
          >
            🛡️ Audit Logs
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-full px-4 py-2 text-sm font-medium">
            🚪 Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-slate-400">Welcome back, Pfizer Manufacturing</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border-white/5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Fabric Node: Syncing
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary/30">
              PF
            </div>
          </div>
        </header>

        {activeTab === "batches" && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold mb-4">Recent Drug Batches</h2>
            <div className="glass-card overflow-hidden border-white/5">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-white/5 text-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Batch ID</th>
                    <th className="px-6 py-4 font-medium">Drug Name</th>
                    <th className="px-6 py-4 font-medium">Mfg Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-primary">BAT-8829</td>
                    <td className="px-6 py-4">Amoxicillin 500mg</td>
                    <td className="px-6 py-4">Oct 12, 2026</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-medium">IN TRANSIT</span></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-primary">BAT-9930</td>
                    <td className="px-6 py-4">Ibuprofen 200mg</td>
                    <td className="px-6 py-4">Oct 15, 2026</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-medium">DELIVERED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="animate-fade-in-up max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Mint New Drug Batch on Blockchain</h2>
            <div className="glass-card p-6 border-white/5">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Batch ID</label>
                    <input type="text" className="w-full bg-slate-900 border border-white/10 rounded px-4 py-2 text-white" defaultValue="BAT-1024" readOnly/>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Drug Name</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded px-4 py-2 focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Paracetamol" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Manufacturer</label>
                  <input type="text" className="w-full bg-slate-900 border border-white/10 rounded px-4 py-2 text-white" defaultValue="Pfizer Inc." readOnly/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Manufacturing Date</label>
                    <input type="date" className="w-full bg-slate-900/50 border border-white/10 rounded px-4 py-2 focus:ring-1 focus:ring-primary outline-none text-slate-300" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Expiry Date</label>
                    <input type="date" className="w-full bg-slate-900/50 border border-white/10 rounded px-4 py-2 focus:ring-1 focus:ring-primary outline-none text-slate-300" />
                  </div>
                </div>
                <button type="button" className="mt-6 w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]">
                  Register Batch on Ledger
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
