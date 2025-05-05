// Updated LayoutWrapper with advanced glassmorphism and mesh gradients (Light Theme)
export default function LayoutWrapper({ children }) {
    return (
      <div className="relative min-h-screen w-screen overflow-hidden font-sans text-zinc-800">
        {/* Main background with light mesh gradient */}
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-purple-50 via-green-50 to-indigo-50">
          {/* Mesh gradient blobs */}
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-blue-200/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-purple-200/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-pink-200/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-emerald-200/40 to-transparent rounded-full blur-3xl" />
        </div>
  
        {/* Animated floating particles
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-indigo-400/30 animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full bg-purple-400/40 animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-pink-400/20 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-2/3 left-1/5 w-3 h-3 rounded-full bg-emerald-400/30 animate-pulse" style={{ animationDuration: '4s' }} />
        </div> */}
  
        {/* Noise texture overlay */}
        <div className="fixed inset-0 -z-10 opacity-[0.10] mix-blend-soft-light">
          <div className="absolute inset-0 bg-[url('/noise.svg')] bg-repeat" />
        </div>
  
        {/* Subtle grid
        <div className="fixed inset-0 -z-10 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_#6366f1_1px,_transparent_1px),_linear-gradient(to_bottom,_#6366f1_1px,_transparent_1px)] bg-[size:40px_40px]" />
        </div> */}
  
        {children}
      </div>
    );
}
