import React, { useState, useEffect } from 'react';
import { 
  Calculator as CalcIcon, 
  MapPin, 
  TrendingUp, 
  Sprout, 
  Navigation, 
  AlertCircle,
  Menu,
  X,
  Plane,
  ChevronRight,
  Leaf,
  BarChart2,
  Home,
  LayoutDashboard,
  Store,
  Loader2,
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  RefreshCcw,
  FileText,
  Camera,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

// --- Shared Data ---
const trendData = [
  { name: 'Wheat', profit: 42000, color: '#059669' },
  { name: 'Cotton', profit: 55000, color: '#10b981' },
  { name: 'Masoor', profit: 85000, color: '#059669' },
  { name: 'Sunflower', profit: 98000, color: '#10b981' },
  { name: 'Moong', profit: 72000, color: '#059669' },
  { name: 'Sarson', profit: 68000, color: '#10b981' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'market' | 'drone' | 'soil'>('home');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F4F2] font-sans text-emerald-950 flex flex-col pb-24">
      {/* Mobile-style Top Bar */}
      <header className="bg-white px-6 py-5 fixed top-0 w-full z-40 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Leaf size={18} className="text-white" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-emerald-900 leading-none">
            AI <span className="text-emerald-600">FARMERS</span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Local Mandi Live</span>
        </div>
      </header>

      {/* Content Container */}
      <div className="mt-24 px-4 w-full max-w-lg mx-auto flex-1 h-full h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 pb-12"
            >
              <HeroCard onAction={() => setActiveTab('calc')} />
              <WeatherForecastCard />
              <AlternativeCropsCard />
            </motion.div>
          )}

          {activeTab === 'calc' && (
            <motion.div 
              key="calc"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="pb-12"
            >
              <CalculatorCard />
            </motion.div>
          )}

          {activeTab === 'soil' && (
            <motion.div 
              key="soil"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="pb-12"
            >
              <SoilAnalysisCard />
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div 
              key="market"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="pb-12"
            >
              <MarketAlertsCard />
            </motion.div>
          )}

          {activeTab === 'drone' && (
            <motion.div 
              key="drone"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="pb-12"
            >
              <DroneBookingCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-t border-emerald-100 flex items-center justify-around px-2 z-50">
        <NavButton active={activeTab === 'home'} icon={<Home />} label="Home" onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'calc'} icon={<CalcIcon />} label="Hisaab" onClick={() => setActiveTab('calc')} />
        <NavButton active={activeTab === 'soil'} icon={<FileText />} label="Soil Report" onClick={() => setActiveTab('soil')} />
        <NavButton active={activeTab === 'market'} icon={<Store />} label="Mandi" onClick={() => setActiveTab('market')} />
        <NavButton active={activeTab === 'drone'} icon={<Plane />} label="Drone" onClick={() => setActiveTab('drone')} />
      </nav>
    </div>
  );
}

// --- Layout Components ---

