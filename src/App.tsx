import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, AudioWaveform, Zap, Clock, Sparkles, Sliders, ShieldCheck, Search, ChevronDown } from 'lucide-react';
import { config } from './data';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const icons = {
  AudioWaveform,
  Zap,
  Clock,
  Sparkles,
  Sliders,
  ShieldCheck
};

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-fuchsia-500/30 selection:text-fuchsia-200 overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Features />
        <Showcase />
        <Uptime />
        <Premium />
        <Commands />
        <Team />
        <FAQ />
        <SupportCTA />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------
// Components
// ---------------------------------------------------------

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Commands', href: '#commands' },
    { name: 'Premium', href: '#premium' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Support', href: config.links.support, external: true }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img src={config.brand.logo} alt="XYRUS Logo" className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-fuchsia-500/50 transition-all" />
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">XYRUS</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="h-6 w-px bg-white/10 hidden lg:block"></div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Systems Normal</span>
          </div>

          <a 
            href={config.links.invite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
          >
            INVITE XYRUS
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-neutral-400 hover:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-white/5 py-6 px-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-neutral-300 hover:text-white py-2"
                onClick={() => setIsOpen(false)}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-neutral-300 tracking-widest uppercase">All Systems Normal</span>
            </div>

            <a 
              href={config.links.invite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-6 py-4 text-center rounded-xl bg-white text-black font-bold text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
            >
              INVITE XYRUS
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full blur-[120px] mix-blend-screen"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen"
        ></motion.div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/80 to-neutral-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider text-neutral-300">XYRUS IS ONLINE</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.05]">
              Your Music.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-fuchsia-400 to-indigo-400 drop-shadow-sm">Your Server.</span><br />
              24/7.
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-xl font-light tracking-wide">
              {config.brand.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href={config.links.invite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
              >
                INVITE XYRUS
              </a>
              <a 
                href={config.links.support} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                XYRUS HQ
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>
              <motion.img 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                src={config.brand.logo} 
                alt="XYRUS Bot" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl ring-1 ring-white/10"
              />
              {/* Decorative UI elements floating around */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
                  <Clock className="text-fuchsia-400" size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">Uptime</p>
                  <p className="text-lg font-bold text-white">24/7 Premium</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.02] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5"
        >
          {config.stats.map((stat, i) => (
            <motion.div variants={fadeUp} key={i} className="flex flex-col items-center justify-center text-center px-4 group">
              <span className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</span>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-indigo-400">Better Music</span></h2>
          <p className="text-xl text-neutral-400 font-light tracking-wide">Powerful music features designed for a better Discord experience.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {config.features.map((feature, i) => {
            const Icon = icons[feature.icon as keyof typeof icons] || AudioWaveform;
            // Make first and last feature span 2 columns on large screens for a premium bento grid look
            const isWide = i === 0 || i === 5;
            
            return (
              <motion.div variants={fadeUp} key={i} className={`group relative bg-neutral-900/40 border border-white/5 hover:border-fuchsia-500/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-neutral-900/80 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(217,70,239,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${isWide ? 'lg:col-span-2' : ''}`}>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fuchsia-500/10 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                
                <div className={`relative z-10 flex flex-col h-full ${isWide ? 'md:flex-row md:items-center gap-8' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-fuchsia-500/20 group-hover:to-indigo-500/20 group-hover:text-fuchsia-300 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 text-white shadow-lg ${isWide ? 'mb-0' : 'mb-8'}`}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-300 group-hover:to-indigo-300 transition-all ${isWide ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-4'}`}>{feature.title}</h3>
                    <p className={`text-neutral-400 leading-relaxed font-light ${isWide ? 'text-lg md:max-w-md' : 'text-base'}`}>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-700"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-1000"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built For Music</motion.h2>
              <motion.p variants={fadeUp} className="text-xl text-neutral-400 mb-8">
                Experience seamless playback, intuitive queuing, and precise audio control directly from your server.
              </motion.p>
              
              <ul className="space-y-4">
                {['High fidelity streaming', 'Advanced queue management', 'Custom audio filters', 'Volume normalization'].map((item, i) => (
                  <motion.li variants={fadeUp} key={i} className="flex items-center gap-3 text-neutral-300">
                    <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                      <Zap size={14} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl ring-1 ring-white/5">
                {/* Mock UI */}
                <div className="flex items-center gap-4 mb-6">
                  <img src={config.brand.logo} className="w-12 h-12 rounded-xl object-cover" alt="Album Art" />
                  <div>
                    <p className="text-white font-bold text-sm">Now Playing</p>
                    <p className="text-neutral-400 text-xs">XYRUS Premium Audio</p>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-neutral-800 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 w-2/3 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
                  <span>2:14</span>
                  <span>3:45</span>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors"><AudioWaveform size={18} /></div>
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 cursor-pointer transition-colors shadow-lg shadow-white/10"><Zap size={24} /></div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors"><Sliders size={18} /></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Uptime() {
  return (
    <section className="py-32 relative flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mb-12 relative inline-block group"
        >
          <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full group-hover:bg-green-500/30 transition-colors duration-500"></div>
          <div className="w-48 h-48 rounded-full border border-white/5 bg-neutral-900/50 backdrop-blur-xl flex flex-col items-center justify-center relative shadow-2xl group-hover:scale-105 group-hover:border-green-500/30 transition-all duration-500">
            <span className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-pulse mb-4"></span>
            <span className="text-3xl font-bold tracking-tight text-white mb-1">ONLINE</span>
            <span className="text-sm font-medium text-green-400 tracking-widest">PREMIUM</span>
          </div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Always Online.<br/>Always Playing.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-neutral-400 max-w-2xl mx-auto"
        >
          Unlock 24/7 playback with XYRUS Premium. No interruptions, no drops. Get it for free by joining our community and completing tasks.
        </motion.p>
      </div>
    </section>
  );
}

function Premium() {
  return (
    <section id="premium" className="py-32 bg-neutral-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-8">
              <Sparkles className="text-fuchsia-400" size={16} />
              <span className="text-xs font-semibold tracking-wider text-fuchsia-300">FREE PREMIUM</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Premium Doesn't Have To Cost You.</h2>
            <p className="text-xl text-neutral-400 mb-10">
              Unlock 24/7 playback and advanced features for your server without spending a dime. Join XYRUS HQ and complete tasks to earn Free Premium.
            </p>
            
            <a 
              href={config.links.support} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)] group"
            >
              GET FREE PREMIUM <Zap size={20} className="fill-black group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-950 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors duration-700"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors duration-1000"></div>
            
            <h3 className="text-2xl font-bold text-white mb-2">XYRUS Premium</h3>
            <p className="text-neutral-400 mb-8">The ultimate music experience.</p>
            
            <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {config.premium.map((item, i) => (
                <motion.li variants={fadeUp} key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={14} className="text-fuchsia-400" />
                  </div>
                  <span className="text-lg text-neutral-200 font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Commands() {
  return (
    <section id="commands" className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Power At Your Fingertips</h2>
          <p className="text-xl text-neutral-400">Everything you need to control your audio experience.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="bg-neutral-900/40 border border-white/5 hover:border-fuchsia-500/30 rounded-[2rem] p-10 md:p-16 text-center flex flex-col items-center transition-all duration-500 group shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-fuchsia-500/10 transition-all duration-500">
            <Search className="text-fuchsia-400" size={32} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Discover Commands</h3>
          <p className="text-lg text-neutral-400 mb-10 max-w-xl">
            We keep it simple. Invite XYRUS to your server and type <code className="text-fuchsia-300 font-mono bg-fuchsia-500/10 px-2 py-1 rounded-md">/help</code> to see all available commands and features instantly.
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <a 
              href={config.links.invite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              INVITE XYRUS
            </a>
            <span className="text-sm text-neutral-500">(This will redirect you to Discord to authorize the bot)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-32 bg-neutral-900/30 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Meet The Team</h2>
          <p className="text-xl text-neutral-400">The people behind XYRUS.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {config.team.map((member, i) => {
            const isOwner = member.role.includes("OWNER");
            const isAdmin = member.role.includes("ADMIN");
            
            return (
              <motion.div variants={fadeUp} key={i} className={`group relative bg-neutral-950 border border-white/5 rounded-[2rem] p-2 transition-all duration-500 hover:-translate-y-4 ${isOwner ? 'hover:border-fuchsia-500/50 hover:shadow-[0_30px_60px_-15px_rgba(217,70,239,0.3)]' : 'hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]'}`}>
                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-neutral-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-out" />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-xs font-bold text-white/50 tracking-widest bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-fuchsia-100 transition-colors">{member.name}</h3>
                  <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full border backdrop-blur-sm transition-all duration-300 ${isOwner ? 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300 group-hover:bg-fuchsia-500/20' : isAdmin ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 group-hover:bg-indigo-500/20' : 'bg-white/5 border-white/10 text-neutral-300 group-hover:bg-white/10'}`}>
                    <span className="text-xs font-bold tracking-widest uppercase">{member.role}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Frequently Asked Questions</h2>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {config.faq.map((item, i) => (
            <motion.div 
              variants={fadeUp}
              key={i} 
              className={`border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-neutral-900/80 border-white/20 shadow-lg shadow-black/50' : 'bg-neutral-950 hover:bg-neutral-900/40 hover:border-white/10'}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`font-semibold text-lg pr-8 transition-colors ${openIndex === i ? 'text-fuchsia-300' : 'text-white'}`}>{item.question}</span>
                <ChevronDown className={`flex-shrink-0 text-neutral-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-fuchsia-400' : ''}`} size={20} />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-neutral-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SupportCTA() {
  return (
    <section className="py-24 border-t border-white/5 bg-white/[0.02] relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Need Help With XYRUS?</h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          Join XYRUS HQ and connect with the community and staff.
        </p>
        <a 
          href={config.links.support} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex px-8 py-4 rounded-full bg-neutral-800 text-white font-semibold text-lg hover:bg-neutral-700 hover:scale-105 active:scale-95 transition-all border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-white/20"
        >
          XYRUS HQ
        </a>
      </motion.div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-fuchsia-600/10 blur-[150px] rounded-[100%] pointer-events-none group-hover:bg-fuchsia-600/20 transition-colors duration-1000"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready To Upgrade Your<br/>Discord Music Experience?</h2>
        <p className="text-xl text-neutral-400 mb-12">
          Bring XYRUS to your server today.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={config.links.invite} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
          >
            INVITE XYRUS
          </a>
          <a 
            href={config.links.support} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-full bg-neutral-900 border border-white/10 text-white font-bold text-lg hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          >
            JOIN XYRUS HQ
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={config.brand.logo} alt="XYRUS Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-bold text-xl tracking-tight text-white">XYRUS</span>
            </div>
            <p className="text-neutral-400 max-w-sm">
              {config.brand.tagline}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Features', 'Commands', 'Premium', 'Team', 'FAQ'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-neutral-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Community</h4>
            <ul className="space-y-4">
              <li>
                <a href={config.links.support} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">XYRUS HQ</a>
              </li>
              <li>
                <a href={config.links.invite} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">Invite Bot</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} XYRUS. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <span>Created by:</span>
            <span className="text-neutral-300 font-medium">EASY — OWNER / DEVELOPER</span>
            <span className="text-neutral-300 font-medium">GORO GORO — OWNER / DEVELOPER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
