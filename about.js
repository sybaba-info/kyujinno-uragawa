// about.js — 「このサイトについて」ページ固有。外部ライブラリなし。
// 目次のリンクを押したとき、移動先の見出しにフォーカスを移す(キーボード・スクリーンリーダー対応)。
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.toc a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        // 見出しは本来フォーカスできないため、一時的に tabindex を付ける
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      });
    });
  });
})();
