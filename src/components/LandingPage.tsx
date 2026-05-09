import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  ChevronRight, 
  Globe, 
  Moon, 
  Sun,
  Camera, 
  Search, 
  ShieldCheck, 
  Leaf,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Youtube
} from 'lucide-react';
import { cn } from '../lib/utils';

type Language = 'EN' | 'FR' | 'AR';

const translations = {
  EN: {
    features: "Features",
    download: "Download App",
    heroTitle: "AgriScan",
    heroSubtitle: "Scan, Detect, Protect",
    heroDesc: "An AI-Powered Mobile Platform for Early Detection and Prevention of Plant Diseases in Algerian Agriculture",
    learnMore: "Learn More",
    step1Title: "Scan",
    step1Desc: "Take a photo of the plant with your phone.",
    step2Title: "Detect",
    step2Desc: "We find the problem and give you the solution.",
    step3Title: "Protect",
    step3Desc: "Get alerts, tips, and find the best products.",
    footerSlogan: "المرض نقولهولك و الحل نمدهولك",
    footerCopyright: "© 2026 AgriScan. Algerian Agricultural Innovation Hub."
  },
  FR: {
    features: "Fonctionnalités",
    download: "Télécharger",
    heroTitle: "AgriScan",
    heroSubtitle: "Scanner, Détecter, Protéger",
    heroDesc: "Une plateforme mobile alimentée par l'IA pour la détection précoce et la prévention des maladies des plantes dans l'agriculture algérienne",
    learnMore: "En savoir plus",
    step1Title: "Scanner",
    step1Desc: "Prenez une photo de la plante avec votre téléphone.",
    step2Title: "Détecter",
    step2Desc: "Nous trouvons le problème et vous donnons la solution.",
    step3Title: "Protéger",
    step3Desc: "Recevez des alertes, des conseils et trouvez les meilleurs produits.",
    footerSlogan: "المرض نقولهولك و الحل نمدهولك",
    footerCopyright: "© 2026 AgriScan. Pôle d'innovation agricole algérien.",
    systemsLive: "Systèmes en ligne v2.4.0"
  },
  AR: {
    features: "المميزات",
    download: "تحميل التطبيق",
    heroTitle: "AgriScan",
    heroSubtitle: "فحص، كشف، حماية",
    heroDesc: "منصة متنقلة مدعومة بالذكاء الاصطناعي للكشف المبكر عن أمراض النبات والوقاية منها في الزراعة الجزائرية",
    learnMore: "اكتشف المزيد",
    step1Title: "فحص",
    step1Desc: "التقط صورة للنبتة بهاتفك.",
    step2Title: "كشف",
    step2Desc: "نكتشف المشكلة ونعطيك الحل المناسب.",
    step3Title: "حماية",
    step3Desc: "احصل على تنبيهات، نصائح، وجد أفضل المنتجات.",
    footerSlogan: "المرض نقولهولك و الحل نمدهولك",
    footerCopyright: "© 2026 AgriScan. مركز الابتكار الزراعي الجزائري.",
    systemsLive: "الأنظمة تعمل v2.4.0"
  }
};

const imagesRow1 = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200",
  "https://images.unsplash.com/photo-1594910419246-868778cebd7f?q=80&w=1200",
  "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1200",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200",
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2000",
];

const imagesRow2 = [
  "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1000",
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000",
  "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000",
  "https://images.unsplash.com/photo-1551645120-d70bfe84c826?q=80&w=1000",
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000",
];

