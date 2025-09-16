import React, { useState, useEffect, useRef } from 'react';

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  Navigation (Hero + Reveal-on-Scroll)                                ║
   ║  • Hamburger shows at ≤1280px (xl:hidden)                            ║
   ║  • Desktop links show at ≥1280px (hidden xl:flex)                    ║
   ║  • Hamburger aligns with center logo; flush-right                    ║
   ║  • Z-index order: Hamburger z[70] > Navs z[60] > Overlay z[50]       ║
   ║  • Overlay uses opacity + pointer-events (no invisible layer bug)    ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const lastYRef = useRef(0);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  // Reveal fixed nav when scrolling up
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const threshold = 100;
    const delta = 6;
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const last = lastYRef.current;

      if (y < threshold) setShowFixedNav(false);
      else if (y < last - delta) setShowFixedNav(true);
      else if (y > last + delta) setShowFixedNav(false);

      lastYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
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

  // Hamburger button (3 bold lines → X)
  const Hamburger = (
    <button
      onClick={toggleMobileMenu}
      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isMobileMenuOpen}
      aria-controls="mobile-menu"
      type="button"
      className={`
        xl:hidden
        h-12 w-12 flex items-center justify-center rounded-lg
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70
        transition-transform duration-200
        ${isMobileMenuOpen ? 'scale-95' : 'hover:scale-105'}
        ${isMobileMenuOpen ? 'text-gold' : 'text-white'}
        relative z-[70]
      `}
    >
      <span className="relative block w-8 h-6">
        <span
          className={`absolute left-0 right-0 top-0 h-1 rounded-full bg-current transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-y-2.5 rotate-45' : ''
          }`}
        />
        <span
          className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-current transition-all duration-200 ease-out ${
            isMobileMenuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
          }`}
        />
        <span
          className={`absolute left-0 right-0 bottom-0 h-1 rounded-full bg-current transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? '-translate-y-2.5 -rotate-45' : ''
          }`}
        />
      </span>
    </button>
  );

  return (
    <>
      {/* ── Main Navigation (absolute over hero) ───────────────────────── */}
      <nav className="absolute top-0 left-0 w-full z-[60]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-32 py-8">
            {/* Left desktop links */}
            <div className="hidden xl:flex xl:flex-nowrap shrink-0 items-center xl:space-x-6 2xl:space-x-8">
              <a href="/" className="whitespace-nowrap text-white hover:text-gold transition-all duration-300">Home</a>
              <a href="/chino-hills-realtor" className="whitespace-nowrap text-white hover:text-gold transition-all duration-300">Chino Hills</a>
              <a href="/buyers" className="whitespace-nowrap text-white hover:text-gold transition-all duration-300">Buyers</a>
              <a href="/sellers" className="whitespace-nowrap text-white hover:text-gold transition-all duration-300">Sellers</a>
            </div>

            {/* Center logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <a href="/">
                <img
                  src="/images/christian-fuentes-the-dream-team-logo.svg"
                  alt="Christian Fuentes - The Dream Team Logo"
                  className="h-16 w-auto hover:scale-105 transition-transform"
                />
              </a>
            </div>

            {/* Right side: links or hamburger */}
            <div className="flex items-center justify-end w-full">
              <div className="hidden xl:flex xl:flex-nowrap shrink-0 items-center xl:space-x-5 2xl:space-x-6">
                <a href="/about" className="whitespace-nowrap text-white hover:text-gold transition-all duration-300">About</a>
                <a href="/contact" className="whitespace-nowrap text-white hover:text-gold transition-all duration-300">Contact</a>
                <a
                  href="tel:909-438-2245"
                  className="hidden xl:inline-flex whitespace-nowrap text-white font-semibold hover:text-gold transition-all duration-300"
                >
                  909.438.2245
                </a>
              </div>
              {Hamburger}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Fixed Reveal Navigation (slides in on scroll up) ───────────── */}
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
        className={`fixed inset-0 z-[50] transition-opacity duration-500 ease-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ease-out ${
            isMobileMenuOpen ? 'bg-black/95 backdrop-blur-lg' : 'bg-transparent backdrop-blur-0'
          }`}
          onClick={toggleMobileMenu}
        />

        {/* Menu Content */}
        <div
          className={`relative flex flex-col items-center justify-center h-full space-y-8 transform transition-all duration-700 ease-out ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-white text-3xl font-light hover:text-gold transition-all duration-500 hover:scale-110 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : '0ms' }}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </a>
          ))}

          {/* Phone inside menu */}
          <a
            href="tel:909-438-2245"
            className={`text-gold text-2xl font-semibold transition-all duration-700 hover:scale-110 transform border-2 border-gold/30 px-6 py-3 rounded-lg hover:border-gold ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '600ms' : '0ms' }}
            onClick={toggleMobileMenu}
          >
            909.438.2245
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
