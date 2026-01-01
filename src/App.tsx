import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PaymentSection } from './components/PaymentSection';
import { ProjectsSection } from './components/ProjectsSection';
import svgPaths from "./imports/svg-6sovak61ez";
import imgAdobeExpressFile31 from "./assets/24fc04f71f59cbd09402a9281c64cb88198e3a12.png";
import logoKarl from "./assets/a15e50d78d65775af1af53d17931f664763bc13b.png";

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'payments', label: 'Payments' },
    { id: 'contacts', label: 'Contacts' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1f1f1f]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo - Desktop */}
          <div className="hidden lg:flex items-center">
            <img 
              src={logoKarl} 
              alt="Karl Logo" 
              className="h-16 w-16 xl:h-20 xl:w-20 object-contain cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
              onClick={() => scrollToSection('home')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-['Inter',_sans-serif] text-[16px] xl:text-[18px] transition-colors duration-200 ${
                  activeSection === item.id ? 'text-[#f8f7f9]' : 'text-[#f8f7f9]/70 hover:text-[#f8f7f9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile - Menu Button and Logo */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="text-[#f8f7f9] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="h-8 w-px bg-[#f8f7f9]" />
            <img 
              src={logoKarl} 
              alt="Karl Logo" 
              className="h-8 w-8 object-contain cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
              onClick={() => scrollToSection('home')}
            />
          </div>

          {/* Logo/Brand (mobile) */}
          <div className="lg:hidden font-['Inter',_sans-serif] font-bold text-[18px] text-[#f8f7f9]">
            KARL
          </div>
          
          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <div className="h-14 w-px bg-[#f8f7f9]" />
            <div className="flex gap-4 xl:gap-6">
              <SocialIcon type="instagram" />
              <SocialIcon type="x" />
              <SocialIcon type="facebook" />
              <SocialIcon type="github" />
            </div>
          </div>

          {/* Social Icons - Mobile */}
          <div className="flex lg:hidden gap-4">
            <SocialIcon type="instagram" />
            <SocialIcon type="x" />
            <SocialIcon type="facebook" />
            <SocialIcon type="github" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-['Inter',_sans-serif] text-[16px] text-left transition-colors duration-200 ${
                    activeSection === item.id ? 'text-[#f8f7f9]' : 'text-[#f8f7f9]/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function SocialIcon({ type }: { type: 'instagram' | 'x' | 'facebook' | 'github' }) {
  const getPath = () => {
    if (type === 'instagram') {
      return (
        <>
          <path
            d={svgPaths.p4fdb300}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p39557800}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M17.5 6.5H17.51"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </>
      );
    } else if (type === 'x') {
      // X (formerly Twitter) logo
      return (
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          fill="currentColor"
        />
      );
    } else if (type === 'facebook') {
      // Facebook logo
      return (
        <path
          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill="none"
        />
      );
    } else if (type === 'github') {
      // GitHub logo
      return (
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill="none"
        />
      );
    }
  };

  return (
    <button className="text-[#f8f7f9] hover:text-[#f8f7f9]/80 transition-colors duration-200">
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
        {getPath()}
      </svg>
    </button>
  );
}

function HeroSection() {
  const scrollToExperience = () => {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Black Waves */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 left-0 w-full h-[40%] opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path 
              fill="#000000" 
              fillOpacity="0.8"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,213.3C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              style={{ animation: 'wave1 15s ease-in-out infinite' }}
            />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-[40%] opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path 
              fill="#000000" 
              fillOpacity="0.6"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              style={{ animation: 'wave2 20s ease-in-out infinite' }}
            />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-[40%] opacity-15" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path 
              fill="#000000" 
              fillOpacity="0.4"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              style={{ animation: 'wave3 25s ease-in-out infinite' }}
            />
          </svg>
        </div>

        {/* Smoky String Effect */}
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="smokeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#666666', stopOpacity: 0.3 }} />
                <stop offset="50%" style={{ stopColor: '#888888', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#666666', stopOpacity: 0.2 }} />
              </linearGradient>
              <linearGradient id="smokeGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#777777', stopOpacity: 0.2 }} />
                <stop offset="50%" style={{ stopColor: '#999999', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#777777', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <path 
              d="M0,100 Q250,50 500,100 T1000,100 T1500,100" 
              fill="none" 
              stroke="url(#smokeGradient1)" 
              strokeWidth="3"
              style={{ animation: 'smokeString1 30s ease-in-out infinite' }}
            />
            <path 
              d="M0,200 Q300,150 600,200 T1200,200 T1800,200" 
              fill="none" 
              stroke="url(#smokeGradient2)" 
              strokeWidth="2.5"
              style={{ animation: 'smokeString2 35s ease-in-out infinite reverse' }}
            />
            <path 
              d="M100,300 Q400,250 700,300 T1400,300 T2100,300" 
              fill="none" 
              stroke="url(#smokeGradient1)" 
              strokeWidth="2"
              style={{ animation: 'smokeString3 40s ease-in-out infinite' }}
            />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full z-10">
        {/* Two Column Layout - Mobile Stack, Desktop Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="font-['Inter',_sans-serif] font-bold text-[24px] md:text-[32px] lg:text-[40px] xl:text-[48px] text-[#f8f7f9]">
                HI, I'M KARL TOUSSAINT
              </h2>
              <ul className="space-y-2 md:space-y-3">
                <li className="font-['Inter',_sans-serif] text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] text-[#f8f7f9]">
                  • Cybersecurity & AI Automation Consultant
                </li>
                <li className="font-['Inter',_sans-serif] text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] text-[#f8f7f9]">
                  • Web Developer
                </li>
                <li className="font-['Inter',_sans-serif] text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] text-[#f8f7f9]">
                  • Software Developer
                </li>
              </ul>
            </div>

            {/* CTA Buttons - Stack vertically on mobile, horizontal on desktop */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
              <button
                onClick={scrollToAbout}
                className="group border-2 border-[#f8f7f9] px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f] text-center w-full lg:w-auto"
              >
                <span className="font-['Inter',_sans-serif] font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300 whitespace-nowrap">
                  ABOUT ME
                </span>
              </button>

              <button
                onClick={scrollToExperience}
                className="group border-2 border-[#f8f7f9] px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f] text-center w-full lg:w-auto"
              >
                <span className="font-['Inter',_sans-serif] font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300 whitespace-nowrap">
                  VIEW MY PROJECTS
                </span>
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('payments');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group border-2 border-[#f8f7f9] px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f] text-center w-full lg:w-auto"
              >
                <span className="font-['Inter',_sans-serif] font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300 whitespace-nowrap">
                  PAYMENTS
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]">
              <img
                src={imgAdobeExpressFile31}
                alt="Karl Toussaint"
                className="w-full h-full object-cover rounded-2xl grayscale"
              />
              {/* Optional subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#1f1f1f]/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-['Inter',_sans-serif] font-bold text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] text-[#f8f7f9] mb-8 md:mb-12 text-center">
          About me
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="font-['Inter',_sans-serif] text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5] text-center">
            Results-driven cybersecurity and technology professional with over 20 years in sales leadership, systems design, and security consulting. Expert in Linux systems hardening, firewall architecture, AI-driven automation, and full-stack web development. Combines business acumen with deep technical knowledge to design scalable, secure infrastructures and optimize performance across multi-platform environments.
          </p>
        </div>

        {/* Education */}
        <div className="mt-12 md:mt-16">
          <h3 className="font-['Inter',_sans-serif] font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#f8f7f9] mb-6 md:mb-8 text-center">
            EDUCATION
          </h3>
          <div className="max-w-4xl mx-auto">
            <h4 className="font-['Inter',_sans-serif] font-extrabold text-[18px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] mb-2 text-center">
              Associate of Business Administration
            </h4>
            <p className="font-['Inter',_sans-serif] font-medium text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5] text-center">
              Valencia College — Orlando, FL | Feb 2006 – May 2009
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      title: "Principal Owner",
      company: "Central Florida Cybersecurity Consulting",
      period: "Mar 2025 – Present",
      location: "Remote",
      responsibilities: [
        "Developing custom AI-enhanced security solutions for small businesses.",
        "Implementing Suricata-based intrusion detection, pfSense firewalls, and network segmentation.",
        "Onboarded initial clients by deploying secure perimeter firewalls and strengthening endpoint protections."
      ]
    },
    {
      title: "Founder & Owner",
      company: "ThreadVibe (Custom Apparel & DTF Printing)",
      period: "May 2024 – Jun 2025",
      location: "Remote",
      responsibilities: [
        "Designed and managed full-cycle DTF printing systems using modified Epson hardware.",
        "Integrated custom software workflows for automated color management and printer control.",
        "Generated $12K annual revenue and delivered personalized design solutions to over 200 clients."
      ]
    },
    {
      title: "Sales Trainer",
      company: "Westgate Resorts",
      period: "May 2023 – May 2024",
      location: "Orlando, FL",
      responsibilities: [
        "Led training programs across five departments (20–45 participants each).",
        "Created and implemented data-driven scripts and sales workflows improving close ratios."
      ]
    },
    {
      title: "Sales Professional",
      company: "Holiday Inn Club Vacations",
      period: "May 2024 – Jul 2024",
      location: "Orlando, FL",
      responsibilities: [
        "Utilized Salesforce CRM analytics to refine conversion strategies and sales funnel efficiency."
      ]
    },
    {
      title: "Customer Experience Specialist",
      company: "Bluegreen Vacations",
      period: "Mar 2022 – Oct 2022",
      location: "Remote",
      responsibilities: [
        "Delivered high-volume client support with strong de-escalation and service recovery results."
      ]
    },
    {
      title: "Outside Sales Representative",
      company: "Florida Energy Water & Air",
      period: "Apr 2020 – Jan 2022",
      location: "Orlando, FL",
      responsibilities: [
        "Surpassed 130% of quota and earned Commander's Club honors.",
        "Designed field-based canvassing systems that increased lead flow during shortages."
      ]
    },
    {
      title: "Sales & Customer Engagement Roles",
      company: "Hilton Worldwide | Wyndham Destinations | Holiday Inn Club Vacations",
      period: "2014 – 2019",
      location: "Various Locations",
      responsibilities: [
        "Consistently ranked in the top 10% for conversion and revenue performance.",
        "Mentored new hires and improved onboarding speed by 20%."
      ]
    }
  ];

  return (
    <section id="experience" className="py-12 md:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-['Inter',_sans-serif] font-bold text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] text-[#f8f7f9] mb-8 md:mb-12 text-center">
          Experience
        </h2>
        
        <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="text-center">
              <h3 className="font-['Inter',_sans-serif] font-extrabold text-[18px] md:text-[22px] lg:text-[26px] text-[rgba(248,247,249,0.5)] mb-1">
                {exp.title}
              </h3>
              <h4 className="font-['Inter',_sans-serif] font-semibold text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] mb-1">
                {exp.company}
              </h4>
              <p className="font-['Inter',_sans-serif] font-extralight text-[14px] md:text-[18px] lg:text-[22px] text-[rgba(248,247,249,0.5)] mb-3">
                {exp.location} | {exp.period}
              </p>
              <ul className="space-y-2 text-center">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="font-['Inter',_sans-serif] text-[14px] md:text-[18px] lg:text-[22px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function CertificationsSection() {
  const certifications = [
    {
      title: "CompTIA Security+",
      year: "Expected Q1 2026",
      organization: ""
    },
    {
      title: "CompTIA Network+",
      year: "Expected Q2 2026",
      organization: ""
    },
    {
      title: "AI Prompt Engineering",
      year: "2024",
      organization: "LinkedIn Learning"
    },
    {
      title: "Data-Driven Learning Design",
      year: "2024",
      organization: "LinkedIn Learning"
    }
  ];

  return (
    <section id="certifications" className="py-12 md:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-['Inter',_sans-serif] font-bold text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] text-[#f8f7f9] mb-8 md:mb-12 text-center">
          Certifications
        </h2>
        
        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <div key={index} className="text-center">
              <h3 className="font-['Inter',_sans-serif] font-extrabold text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] mb-1 break-words">
                {cert.title}
              </h3>
              <p className="font-['Inter',_sans-serif] font-extralight text-[14px] md:text-[18px] lg:text-[24px] text-[rgba(248,247,249,0.5)] mb-2">
                {cert.year}
              </p>
              {cert.organization && (
                <p className="font-['Inter',_sans-serif] font-medium text-[14px] md:text-[18px] lg:text-[24px] text-[rgba(248,247,249,0.5)]">
                  {cert.organization}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="contacts" className="py-12 md:py-16 lg:py-20 relative pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-['Inter',_sans-serif] font-bold text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] text-[#f8f7f9] mb-8 md:mb-12 text-center">
          Contacts
        </h2>
        
        <div className="space-y-4 max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="font-['Inter',_sans-serif] font-extrabold text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)]">
              Email
            </span>
            <a 
              href="mailto:kt2saint.create@gmail.com"
              className="font-['Inter',_sans-serif] font-medium text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] hover:text-[#f8f7f9] transition-colors"
            >
              kt2saint.create@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-['Inter',_sans-serif] font-extrabold text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)]">
              Phone
            </span>
            <a 
              href="tel:+16892454250"
              className="font-['Inter',_sans-serif] font-medium text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] hover:text-[#f8f7f9] transition-colors"
            >
              689-245-4250
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactsSection />
        <PaymentSection />
      </main>
    </div>
  );
}