function Marquee({ images, reverse = false }: { images: string[], reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden select-none gap-6 mask-fade">
      <motion.div 
        animate={{ x: reverse ? [0, -1920] : [-1920, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-6 min-w-full py-4"
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={i} className="w-[400px] h-[280px] rounded-[32px] overflow-hidden shadow-xl border-2 border-white dark:border-slate-800 shrink-0 transform-gpu hover:scale-105 transition-transform duration-500">
            <img src={src} alt="Crop Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function LandingPage() {
  const [lang, setLang] = useState<Language>('EN');
  const [isDark, setIsDark] = useState(false);
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=your.package.name";

  const t = translations[lang];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleLang = () => {
    const langs: Language[] = ['EN', 'FR', 'AR'];
    const next = langs[(langs.indexOf(lang) + 1) % langs.length];
    setLang(next);
  };

  return (
    <div 
      className={cn(
        "min-h-screen transition-colors duration-500 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden",
        isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900",
        lang === 'AR' ? "font-sans text-right" : "font-sans text-left"
      )}
      dir={lang === 'AR' ? 'rtl' : 'ltr'}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isDark ? "bg-slate-900/80 border-white/5" : "bg-white/80 border-slate-100",
        "backdrop-blur-md"
      )}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "border p-2 rounded-xl shadow-sm transition-colors",
              isDark ? "bg-slate-800 border-white/10" : "bg-white border-slate-100"
            )}>
                <Leaf className="text-emerald-500" size={28} />
            </div>
            <span className={cn(
              "font-black text-2xl tracking-tighter",
              isDark ? "text-white" : "text-slate-800"
            )}>AgriScan</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#features" className="hover:text-emerald-500 transition-colors uppercase tracking-widest text-[11px]">{t.features}</a>
            <div className={cn("h-4 w-px", isDark ? "bg-white/10" : "bg-slate-200")} />
            
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 cursor-pointer hover:text-emerald-500 transition-colors font-mono"
            >
              <Globe size={18} />
              <span>{lang}</span>
            </button>

            <button 
              onClick={() => setIsDark(!isDark)}
              className={cn(
                "p-2 rounded-full transition-all active:scale-90",
                isDark ? "bg-slate-800 text-amber-400" : "bg-slate-100 text-slate-600"
              )}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 font-bold"
            >
              <Download size={18} />
              <span>{t.download}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: lang === 'AR' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl font-black text-emerald-500 tracking-tight leading-[0.85]">
                {t.heroTitle}
              </h1>
              <h2 className={cn(
                "text-4xl md:text-5xl font-bold tracking-tight leading-tight",
                isDark ? "text-white" : "text-slate-800"
              )}>
                {t.heroSubtitle}
              </h2>
              <p className={cn(
                "text-lg max-w-lg leading-relaxed font-medium opacity-80",
                isDark ? "text-slate-400" : "text-slate-500"
              )}>
                {t.heroDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 text-white px-8 py-5 rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 font-bold text-lg"
              >
                <Download size={24} />
                <span>{t.download}</span>
              </a>
              <a 
                href="#features"
                className={cn(
                  "border px-8 py-5 rounded-2xl flex items-center gap-2 transition-all font-bold text-lg",
                  isDark ? "bg-slate-800 border-white/5 hover:bg-slate-700 text-white" : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                )}
              >
                <span>{t.learnMore}</span>
                <ChevronRight size={20} className={lang === 'AR' ? "rotate-180" : ""} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full -z-10" />
            <div className={cn(
              "rounded-[48px] overflow-hidden shadow-2xl border-4 transform",
              lang === 'AR' ? "-rotate-2" : "rotate-2",
              isDark ? "border-slate-800" : "border-white"
            )}>
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2000" 
                alt="Agricultural Tech" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="features" className={cn(
        "py-24 transition-colors",
        isDark ? "bg-slate-950/50" : "bg-slate-50/50"
      )}>
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
           <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">{t.features}</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              number="01" 
              title={t.step1Title} 
              icon={Camera} 
              desc={t.step1Desc}
              color={isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}
              isDark={isDark}
            />
            <FeatureCard 
              number="02" 
              title={t.step2Title} 
              icon={Search} 
              desc={t.step2Desc}
              color={isDark ? "bg-orange-500/10 text-orange-400" : "bg-orange-50 text-orange-500"}
              isDark={isDark}
            />
            <FeatureCard 
              number="03" 
              title={t.step3Title} 
              icon={ShieldCheck} 
              desc={t.step3Desc}
              color={isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-500"}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* Dynamic Infinite Gallery */}
      <section className="py-24 space-y-8 overflow-hidden">
        <Marquee images={imagesRow1} />
        <Marquee images={imagesRow2} reverse />
      </section>

      {/* Footer */}
      <footer className={cn(
        "pt-32 pb-16 transition-colors",
        isDark ? "bg-black" : "bg-slate-950"
      )}>
        <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-6">
            <h3 className="text-6xl font-black tracking-tight text-white">AgriScan 2026</h3>
            <p className="text-3xl font-bold text-emerald-400" dir="rtl" style={{ direction: 'rtl' }}>
                {t.footerSlogan}
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-6">
            <SocialIcon icon={Linkedin} />
            <SocialIcon icon={Facebook} />
            <SocialIcon icon={Instagram} />
            <SocialIcon icon={Youtube} />
            <SocialIcon icon={Mail} />
          </div>

          <div className="pt-16 border-t border-white/10 flex flex-col items-center gap-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
            <p className="text-white/40">{t.footerCopyright}</p>
            <div className="bg-white/5 px-4 py-2 rounded-full text-slate-400 border border-white/10 font-mono">
              {t.systemsLive}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ number, title, icon: Icon, desc, color, isDark }: any) {
  return (
    <div className={cn(
      "p-10 rounded-[48px] shadow-sm border transition-all duration-500 group flex flex-col items-center text-center space-y-8",
      isDark ? "bg-slate-800 border-white/5 hover:border-emerald-500/50 hover:bg-slate-700" : "bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-200"
    )}>
      <div className={cn("p-8 rounded-[32px] transition-all duration-500 group-hover:scale-110", color)}>
        <Icon size={44} strokeWidth={2} />
      </div>
      <div className="space-y-3">
        <h3 className={cn(
          "text-2xl font-black",
          isDark ? "text-white" : "text-slate-800"
        )}>
           <span className={cn("mr-2 opacity-20 font-mono", isDark ? "text-white" : "text-black")}>{number}</span>
           {title}
        </h3>
        <p className={cn(
          "font-medium leading-relaxed opacity-60",
          isDark ? "text-slate-400" : "text-slate-500"
        )}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function SocialIcon({ icon: Icon }: any) {
    return (
        <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:bg-white hover:text-black hover:border-white transition-all active:scale-90">
            <Icon size={22} />
        </button>
    );
}
