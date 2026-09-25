"use client";

import { useEffect, useRef } from "react";

/**
 * 稲佐の浜の空・海・霧・香煙を描く軽量 WebGL レイヤー。
 *
 * - three.js 等は使わず、1 枚のフラグメントシェーダーのみ（数 KB）
 * - 画面外・タブ非表示では描画を停止、30fps 上限、解像度は抑えめ
 * - prefers-reduced-motion では 1 フレームだけ描いて静止画にする
 * - WebGL が使えない環境では、親要素の CSS 背景がそのまま見える
 */

export type AtmosphereMode = "dawn" | "dusk" | "smoke";

type Props = {
  mode: AtmosphereMode;
  /** 写真の上に霧と香煙だけを重ねる（写真差し替え時に使用） */
  overlay?: boolean;
  className?: string;
};

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){ v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform float u_dusk;      // 0 = 夜明け, 1 = 夕暮れ
uniform float u_sea;       // 1 = 空と海を描く, 0 = 香煙のみの暗い空間
uniform float u_overlay;   // 1 = 写真の上に霧と煙だけ
uniform float u_fog;
uniform float u_light;
uniform float u_smoke;
uniform float u_horizon;
uniform float u_island;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  float t = u_time;
  float h = u_horizon;

  // palette — 墨藍の空、砂色の光。夕暮れはわずかに茜を含む
  vec3 skyTop  = mix(vec3(0.035, 0.050, 0.080), vec3(0.040, 0.045, 0.080), u_dusk);
  vec3 skyMid  = mix(vec3(0.105, 0.140, 0.200), vec3(0.170, 0.135, 0.170), u_dusk);
  vec3 glowCol = mix(vec3(0.860, 0.780, 0.660), vec3(0.820, 0.560, 0.450), u_dusk);
  vec3 seaDeep = mix(vec3(0.025, 0.045, 0.070), vec3(0.030, 0.035, 0.060), u_dusk);
  vec3 sand    = mix(vec3(0.120, 0.115, 0.110), vec3(0.090, 0.075, 0.080), u_dusk);
  vec3 smokeCol = vec3(0.86, 0.87, 0.89);

  vec3 col;
  float alpha = 1.0;

  if (u_sea > 0.5) {
    if (uv.y >= h) {
      // 空
      float sy = (uv.y - h) / (1.0 - h);
      col = mix(skyMid, skyTop, pow(sy, 0.55));
      vec2 d = vec2((uv.x - 0.5) * aspect * 0.55, (uv.y - h) * 2.4);
      col += glowCol * u_light * exp(-length(d) * 3.2) * 0.55;
      col += glowCol * u_light * 0.22 * exp(-(uv.y - h) * 38.0);
      // 横にたなびく薄雲
      float c = fbm(vec2(uv.x * aspect * 1.2 + t * 0.006, uv.y * 7.0));
      col += (c - 0.5) * 0.035 * (1.0 - sy);

      // 弁天島のシルエット
      float ix = (uv.x - u_island) * aspect;
      float w = 0.042;
      if (abs(ix) < w * 1.4) {
        float prof = sqrt(max(0.0, 1.0 - pow(ix / w, 2.0)));
        float rough = noise(vec2(ix * 90.0, 3.0)) * 0.006;
        float pine = 0.010 * exp(-pow((ix + 0.012) / 0.010, 2.0)) + 0.007 * exp(-pow((ix - 0.014) / 0.008, 2.0));
        float top = h + 0.058 * pow(prof, 0.7) + rough * prof + pine * step(0.2, prof);
        float edge = smoothstep(top + 0.0015, top - 0.0015, uv.y);
        vec3 rock = mix(seaDeep, skyMid, 0.35);
        col = mix(col, rock, edge * step(0.001, prof));
      }
    } else {
      // 海 — 奥行きに応じたパース
      float depth = (h - uv.y) / h;
      float z = 1.0 / (h - uv.y + 0.03);
      vec2 sp = vec2((uv.x - 0.5) * aspect * z * 0.7, z);
      col = mix(skyMid * 0.75, seaDeep, pow(depth, 0.45));
      float waves = fbm(vec2(sp.x * 1.4, sp.y * 2.6 - t * 0.12));
      col += (waves - 0.5) * 0.05 * (1.0 - depth * 0.5);
      // 光の道（反射のきらめき）
      float spread = 2.2 + (1.0 - depth) * 7.0;
      float refl = exp(-abs(uv.x - 0.5) * aspect * spread);
      float glint = smoothstep(0.58, 0.86, noise(vec2(sp.x * 9.0, sp.y * 16.0 - t * 0.5)));
      col += glowCol * u_light * refl * (0.10 + glint * 0.55) * (1.0 - depth * 0.55);
      // 水平線付近のかすみ
      col = mix(col, skyMid * 1.05 + glowCol * u_light * 0.12, exp(-depth * 16.0) * 0.65);
      // 波打ち際と濡れた砂
      float shore = uv.y - (0.075 + 0.018 * sin(t * 0.22 + uv.x * 2.6) + 0.012 * (fbm(vec2(uv.x * 5.0, t * 0.08)) - 0.5));
      float foam = smoothstep(0.012, 0.0, abs(shore)) * (0.5 + fbm(vec2(uv.x * 30.0, t * 0.2)));
      col = mix(col, sand, smoothstep(0.0, -0.012, shore));
      col += vec3(0.80, 0.82, 0.85) * foam * 0.07;
    }

    // 霧 — 水平線付近ほど濃く、ゆっくり横へ流れる
    float f1 = fbm(vec2(uv.x * aspect * 1.1 + t * 0.010, uv.y * 2.4 - t * 0.003));
    float f2 = fbm(vec2(uv.x * aspect * 2.4 - t * 0.016, uv.y * 4.0) + f1);
    float fogMask = exp(-abs(uv.y - h) * 3.6) * 0.75 + 0.25;
    float fogAmt = u_fog * fogMask * smoothstep(0.30, 0.85, f1 * 0.6 + f2 * 0.55);
    vec3 fogCol = mix(skyMid * 1.5, glowCol * 0.62, 0.25 + u_light * 0.35);
    if (u_overlay > 0.5) {
      col = fogCol;
      alpha = fogAmt * 0.8;
    } else {
      col = mix(col, fogCol, fogAmt * 0.78);
    }

    // 香煙 — 下から一筋、上へいくほど乱れてほどけ、消えていく
    float sx = 0.5 + 0.03 * sin(t * 0.07);
    float y = uv.y;
    float qx = (uv.x - sx) * aspect;
    qx += sin(y * 4.2 - t * 0.42) * 0.07 * y;
    qx += (fbm(vec2(y * 3.0 - t * 0.12, t * 0.05)) - 0.5) * 0.42 * y;
    float width = 0.005 + y * y * 0.24;
    float n = fbm(vec2(qx * 6.0 + t * 0.03, y * 4.0 - t * 0.26));
    float column = exp(-pow(qx / width, 2.0));
    float dens = column * smoothstep(0.02, 0.14, y) * (1.0 - smoothstep(0.28, 0.82, y)) * pow(n, 1.7) * 2.2;
    float sm = dens * u_smoke * 0.2;
    if (u_overlay > 0.5) {
      col = mix(col, smokeCol, sm / max(alpha + sm, 0.001));
      alpha = clamp(alpha + sm, 0.0, 1.0);
    } else {
      col += smokeCol * sm;
    }
  } else {
    // 神話への入口 — 暗がりを横切る香煙
    col = mix(vec3(0.030, 0.040, 0.060), vec3(0.065, 0.085, 0.125), uv.y * 0.7 + 0.15);
    vec2 p = vec2(uv.x * aspect, uv.y);
    float w1 = fbm(p * vec2(1.3, 3.0) + vec2(-t * 0.028, t * 0.004));
    float w2 = fbm(p * vec2(2.6, 5.0) + vec2(w1 * 1.4 - t * 0.02, 0.0));
    float band = exp(-pow((uv.y - 0.5 - 0.08 * sin(uv.x * 2.2 + t * 0.05)) * 2.4, 2.0));
    float s = smoothstep(0.42, 0.92, w2) * band;
    col += smokeCol * s * u_smoke * 0.28;
    col += vec3(0.60, 0.62, 0.66) * smoothstep(0.55, 0.95, w1) * 0.03;
  }

  // 周辺減光 + ディザ（色の段差を防ぐ）
  vec2 vc = uv - 0.5;
  col *= 1.0 - dot(vc, vc) * 0.55;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0 * 2.0;

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

type Uniforms = {
  fog: number;
  light: number;
  smoke: number;
};

/** スクロール位置（0..1）から各モードの霧・光・煙を決める */
function uniformsFor(mode: AtmosphereMode, p: number): Uniforms {
  switch (mode) {
    case "dawn":
      // スクロールで霧が晴れ、光が満ちていく
      return { fog: 0.95 - p * 0.75, light: 0.32 + p * 0.6, smoke: 1 - p * 0.4 };
    case "dusk":
      // 香煙が空へほどけて消えていく
      return { fog: 0.45 + p * 0.2, light: 0.55 - p * 0.35, smoke: 1 - p * 0.85 };
    case "smoke":
      return { fog: 0, light: 0, smoke: 0.35 + Math.sin(Math.PI * p) * 0.9 };
  }
}

export default function Atmosphere({ mode, overlay = false, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("u_res");
    const uTime = u("u_time");
    const uFog = u("u_fog");
    const uLight = u("u_light");
    const uSmoke = u("u_smoke");
    gl.uniform1f(u("u_dusk"), mode === "dusk" ? 1 : 0);
    gl.uniform1f(u("u_sea"), mode === "smoke" ? 0 : 1);
    gl.uniform1f(u("u_overlay"), overlay ? 1 : 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");

    const resize = () => {
      // 霧と光は柔らかい絵なので、端末の解像度に関わらず CSS ピクセル基準で描く
      const scale = small.matches ? 0.85 : 0.72;
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const hgt = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== hgt) {
        canvas.width = w;
        canvas.height = hgt;
      }
      gl.viewport(0, 0, w, hgt);
      gl.uniform2f(uRes, w, hgt);
      // 縦長画面では水平線をやや上げ、弁天島を右寄りに
      const portrait = canvas.clientHeight > canvas.clientWidth;
      gl.uniform1f(u("u_horizon"), portrait ? 0.44 : 0.4);
      gl.uniform1f(u("u_island"), portrait ? 0.76 : 0.7);
    };

    // セクション内でのスクロール進行度（0 = 画面上端に到達, 1 = 抜けきった）
    const host = (canvas.closest("[data-atmo-host]") ?? canvas.parentElement) as HTMLElement;
    const progress = () => {
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      if (mode === "dawn") return Math.min(1, Math.max(0, -r.top / Math.max(r.height - vh, vh * 0.8)));
      return Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)));
    };

    let visible = true;
    let raf = 0;
    let last = 0;
    const start = performance.now() - Math.random() * 20000;

    const draw = (now: number) => {
      const p = progress();
      const un = uniformsFor(mode, p);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uFog, un.fog);
      gl.uniform1f(uLight, un.light);
      gl.uniform1f(uSmoke, un.smoke);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || reduced.matches) return;
      if (now - last > 33) {
        last = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (reduced.matches) {
        draw(start + 12000);
        return;
      }
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    canvas.dataset.ready = "true";

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        kick();
      },
      { rootMargin: "100px" },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced.matches) draw(start + 12000);
    });
    ro.observe(canvas);

    // 動きを減らす設定では、スクロールに合わせて静止画だけ更新
    const onScroll = () => {
      if (reduced.matches && visible) draw(start + 12000);
    };
    const onVis = () => kick();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    reduced.addEventListener("change", kick);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      reduced.removeEventListener("change", kick);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [mode, overlay]);

  return <canvas ref={canvasRef} className={`atmosphere ${className ?? ""}`} aria-hidden="true" />;
}
