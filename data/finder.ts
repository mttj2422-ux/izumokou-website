/**
 * SCENE 04「香りとの出会い」の選択肢。
 * 想い（wish）→ 香り（fragranceSlug）の対応を管理します。
 * 結果に表示する神様と言葉は data/fragrances.ts の deity（公式資料）を使います。
 *
 * 対応は公式資料の香りのテーマに合わせています：
 *  ご縁→縁（ご縁を結ぶ）/ 絆→結（絆を深める）/ 癒し→心（内面を癒す）/ 感謝→感謝（愛と調和）
 *  心を整える→和（心を鎮める）/ 新しい一歩→神迎（新しいことを始める前に）/ 未来→恵海（未来へ導く）
 */
export type Wish = {
  id: string;
  label: string;
  fragranceSlug: string;
};

export const wishes: Wish[] = [
  { id: "en", label: "ご縁", fragranceSlug: "bergamot" },
  { id: "kizuna", label: "絆", fragranceSlug: "palo-santo" },
  { id: "iyashi", label: "癒し", fragranceSlug: "sandalwood" },
  { id: "kansha", label: "感謝", fragranceSlug: "magnolia" },
  { id: "totonoeru", label: "心を整える", fragranceSlug: "agarwood" },
  { id: "ippo", label: "新しい一歩", fragranceSlug: "marine" },
  { id: "mirai", label: "未来", fragranceSlug: "frankincense" },
];
