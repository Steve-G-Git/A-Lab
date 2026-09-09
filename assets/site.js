(function () {
  const storageKey = 'sg-portfolio-theme';
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)');

  function savedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (_) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const control = document.querySelector('[data-theme-toggle]');
    if (control) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      control.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      control.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
      control.setAttribute('title', `Switch to ${nextTheme} mode`);
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? '#070b07' : '#f5f8f5');
    }
  }

  applyTheme(savedTheme() || (systemTheme.matches ? 'light' : 'dark'));

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(root.dataset.theme);
    const control = document.querySelector('[data-theme-toggle]');
    if (!control) return;

    control.addEventListener('click', function () {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, theme);
      } catch (_) {
        // The theme still works for this visit when storage is unavailable.
      }
      applyTheme(theme);
    });
  });

  systemTheme.addEventListener('change', function (event) {
    if (!savedTheme()) applyTheme(event.matches ? 'light' : 'dark');
  });
})();
