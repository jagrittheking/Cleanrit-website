/**
 * CleanRit Landing Page Interactive Controller
 * Ultra-lightweight, zero-dependency script
 */

(function () {
  'use strict';

  // Copy Quickstart Terminal Command
  function setupClipboard() {
    const copyBox = document.getElementById('copy-quickstart-btn');
    const textEl = document.getElementById('quickstart-text');
    if (!copyBox || !textEl) return;

    copyBox.addEventListener('click', async () => {
      const command = copyBox.getAttribute('data-clipboard') || textEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(command);
        const original = textEl.textContent;
        textEl.textContent = 'Copied to clipboard! ✓';
        copyBox.style.borderColor = '#10b981';
        setTimeout(() => {
          textEl.textContent = original;
          copyBox.style.borderColor = '';
        }, 2200);
      } catch (err) {
        // Fallback for browsers that block clipboard API without user gesture focus
        const tempInput = document.createElement('textarea');
        tempInput.value = command;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        const original = textEl.textContent;
        textEl.textContent = 'Copied to clipboard! ✓';
        copyBox.style.borderColor = '#10b981';
        setTimeout(() => {
          textEl.textContent = original;
          copyBox.style.borderColor = '';
        }, 2200);
      }
    });
  }

  // Smooth Scroll offset adjustment for fixed navbar
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = 70;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Animate benchmark meters when scrolled into view
  function setupBenchmarkObserver() {
    const fills = document.querySelectorAll('.bench-fill');
    if (!fills.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.2 });

    fills.forEach((fill) => observer.observe(fill));
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupClipboard();
      setupSmoothScroll();
      setupBenchmarkObserver();
    });
  } else {
    setupClipboard();
    setupSmoothScroll();
    setupBenchmarkObserver();
  }
})();
