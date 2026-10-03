# 出雲香 IZUMOKOU 公式ブランドサイト

『出雲神話を、香りで旅する。』— 夜明けの稲佐の浜から始まり、七つの香りを経て、夕暮れの浜へ還る一本の物語としてのブランドサイト。

- Next.js（App Router）/ TypeScript / Tailwind CSS v4
- 追加のアニメーションライブラリなし（霧・海・香煙は自前の軽量 WebGL シェーダー、その他は CSS）
- 本番ドメイン：**https://www.izumoko.com/**（Jimdo から引き継ぎ）

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 本番ビルド
npm run typecheck  # 型チェック
```

## 物語の構成（トップページ）

| # | シーン | ファイル |
|---|---|---|
| FV | 夜明け前の稲佐の浜（スクロールで霧が晴れる） | `components/Hero.tsx` |
| 01 | 神々が集う海から。 | `components/InasaSection.tsx` |
| 02 | この国には、まだ神話が息づいている。 | `components/MythSection.tsx` |
| 03 | 七つの香り（PC は横へ進む章、スマホは縦） | `components/FragranceSection.tsx` / `FragranceCard.tsx` |
| 04 | 今、何を想いますか？（香りとの出会い） | `components/ScentFinder.tsx` |
| 05 | 出雲香が生まれた理由 | `components/BrandStory.tsx` |
| 06 | 海から、香りへ。 | `components/SeawaterSection.tsx` |
| 07 | 香りを、迎える。（購入導線） | `components/ProductSection.tsx` |
| LAST | 夕暮れの稲佐の浜 | `components/LastScene.tsx` |

香りごとの詳細ページ：`/fragrances/[slug]`（`app/fragrances/[slug]/page.tsx`）

## 内容の変更（コードの各所は触らず、`data/` だけを編集）

| 変更したいもの | ファイル |
|---|---|
| 香り（名前・香調・コピー・おすすめの時間・価格・商品 URL・商品写真・光の色） | `data/fragrances.ts` |
| 「今、何を想いますか？」の選択肢と結果の言葉 | `data/finder.ts` |
| オンラインストア URL・Instagram・お問い合わせ・運営者名・焚き方 | `data/site.ts` |
| 写真（01〜09 の差し替え枠） | `data/images.ts` ＋ `public/images/` |
| Jimdo 旧ページからのリダイレクト | `data/redirects.ts` |

### 仮情報（公開前に確認・差し替えが必要）

コード内では `TODO(仮)` で検索できます。

- **光の色**：パッケージ写真から推定した仮の値
- **価格・香りごとの商品ページ URL**：未設定（価格は「オンラインストアにてご確認ください」と表示、購入ボタンは BASE のトップへ）
- **Instagram / お問い合わせ / 運営者名**：未設定（設定すると自動で表示）

### 写真の差し替え

`public/images/` に画像を置き、`data/images.ts` の `src` にパスを入れるだけで反映されます。写真がない間は、光・霧・余白と CSS で描いた表現で成立するようにしています。

| 枠 | 使われる場所 |
|---|---|
| 01 稲佐の浜・夜明け | ファーストビュー（写真の上に霧と香煙が重なる） |
| 02 稲佐の浜・波 | SCENE 01 |
| 03 香煙 | （予備） |
| 04 商品 / 05 七つの香り | SCENE 07（香りごとの写真は `data/fragrances.ts` の `image`） |
| 06 海水 / 07 制作風景 | SCENE 06 |
| 08 ブランドストーリー | SCENE 05 |
| 09 稲佐の浜・夕暮れ | LAST SCENE |

## 公開と Jimdo からの移行

**Jimdo の現行サイトは、新サイトが完成するまで一切変更しません。**

### 1. 仮 URL で確認する

- どのホスティングでも、まず仮 URL（例：`xxxx.vercel.app` / `xxxx.pages.dev` / `xxxx.netlify.app`）で公開します。
- 環境変数 `SITE_ENV` を**設定しない**限り、サイトは自動的に
  - `<meta name="robots" content="noindex, nofollow">`
  - `robots.txt` で全ページのクロール拒否

  になります。仮 URL が検索結果に出たり、Jimdo サイトと重複して評価されたりすることはありません。
- canonical / OGP / sitemap は、仮 URL で見ていても常に `https://www.izumoko.com` を指します。

### 2. ドメイン切り替えのチェックリスト

1. `data/site.ts` の `storeUrl` が BASE（https://mttj2422.base.shop/）になっていることを確認
2. Jimdo の各ページの URL を控え、`data/redirects.ts` に旧 URL → 新 URL を登録
3. ホスティング側で環境変数 **`SITE_ENV=production`** を設定して再デプロイ（検索エンジンへの公開が有効になる）
4. ホスティング側に独自ドメイン `www.izumoko.com` を追加
5. DNS の `www` の向き先（CNAME）を Jimdo からホスティング先へ変更
6. `izumoko.com`（www なし）→ `https://www.izumoko.com` へのリダイレクトを設定
7. 切り替え後、Google Search Console でサイトマップ `https://www.izumoko.com/sitemap.xml` を送信

### 3. ホスティングの選択肢（未確定）

構成は特定のホスティングに依存していません。

- **通常ビルド**（`npm run build`）：Next.js が動くホスティング向け。画像の自動最適化・リダイレクトが使えます。
- **静的書き出し**（`STATIC_EXPORT=1 npm run build` → `out/`）：HTML を書き出して静的ホスティング（無料枠が多い）に置く方式。この場合、画像は最適化されない（あらかじめ圧縮した画像を置く）ため、リダイレクトはホスティング側の設定で行います。

## アクセシビリティ・パフォーマンス

- 意味のある HTML 構造（見出し階層、`nav` / `main` / `section` / `article`、パンくずリスト）
- キーボード操作（スキップリンク、フォーカス表示、メニューのフォーカストラップと Esc、横スクロール中の章へのフォーカス追従）
- `prefers-reduced-motion`：WebGL は静止画、パララックス・香煙・波紋のアニメーションは停止、横スクロールは縦並びに切り替え
- WebGL は画面外・非表示タブで停止、30fps 上限、解像度を抑えて描画。使えない環境では CSS の背景で成立
- フォントは `next/font` で自前配信、画像は `next/image`（AVIF / WebP、遅延読み込み）
- SEO：Metadata API、OGP 画像（ビルド時に生成）、JSON-LD（Organization / WebSite / ItemList / Product / BreadcrumbList）、sitemap、robots
