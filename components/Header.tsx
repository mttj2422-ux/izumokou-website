"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const nav = [
  { href: "/#story", label: "Story", ja: "物語" },
  { href: "/#fragrance", label: "Fragrance", ja: "七つの香り" },
  { href: "/#about", label: "About", ja: "出雲香について" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("menu-open");
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-logo" aria-label="出雲香 IZUMOKOU トップへ">
          IZUMOKOU
        </Link>

        <nav className="site-nav" aria-label="メインメニュー">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.storeUrl} target="_blank" rel="noopener" className="site-nav__store">
                Online Store<span className="sr-only">（オンラインストア・新しいタブで開きます）</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        hidden={!open}
      >
        <button type="button" className="menu-button mobile-menu__close" onClick={close}>
          Close
        </button>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                <span className="mobile-menu__en">{n.label}</span>
                <span className="mobile-menu__ja">{n.ja}</span>
              </Link>
            </li>
          ))}
        </ul>
        <a href={site.storeUrl} target="_blank" rel="noopener" className="btn btn--solid mobile-menu__store">
          オンラインストアへ<span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </div>
    </header>
  );
}
