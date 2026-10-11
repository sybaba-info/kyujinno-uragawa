// header.js — SPメニュー(右から出る半分幅のメニュー)の開閉。外部ライブラリなし。
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-js-menu-toggle]');
    const menu = document.querySelector('[data-js-menu]');
    const overlay = document.querySelector('[data-js-menu-overlay]');
    const closeButton = document.querySelector('[data-js-menu-close]');
    if (!toggle || !menu) return;

    const pcQuery = window.matchMedia('(min-width: 768px)');
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    // 開閉。状態はクラス(is-open)とaria-expandedで表し、見た目はCSS側で決める
    const setOpen = (open, restoreFocus = false) => {
      menu.classList.toggle('is-open', open);
      if (overlay) overlay.classList.toggle('is-open', open);
      document.body.classList.toggle('is-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open && closeButton) closeButton.focus();
      if (!open && restoreFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    if (closeButton) closeButton.addEventListener('click', () => setOpen(false, true));
    if (overlay) overlay.addEventListener('click', () => setOpen(false, true));

    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;

      // Escで閉じる
      if (e.key === 'Escape') {
        setOpen(false, true);
        return;
      }

      // Tabキーのフォーカスをメニューの中で一周させる
      if (e.key === 'Tab') {
        const focusable = menu.querySelectorAll('a[href], button:not([disabled])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // 画面を広げてPC表示になったら、開いたままにならないよう閉じる
    pcQuery.addEventListener('change', (e) => {
      if (e.matches && isOpen()) setOpen(false);
    });
  });
})();
