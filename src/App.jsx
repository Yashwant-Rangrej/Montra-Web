import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, PieChart, Mail, User } from 'lucide-react';

const GithubIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const phoneScale = useTransform(scrollY, [0, 500], [1, 0.9]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const transactionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="floating-elements">
        <motion.div className="float-el el-1" animate={{ y: [0, -40, 0], rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}><Zap size={80} color="var(--primary)"/></motion.div>
        <motion.div className="float-el el-2" animate={{ y: [0, 50, 0], rotate: [0, -30, 30, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}><PieChart size={100} color="var(--secondary)"/></motion.div>
        <motion.div className="float-el el-3" animate={{ y: [0, -60, 0], rotate: [0, 25, -25, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}><ShieldCheck size={90} color="var(--tertiary)"/></motion.div>
        <motion.div className="float-el el-4" animate={{ y: [0, 40, 0], rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}><Download size={70} color="var(--primary)"/></motion.div>
      </div>

      <motion.header 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container nav-content">
          <div className="logo">Montra</div>
          <motion.a 
            href="/app-release.apk" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Now
          </motion.a>
        </div>
      </motion.header>

      <main>
        <section className="hero container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ y: heroY }}
          >
            <motion.h1 className="hero-title" variants={fadeInUp}>
              Track your expenses <span className="highlight">automagically</span>.
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              Montra securely reads your bank SMS notifications to track your spending. Fully offline, private, and powerful.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeInUp}>
              <motion.a 
                href="/app-release.apk" 
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="icon" />
                Download APK
              </motion.a>
              <span className="version-badge">v1.0.1 (Android)</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ scale: phoneScale }}
          >
            <div className="phone-mockup">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1 }}
                  className="app-header"
                >
                  Good Morning,
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 1.2, type: "spring" }}
                  className="app-balance-card"
                >
                  <div className="balance-title">Today's Expense</div>
                  <div className="balance-amount">?1,749.00</div>
                </motion.div>
                <motion.div 
                  className="app-transactions"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 1.6 } } }}
                >
                  <motion.div className="tx-item" variants={transactionVariants}>
                    <div className="tx-icon" style={{color: "var(--primary)", backgroundColor: "var(--primary-light)"}}>FB</div>
                    <div className="tx-details"><div className="tx-name">Starbucks</div><div className="tx-cat">Food</div></div>
                    <div className="tx-amt" style={{color: "var(--primary)"}}>-?250</div>
                  </motion.div>
                  <motion.div className="tx-item" variants={transactionVariants}>
                    <div className="tx-icon" style={{color: "var(--secondary)", backgroundColor: "var(--secondary-container)"}}>TR</div>
                    <div className="tx-details"><div className="tx-name">Uber</div><div className="tx-cat">Transport</div></div>
                    <div className="tx-amt" style={{color: "var(--secondary)"}}>-?200</div>
                  </motion.div>
                  <motion.div className="tx-item" variants={transactionVariants}>
                    <div className="tx-icon">SH</div>
                    <div className="tx-details"><div className="tx-name">Amazon</div><div className="tx-cat">Shopping</div></div>
                    <div className="tx-amt">-?1,299</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="interactive-section">
          <div className="container qa-container">
            <motion.h2 
              className="question"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              "Is my financial data safe?"
            </motion.h2>
            
            <motion.div 
              className="answer-box"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="answer-title"><ShieldCheck color="var(--primary)" size={40} /> 100% Offline & Private</div>
              <p className="answer-desc">
                Your data is fully stored offline on your device. We do not use servers, we do not track you, and your SMS messages never leave your phone. Complete privacy is guaranteed.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="interactive-section">
          <div className="container qa-container">
            <motion.h2 
              className="question"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              "Do I have to enter every coffee I buy?"
            </motion.h2>
            
            <motion.div 
              className="answer-box green"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="answer-title"><Zap color="var(--secondary)" size={40} /> Zero Manual Effort</div>
              <p className="answer-desc">
                Montra automagically reads your bank SMS notifications in the background, extracts the amount, and instantly categorizes the expense. You literally do nothing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="interactive-section">
          <div className="container qa-container">
            <motion.h2 
              className="question"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              "How do I know where my money goes?"
            </motion.h2>
            
            <motion.div 
              className="answer-box red"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="answer-title"><PieChart color="var(--tertiary)" size={40} /> Beautiful Analytics</div>
              <p className="answer-desc">
                Intuitive charts, weekly trends, and merchant intelligence break down your spending habits. See exactly where your money goes so you can save more for what matters.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="interactive-section">
          <div className="container qa-container">
            <motion.h2 
              className="question"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              "Who is Montra built for?"
            </motion.h2>
            
            <motion.div 
              className="answer-box"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="answer-title"><User color="var(--primary)" size={40} /> For the Privacy-Conscious</div>
              <p className="answer-desc">
                Montra is designed for individuals who want effortless expense tracking without sacrificing personal data. If you refuse to give third-party apps access to your bank accounts or upload your SMS to the cloud, Montra is built exactly for you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="trust-section">
          <div className="container">
            <motion.div 
              className="trust-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.6 }}
            >
              <div className="trust-content">
                <h2>Why trust Montra?</h2>
                <p className="trust-subtitle">Most expense trackers upload your sensitive bank messages to their servers. <strong>We don't.</strong></p>
                <ul className="trust-list">
                  <li><ShieldCheck size={28} color="var(--primary)" /> <div><strong>Zero Data Collection:</strong> We don't even have a database server. Your data is literally trapped inside your phone.</div></li>
                  <li><Zap size={28} color="var(--primary)" /> <div><strong>On-Device Processing:</strong> SMS parsing happens locally on your phone's processor using smart algorithms.</div></li>
                  <li><User size={28} color="var(--primary)" /> <div><strong>No Sign-up Required:</strong> Download and start using immediately. No email, no phone number, no tracking.</div></li>
                </ul>
              </div>
              <div className="trust-visual">
                <div className="phone-mockup mini">
                  <div className="phone-notch"></div>
                  <div className="phone-screen bg-light-trust">
                    <ShieldCheck size={72} color="var(--primary)" className="mb-4" />
                    <h3 className="text-title">Privacy Status</h3>
                    <div className="status-item"><span className="dot green"></span> Network: Blocked</div>
                    <div className="status-item"><span className="dot green"></span> Storage: Local Only</div>
                    <div className="status-item"><span className="dot green"></span> SMS: Secure Parse</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="screenshots-section">
          <div className="container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
            >
              Inside the App
            </motion.h2>
            <div className="screenshots-grid">
              <motion.div className="screenshot-card" whileHover={{ y: -15 }} transition={{ type: "spring" }}>
                <div className="phone-mockup mini">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="app-header">Analytics</div>
                    <div className="fake-chart-circle"></div>
                    <div className="fake-chart-bars">
                      <div className="bar" style={{height: "60%"}}></div>
                      <div className="bar" style={{height: "80%"}}></div>
                      <div className="bar" style={{height: "40%"}}></div>
                      <div className="bar" style={{height: "100%"}}></div>
                    </div>
                  </div>
                </div>
                <h3>Visual Insights</h3>
              </motion.div>

              <motion.div className="screenshot-card" whileHover={{ y: -15 }} transition={{ type: "spring", delay: 0.1 }}>
                <div className="phone-mockup mini">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="app-header">Budgets</div>
                    <div className="budget-item">
                      <div className="b-title">Food</div>
                      <div className="b-bar"><div className="b-fill" style={{width: "80%", background: "var(--primary)"}}></div></div>
                    </div>
                    <div className="budget-item">
                      <div className="b-title">Transport</div>
                      <div className="b-bar"><div className="b-fill" style={{width: "40%", background: "var(--secondary)"}}></div></div>
                    </div>
                    <div className="budget-item">
                      <div className="b-title">Shopping</div>
                      <div className="b-bar"><div className="b-fill" style={{width: "90%", background: "var(--tertiary)"}}></div></div>
                    </div>
                  </div>
                </div>
                <h3>Smart Budgets</h3>
              </motion.div>
              
              <motion.div className="screenshot-card" whileHover={{ y: -15 }} transition={{ type: "spring", delay: 0.2 }}>
                <div className="phone-mockup mini">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="app-header">Settings</div>
                    <div className="setting-item">
                      <span>Dark Mode</span><div className="toggle on"></div>
                    </div>
                    <div className="setting-item">
                      <span>Auto Parse</span><div className="toggle on"></div>
                    </div>
                    <div className="setting-item">
                      <span>App Lock</span><div className="toggle on"></div>
                    </div>
                    <div className="setting-item" style={{borderBottom: 'none'}}>
                      <span>Help & Q/A</span><div style={{color: 'var(--primary)', fontWeight: '800'}}>→</div>
                    </div>
                  </div>
                </div>
                <h3>Total Control</h3>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
            >
              How Montra Works
            </motion.h2>
            <div className="steps-container">
              {[
                { step: "1", title: "Install the App", desc: "Download the APK and grant the app secure SMS reading permissions.", icon: <Download size={32} /> },
                { step: "2", title: "Live Life", desc: "Go about your day buying coffee, groceries, or paying your bills.", icon: <Zap size={32} /> },
                { step: "3", title: "Auto-Magic", desc: "Montra quietly categorizes all expenses in the background.", icon: <PieChart size={32} /> }
              ].map((item, i) => (
                <motion.div 
                  className="step-card" 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="step-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="step-number">{item.step}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <motion.div 
            className="container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={staggerContainer}
          >
            <motion.h2 className="cta-title" variants={fadeInUp}>Ready to take control?</motion.h2>
            <motion.div variants={fadeInUp}>
              <motion.a 
                href="/app-release.apk" 
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="icon" />
                Download Montra Now
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 Montra. All rights reserved.</p>
        </div>
      </footer>

      <motion.div 
        className="floating-dev-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
      >
        <div className="dev-name-badge">
          <User size={16} /> <span>Yashwant Rangrej</span>
        </div>
        <div className="dev-socials">
          <a href="https://github.com/Yashwant-Rangrej" target="_blank" rel="noreferrer" title="GitHub"><GithubIcon size={18} /></a>
          <a href="https://www.linkedin.com/in/yashwant-rangrej-0856993a8/" target="_blank" rel="noreferrer" title="LinkedIn"><LinkedinIcon size={18} /></a>
          <a href="mailto:yashwant15rangrej@gmail.com" title="Email"><Mail size={18} /></a>
        </div>
      </motion.div>
    </>
  );
}

export default App;
