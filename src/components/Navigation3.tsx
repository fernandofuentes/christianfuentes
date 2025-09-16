import React, { useState, useEffect, useRef } from 'react';

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  Navigation (Hero + Reveal-on-Scroll)                                ║
   ║  🏛️ ARCHITECTURAL PRECISION - Luxury Real Estate Edition            ║
   ║  • Hamburger shows at ≤1280px (xl:hidden)                            ║
   ║  • Desktop links show at ≥1280px (hidden xl:flex)                    ║
   ║  • Hamburger aligns with center logo; flush-right                    ║
   ║  • Z-index order: Hamburger z[70] > Navs z[60] > Overlay z[50]       ║
   ║  • Overlay uses opacity + pointer-events (no invisible layer bug)    ║
   ║  • Premium animations with architectural precision                   ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastYRef = useRef(0);

  const toggleMobileMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsMobileMenuOpen((v) => !v);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Chino Hills', href: '/chino-hills-realtor' },
    { name: 'Buyers', href: '/buyers' },
    { name: 'Sellers', href: '/sellers' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // 🏛️ ARCHITECTURAL PRECISION HAMBURGER
  const Hamburger = (
    <button
      onClick={toggleMobileMenu}
      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isMobileMenuOpen}
      aria-controls="mobile-menu"
      type="button"
      className={`
        xl:hidden
        h-14 w-14 flex items-center justify-center
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
        transition-all duration-300 ease-out
        ${isMobileMenuOpen ? 'scale-95 rotate-90' : 'hover:scale-110 hover:rotate-3'}
        ${isMobileMenuOpen ? 'text-gold' : 'text-white'}
        relative z-[70]
        group
      `}
      style={{
        filter: isMobileMenuOpen
          ? 'drop-shadow(0 0 8px rgba(191, 160, 106, 0.4))'
          : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
      }}
    >
      <span className="relative block w-9 h-7">
        {/* Top line */}
        <span
          className={`absolute left-0 right-0 top-0 h-0.5 bg-current transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? 'translate-y-3.5 rotate-45 scale-110'
              : 'group-hover:scale-105 group-hover:translate-x-0.5'
          }`}
          style={{
            transformOrigin: 'center',
            boxShadow: isMobileMenuOpen ? '0 0 6px rgba(191, 160, 106, 0.6)' : 'none',
          }}
        />
        {/* Middle line */}
        <span
          className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-current transition-all ease-out ${
            isMobileMenuOpen ? 'scale-x-0 opacity-0 rotate-180' : 'scale-x-100 opacity-100 group-hover:scale-105'
          }`}
          style={{
            transformOrigin: 'center',
            transitionDuration: '400ms',
            transitionDelay: isMobileMenuOpen ? '0ms' : '100ms',
          }}
        />
        {/* Bottom line */}
        <span
          className={`absolute left-0 right-0 bottom-0 h-0.5 bg-current transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? '-translate-y-3.5 -rotate-45 scale-110'
              : 'group-hover:scale-105 group-hover:-translate-x-0.5'
          }`}
          style={{
            transformOrigin: 'center',
            boxShadow: isMobileMenuOpen ? '0 0 6px rgba(191, 160, 106, 0.6)' : 'none',
          }}
        />
      </span>
    </button>
  );

  return (
    <>
      {/* ── Fixed Navigation ───────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ease-out ${
          showFixedNav ? 'translate-y-0' : '-translate-y-full'
        } bg-navy/95 backdrop-blur-lg block`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20 py-4">
            {/* Left desktop links */}
            <div className="hidden xl:flex xl:flex-nowrap shrink-0 items-center xl:space-x-6 2xl:space-x-8">
              <a href="/" className="whitespace-nowrap text-offwhite hover:text-gold transition-all duration-300">Home</a>
              <a href="/chino-hills-realtor" className="whitespace-nowrap text-offwhite hover:text-gold transition-all duration-300">Chino Hills</a>
              <a href="/buyers" className="whitespace-nowrap text-offwhite hover:text-gold transition-all duration-300">Buyers</a>
              <a href="/sellers" className="whitespace-nowrap text-offwhite hover:text-gold transition-all duration-300">Sellers</a>
            </div>

            {/* Center logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <a href="/">
                <img
                  src="/images/christian-fuentes-the-dream-team-logo.svg"
                  alt="Christian Fuentes - The Dream Team Logo"
                  className="h-12 w-auto hover:scale-105 transition-transform"
                />
              </a>
            </div>

            {/* Right side: links or hamburger */}
            <div className="flex items-center justify-end w-full">
              <div className="hidden xl:flex xl:flex-nowrap shrink-0 items-center xl:space-x-5 2xl:space-x-6">
                <a href="/about" className="whitespace-nowrap text-offwhite hover:text-gold transition-all duration-300">About</a>
                <a href="/contact" className="whitespace-nowrap text-offwhite hover:text-gold transition-all duration-300">Contact</a>
                <a
                  href="tel:909-438-2245"
                  className="hidden xl:inline-flex whitespace-nowrap text-offwhite font-semibold hover:text-gold transition-all duration-300"
                >
                  909.438.2245
                </a>
              </div>
              {Hamburger}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ───────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[50] transition-all duration-700 ease-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            isMobileMenuOpen
              ? 'bg-gradient-to-br from-navy/98 via-black/95 to-navy/98 backdrop-blur-xl'
              : 'bg-transparent backdrop-blur-0'
          }`}
          style={{
            backgroundImage: isMobileMenuOpen
              ? 'radial-gradient(circle at 30% 20%, rgba(191, 160, 106, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(191, 160, 106, 0.05) 0%, transparent 50%)'
              : 'none',
          }}
          onClick={toggleMobileMenu}
        />

        {/* Menu content */}
        <div
          className={`relative flex flex-col items-center justify-center h-full space-y-10 transform transition-all ease-out ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
          }`}
          style={{ transitionDuration: '800ms' }}
        >
          {/* Subtle grid */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isMobileMenuOpen ? 'opacity-5' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(191, 160, 106, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(191, 160, 106, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {menuItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                group relative text-white text-4xl font-light
                ${isMobileMenuOpen ? 'translate-x-0 opacity-100 translate-y-0' : 'translate-x-16 opacity-0 translate-y-4'}
                transition-all duration-500
              `}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 120 + 300}ms` : '0ms',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
              }}
              onClick={(e) => {
                // close after navigation click
                e.stopPropagation();
                toggleMobileMenu();
              }}
            >
              <span className="relative">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </span>
            </a>
          ))}

          {/* Phone CTA */}
          <a
            href="tel:909-438-2245"
            className={`
              text-gold text-2xl font-semibold
              transition-all duration-700 ease-out
              hover:scale-110 hover:tracking-wider transform
              ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}
            `}
            style={{ transitionDelay: isMobileMenuOpen ? '800ms' : '0ms' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
          >
            909.438.2245
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
