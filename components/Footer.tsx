import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">
          <span lang="en">IZUMOKOU</span>
          <span>出雲香 — {site.tagline}</span>
        </p>
        <nav aria-label="フッターメニュー">
          <ul className="site-footer__nav">
            <li>
              <Link href="/#story">Story</Link>
            </li>
            <li>
              <Link href="/#fragrance">Fragrance</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <a href={site.storeUrl} target="_blank" rel="noopener">
                Online Store<span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </li>
            {site.instagramUrl && (
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener">
                  Instagram<span className="sr-only">（新しいタブで開きます）</span>
                </a>
              </li>
            )}
            {site.contactUrl && (
              <li>
                <a href={site.contactUrl}>Contact</a>
              </li>
            )}
          </ul>
        </nav>
        <p className="site-footer__meta">
          <span>Made in Izumo, Shimane</span>
          {site.operator && <span>{site.operator}</span>}
          <small>© {new Date().getFullYear()} IZUMOKOU</small>
        </p>
      </div>
    </footer>
  );
}
