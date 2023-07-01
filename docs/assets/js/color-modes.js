/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict';

  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const setTheme = (theme) => {
    if (
      theme === 'auto' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#theme-toggle');

    if (!themeSwitcher) {
      return;
    }

    if (theme === 'dark') {
      themeSwitcher.checked = true;
      switchDarkToLight();
    } else {
      themeSwitcher.checked = false;
      switchLightToDark();
    }
  };

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll('#theme-toggle').forEach((toggle) => {
      toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'dark' : 'light';
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
        if (theme === 'dark') {
          switchDarkToLight();
        } else {
          switchLightToDark();
        }
      });
    });
  });

  function switchDarkToLight() {
    document.querySelectorAll('.btn-outline-dark').forEach((element) => {
      element.classList.remove('btn-outline-dark');
      element.classList.add('btn-outline-light');
    });
    document.querySelectorAll('.link-dark').forEach((element) => {
      element.classList.remove('link-dark');
      element.classList.add('link-light');
    });
  }

  function switchLightToDark() {
    document.querySelectorAll('.btn-outline-light').forEach((element) => {
      element.classList.remove('btn-outline-light');
      element.classList.add('btn-outline-dark');
    });
    document.querySelectorAll('.link-light').forEach((element) => {
      element.classList.remove('link-light');
      element.classList.add('link-dark');
    });
  }
})();
