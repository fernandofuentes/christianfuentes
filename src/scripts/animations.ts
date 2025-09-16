import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero Animation Controller
export class HeroAnimations {
  private timeline: gsap.core.Timeline | null = null;

  init() {
    // Only run if hero elements exist on the page
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    this.timeline = gsap.timeline({ delay: 0.5 });
    
    this.timeline
      .from(".title-animation-1", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.4")
      .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .from(".hero-search", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
  }

  destroy() {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
  }
}

// Scroll-triggered Animation Controller
export class ScrollAnimations {
  private triggers: ScrollTrigger[] = [];

  init() {
    // About section title animation
    const aboutTitle = document.querySelector('.title-animation-1');
    if (aboutTitle) {
      const trigger = ScrollTrigger.create({
        trigger: aboutTitle,
        start: "top 80%", // Animation starts when element is 80% down the viewport
        end: "bottom 20%",
        onEnter: () => {
          gsap.from(aboutTitle, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        once: true // Only animate once
      });
      this.triggers.push(trigger);
    }

    // Add more scroll animations here
    this.initSectionAnimations();
  }

  private initSectionAnimations() {
    // Animate section headings as they come into view
    const sectionHeadings = document.querySelectorAll('h2, h3');
    sectionHeadings.forEach((heading) => {
      if (heading.classList.contains('hero-title')) return; // Skip hero title
      
      const trigger = ScrollTrigger.create({
        trigger: heading,
        start: "top 85%",
        onEnter: () => {
          gsap.from(heading, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
          });
        },
        once: true
      });
      this.triggers.push(trigger);
    });

    // Animate cards/sections as they come into view
    const animatedSections = document.querySelectorAll('.property-card, .testimonial-card, .stat-card');
    animatedSections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        onEnter: () => {
          gsap.from(section, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1, // Stagger effect
            ease: "power2.out"
          });
        },
        once: true
      });
      this.triggers.push(trigger);
    });
  }

  destroy() {
    this.triggers.forEach(trigger => trigger.kill());
    this.triggers = [];
  }
}

// Parallax Controller
export class ParallaxController {
  private content: HTMLElement | null = null;
  private ticking = false;

  init() {
    this.content = document.querySelector('.parallax-content');
    if (!this.content) return;

    this.updateParallax();
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  }

  private updateParallax() {
    if (!this.content) return;
    
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.2;
    
    this.content.style.transform = `translate3d(0, ${rate}px, 0)`;
    this.ticking = false;
  }

  private onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateParallax());
      this.ticking = true;
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    this.content = null;
  }
}

// Scroll Indicator Controller
export class ScrollIndicator {
  init() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
}

// Main Animation Manager
export class AnimationManager {
  private heroAnimations: HeroAnimations;
  private scrollAnimations: ScrollAnimations;
  private parallaxController: ParallaxController;
  private scrollIndicator: ScrollIndicator;

  constructor() {
    this.heroAnimations = new HeroAnimations();
    this.scrollAnimations = new ScrollAnimations();
    this.parallaxController = new ParallaxController();
    this.scrollIndicator = new ScrollIndicator();
  }

  init() {
    this.heroAnimations.init();
    this.scrollAnimations.init();
    this.parallaxController.init();
    this.scrollIndicator.init();
  }

  destroy() {
    this.heroAnimations.destroy();
    this.scrollAnimations.destroy();
    this.parallaxController.destroy();
  }
}