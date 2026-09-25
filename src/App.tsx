import { useState, useEffect } from 'react';
import {
  Menu, X, Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck,
  Truck, Handshake, Recycle, Leaf, Monitor, Cable, Battery,
  Refrigerator, Tv, Wind, Droplets, ChevronRight, Check, Send,
  CheckCircle2, ArrowUpRight, Sparkles, User
} from 'lucide-react';
import logoImg from './assets/poddar-logo.png';
import emblemImg from './assets/poddar-emblem.png';

// ================= BUSINESS DETAILS — EDIT HERE =================
// WhatsApp link: country code (91) + full 10-digit mobile number.
const WHATSAPP_NUMBER = "919835627586";
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
  "Hello PODDAR, I want to sell some scrap. Please help me with the price and pickup details."
)}`;
// ================================================================

// WhatsApp deep-link that reliably opens the WhatsApp app/web.
// Strategy: try window.open first; if it succeeds, suppress the native click
// (avoids double tab). If the browser blocks it, DON'T preventDefault —
// let the native target=_blank anchor behavior try too, plus show a fallback.
// NOTE: never force-navigate the current page to WhatsApp (it blocks embedding).
let waBlockedHandler: (() => void) | null = null;
function registerWaBlockedHandler(fn: () => void) {
  waBlockedHandler = fn;
}
function WA({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        const win = window.open(WHATSAPP_URL, "_blank");
        if (win) {
          e.preventDefault();
        } else if (waBlockedHandler) {
          waBlockedHandler();
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '', phone: '', material: '', qty: '', location: '', message: ''
  });
  const [quoteSent, setQuoteSent] = useState(false);
  const [waToast, setWaToast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    registerWaBlockedHandler(() => {
      setWaToast(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setWaToast(false), 8000);
    });
    return () => window.clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'What We Buy', href: '#buy' },
    { label: 'How It Works', href: '#how' },
    { label: 'Why Choose Us', href: '#why' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSent(true);
    setTimeout(() => setQuoteSent(false), 5000);
    setQuoteForm({ name: '', phone: '', material: '', qty: '', location: '', message: '' });
  };

  const px = (id: number) => `/images/${id}.jpg`;

  const cardsBuy = [
    { title: 'Old AC', desc: 'Split, window & portable AC units', Icon: Wind, img: 11256510 },
    { title: 'Refrigerator', desc: 'Single & double door fridges', Icon: Refrigerator, img: 17139803 },
    { title: 'Washing Machine', desc: 'Top & front load machines', Icon: Droplets, img: 33686459 },
    { title: 'Cooler', desc: 'Air coolers & evaporative units', Icon: Wind, img: 4874406 },
    { title: 'TV & Electronics', desc: 'LED, LCD, smart TVs & more', Icon: Tv, img: 15313405 },
    { title: 'Computer & Laptop', desc: 'Desktop PCs, laptops, monitors', Icon: Monitor, img: 10251355 },
    { title: 'Copper', desc: 'Copper wires, pipes & scrap', Icon: Cable, img: 5279317 },
    { title: 'Aluminium', desc: 'Aluminium frames, cans & scrap', Icon: Sparkles, img: 5279344 },
    { title: 'Iron & Steel', desc: 'Iron rods, steel sheets & parts', Icon: ShieldCheck, img: 9784001 },
    { title: 'Electrical Wires', desc: 'Copper & aluminium wiring', Icon: Cable, img: 28286038 },
    { title: 'Batteries', desc: 'Car, inverter & UPS batteries', Icon: Battery, img: 38040016 },
    { title: 'Other Scrap', desc: 'Plastic, cardboard & more', Icon: Recycle, img: 26492743 },
  ];

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      {/* NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-glass bg-white/90 shadow-[0_1px_30px_rgba(6,78,59,0.06)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src={emblemImg}
                alt="PODDAR logo"
                className="w-11 h-11 rounded-xl object-cover shadow-md shadow-emerald-deep/15 ring-1 ring-emerald-deep/10 group-hover:shadow-lg group-hover:shadow-emerald-deep/25 transition-shadow"
              />
              <span className="font-display font-extrabold text-[26px] tracking-tight text-ink leading-none">
                PODDAR
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3.5 py-2 rounded-full text-[13px] font-medium text-slate-600 hover:text-emerald-deep hover:bg-emerald-glow transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-deep text-white text-sm font-bold hover:bg-emerald-brand transition-colors shadow-lg shadow-emerald-deep/20 hover:shadow-emerald-deep/40"
              >
                Sell Your Scrap
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-emerald-glow transition-colors text-ink"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[420px]' : 'max-h-0'}`}
        >
          <div className="bg-white/95 nav-glass border-t border-slate-100 px-6 py-5 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-emerald-glow hover:text-emerald-deep transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center mt-3 px-5 py-3 rounded-full bg-emerald-deep text-white font-bold hover:bg-emerald-brand transition-colors"
            >
              Sell Your Scrap
            </a>
          </div>
        </div>
      </header>

      {/* QUICK CONTACT BAR */}
      <section id="home" className="relative pt-[72px]">
        <div className="bg-gradient-to-r from-emerald-deep via-[#065f46] to-emerald-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2.5 md:py-3">
            <div className="flex items-center justify-center md:justify-between gap-3 md:gap-6 text-[13px] md:text-sm overflow-x-auto pb-1 whitespace-nowrap scrollbar-hide">
              <div className="flex items-center gap-5 md:gap-8">
                <a href="tel:9835627586" className="flex items-center gap-2 hover:text-emerald-pale transition-colors font-medium">
                  <Phone className="w-4 h-4 text-emerald-soft" />
                  <span>9835627586</span>
                </a>
                <WA className="flex items-center gap-2 hover:text-emerald-pale transition-colors font-medium">
                  <MessageCircle className="w-4 h-4 text-emerald-soft" />
                  <span>WhatsApp</span>
                </WA>
                <a href="#location" className="hidden sm:flex items-center gap-2 hover:text-emerald-pale transition-colors font-medium">
                  <MapPin className="w-4 h-4 text-emerald-soft" />
                  <span>Our Location</span>
                </a>
              </div>
              <a href="mailto:poddarabhi68@gmail.com" className="flex items-center gap-2 hover:text-emerald-pale transition-colors font-medium">
                <Mail className="w-4 h-4 text-emerald-soft" />
                <span>poddarabhi68@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-glow via-[#f0fdf4] to-white">
        <img
          src="/images/36397819.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-br from-emerald-pale/30 to-emerald-soft/10 -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-emerald-pale/20 to-emerald-soft/10 translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 md:pt-20 lg:pt-28 pb-14 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative z-10 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-glow border border-emerald-pale/60 text-emerald-dark text-[12px] font-bold uppercase tracking-widest mb-6">
                <Recycle className="w-3.5 h-3.5" />
                Smart Scrap Buying
              </div>
              <h1 className="font-display font-extrabold text-[36px] sm:text-[48px] md:text-[52px] lg:text-[64px] leading-[1.05] text-ink tracking-tight mb-6">
                Turn Your <br />
                <span className="text-emerald-brand">Scrap</span> Into <span className="text-emerald-deep">Cash</span>
              </h1>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                PODDAR buys old ACs, electronics, metals and recyclable materials at competitive prices with fast and reliable pickup service across homes, offices, shops and factories.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-deep text-white font-bold text-sm hover:bg-emerald-brand transition-all shadow-xl shadow-emerald-deep/25 hover:shadow-emerald-deep/40 hover:-translate-y-0.5">
                  Sell Your Scrap
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <WA className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-emerald-deep/20 text-emerald-deep font-bold text-sm hover:bg-emerald-glow hover:border-emerald-brand/30 transition-all hover:-translate-y-0.5">
                  WhatsApp Us
                  <MessageCircle className="w-4 h-4" />
                </WA>
              </div>
            </div>

            <div className="relative animate-fade-up stagger-2">
              <div className="relative rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-emerald-deep/10 ring-1 ring-emerald-deep/10">
                <img
                  src={logoImg}
                  alt="PODDAR — Scrap & Recycling"
                  className="w-full h-auto object-contain aspect-[5/4] sm:aspect-[4/3] md:aspect-[4/3]"
                />
                <div className="absolute top-4 right-4 bg-emerald-deep text-white rounded-full px-4 py-2 text-[11px] md:text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-emerald-deep/30">
                  Same-Day Pickup
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUY */}
      <section id="buy" className="py-20 md:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <span className="inline-block text-emerald-brand font-extrabold text-xs uppercase tracking-[0.2em] mb-4">Services</span>
            <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-ink leading-tight mb-5">What We Buy</h2>
            <p className="text-slate-500 text-base md:text-lg">We purchase all kinds of scrap and used materials. Sell your old appliances, metals and electronics for a fair price.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cardsBuy.map((c) => (
              <div
                key={c.title}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(6,78,59,0.04)] ring-1 ring-slate-100 card-hover flex flex-col"
              >
                <img
                  src={px(c.img)}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-glow to-emerald-pale/40 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all shrink-0">
                    <c.Icon className="w-5 h-5 text-emerald-brand" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink">{c.title}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex-1">{c.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-brand hover:text-emerald-deep transition-colors px-3 py-2 -ml-3 rounded-lg hover:bg-emerald-glow"
                >
                  Get Price <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 md:py-28 bg-gradient-to-b from-white via-emerald-glow/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <span className="inline-block text-emerald-brand font-extrabold text-xs uppercase tracking-[0.2em] mb-4">Process</span>
            <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-ink leading-tight mb-5">How It Works</h2>
            <p className="text-slate-500 text-base md:text-lg">Selling scrap has never been easier. Just follow these simple steps to turn your waste into cash.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: 'Contact PODDAR', desc: 'Call or WhatsApp us with your scrap details. We respond within minutes.', cta: 'Call Now', Icon: Phone, img: 8867208, href: 'tel:9835627586', whatsapp: false },
              { step: '02', title: 'Tell Us What You Sell', desc: 'Share photos or describe the materials and quantity you want to sell.', cta: 'Describe Your Scrap', Icon: MessageCircle, img: 7679885, href: '#contact', whatsapp: false },
              { step: '03', title: 'Get a Price', desc: 'Receive an instant, fair and transparent quotation for your items.', cta: 'Get a Quote', Icon: CheckCircle2, img: 8970688, href: '#contact', whatsapp: false },
              { step: '04', title: 'Pickup & Payment', desc: 'We collect from your doorstep and pay you immediately on the spot.', cta: 'Book Pickup on WhatsApp', Icon: Truck, img: 11567138, href: '', whatsapp: true },
            ].map((item, i) => {
              const cardCls = 'group relative block overflow-hidden rounded-3xl ring-1 ring-emerald-deep/10 shadow-lg shadow-emerald-deep/10 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-deep/25 transition-all duration-300 h-[360px]';
              const inner = (
                <>
                  <img
                    src={px(item.img)}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03251b]/95 via-emerald-deep/80 to-emerald-deep/40" />
                  <div className="relative z-10 flex flex-col h-full p-7">
                    <div className="absolute top-2 right-3 text-[110px] font-display font-extrabold text-white/10 leading-none select-none">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center mb-5">
                      <item.Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-emerald-pale/85 text-sm leading-relaxed flex-1">{item.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white group-hover:gap-3 transition-all">
                      {item.cta}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </>
              );
              return (
                <div key={item.step} className="relative">
                  {item.whatsapp ? (
                    <WA className={cardCls}>{inner}</WA>
                  ) : (
                    <a href={item.href} className={cardCls}>
                      {inner}
                    </a>
                  )}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-[26px] z-20 bg-emerald-deep text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg shadow-emerald-deep/30">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="py-20 md:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <span className="inline-block text-emerald-brand font-extrabold text-xs uppercase tracking-[0.2em] mb-4">Benefits</span>
            <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-ink leading-tight mb-5">Why Choose PODDAR</h2>
            <p className="text-slate-500 text-base md:text-lg">We believe in fair business, quick service and making recycling easy for everyone.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Fair Pricing', desc: 'Market-aligned rates for all scrap categories. No hidden deductions.', cta: 'Get Best Price', Icon: Handshake, img: 4963359, href: '#contact', whatsapp: false },
              { title: 'Quick Response', desc: 'Get a quote within minutes. No long waits or complicated processes.', cta: 'WhatsApp Us Now', Icon: Clock, img: 8867435, href: '', whatsapp: true },
              { title: 'Easy Pickup', desc: 'We come to your doorstep — homes, offices, shops and factories.', cta: 'Book Free Pickup', Icon: Truck, img: 1267329, href: '', whatsapp: true },
              { title: 'Transparent Process', desc: 'Clear weighing, pricing and documentation at every step.', cta: 'Know Our Process', Icon: ShieldCheck, img: 9301860, href: '#how', whatsapp: false },
              { title: 'Reliable Service', desc: 'Punctual pickups, instant payments and professional staff.', cta: 'Call PODDAR', Icon: CheckCircle2, img: 4483556, href: 'tel:9835627586', whatsapp: false },
              { title: 'Eco-Friendly Recycling', desc: 'Proper recycling that protects the environment and reduces waste.', cta: 'Our Green Promise', Icon: Leaf, img: 1108572, href: '#about', whatsapp: false },
            ].map((item) => {
              const cardCls = 'group relative block overflow-hidden rounded-3xl ring-1 ring-emerald-deep/10 shadow-lg shadow-emerald-deep/10 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-deep/25 transition-all duration-300 h-[300px]';
              const inner = (
                <>
                  <img
                    src={px(item.img)}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03251b]/95 via-emerald-deep/80 to-emerald-deep/40" />
                  <div className="relative z-10 flex flex-col h-full p-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center mb-4">
                      <item.Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-emerald-pale/85 text-sm leading-relaxed flex-1">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-white group-hover:gap-3 transition-all">
                      {item.cta}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </>
              );
              return item.whatsapp ? (
                <WA key={item.title} className={cardCls}>{inner}</WA>
              ) : (
                <a key={item.title} href={item.href} className={cardCls}>{inner}</a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 bg-gradient-to-br from-emerald-deep via-[#065f46] to-emerald-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse" patternContentUnits="objectBoundingBox">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
          <div className="inline-block bg-white rounded-3xl p-4 md:p-5 shadow-2xl shadow-black/20 mb-8">
            <img
              src={emblemImg}
              alt="PODDAR logo"
              className="w-24 h-24 md:w-28 md:h-28 object-contain"
            />
          </div>
          <span className="inline-block text-emerald-soft font-extrabold text-xs uppercase tracking-[0.2em] mb-6">About PODDAR</span>
          <h2 className="font-display font-extrabold text-[32px] md:text-[52px] leading-[1.1] mb-6">Your Trusted Scrap Buying Partner</h2>
          <p className="text-emerald-pale/90 text-base md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            PODDAR helps households, shops, offices and factories sell their old, unused and recyclable materials in a simple, transparent and eco-friendly way. We ensure every piece of scrap is handled properly — reducing waste and supporting responsible recycling practices across the community.
          </p>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 ring-1 ring-white/20 mb-10">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-extrabold text-sm md:text-base">Abhishek Poddar</div>
              <div className="text-emerald-pale/80 text-xs md:text-sm">Owner — PODDAR Scrap & Recycling</div>
              <a href="tel:9835627586" className="inline-flex items-center gap-1.5 mt-1 text-white font-bold text-xs md:text-sm tracking-wide hover:text-emerald-soft transition-colors">
                <Phone className="w-3 h-3" /> 9835627586
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-10">
            <div className="text-center">
              <div className="font-display font-extrabold text-3xl md:text-5xl text-white mb-1">5,000+</div>
              <div className="text-emerald-pale/70 text-sm">Items Purchased</div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="font-display font-extrabold text-3xl md:text-5xl text-white mb-1">100%</div>
              <div className="text-emerald-pale/70 text-sm">Transparent Pricing</div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="font-display font-extrabold text-3xl md:text-5xl text-white mb-1">Same-Day</div>
              <div className="text-emerald-pale/70 text-sm">Pickup Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-20 md:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <span className="inline-block text-emerald-brand font-extrabold text-xs uppercase tracking-[0.2em] mb-4">Location</span>
            <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-ink leading-tight mb-5">Find PODDAR Near You</h2>
            <p className="text-slate-500 text-base md:text-lg">Visit our main location or contact us for pickup from your area.</p>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(6,78,59,0.08)] ring-1 ring-slate-100">
            <div className="relative h-[320px] md:h-[420px] bg-gradient-to-br from-emerald-pale/30 via-emerald-glow to-emerald-pale/20 overflow-hidden">
              <iframe
                title="PODDAR Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.416848861876!2d88.3638955!3d22.5726452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275e3b4b26e4d%3A0x1f3f0e8e8e3e1e1d!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sus!4v1738447212345!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.15) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/90 nav-glass rounded-2xl px-5 py-4 shadow-xl max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={emblemImg}
                    alt="PODDAR logo"
                    className="w-11 h-11 rounded-xl object-contain bg-white ring-1 ring-emerald-pale/60 p-0.5 shrink-0"
                  />
                  <h3 className="font-display font-bold text-lg text-ink leading-tight">PODDAR — Kolkata Office</h3>
                </div>
                <p className="text-sm text-slate-600 mb-1">Kolkata, West Bengal — [ADD EXACT ADDRESS HERE]</p>
                <p className="text-sm text-slate-700 font-semibold mb-3">
                  Owner: <a href="tel:9835627586" className="text-emerald-brand hover:text-emerald-deep transition-colors font-bold">Abhishek Poddar — 9835627586</a>
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-brand hover:text-emerald-deep transition-colors">
                  Get Directions <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT + QUOTE FORM */}
      <section id="contact" className="py-16 md:py-28 bg-gradient-to-b from-white via-stone to-emerald-glow/30 pb-[100px] md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div>
              <span className="inline-block text-emerald-brand font-extrabold text-xs uppercase tracking-[0.2em] mb-4">Contact</span>
              <h2 className="font-display font-extrabold text-[32px] md:text-[48px] text-ink leading-tight mb-6">Ready to Sell Your Scrap?</h2>
              <p className="text-slate-500 text-base md:text-lg mb-10 leading-relaxed">Get in touch today. We respond quickly, provide fair quotes and arrange convenient pickup from your doorstep.</p>

              <div className="space-y-6">
                <a href="tel:9835627586" className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-[0_4px_20px_rgba(6,78,59,0.05)] ring-1 ring-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-deep to-emerald-brand flex items-center justify-center shadow-lg shadow-emerald-brand/20">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Phone</div>
                    <div className="text-lg font-extrabold text-ink group-hover:text-emerald-brand transition-colors">9835627586</div>
                  </div>
                </a>

                <WA className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald-brand text-white shadow-xl shadow-emerald-deep/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald-pale/80 font-bold">WhatsApp</div>
                    <div className="text-lg font-extrabold">WhatsApp Us</div>
                  </div>
                </WA>

                <a href="mailto:poddarabhi68@gmail.com" className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-[0_4px_20px_rgba(6,78,59,0.05)] ring-1 ring-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-deep to-emerald-brand flex items-center justify-center shadow-lg shadow-emerald-brand/20">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Email</div>
                    <div className="text-lg font-extrabold text-ink group-hover:text-emerald-brand transition-colors">poddarabhi68@gmail.com</div>
                  </div>
                </a>

                <a href="tel:9835627586" className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-[0_4px_20px_rgba(6,78,59,0.05)] ring-1 ring-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-amber-600 font-bold">Owner</div>
                    <div className="text-lg font-extrabold text-ink">Abhishek Poddar</div>
                    <div className="text-sm font-bold text-emerald-brand group-hover:text-emerald-deep transition-colors">9835627586</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quote Form */}
            <div className="bg-white rounded-[32px] p-7 md:p-10 shadow-[0_20px_60px_rgba(6,78,59,0.08)] ring-1 ring-slate-100">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={emblemImg}
                  alt="PODDAR logo"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-contain bg-emerald-glow ring-1 ring-emerald-pale/50 p-1"
                />
                <div>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ink mb-0.5">Get a Scrap Quote</h3>
                  <p className="text-slate-500 text-sm">Fill in the details below and we will reach out quickly.</p>
                </div>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Name</label>
                    <input id="name" required value={quoteForm.name} onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })} type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-stone border-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 transition-all" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input id="phone" required value={quoteForm.phone} onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })} type="tel" placeholder="Mobile number" className="w-full px-4 py-3 rounded-xl bg-stone border-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="material" className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Material Type</label>
                    <input id="material" value={quoteForm.material} onChange={e => setQuoteForm({ ...quoteForm, material: e.target.value })} type="text" placeholder="e.g. Old AC, Copper" className="w-full px-4 py-3 rounded-xl bg-stone border-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 transition-all" />
                  </div>
                  <div>
                    <label htmlFor="qty" className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Approx. Quantity</label>
                    <input id="qty" value={quoteForm.qty} onChange={e => setQuoteForm({ ...quoteForm, qty: e.target.value })} type="text" placeholder="e.g. 2 units, 10 kg" className="w-full px-4 py-3 rounded-xl bg-stone border-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Pickup Location</label>
                  <input id="location" required value={quoteForm.location} onChange={e => setQuoteForm({ ...quoteForm, location: e.target.value })} type="text" placeholder="Your address / locality" className="w-full px-4 py-3 rounded-xl bg-stone border-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 transition-all" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Message</label>
                  <textarea id="message" rows={3} value={quoteForm.message} onChange={e => setQuoteForm({ ...quoteForm, message: e.target.value })} placeholder="Any details about the scrap..." className="w-full px-4 py-3 rounded-xl bg-stone border-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 transition-all resize-none" />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-deep to-emerald-brand text-white font-extrabold text-sm hover:from-emerald-brand hover:to-emerald-mid transition-all shadow-xl shadow-emerald-deep/20 hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  {quoteSent ? (
                    <>
                      <Check className="w-5 h-5" /> Quote Request Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Get My Quote
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL + FOOTER */}
      <footer className="bg-ink text-white pb-[80px] md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <div>
              <a href="#home" className="flex items-center gap-3 group mb-6">
                <img
                  src={emblemImg}
                  alt="PODDAR logo"
                  className="w-11 h-11 rounded-xl object-cover shadow-md shadow-emerald-deep/15 ring-1 ring-white/10"
                />
                <span className="font-display font-extrabold text-2xl tracking-tight">PODDAR</span>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Smart Scrap Buying & Recycling — helping households and businesses turn waste into value.</p>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-brand flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" /></svg>
                </a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-brand flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="mailto:poddarabhi68@gmail.com" aria-label="Email" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-brand flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-extrabold text-base mb-5">Quick Links</h4>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-slate-400 text-sm hover:text-white hover:translate-x-0.5 inline-block transition-all">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-extrabold text-base mb-5">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <span className="text-slate-300 font-semibold">Owner:</span> Abhishek Poddar
                  <a href="tel:9835627586" className="block hover:text-white transition-colors">9835627586</a>
                </li>
                <li><a href="tel:9835627586" className="hover:text-white transition-colors">9835627586</a></li>
                <li><WA className="hover:text-white transition-colors inline-block">WhatsApp</WA></li>
                <li><a href="mailto:poddarabhi68@gmail.com" className="hover:text-white transition-colors">poddarabhi68@gmail.com</a></li>
                <li><a href="https://instagram.com/poddar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://facebook.com/poddar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Our Location</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-extrabold text-base mb-5">Location</h4>
              <p className="text-sm text-slate-400 mb-2">Kolkata, West Bengal — [ADD EXACT ADDRESS HERE]</p>
              <p className="text-sm text-slate-500">Please update the address when ready.</p>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs">© 2026 PODDAR. All Rights Reserved.</p>
            <p className="text-slate-600 text-xs">Smart Scrap Buying & Recycling</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 nav-glass border-t border-slate-100 px-4 py-3 flex items-center gap-3 shadow-[0_-8px_30px_rgba(6,78,59,0.08)]">
        <a href="tel:9835627586" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-deep text-white font-bold text-sm shadow-lg shadow-emerald-deep/20 hover:bg-emerald-brand transition-all">
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <WA className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-lg shadow-[#25D366]/20 hover:bg-[#1ebe57] transition-all">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </WA>
      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp PODDAR"
        onClick={(e) => {
          const win = window.open(WHATSAPP_URL, "_blank");
          if (win) {
            e.preventDefault();
          } else if (waBlockedHandler) {
            waBlockedHandler();
          }
        }}
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-1 transition-all font-bold text-sm"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {/* WHATSAPP BLOCKED — HELP TOAST */}
      {waToast && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm bg-ink text-white rounded-2xl px-5 py-4 shadow-2xl ring-1 ring-white/10 animate-fade-up">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-snug">
                WhatsApp browser ne block kar diya. No tension — call karo ya number copy karo:
              </p>
              <div className="mt-2 flex items-center gap-3">
                <a href="tel:9835627586" className="inline-flex items-center gap-1.5 bg-emerald-deep hover:bg-emerald-brand text-white text-xs font-bold px-3.5 py-2 rounded-full transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call: 9835627586
                </a>
                <span className="text-[11px] text-slate-400">Abhishek Poddar (Owner)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
