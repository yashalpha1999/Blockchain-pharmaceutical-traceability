import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex hidden mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <p className="glass-card px-4 py-3 border border-white/10 rounded-xl font-semibold flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-ping"></span>
          Fabric Network: <span className="text-green-400">Online</span>
        </p>
        <div className="flex h-12 items-center justify-center gap-4">
          <Link href="/login" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium">
            Sign In
          </Link>
          <Link href="/verify" className="px-6 py-2 rounded-full bg-primary hover:bg-primary-hover transition-colors font-medium shadow-lg shadow-primary/30">
            Verify QR
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center text-center animate-fade-in-up mt-10 lg:mt-0" style={{ animationDelay: '0.3s' }}>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          The Future of <br className="hidden lg:block"/>
          <span className="gradient-text">Pharma Traceability</span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-300 mb-10 leading-relaxed">
          Immutable supply chain tracking and prescription management powered by Hyperledger Fabric. Ensuring authentic medicine from manufacturer to patient.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/dashboard" className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover transition-all font-semibold shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.8)] hover:-translate-y-1">
            Access Dashboard
          </Link>
          <Link href="/verify" className="px-8 py-4 rounded-full glass-card hover:bg-white/5 transition-all font-semibold hover:-translate-y-1">
            Scan Medicine QR
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="glass-card p-8 hover-lift cursor-default group">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">🛡️</div>
          <h3 className="text-xl font-bold mb-3">Anti-Counterfeit</h3>
          <p className="text-slate-400 text-sm leading-relaxed">Cryptographically secure drug batch provenance verifying authenticity across the supply chain.</p>
        </div>
        <div className="glass-card p-8 hover-lift cursor-default group">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">🔗</div>
          <h3 className="text-xl font-bold mb-3">Immutable Audit</h3>
          <p className="text-slate-400 text-sm leading-relaxed">Every transfer of ownership is anchored to the blockchain providing regulatory transparency.</p>
        </div>
        <div className="glass-card p-8 hover-lift cursor-default group">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">💊</div>
          <h3 className="text-xl font-bold mb-3">Smart Prescriptions</h3>
          <p className="text-slate-400 text-sm leading-relaxed">Prevent duplicate dispensing with digital prescriptions that are securely verified by pharmacies.</p>
        </div>
      </div>
    </main>
  );
}
