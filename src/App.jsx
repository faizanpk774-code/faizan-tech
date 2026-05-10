import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import heroPortrait from '../hero-portrait.png';
import cwImage from '../cw.png';
import wtImage from '../wt.png';
import pointOfSaleImage from '../MY PROJECTS.png';
import fgzImage from '../FAIZAN GAMING ZONE.png';
import noorImage from '../MY PROJECTS (2).png';
import sparksImage from '../SPARKS.png';

function useScrollReveal(location) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 'light';
  });

  const location = useLocation();
  const navigate = useNavigate();

  useScrollReveal(location);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeIcon = theme === 'dark' ? '☀️' : '🌙';

  const handleContactClick = event => {
    event.preventDefault();
    navigate('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const navItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Works', to: '/works' }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative z-10">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-[image:var(--gradient-brand)] grid place-items-center text-brand-foreground font-display font-bold shadow-brand">
              F
            </span>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg">
                Faizan<span className="text-brand">.</span>tech
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Faizan Technologies</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map(item => (
              <Link key={item.to} to={item.to} className="hover:text-brand transition-colors">
                {item.label}
              </Link>
            ))}
            <a href="/#contact" onClick={handleContactClick} className="hover:text-brand transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))} className="rounded-full bg-secondary text-secondary-foreground px-3 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
              {themeIcon}
            </button>
            <a href="https://wa.link/yxoxsf" className="rounded-full bg-ink text-background px-5 py-2.5 text-sm font-medium hover:bg-brand transition-colors">
              Let's Connect
            </a>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage handleContactClick={handleContactClick} heroPortrait={heroPortrait} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage images={{ cwImage, wtImage, pointOfSaleImage, fgzImage, noorImage, sparksImage }} />} />
        </Routes>
      </main>
    </div>
  );
}

