"use client";

import { useEffect } from "react";

/**
 * スクロール演出の指揮者。ページに 1 つだけ置く。
 *
 * - [data-reveal]   : 画面に入ったら .is-in を付与（文字の静かな出現）
 * - [data-progress] : 要素の通過度合いを CSS 変数 --p（0..1）として書き込む（パララックス用）
 * - [data-sticky]   : sticky 区間での進行度を --sp（0..1）として書き込む（横スクロール用）
 *
 * React の再レンダーを起こさず、スクロール時に 1 フレーム 1 回だけ計算する。
 */
export default function ScrollDirector() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    reveals.forEach((el) => io.observe(el));

    const progressEls = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    const stickyEls = Array.from(document.querySelectorAll<HTMLElement>("[data-sticky]"));

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of progressEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)));
        el.style.setProperty("--p", p.toFixed(4));
      }
      for (const el of stickyEls) {
        const r = el.getBoundingClientRect();
        const span = r.height - vh;
        const sp = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
        el.style.setProperty("--sp", sp.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
