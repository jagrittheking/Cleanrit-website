/**
 * CleanRit Landing Page Interactive Controller
 * Low-End PC Hardware Calculator & UI Interactions
 */

(function () {
  'use strict';

  // State for Hardware Calculator
  const calcState = {
    ram: 12, // 8, 12, 16
    cpu: 'low', // 'low', 'mid'
    disk: 'sata', // 'sata', 'hdd', 'nvme'
  };

  // Performance Projection Matrix for Low-End Rigs
  const PROJECTIONS = {
    8: {
      low: {
        hdd: { ram: '3.6 GB', stutter: '-78%', fps: '+35%', storage: '19.5 GB' },
        sata: { ram: '3.4 GB', stutter: '-68%', fps: '+28%', storage: '22.0 GB' },
        nvme: { ram: '3.2 GB', stutter: '-52%', fps: '+22%', storage: '24.5 GB' },
      },
      mid: {
        hdd: { ram: '3.8 GB', stutter: '-65%', fps: '+24%', storage: '26.0 GB' },
        sata: { ram: '3.5 GB', stutter: '-58%', fps: '+20%', storage: '28.0 GB' },
        nvme: { ram: '3.4 GB', stutter: '-45%', fps: '+16%', storage: '30.0 GB' },
      },
    },
    12: {
      low: {
        hdd: { ram: '4.6 GB', stutter: '-72%', fps: '+30%', storage: '28.0 GB' },
        sata: { ram: '4.2 GB', stutter: '-62%', fps: '+24%', storage: '32.5 GB' },
        nvme: { ram: '4.0 GB', stutter: '-50%', fps: '+19%', storage: '35.0 GB' },
      },
      mid: {
        hdd: { ram: '4.8 GB', stutter: '-60%', fps: '+22%', storage: '34.0 GB' },
        sata: { ram: '4.5 GB', stutter: '-52%', fps: '+18%', storage: '38.0 GB' },
        nvme: { ram: '4.2 GB', stutter: '-42%', fps: '+15%', storage: '42.0 GB' },
      },
    },
    16: {
      low: {
        hdd: { ram: '5.8 GB', stutter: '-68%', fps: '+26%', storage: '32.0 GB' },
        sata: { ram: '5.4 GB', stutter: '-55%', fps: '+20%', storage: '38.0 GB' },
        nvme: { ram: '5.0 GB', stutter: '-45%', fps: '+16%', storage: '44.0 GB' },
      },
      mid: {
        hdd: { ram: '6.2 GB', stutter: '-55%', fps: '+18%', storage: '40.0 GB' },
        sata: { ram: '5.8 GB', stutter: '-48%', fps: '+15%', storage: '45.0 GB' },
        nvme: { ram: '5.4 GB', stutter: '-38%', fps: '+12%', storage: '52.0 GB' },
      },
    },
  };

  function updateCalculator() {
    const data = PROJECTIONS[calcState.ram][calcState.cpu][calcState.disk];
    const outRam = document.getElementById('out-ram');
    const outStutter = document.getElementById('out-stutter');
    const outFps = document.getElementById('out-fps');
    const outStorage = document.getElementById('out-storage');

    if (outRam) outRam.textContent = data.ram;
    if (outStutter) outStutter.textContent = data.stutter;
    if (outFps) outFps.textContent = data.fps;
    if (outStorage) outStorage.textContent = data.storage;
  }

  function setupCalculatorListeners() {
    // RAM pills
    document.querySelectorAll('#ram-selector .pill-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#ram-selector .pill-option').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        calcState.ram = parseInt(btn.dataset.ram, 10);
        updateCalculator();
      });
    });

    // CPU pills
    document.querySelectorAll('#cpu-selector .pill-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#cpu-selector .pill-option').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        calcState.cpu = btn.dataset.cpu;
        updateCalculator();
      });
    });

    // Disk pills
    document.querySelectorAll('#disk-selector .pill-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#disk-selector .pill-option').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        calcState.disk = btn.dataset.disk;
        updateCalculator();
      });
    });
  }

  // Copy Quickstart Command
  function setupClipboard() {
    const btn = document.getElementById('copy-quickstart-btn');
    const textEl = document.getElementById('quickstart-text');
    if (!btn || !textEl) return;

    btn.addEventListener('click', async () => {
      const command = btn.dataset.clipboard || 'git clone https://github.com/jagrittheking/Cleanrit.git';
      try {
        await navigator.clipboard.writeText(command);
        const original = textEl.textContent;
        textEl.textContent = 'Copied to clipboard! ✓';
        btn.style.borderColor = 'var(--accent-emerald)';
        setTimeout(() => {
          textEl.textContent = original;
          btn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        console.warn('Clipboard failed:', err);
      }
    });
  }

  // FAQ Accordion
  function setupFaq() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const qBtn = item.querySelector('.faq-question');
      if (qBtn) {
        qBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));
          if (!isOpen) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    setupCalculatorListeners();
    setupClipboard();
    setupFaq();
    updateCalculator();
  });
})();