function HomePage({ handleContactClick, heroPortrait }) {
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-grid reveal reveal-top">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[image:var(--gradient-brand)] opacity-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse"></span>
              Trusted by industry experts • 5★ rapid response
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Tech Partner for <span className="text-gradient-brand">Scalable</span>, High Converting Solutions.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Faizan Technologies designs, builds and scales web products that move the needle — from custom eCommerce to full-stack engineering and cloud DevOps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/#contact" onClick={handleContactClick} className="rounded-full bg-[image:var(--gradient-brand)] text-brand-foreground px-7 py-3.5 font-medium shadow-brand hover:scale-[1.02] transition-transform">
                Start a Project
              </a>
              <Link to="/works" className="rounded-full border border-border px-7 py-3.5 font-medium hover:bg-secondary transition-colors">
                View Our Work
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">120+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">20+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Masteries</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">60+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Projects</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[image:var(--gradient-brand)] rounded-[3rem] blur-2xl opacity-30"></div>
            <div className="relative rounded-[3rem] bg-card border border-border shadow-soft overflow-hidden">
              <img src={heroPortrait} alt="Faizan Technologies — Full Stack Team" width="1024" height="1024" className="w-full h-auto" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-background/90 backdrop-blur p-4 border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">The WebSmiths</div>
                <div className="font-display font-semibold">Web · DevOps · CMS · UI/UX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Services</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            You're not just hiring a developer — you're partnering with a team that genuinely cares about your success.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6 reveal reveal-right">
          <article className="group rounded-3xl border border-border bg-card p-8 hover:border-brand transition-all hover:shadow-brand">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Development</div>
            <h3 className="mt-2 text-2xl font-bold group-hover:text-brand transition-colors">Web Development</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We build robust applications using MERN, WordPress, and OpenCart. From full-stack web apps to custom plugins and API integrations, we deliver secure, scalable, and high-performing solutions — including complete eCommerce platforms with seamless checkout.
            </p>
          </article>
          <article className="group rounded-3xl border border-border bg-card p-8 hover:border-brand transition-all hover:shadow-brand">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">DevOps</div>
            <h3 className="mt-2 text-2xl font-bold group-hover:text-brand transition-colors">Cloud & DevOps</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We automate and optimize cloud infrastructure with AWS, Docker, Kubernetes and CI/CD pipelines via GitHub Actions and Jenkins. Terraform, Ansible, Grafana and Prometheus power scalable, secure deployments and proactive monitoring.
            </p>
          </article>
          <article className="group rounded-3xl border border-border bg-card p-8 hover:border-brand transition-all hover:shadow-brand">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Design</div>
            <h3 className="mt-2 text-2xl font-bold group-hover:text-brand transition-colors">UI / UX Design</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Modern, mobile-responsive designs focused on user experience, brand identity and SEO. With Core Web Vitals optimization your website loads fast, ranks higher and engages users with a clean layout that drives conversions.
            </p>
          </article>
          <article className="group rounded-3xl border border-border bg-card p-8 hover:border-brand transition-all hover:shadow-brand">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Systems Administration</div>
            <h3 className="mt-2 text-2xl font-bold group-hover:text-brand transition-colors">Architecture Management</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Deep expertise in Linux servers, DNS and email infrastructure. From server hardening and malware removal to SPF/DKIM/DMARC setup, we provide full-stack infrastructure support and seamless hosting or migration across cloud platforms.
            </p>
          </article>
        </div>
      </section>

      <section id="process" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Process</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">From idea to launch in 3 focused steps.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 reveal reveal-right">
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Step 1.</div>
            <h3 className="mt-3 text-2xl font-bold">Discovery & Consultation</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We start with a quick call to understand your vision, goals and technical needs — asking the right questions to uncover the best approach.
            </p>
          </div>
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Step 2.</div>
            <h3 className="mt-3 text-2xl font-bold">Proposal & Planning</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              You receive a detailed project plan with timelines, milestones and a clear cost breakdown. Once approved, we set up the environment and prepare assets.
            </p>
          </div>
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Step 3.</div>
            <h3 className="mt-3 text-2xl font-bold">Development & Launch</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Using agile practices we ship in phases with regular updates. After revisions and final testing, your product goes live — fully optimized and ready to perform.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="rounded-[3rem] bg-[image:var(--gradient-brand)] text-brand-foreground p-12 md:p-20 relative overflow-hidden shadow-brand reveal reveal-left">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-background/10 blur-3xl"></div>
            <div className="relative max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold opacity-80">Collaboration</div>
              <h2 className="mt-3 text-5xl md:text-6xl font-bold leading-tight">
                Got a project? <br />Let's talk.
              </h2>
              <p className="mt-6 text-lg opacity-90">
                Ready to take your online presence to the next level? We're here to help boost your brand's visibility with smart, tailored solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 items-center">
                <a href="mailto:faizanpk774@gmail.com" className="rounded-full bg-ink text-background px-7 py-3.5 font-medium hover:scale-[1.02] transition-transform inline-flex items-center gap-2">
                  faizanpk774@gmail.com →
                </a>
                <Link to="/works" className="rounded-full border border-background/30 px-7 py-3.5 font-medium hover:bg-background/10 transition-colors">
                  See our work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 reveal reveal-top">
      <div className="reveal reveal-left">
        <div className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Pixels, Passion, Progress</div>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">Built from Curiosity.</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Muhammad Faizan’s journey as a successful, passionate, and self-taught Tech Entrepreneur & Full Stack Developer began with a deep curiosity for computers and tech gadgets. That early fascination evolved into a full-blown career, and today it’s reflected in every line of code he writes and every interface he designs.
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex gap-5 p-6 rounded-2xl border border-border hover:bg-secondary/50 transition-colors reveal reveal-right">
          <div className="text-3xl">🤝</div>
          <div>
            <h4 className="font-bold text-lg">Client-Centered Communication</h4>
            <p className="text-muted-foreground mt-1">Clear, responsive communication that ensures smooth collaboration and a shared vision throughout every project.</p>
          </div>
        </div>
        <div className="flex gap-5 p-6 rounded-2xl border border-border hover:bg-secondary/50 transition-colors reveal reveal-right">
          <div className="text-3xl">🔍</div>
          <div>
            <h4 className="font-bold text-lg">Problem Solving & Optimization</h4>
            <p className="text-muted-foreground mt-1">We identify and fix performance and UX issues, delivering efficient, user-friendly solutions that work flawlessly.</p>
          </div>
        </div>
        <div className="flex gap-5 p-6 rounded-2xl border border-border hover:bg-secondary/50 transition-colors reveal reveal-right">
          <div className="text-3xl">📈</div>
          <div>
            <h4 className="font-bold text-lg">Business-Oriented Thinking</h4>
            <p className="text-muted-foreground mt-1">Every project is aligned with your business goals to drive measurable impact and long-term success.</p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function WorksPage({ images }) {
  const cards = [
    {
      number: '01',
      title: 'COMPUTER WORLD PK',
      description: 'Computer World PK is a WordPress-based retail store built as a complete eCommerce solution. We delivered a custom WordPress storefront with product catalog, payment integration, inventory management, and responsive UX for fast, reliable online shopping.',
      image: images.cwImage,
      tags: ['Retail Store', 'Online Shop', 'Web Dev'],
      href: 'https://computerworldpk.com/'
    },
    {
      number: '02',
      title: 'WEBTRO LIMITED',
      description: 'Webtro Limited is a WordPress gaming store built to sell premium gaming products online. We delivered a polished WooCommerce storefront with product listings, secure checkout, inventory control, and a responsive shopping experience for gamers.',
      image: images.wtImage,
      tags: ['WordPress', 'Gaming Store'],
      href: 'https://webtro.co.uk/'
    },
    {
      number: '03',
      title: 'POINT OF SALE',
      description: 'Computer World is a technology company providing modern digital solutions and advanced retail systems. We developed a professional POS system with fast performance, easy inventory management, billing, sales tracking, and a user-friendly interface to improve business efficiency and customer experience.',
      image: images.pointOfSaleImage,
      tags: ['HTML, CSS, JavaScript'],
      href: 'https://worldupdates.us/'
    },
    {
      number: '04',
      title: 'FAIZAN GAMING ZONE',
      description: 'Faizan Gaming Zone is a modern gaming platform built using HTML, CSS, and JavaScript. We designed and developed a fully custom, responsive website with a clean UI/UX, smooth animations, and interactive features to provide an engaging gaming experience. The platform is optimized for speed, mobile responsiveness, and user-friendly navigation.',
      image: images.fgzImage,
      tags: ['HTML', 'CSS', 'JavaScript'],
      href: 'http://www.fgz.worldupdates.us/'
    },
    {
      number: '05',
      title: 'NOOR AL FAKHAR',
      description: 'Noor Al Fakhar LLC is a professional business solutions company. We designed and developed a modern, responsive website with a clean UI/UX, smooth navigation, and strong online presence to showcase their services effectively. The website is fully optimized for mobile devices, performance, and user engagement.',
      image: images.noorImage,
      tags: ['WebDev', 'eCommerce', 'UI/UX'],
      href: 'https://www.nooralfakharllc.com/'
    },
    {
      number: '06',
      title: 'SPARKS ADVERTISING',
      description: 'Sparks Advertising Agency is a creative digital agency delivering innovative solutions for modern businesses. We specialize in website development, branding, social media marketing, UI/UX design, and digital strategy to help brands build a strong online presence and achieve real business growth.',
      image: images.sparksImage,
      tags: ['WordPress', 'UI/UX', 'WebDev'],
      href: 'https://sparksadvert.com/'
    }
  ];

  return (
    <section className="works-section-dark bg-ink text-background py-24 reveal reveal-top">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Selected Works</div>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">Recent Projects</h1>
          </div>
          <p className="text-muted-foreground max-w-md">A glimpse of brands and businesses we've helped grow online.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal reveal-right">
          {cards.map(card => (
            <a key={card.number} href={card.href} className="works-card-dark group relative rounded-3xl overflow-hidden bg-background/5 border border-background/10 p-8 aspect-[3/4] flex flex-col justify-between hover:border-brand transition-all">
              <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: card.number === '01'
                    ? 'radial-gradient(circle at 30% 20%, oklch(0.72 0.21 45 / 0.5), transparent 60%)'
                    : card.number === '02'
                    ? 'radial-gradient(circle at 40% 25%, oklch(0.72 0.21 45 / 0.5), transparent 60%)'
                    : card.number === '03'
                    ? 'radial-gradient(circle at 50% 30%, oklch(0.72 0.21 45 / 0.5), transparent 60%)'
                    : card.number === '04'
                    ? 'radial-gradient(circle at 60% 35%, oklch(0.72 0.21 45 / 0.5), transparent 60%)'
                    : card.number === '05'
                    ? 'radial-gradient(circle at 70% 40%, oklch(0.72 0.21 45 / 0.5), transparent 60%)'
                    : 'radial-gradient(circle at 80% 45%, oklch(0.72 0.21 45 / 0.5), transparent 60%)' }}>
              </div>
              <div className="relative text-7xl font-display font-bold text-muted-foreground opacity-20 group-hover:opacity-40 transition-all">
                {card.number}
              </div>
              <div className="relative">
                <div className="mt-4 flex justify-center">
                  <img src={card.image} alt={card.title} className="h-24 w-auto max-w-[120px] object-contain" />
                </div>
                <h3 className="text-3xl font-bold text-center">{card.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground text-center">{card.description}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-background/10 border border-background/10">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© 2026 Faizan Technologies. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="https://www.facebook.com/muhammad.faizan.776350" className="hover:text-brand">Facebook</a>
          <a href="https://www.linkedin.com/in/muhammad-faizan-ab4822360/" className="hover:text-brand">LinkedIn</a>
          <a href="https://github.com/faizanpk774" className="hover:text-brand">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default App;
