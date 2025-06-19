(() => {
    const toggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const STORAGE_KEY = 'theme-preference';
  
    // On load: apply saved theme or OS preference
    const saved = localStorage.getItem(STORAGE_KEY);
    const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    if (saved === 'dark' || (!saved && osDark)) {
      htmlEl.setAttribute('data-theme', 'dark');
      toggle.checked = true;
    } else {
      htmlEl.setAttribute('data-theme', '');
      toggle.checked = false;
    }
  
    // On toggle: switch theme & persist
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
      } else {
        htmlEl.setAttribute('data-theme', '');
        localStorage.setItem(STORAGE_KEY, 'light');
      }
    });
  })();
  
const LAST_UPDATED_STRING = "6/18/2025";
const lastUpdatedEl = document.getElementById('last-updated');

// 3) Inject the string:
lastUpdatedEl.textContent = LAST_UPDATED_STRING;