function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[100] bg-[#021d12] flex flex-col items-center justify-center p-8 overflow-hidden text-center"
    >
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-transparent to-[#021d12]"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-emerald-500/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] bg-emerald-400/10 rounded-full blur-[140px] animate-pulse" />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 space-y-16"
      >
        <div className="relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [12, 10, 12]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-48 h-48 bg-gradient-to-tr from-white to-emerald-50 rounded-[4rem] flex items-center justify-center mx-auto shadow-[0_40px_80px_-15px_rgba(16,185,129,0.25)]"
          >
            <Leaf size={96} className="text-emerald-500 drop-shadow-2xl" />
            
            {/* Glow Effect around logo */}
            <div className="absolute inset-0 rounded-[4rem] border-2 border-emerald-400/20 blur-sm"></div>
          </motion.div>
          
          {/* Floating Accent */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-2 bg-emerald-400 text-emerald-950 p-4 rounded-3xl shadow-2xl border-4 border-[#021d12]"
          >
            <Plane size={28} className="rotate-45" />
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <span className="text-emerald-400 font-black uppercase tracking-[0.6em] text-[10px] mb-4 block opacity-80">Jadeed • Khushhaal • Kamyab</span>
            
            {/* Metallic Shine Text Effect */}
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.8] relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-white bg-[length:200%_auto] animate-shine">
                Powerful <br/> 
                <span className="italic text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Kissan</span>
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-emerald-100/40 font-light uppercase tracking-[0.25em] text-[11px] max-w-[300px] mx-auto leading-relaxed"
          >
            Kissan ki taraqqi, <br/> Mulk ki khushhali ka naya safar
          </motion.p>
        </div>

        <motion.button 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: 'spring', damping: 20 }}
          onClick={onStart}
          onHoverStart={() => {}}
          className="group relative bg-emerald-500 text-emerald-950 px-12 py-7 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] active:scale-95 transition-all flex items-center gap-6 mx-auto overflow-hidden"
        >
          {/* Button Glow/Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          <span className="relative z-10">Kamyabi Ka Safar</span>
          <ChevronRight size={32} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Bottom Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <div className="h-[1px] w-12 bg-emerald-400 mb-2"></div>
        <div className="flex items-center gap-4 text-white font-mono text-[9px] uppercase tracking-[0.5em]">
          <span>Verified Tool</span>
          <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
          <span>Agri-Tech 2026</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center flex-1 py-3 transition-colors ${active ? 'text-emerald-600' : 'text-stone-400'}`}>
      <div className={`transition-transform ${active ? 'scale-110 -translate-y-1' : 'opacity-70'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-wider mt-1 transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
      {active && <motion.div layoutId="dot" className="w-1 h-1 bg-emerald-600 rounded-full mt-1" />}
    </button>
  );
}

// --- Card Components ---

function HeroCard({ onAction }: { onAction: () => void }) {
  return (
    <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="relative z-10 space-y-6">
        <h2 className="text-4xl font-black uppercase italic leading-[0.85] tracking-tighter">
          Jadeed Kheti, <br/> Behtareen Kamai.
        </h2>
        <p className="text-emerald-100/70 text-sm font-bold leading-snug max-w-[200px]">AI Farmers ke sath apni fasal ki hifazat karen aur ziada munafa payen.</p>
        <button onClick={onAction} className="bg-emerald-400 text-emerald-950 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
          Hisaab Shuru Karein <ChevronRight size={14} />
        </button>
      </div>
      <Store size={120} className="absolute bottom-[-20px] right-[-20px] text-emerald-800 opacity-20 rotate-12" />
    </div>
  );
}

function CalculatorCard() {
  const [acreage, setAcreage] = useState('12');
  const [seedCost, setSeedCost] = useState('45000');
  const [sprayCost, setSprayCost] = useState('18000');
  const [result, setResult] = useState<{ total: number; urdu: string } | null>(null);

  const calculate = () => {
    const total = (parseFloat(seedCost) || 0) + (parseFloat(sprayCost) || 0);
    const perAcre = total * (parseFloat(acreage) || 1);
    setResult({
      total: perAcre,
      urdu: `Aap ka kul kharcha ${perAcre.toLocaleString()} PKR ban raha hai.`
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-emerald-50">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-900 leading-none">Hisaab</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">Cost Prediction v2.1</p>
        </div>
        <CalcIcon size={32} className="text-emerald-100" />
      </header>

      <div className="space-y-6">
        <InputGroup label="Raqba (Acreage)" value={acreage} onChange={setAcreage} icon="A" />
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Seed Cost" value={seedCost} onChange={setSeedCost} icon="S" />
          <InputGroup label="Spray Cost" value={sprayCost} onChange={setSprayCost} icon="P" />
        </div>
        
        <button 
          onClick={calculate}
          className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 active:scale-95 transition-all text-lg"
        >
          Check Result
        </button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-emerald-50 rounded-[2rem] border-2 border-dashed border-emerald-100 mt-6"
          >
            <div className="text-[10px] font-black uppercase text-emerald-600 mb-1">Kul Kharcha Result</div>
            <div className="text-5xl font-black text-emerald-900 leading-none mb-4">{result.total.toLocaleString()}<span className="text-xs uppercase font-normal ml-2 opacity-50">PKR</span></div>
            <p className="text-base font-bold text-emerald-800 italic font-serif leading-tight">{result.urdu}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function SoilAnalysisCard() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeSoil = async () => {
    if (!image) return;
    setLoading(true);
    setAnalysis(null);

    // Simulated Smart Analysis WITHOUT Gemini API
    setTimeout(() => {
      const mockResult = `Aap ki matti (soil) ki report ka tajzia mukammal ho chuka hai:

1. Sehat (Matti ki Sehat): Pho (pH) level 7.5 hai jo ke thora alkaline hai. Nitrogen ki miqdar darmiani hai lekin Phosphorus aur Organic matter kam hain.
2. Mashwara (Khaad): 1 bora DAP aur 0.5 bora Urea fi acre istamal karein. Zinc ki kami poori karne ke liye Zinc Sulphate ka spray karein.
3. Faslein: Is matti mein Gandum (Wheat) aur Makai (Maize) ki paidawar bohot achi hogi.
4. Professional Tip: Jadeed tarikon se ab-pashi karein aur matti ki tawanai barhane ke liye gobar ki khaad ka istamal barhayen.

Kamyab Kissan ban'ne ke liye in hidayaat par amal karein!`;
      setAnalysis(mockResult);
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-emerald-50">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-900 leading-none">Matti Ki Janch</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">Smart Soil Analysis</p>
        </div>
        <FileText size={32} className="text-emerald-100" />
      </header>

      <div className="space-y-6">
        {!image ? (
          <label className="border-4 border-dashed border-emerald-50 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-emerald-50/50 transition-all group">
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <div className="text-center">
              <span className="block font-black uppercase text-xs tracking-widest text-emerald-900">Report Upload Karein</span>
              <span className="text-[10px] font-bold text-stone-400">Tasveer ya PDF (Image) select karein</span>
            </div>
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-emerald-100 h-48">
              <img src={image} alt="Soil Report" className="w-full h-full object-cover" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-xl text-red-500 hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <button 
              onClick={analyzeSoil}
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-50 transition-all text-lg flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <RefreshCcw size={20} />}
              {loading ? 'Samazh raha hai...' : 'Report Scan Karein'}
            </button>
          </div>
        )}

        {analysis && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-emerald-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FileText size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Expert Mashwara</span>
              </div>
              <div className="prose prose-invert prose-sm">
                <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap font-sans opacity-95">
                  {analysis}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange, icon }: { label: string, value: string, onChange: (v: string) => void, icon?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-1">{label}</label>
      <div className="relative">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#f8faf9] border-2 border-transparent p-4 rounded-2xl font-mono text-xl focus:border-emerald-500 transition-all outline-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-emerald-200 text-xs">{icon}</div>
      </div>
    </div>
  );
}

function MarketAlertsCard() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Gandum', 'Kapaas', 'Moong', 'Rice']);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const ALL_CROPS = ['Gandum', 'Kapaas', 'Moong', 'Rice'];

  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);
    
    // Professional Mock Data with detailed info
    setTimeout(() => {
      const allAlerts = [
        { 
          id: 1,
          crop: 'Gandum', 
          fullName: 'Gandum (Wheat)',
          action: 'HOLD', 
          msg: 'Market mein supply barh rahi hai, abhi store karein.', 
          price: '4,650',
          details: 'Pechlay saal ki nisbat is baar paidaowar achi hai, lekin barishon ki wajah se mandi mein rukawat aa sakti hai. Mashwara hai ke kam az kam 1 mahina intezar karein.'
        },
        { 
          id: 2,
          crop: 'Kapaas', 
          fullName: 'Kapaas (Cotton)',
          action: 'SELL', 
          msg: 'International demand achi hai, munafa kama lein.', 
          price: '9,400',
          details: 'Yarn ki qimat charhnay ki wajah se ginning factories ko kapaas ki shaded zaroorat hai. Yeh rate beichne ke liye bahtareen hai.'
        },
        { 
          id: 3,
          crop: 'Moong', 
          fullName: 'Moong (Mung)',
          action: 'BUY', 
          msg: 'Shortage ka khadsha hai, stock kar lene mein faida hai.', 
          price: '8,200',
          details: 'Androoni sindh mein fasal kam honay ki wajah se aglay 3 mahino mein rates 20% tak barh saktay hain.'
        },
        { 
          id: 4,
          crop: 'Rice', 
          fullName: 'Basmati (Rice)',
          action: 'HOLD', 
          msg: 'Export demands barh rahi hain.', 
          price: '12,500',
          details: 'Export orders ki wajah se rates mein istehkam (stability) hai. Mazeed 500-800 rupaye fi mann izafa mutawaqqay hai.'
        }
      ];
      
      setAlerts(allAlerts.filter(a => selectedCrops.includes(a.crop)));
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    fetchAlerts();
  }, [selectedCrops]);

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const getActionStyles = (action: string) => {
    switch (action) {
      case 'BUY': return 'bg-blue-100 text-blue-700';
      case 'SELL': return 'bg-emerald-100 text-emerald-700';
      case 'HOLD': return 'bg-amber-100 text-amber-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-emerald-50">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-900 leading-none">Mandi Alerts</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">Smart Insights</p>
        </div>
        <button 
          onClick={fetchAlerts} 
          disabled={loading}
          className={`w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 active:scale-90 transition-all ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCcw size={20} />
        </button>
      </header>

      {/* Crop Customization */}
      <div className="flex flex-wrap gap-2 mb-8">
        {ALL_CROPS.map(crop => (
          <button
            key={crop}
            onClick={() => toggleCrop(crop)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedCrops.includes(crop) 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {loading && alerts.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-[#f8faf9] rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {error && <p className="text-[10px] font-black text-red-400 uppercase tracking-widest text-center">{error}</p>}
          {alerts.length === 0 && !loading && (
            <p className="text-[10px] font-bold text-stone-400 text-center py-8">Koi fasal select nahi ki gayi.</p>
          )}
          {alerts.map((alert) => (
            <motion.div 
              key={alert.id} 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-[#f8faf9] rounded-3xl border border-emerald-50/50 space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-black uppercase tracking-tighter">{alert.fullName}</span>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${getActionStyles(alert.action)}`}>{alert.action}</span>
              </div>
              
              <p className="text-xs font-bold text-stone-500 leading-tight italic font-sans">{alert.msg}</p>
              
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-emerald-50 shadow-sm">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Rate</span>
                <span className="text-xl font-mono font-black text-emerald-700">{alert.price} <span className="text-xs">/40KG</span></span>
              </div>

              <button 
                onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
                className="w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-700 py-1"
              >
                {expandedId === alert.id ? 'See Less' : 'See Details'}
              </button>

              <AnimatePresence>
                {expandedId === alert.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-dashed border-emerald-100">
                      <p className="text-xs font-medium text-stone-600 leading-relaxed font-sans">
                        {alert.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function DroneBookingCard() {
  const [status, setStatus] = useState<'idle' | 'tracing' | 'done'>('idle');
  const [traceStep, setTraceStep] = useState(0);

  const traceMessages = [
    "Connecting to Drone Network...",
    "Acquiring Satellite Lock...",
    "Calculating Optimal Route...",
    "Syncing with Nearest Base..."
  ];

  const startBooking = () => {
    setStatus('tracing');
    setTraceStep(0);
    
    // Cycle through trace messages
    const interval = setInterval(() => {
      setTraceStep(prev => {
        if (prev >= traceMessages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStatus('done'), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-emerald-50 text-center min-h-[400px] flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
        <Plane size={180} />
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto rotate-12 mb-10 shadow-inner">
               <Plane size={40} className="text-emerald-600 -rotate-12" />
            </div>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-emerald-950">Drone Booking</h3>
            <p className="text-sm font-bold text-stone-500 max-w-[240px] mx-auto leading-tight font-sans">
              Apne khet ke liye modern spray drone abhi online book karen.
            </p>
            <button onClick={startBooking} className="w-full bg-emerald-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 active:scale-95 transition-all">
              Drone Bulayen
            </button>
          </motion.div>
        )}

        {status === 'tracing' && (
          <motion.div key="tracing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="relative w-32 h-32 mx-auto mb-10">
              <div className="absolute inset-0 border-4 border-dashed border-emerald-100 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={48} className="text-emerald-500 animate-spin" />
              </div>
            </div>
            <h3 className="text-2xl font-black uppercase text-emerald-900 tracking-tighter duration-300 transition-all">
              {traceMessages[traceStep]}
            </h3>
            <p className="text-lg font-bold italic font-serif text-emerald-700 animate-pulse">"Location Trace Ho Rahi Hai..."</p>
            
            {/* Progress Bar */}
            <div className="w-full max-w-[200px] mx-auto h-1.5 bg-emerald-50 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-emerald-500" 
                 initial={{ width: 0 }}
                 animate={{ width: `${((traceStep + 1) / traceMessages.length) * 100}%` }}
               />
            </div>
          </motion.div>
        )}

        {status === 'done' && (
          <motion.div key="done" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-10">
              <MapPin size={48} className="text-white animate-bounce" />
            </div>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter text-emerald-900">Booked!</h3>
            <p className="text-sm font-bold text-stone-500 font-sans">Driver aap ko 15 minute mein call kare ga.</p>
            <button onClick={() => setStatus('idle')} className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 underline decoration-2 underline-offset-4">Nayi Booking</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
}

function AlternativeCropsCard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setData(trendData);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-emerald-50">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-900 leading-none">AI Predicts</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">High Profit Potential</p>
        </div>
        <TrendingUp size={32} className={`text-emerald-100 ${loading ? 'animate-pulse' : ''}`} />
      </header>

      {loading ? (
        <div className="space-y-6">
          {/* Chart Skeleton */}
          <div className="h-40 w-full bg-emerald-50/50 rounded-3xl animate-pulse flex items-end justify-around p-4 gap-2">
            <div className="w-8 bg-emerald-100 h-1/2 rounded-t-lg"></div>
            <div className="w-8 bg-emerald-200 h-3/4 rounded-t-lg"></div>
            <div className="w-8 bg-emerald-100 h-2/3 rounded-t-lg"></div>
            <div className="w-8 bg-emerald-200 h-5/6 rounded-t-lg"></div>
          </div>
          {/* List Skeleton */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-stone-50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-40 w-full mb-8 bg-[#f8faf9] rounded-3xl p-4 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                  {data.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.8} />)}
                </Bar>
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   content={({ active, payload }) => {
                     if (active && payload && payload.length) {
                       return (
                         <div className="bg-emerald-900 text-white p-2 text-[8px] font-black uppercase tracking-widest shadow-xl">
                           {payload[0].payload.name}: {payload[0].value?.toLocaleString()}
                         </div>
                       );
                     }
                     return null;
                   }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <CropItem 
              name="Masoor (Lentils)" 
              profit="+85%" 
              msg="Export demand zayada hai." 
              details="October kaasht. Barani ilaakon ke liye best." 
              season="October se March"
              water="Kam pani ki zarorat"
              plantingTime="15 October se 15 November"
              soilType="Mera (Loamy) Matti"
              pestResistance="Darmiana (Fungal wilt resistance is low)"
            />
            <CropItem 
              name="Sunflower" 
              profit="+98%" 
              msg="Oil mills direct demand." 
              details="January kaasht. 110 din mein tayar fasal." 
              season="January se May"
              water="Darmiana pani"
              plantingTime="15 January se 15 February"
              soilType="Zarkhaiz aur achi pani nikaalney wali matti"
              pestResistance="High (Resistant to common rust)"
            />
            <CropItem 
              name="Moong (Mung Bean)" 
              profit="+72%" 
              msg="Short duration crop." 
              details="Zaid-Kharif kaasht. Zameen ki tawanai barhati hai." 
              season="March se June"
              water="Bohat kam pani"
              plantingTime="15 March se 15 April"
              soilType="Retli (Sandy) ya Merra matti"
              pestResistance="Acha (Resistant to mungbean yellow mosaic virus)"
            />
            <CropItem 
              name="Sarson (Mustard)" 
              profit="+68%" 
              msg="Local oil extraction demand." 
              details="September/October kaasht. Kam kharcha ziada munafa." 
              season="September se February"
              water="Darmiana pani"
              plantingTime="September ka aakhiri hafta"
              soilType="Har tarah ki matti mein ho sakti hai"
              pestResistance="Darmiana (Susceptible to aphids)"
            />
          </div>
        </>
      )}
    </div>
  );
}

function WeatherForecastCard() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Lahore");

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );
        const data = await response.json();
        const days = data.daily.time.slice(0, 3).map((time: string, i: number) => ({
          date: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weathercode[i]
        }));
        setForecast(days);
        setLoading(false);
      } catch (error) {
        console.error("Weather error:", error);
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
          setCity("Aap ki Location");
        },
        () => {
          fetchWeather(31.5204, 74.3587); // Lahore fallback
        }
      );
    } else {
      fetchWeather(31.5204, 74.3587);
    }
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="text-yellow-500" size={24} />;
    if (code <= 3) return <Cloud className="text-stone-400" size={24} />;
    if (code <= 67) return <CloudRain className="text-blue-400" size={24} />;
    if (code <= 82) return <CloudRain className="text-blue-500" size={24} />;
    return <CloudLightning className="text-purple-500" size={24} />;
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-emerald-50 relative overflow-hidden">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-900 leading-none">Mausam</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">{city} // 3-Day Forecast</p>
        </div>
        <Sun size={32} className="text-emerald-100" />
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-24">
          <Loader2 className="animate-spin text-emerald-400" size={32} />
        </div>
      ) : (
        <div className="flex justify-between gap-2">
          {forecast.map((day, i) => (
            <div key={i} className="flex-1 bg-[#f8faf9] rounded-3xl p-4 flex flex-col items-center gap-2 border border-emerald-50">
              <span className="text-[10px] font-black uppercase text-stone-400">{day.date}</span>
              {getWeatherIcon(day.code)}
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-emerald-900 leading-none">{day.max}°</span>
                <span className="text-[10px] font-bold text-stone-400">{day.min}°</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CropItem({ name, profit, msg, details, season, water, plantingTime, soilType, pestResistance }: any) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-5 bg-[#f8faf9] rounded-3xl border border-emerald-50 relative group transition-all">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xl font-black uppercase tracking-tight text-emerald-950">{name}</span>
        <span className="text-[10px] font-black text-white bg-emerald-500 px-2 py-0.5 rounded-lg">{profit}</span>
      </div>
      <p className="text-[11px] font-bold text-stone-400 italic font-sans mb-3">{msg}</p>
      
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition-colors"
      >
        {showDetails ? 'Kam Maaloomaat' : 'Mazeed Maaloomaat'}
        <ChevronRight size={12} className={showDetails ? 'rotate-90' : ''} />
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-emerald-100 space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Kaasht ki Tafseel</div>
                <p className="text-xs font-bold leading-tight text-stone-600">{details}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] font-black uppercase text-stone-400 block">Season</span>
                  <span className="text-[10px] font-bold text-emerald-900">{season}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-stone-400 block">Pani ki Zarorat</span>
                  <span className="text-[10px] font-bold text-emerald-900">{water}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-stone-400 block">Bahtareen Waqt</span>
                  <span className="text-[10px] font-bold text-emerald-900">{plantingTime}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-stone-400 block">Matti (Soil)</span>
                  <span className="text-[10px] font-bold text-emerald-900">{soilType}</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[8px] font-black uppercase text-emerald-700 block mb-1">Keeray aur Bimariyan (Pest Resistance)</span>
                <span className="text-[10px] font-bold text-emerald-900">{pestResistance}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
