(() => {
    const toggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const STORAGE_KEY = 'theme-preference';

    // On load: apply saved theme or OS preference
    const saved = localStorage.getItem(STORAGE_KEY);
    const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && osDark)) {
      htmlEl.setAttribute('data-theme', 'dark');
      if (toggle) toggle.checked = true;
    } else {
      htmlEl.setAttribute('data-theme', '');
      if (toggle) toggle.checked = false;
    }

    // On toggle: switch theme & persist
    if (toggle) {
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          htmlEl.setAttribute('data-theme', 'dark');
          localStorage.setItem(STORAGE_KEY, 'dark');
        } else {
          htmlEl.setAttribute('data-theme', '');
          localStorage.setItem(STORAGE_KEY, 'light');
        }
      });
    }
})();

// Last updated text
const LAST_UPDATED_STRING = "8/21/2025";
const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) lastUpdatedEl.textContent = LAST_UPDATED_STRING;

// Fade-in on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth transitions on link clicks
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = link.getAttribute('href');

        if (target.endsWith('.html')) {
            e.preventDefault();
            const body = document.body;

            // Academic → Index (reverse transition start)
            if (body.dataset.page === 'academic' && target.includes('index.html')) {
                body.classList.add('reverse-transition-start');
            }
            // Index → Academic (normal transition)
            else {
                const container = document.querySelector('.profile-container');
                if (container) container.classList.add('transitioning');
            }

            // Wait for animation to finish before navigating
            setTimeout(() => {
                window.location.href = link.href;
            }, 500); // match CSS duration
        }
    });
});
