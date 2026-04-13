const STORAGE_KEY = 'theme';

const ICONS = {
  light:  `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
  dark:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  system: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
};

function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'system';
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', mode);
  }
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = `${ICONS[mode]} ${mode}`;
    btn.style.visibility = 'visible';
  }
}

// Apply immediately to avoid flash
applyTheme(getTheme());

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());

  // Fade main content in on load
  const main = document.querySelector('main');
  if (main) main.style.opacity = '1';

  // Fade main out on internal nav link clicks, then navigate
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || link.target === '_blank') return;
    e.preventDefault();
    const m = document.querySelector('main');
    if (m) {
      m.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 260);
    } else {
      window.location.href = href;
    }
  });

  // Toggle email reveal on click (anti-scraping)
  const emailBtn = document.querySelector('.reveal-email');
  if (emailBtn) {
    let revealed = false;
    emailBtn.addEventListener('click', () => {
      revealed = !revealed;
      emailBtn.textContent = revealed ? atob(emailBtn.dataset.e) : 'email';
    });
  }

  const toggle = document.getElementById('theme-toggle');
  const menu = document.querySelector('.theme-menu');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('[data-theme-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-theme-set');
      localStorage.setItem(STORAGE_KEY, mode);
      // Temporarily add color transition only during explicit theme switch
      document.body.style.transition = 'background-color 0.2s, color 0.2s';
      applyTheme(mode);
      setTimeout(() => { document.body.style.transition = ''; }, 200);
      closeMenu();
    });
  });

  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});
