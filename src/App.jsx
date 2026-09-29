import React, { useState, useEffect } from 'react';
import logo from './assets/logo.webp';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  Mail, 
  User, 
  Lock, 
  Database, 
  BarChart3, 
  Layers, 
  Smartphone, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FaqItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={onToggle}>
        <span>{question}</span>
        <span className="faq-toggle-icon">{isOpen ? '×' : '+'}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [modal, setModal] = useState(null); // 'terms' | 'privacy' | null

  // Typewriter effect state for developer FAB
  const [typedText, setTypedText] = useState('');
  const fullMessage = "Hi! I'm Yashwant, creator of Montra. Enjoying the app?";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullMessage.length) {
        setTypedText(fullMessage.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bodyHeight = document.documentElement.scrollHeight;
      const footer = document.querySelector('footer');
      const footerHeight = footer ? footer.offsetHeight : 200;
      
      if (scrollPosition > (bodyHeight - footerHeight + 40)) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 120 && navVisible) {
      setNavVisible(false);
    } else if (latest <= 120 && !navVisible) {
      setNavVisible(true);
    }
  });

  const faqs = [
    {
      q: "Is my financial data truly safe and offline?",
      a: "Yes, 100%. Montra is built with a serverless, local-only architecture. Your SMS messages and financial ledger never leave your device. We do not operate databases or backend servers."
    },
    {
      q: "How does Montra read bank SMS without an internet connection?",
      a: "Montra uses an intelligent on-device regex parsing engine. When your bank sends a debit or credit SMS, Montra parses the merchant name, amount, and timestamp directly in memory locally."
    },
    {
      q: "Do I need to create an account or sign up?",
      a: "No account, no sign-up, no email required. Simply install the APK and launch the app. Everything is immediately ready to use."
    },
    {
      q: "Which banks are supported?",
      a: "Montra supports SMS transaction formats from all major banks, UPI applications, and credit card providers (HDFC, SBI, ICICI, Axis, Kotak, PayTM, GPay, PhonePe, and more)."
    },
    {
      q: "Can I export my transactions?",
      a: "Yes! You can export your full transaction history to standard CSV format at any time to inspect in Excel, Google Sheets, or backup on your drive."
    },
    {
      q: "Is Montra free to use?",
      a: "Yes, Montra is completely free with no subscriptions, no locked tiers, and zero advertisements."
    }
  ];

  return (
    <div className="app-wrapper">
      {/* Fixed Navigation Bar */}
      <motion.nav 
        className="nav-bar"
        animate={{ y: navVisible ? 0 : -80 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container nav-inner">
          <a href="#" className="nav-logo display-font">
            <img src={logo} alt="Montra Logo" className="nav-logo-img" />
            Montra
          </a>
          <div className="nav-actions">
            <button onClick={() => setModal('download')} className="btn btn-primary">
              <Download size={16} />
              Download APK
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="hero container">
        <div className="hero-logo-wrapper">
          <img src={logo} alt="Montra Logo" className="hero-logo-img" />
        </div>

        <h1 className="display-xl">
          Expense tracking that works.<br />
          <span className="display-lg" style={{ color: 'var(--ink)', opacity: 0.9 }}>No cloud. No limits.</span>
        </h1>

        <p className="hero-sub body-md">
          Montra is a 100% offline personal finance tracker for Android with automated bank SMS detection, visual analytics, zero cloud sync, and radical privacy.
        </p>

        <div className="hero-ctas">
          <button onClick={() => setModal('download')} className="btn btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
            <Download size={18} />
            Download APK
          </button>
        </div>

        <p className="hero-badge-note">
          v1.0.1 (Android) • Free &amp; Open Source • 100% Private
        </p>
      </header>

      {/* Ticker / Highlights Bar */}
      <section className="ticker">
        <div className="container ticker-inner">
          <div className="ticker-item"><span className="ticker-dot"></span> 100% Offline &amp; Private</div>
          <div className="ticker-item"><span className="ticker-dot"></span> Zero Account Required</div>
          <div className="ticker-item"><span className="ticker-dot"></span> Instant SMS Detection</div>
          <div className="ticker-item"><span className="ticker-dot"></span> Zero Cloud Sync</div>
        </div>
      </section>

      {/* Screenshots Marquee Showcase */}
      <section className="screenshots">
        <div className="container screenshots-header">
          <p className="screenshots-label caption-uppercase">SEE IT IN ACTION</p>
          <h2 className="screenshots-title display-md">Built for the way you spend</h2>
        </div>

        <div className="scroll-strip-wrapper">
          {/* Marquee Group 1 */}
          <div className="marquee-group">
            {/* Screen 1: Dashboard */}
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="caption" style={{ color: 'var(--muted)' }}>Good Morning,</div>
                  <div className="mockup-card">
                    <div className="caption" style={{ color: 'var(--muted)' }}>Today's Expense</div>
                    <div className="mockup-balance-amt">₹1,749.00</div>
                  </div>
                  <div className="mockup-tx-list">
                    <div className="mockup-tx-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="mockup-tx-tag" style={{ background: 'var(--accent-emerald)', color: '#0b1411' }}>FB</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>Starbucks</div>
                          <div className="caption" style={{ color: 'var(--muted)', fontSize: '10px' }}>Food</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-coral)' }}>-₹250</div>
                    </div>
                    <div className="mockup-tx-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="mockup-tx-tag" style={{ background: 'var(--accent-azure)', color: '#0b1411' }}>TR</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>Uber Trip</div>
                          <div className="caption" style={{ color: 'var(--muted)', fontSize: '10px' }}>Transport</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-coral)' }}>-₹200</div>
                    </div>
                    <div className="mockup-tx-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="mockup-tx-tag" style={{ background: 'var(--accent-teal)', color: '#0b1411' }}>SH</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>Amazon</div>
                          <div className="caption" style={{ color: 'var(--muted)', fontSize: '10px' }}>Shopping</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-coral)' }}>-₹1,299</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Daily Expenses</p>
            </div>

            {/* Screen 2: Visual Insights */}
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="mockup-header-title">Analytics</div>
                  <div className="mockup-card" style={{ textAlign: 'center', padding: '18px 10px' }}>
                    <div className="caption" style={{ color: 'var(--muted)' }}>Total Spent this Month</div>
                    <div className="mockup-balance-amt">₹24,850</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '10px 8px', background: 'var(--surface-soft)', borderRadius: '16px' }}>
                    <div style={{ width: '18%', height: '55%', background: 'var(--accent-emerald)', borderRadius: '6px' }}></div>
                    <div style={{ width: '18%', height: '85%', background: 'var(--accent-azure)', borderRadius: '6px' }}></div>
                    <div style={{ width: '18%', height: '40%', background: 'var(--accent-amber)', borderRadius: '6px' }}></div>
                    <div style={{ width: '18%', height: '100%', background: 'var(--accent-purple)', borderRadius: '6px' }}></div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Visual Analytics</p>
            </div>

            {/* Screen 3: Budgets */}
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="mockup-header-title">Budgets</div>
                  <div className="mockup-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                        <span>Food &amp; Dining</span>
                        <span>₹4,200 / ₹6,000</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#e2ddd5', borderRadius: '10px', marginTop: '4px' }}>
                        <div style={{ width: '70%', height: '100%', background: 'var(--accent-emerald)', borderRadius: '10px' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                        <span>Transport</span>
                        <span>₹1,500 / ₹3,000</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#e2ddd5', borderRadius: '10px', marginTop: '4px' }}>
                        <div style={{ width: '50%', height: '100%', background: 'var(--accent-azure)', borderRadius: '10px' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                        <span>Shopping</span>
                        <span>₹8,900 / ₹10,000</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#e2ddd5', borderRadius: '10px', marginTop: '4px' }}>
                        <div style={{ width: '89%', height: '100%', background: 'var(--accent-coral)', borderRadius: '10px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Smart Budgets</p>
            </div>

            {/* Screen 4: Privacy Guard */}
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen" style={{ textAlign: 'center', justifyContent: 'center', gap: '16px' }}>
                  <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--accent-emerald)', borderRadius: '50%', margin: '0 auto' }}>
                    <ShieldCheck size={36} color="var(--ink)" />
                  </div>
                  <div>
                    <div className="mockup-header-title" style={{ fontSize: '14px' }}>Local Isolation</div>
                    <div className="caption" style={{ color: 'var(--muted)', marginTop: '4px' }}>Network Permission: Blocked</div>
                  </div>
                  <div className="mockup-card" style={{ fontSize: '11px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>✓ Local SQLite Database</div>
                    <div>✓ Zero Telemetry &amp; Logs</div>
                    <div>✓ On-Device SMS Parser</div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Privacy Isolation</p>
            </div>
          </div>

          {/* Marquee Group 2 (Duplicate for smooth infinite scroll) */}
          <div className="marquee-group">
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="caption" style={{ color: 'var(--muted)' }}>Good Morning,</div>
                  <div className="mockup-card">
                    <div className="caption" style={{ color: 'var(--muted)' }}>Today's Expense</div>
                    <div className="mockup-balance-amt">₹1,749.00</div>
                  </div>
                  <div className="mockup-tx-list">
                    <div className="mockup-tx-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="mockup-tx-tag" style={{ background: 'var(--accent-violet)' }}>FB</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>Starbucks</div>
                          <div className="caption" style={{ color: 'var(--muted)', fontSize: '10px' }}>Food</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-pink)' }}>-₹250</div>
                    </div>
                    <div className="mockup-tx-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="mockup-tx-tag" style={{ background: 'var(--accent-sky)' }}>TR</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>Uber Trip</div>
                          <div className="caption" style={{ color: 'var(--muted)', fontSize: '10px' }}>Transport</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-pink)' }}>-₹200</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Daily Expenses</p>
            </div>

            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="mockup-header-title">Analytics</div>
                  <div className="mockup-card" style={{ textAlign: 'center', padding: '18px 10px' }}>
                    <div className="caption" style={{ color: 'var(--muted)' }}>Total Spent this Month</div>
                    <div className="mockup-balance-amt">₹24,850</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '10px 8px', background: 'var(--surface-soft)', borderRadius: '16px' }}>
                    <div style={{ width: '18%', height: '55%', background: 'var(--accent-violet)', borderRadius: '6px' }}></div>
                    <div style={{ width: '18%', height: '85%', background: 'var(--accent-pink)', borderRadius: '6px' }}></div>
                    <div style={{ width: '18%', height: '40%', background: 'var(--accent-sky)', borderRadius: '6px' }}></div>
                    <div style={{ width: '18%', height: '100%', background: 'var(--accent-mint)', borderRadius: '6px' }}></div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Visual Analytics</p>
            </div>

            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="mockup-header-title">Budgets</div>
                  <div className="mockup-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                        <span>Food &amp; Dining</span>
                        <span>₹4,200 / ₹6,000</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: '#e5e5e5', borderRadius: '10px', marginTop: '4px' }}>
                        <div style={{ width: '70%', height: '100%', background: 'var(--accent-violet)', borderRadius: '10px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Smart Budgets</p>
            </div>

            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="mockup-notch"></div>
                <div className="mockup-screen" style={{ textAlign: 'center', justifyContent: 'center', gap: '16px' }}>
                  <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--accent-mint)', borderRadius: '50%', margin: '0 auto' }}>
                    <ShieldCheck size={36} color="var(--ink)" />
                  </div>
                  <div>
                    <div className="mockup-header-title" style={{ fontSize: '14px' }}>Local Isolation</div>
                    <div className="caption" style={{ color: 'var(--muted)', marginTop: '4px' }}>Network Permission: Blocked</div>
                  </div>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted)' }}>Privacy Isolation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="features-section container">
        <div className="features-container">
          <div className="features-header">
            <p className="caption-uppercase" style={{ color: 'var(--muted)' }}>WHY MONTRA</p>
            <h2 className="display-md">Everything you need, nothing you don't</h2>
            <p className="body-md">Six fundamental reasons privacy-conscious users choose Montra over cloud trackers.</p>
          </div>

          <div className="features-grid">
            {/* 1 */}
            <div className="feature-card feature-card-1 col-span-2 flex-row">
              <ShieldCheck className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">100% Offline by Design</h3>
                <p className="body-sm">No servers, no cloud sync, and no third-party trackers. Your financial data is physically locked inside your device storage.</p>
              </div>
            </div>

            {/* 2 */}
            <div className="feature-card feature-card-2">
              <Zap className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Instant SMS Auto-Parsing</h3>
                <p className="body-sm">Parses bank and UPI notifications automatically in milliseconds without requiring manual expense input.</p>
              </div>
            </div>

            {/* 3 */}
            <div className="feature-card feature-card-3">
              <User className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Zero Sign-ups Required</h3>
                <p className="body-sm">No accounts, passwords, or emails. Open the app and begin tracking your expenses right away.</p>
              </div>
            </div>

            {/* 4 */}
            <div className="feature-card feature-card-4">
              <Layers className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Smart Categorization</h3>
                <p className="body-sm">Automatically classifies merchants into Food, Shopping, Bills, Transport, and custom categories.</p>
              </div>
            </div>

            {/* 5 */}
            <div className="feature-card feature-card-5">
              <PieChart className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Visual Spending Analytics</h3>
                <p className="body-sm">Clear charts and weekly/monthly trends highlight where your money goes so you can save faster.</p>
              </div>
            </div>

            {/* 6 */}
            <div className="feature-card feature-card-6">
              <BarChart3 className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Custom Budget Targets</h3>
                <p className="body-sm">Set category limits and monthly spending caps to keep your finances strictly on track.</p>
              </div>
            </div>

            {/* 7 */}
            <div className="feature-card feature-card-7 col-span-2 flex-row">
              <Lock className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Protected Internal Database</h3>
                <p className="body-sm">High-speed local SQLite database stored in sandbox memory with optional biometric fingerprint lock.</p>
              </div>
            </div>

            {/* 8 */}
            <div className="feature-card feature-card-8 col-span-3 flex-row">
              <Database className="feature-icon-svg" />
              <div className="feature-content">
                <h3 className="title-md">Data Export &amp; Full Ownership</h3>
                <p className="body-sm">Export clean transaction CSVs anytime to backup, analyze in Excel, or store wherever you choose. You hold full ownership of your data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section container">
        <div className="faq-header">
          <p className="caption-uppercase" style={{ color: 'var(--muted)' }}>QUESTIONS</p>
          <h2 className="display-md">Straight answers</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col-left">
              <div className="footer-logo display-font">
                <img src={logo} alt="Montra Logo" />
                Montra
              </div>
              <p className="footer-desc">
                Montra is a 100% offline personal finance tracker for Android. It securely parses your bank SMS notifications locally to track spending without servers or sign-ups.
              </p>
              <p className="footer-copy">&copy; 2026 Montra. All rights reserved.</p>
            </div>

            <div className="footer-col-middle">
              <div className="footer-column">
                <div className="footer-column-title display-font">Legal &amp; Privacy</div>
                <button className="footer-link-btn" onClick={() => setModal('privacy')}>Privacy Policy</button>
                <button className="footer-link-btn" onClick={() => setModal('terms')}>Terms &amp; Conditions</button>
              </div>
            </div>

            <div className="footer-col-right">
              <div className="footer-column">
                <div className="footer-column-title display-font">Developer</div>
                <div className="footer-dev-name">Yashwant Rangrej</div>
                <div className="footer-dev-socials">
                  <a href="https://github.com/Yashwant-Rangrej" target="_blank" rel="noreferrer" title="GitHub" className="footer-social-link">
                    <GithubIcon size={18} />
                  </a>
                  <a href="https://www.linkedin.com/in/yashwant-rangrej-0856993a8/" target="_blank" rel="noreferrer" title="LinkedIn" className="footer-social-link">
                    <LinkedinIcon size={18} />
                  </a>
                  <a href="mailto:yashwant15rangrej@gmail.com" title="Email" className="footer-social-link">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Developer Support FAB & Typewriter */}
      <motion.div 
        className="support-fab"
        animate={{ 
          opacity: isNearBottom ? 0 : 1, 
          y: isNearBottom ? 20 : 0, 
          pointerEvents: isNearBottom ? 'none' : 'auto' 
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="support-msg-bubble">
          <span>{typedText}</span><span className="cursor">|</span>
        </div>
        <div className="support-btn-group">
          <span className="support-name-tag">Yashwant</span>
          <a href="https://github.com/Yashwant-Rangrej" target="_blank" rel="noreferrer" title="GitHub" className="support-social-link">
            <GithubIcon size={18} />
          </a>
          <a href="https://www.linkedin.com/in/yashwant-rangrej-0856993a8/" target="_blank" rel="noreferrer" title="LinkedIn" className="support-social-link">
            <LinkedinIcon size={18} />
          </a>
          <a href="mailto:yashwant15rangrej@gmail.com" title="Email" className="support-social-link">
            <Mail size={18} />
          </a>
        </div>
      </motion.div>

      {/* Modals for Legal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            {modal === 'download' && (
              <>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={28} color="var(--ink)" />
                  Installation Guide
                </h2>
                <div className="modal-content">
                  <div style={{ padding: '18px', backgroundColor: '#fff5f5', border: '1px solid #ffcccc', borderRadius: '14px', marginBottom: '24px', marginTop: '16px' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#d9534f' }}>
                      Why does Play Protect block this?
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#883333', lineHeight: 1.5 }}>
                      Montra requires the <strong>SMS reading permission</strong> to automatically detect your bank transactions. 
                      Because this app is sideloaded (downloaded outside the Play Store), Google's automated system flags 
                      <em>any</em> app requesting SMS access as a potential risk. 
                      <br /><br />
                      <strong>Montra is 100% offline, open-source, and has no cloud servers.</strong> Your data never leaves your device. 
                      To install it successfully, you must temporarily disable Play Protect.
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '12px', fontWeight: 600 }}>Steps to install:</div>
                  <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: 'var(--body)' }}>
                    <li>Open the <strong>Google Play Store</strong> app on your Android device.</li>
                    <li>Tap your profile icon in the top right corner.</li>
                    <li>Tap on <strong>Play Protect</strong>.</li>
                    <li>Tap the Settings (gear) icon in the top right corner.</li>
                    <li>Turn off <strong>"Scan apps with Play Protect"</strong>.</li>
                    <li>Download the APK below and install it.</li>
                  </ol>

                  <div style={{ marginTop: '36px', textAlign: 'center' }}>
                    <a href="/Montra-Web/app-release.apk" download className="btn btn-primary" style={{ width: '100%', height: '54px', fontSize: '16px' }} onClick={() => setModal(null)}>
                      <Download size={20} />
                      I have turned it off, Download APK
                    </a>
                  </div>
                </div>
              </>
            )}
            {modal === 'terms' && (
              <>
                <h2>Terms &amp; Conditions</h2>
                <p className="modal-date">Last updated: September 2026</p>
                <div className="modal-content">
                  <h3>1. Acceptance of Terms</h3>
                  <p>By downloading or using Montra, you agree to these Terms. If you do not agree, do not use the app.</p>
                  <h3>2. Use of the App</h3>
                  <p>Montra is a personal finance tracker for individual, non-commercial use. You agree not to reverse-engineer, modify, or redistribute the app.</p>
                  <h3>3. SMS Permission</h3>
                  <p>Montra requests SMS read permission solely to detect and parse bank transaction notifications. This data is processed exclusively on your device and is never transmitted anywhere.</p>
                  <h3>4. No Warranty</h3>
                  <p>Montra is provided "as is" without any warranty. We do not guarantee the accuracy of parsed transactions. Always verify with your bank.</p>
                  <h3>5. Limitation of Liability</h3>
                  <p>The developer is not liable for any financial loss, data loss, or damages arising from the use of this app.</p>
                  <h3>6. Contact</h3>
                  <p>For any queries, contact: yashwant15rangrej@gmail.com</p>
                </div>
              </>
            )}
            {modal === 'privacy' && (
              <>
                <h2>Privacy Policy</h2>
                <p className="modal-date">Last updated: September 2026</p>
                <div className="modal-content">
                  <h3>1. Radical Privacy Commitment</h3>
                  <p>Montra is built on a foundation of radical privacy. We do not collect, store, or transmit any personal or financial data.</p>
                  <h3>2. Data We DO NOT Collect</h3>
                  <ul>
                    <li>No account or sign-up required</li>
                    <li>No email, name, or phone number collected</li>
                    <li>No SMS content sent to any server</li>
                    <li>No analytics or tracking SDKs</li>
                  </ul>
                  <h3>3. On-Device Processing</h3>
                  <p>All SMS parsing and transaction categorization happens entirely on your device using local algorithms. Your data never leaves your phone.</p>
                  <h3>4. Storage</h3>
                  <p>All your financial data is stored locally in your device's secure SQLite database storage. Uninstalling the app deletes all data permanently.</p>
                  <h3>5. Contact</h3>
                  <p>Questions? Reach out at: yashwant15rangrej@gmail.com</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
