/**
 * Jimdo の旧ページ → 新サイトへのリダイレクト（301）。
 *
 * ドメイン切り替え後、旧サイトの URL（検索結果やブックマーク、SNS に残っているリンク）から
 * 新サイトの該当ページへ案内するための一覧です。next.config.ts から読み込まれます。
 *
 * 使い方：
 *   1. 切り替え前に、Jimdo の各ページの URL（パス）を控える
 *      例）https://www.izumoko.com/事業内容/ → source: "/事業内容"
 *   2. 下の配列に { source, destination } を追加する
 *   3. 日本語のパスはそのまま書けます（Next.js 側でエンコードを処理）
 *
 * ※ 静的書き出し（STATIC_EXPORT=1）で公開する場合、この設定は使われません。
 *   その場合はホスティング側のリダイレクト設定（_redirects 等）に同じ内容を登録します。
 */
export type Redirect = { source: string; destination: string };

export const legacyRedirects: Redirect[] = [
  // TODO(仮): Jimdo の実際の URL を確認してから有効にしてください。
  // { source: "/事業内容", destination: "/#about" },
  // { source: "/会社概要", destination: "/#about" },
  // { source: "/お問い合わせ", destination: "/" },
];
