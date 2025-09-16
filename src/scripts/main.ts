import { AnimationManager } from './animations';

// Global animation manager instance
let animationManager: AnimationManager | null = null;

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  animationManager = new AnimationManager();
  animationManager.init();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (animationManager) {
    animationManager.destroy();
  }
});

// Handle page navigation (for SPAs)
document.addEventListener('astro:page-load', () => {
  if (animationManager) {
    animationManager.destroy();
  }
  animationManager = new AnimationManager();
  animationManager.init();
});