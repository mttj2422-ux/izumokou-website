import Atmosphere from "./Atmosphere";

/**
 * SCENE 02 — 神話への入口。
 * 朝の浜から、ゆっくりと暗がりへ。香煙が画面を横切り、言葉が一行ずつ浮かぶ。
 */
export default function MythSection() {
  return (
    <section className="myth" data-atmo-host aria-labelledby="myth-title">
      <div className="myth__stage">
        <Atmosphere mode="smoke" />
        <h2 id="myth-title" className="myth__copy">
          <span data-reveal>この国には、</span>
          <span data-reveal>まだ神話が</span>
          <span data-reveal>息づいている。</span>
        </h2>
        <p className="myth__en" data-reveal lang="en">
          Where myth still breathes.
        </p>
      </div>
    </section>
  );
}
