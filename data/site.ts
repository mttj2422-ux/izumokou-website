/**
 * サイト全体の設定。
 * URL や SNS が確定したら、このファイルだけを書き換えてください。
 */
export const site = {
  name: "出雲香",
  nameEn: "IZUMOKOU",
  tagline: "神話の香りを纏う",
  description:
    "島根県・出雲、稲佐の浜の海水を用いてつくられたお香「出雲香（IZUMOKOU）」。縁・結・和・心・神迎・感謝・恵海、七つの香りで出雲の神話を旅する公式ブランドサイト。",

  /**
   * 本番ドメイン。canonical / OGP / sitemap は、仮 URL で確認している間も常にこのドメインを指す。
   * （ドメインは Jimdo から引き継いでそのまま使用）
   */
  url: "https://www.izumoko.com",

  /**
   * オンラインストア（BASE）。
   * ヘッダー・メニュー・香りとの出会い・商品・詳細ページ・最後の場面・フッターの
   * 購入へのリンクはすべてここを参照します。
   */
  storeUrl: "https://mttj2422.base.shop/",

  /** Instagram などの URL。null の場合は表示しません。TODO(仮) */
  instagramUrl: null as string | null,

  /** お問い合わせ先。null の場合は表示しません。TODO(仮) */
  contactUrl: null as string | null,

  /** フッターに表示する運営者名。TODO(仮): 正式な事業者名に差し替え */
  operator: null as string | null,

  locale: "ja_JP",
} as const;

/**
 * 検索エンジンへの公開可否。
 * 環境変数 SITE_ENV=production でビルドしたときだけ検索結果に載る（index）。
 * それ以外（仮 URL・プレビュー）は noindex になり、Jimdo の現行サイトと重複して評価されることを防ぐ。
 * → www.izumoko.com へ切り替えるタイミングで、本番環境に SITE_ENV=production を設定する。
 */
export const isProductionSite = process.env.SITE_ENV === "production";

/** 共通の商品基本情報（全7種共通） */
export const productBasics = {
  type: "スティックタイプのお香",
  burnTime: "約25分",
  lineup: "全7種",
} as const;

/** お香の焚き方（一般的な使い方） */
export const howToUse = [
  "お香の先端に火をつけます。",
  "炎が立ったら、手で静かにあおいで消します。",
  "香立てに立て、立ちのぼる香煙をお楽しみください。",
] as const;

export const cautions = [
  "燃焼中はそばを離れないでください。",
  "燃えやすいものの近くや、風の当たる場所ではご使用にならないでください。",
  "小さなお子さまやペットの手の届かないところでお使いください。",
] as const;
