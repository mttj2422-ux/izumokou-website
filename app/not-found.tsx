import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow" lang="en">
        Not found
      </p>
      <h1 className="not-found__title">霧の向こうへ、迷い込んだようです。</h1>
      <Link href="/" className="link-line">
        浜へ戻る
      </Link>
    </main>
  );
}
