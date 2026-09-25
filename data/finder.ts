/**
 * SCENE 04「香りとの出会い」の選択肢。
 * 想い（wish）→ 香り（fragranceSlug）の対応と、結果に添える言葉を管理します。
 *
 * TODO(仮): message はすべて仮テキストです。
 * 効能・占いを断定する表現は使わず、「香りを選ぶきっかけ」としての言葉にしています。
 */
export type Wish = {
  id: string;
  label: string;
  fragranceSlug: string;
  message: string;
};

export const wishes: Wish[] = [
  {
    id: "en",
    label: "ご縁",
    fragranceSlug: "bergamot",
    message: "人と人、人と場所。\nめぐり逢いを想う日に、澄んだベルガモットの香りを。",
  },
  {
    id: "kizuna",
    label: "絆",
    fragranceSlug: "palo-santo",
    message: "結ばれてきたものを、\nあらためて感じたい日に。",
  },
  {
    id: "iyashi",
    label: "癒し",
    fragranceSlug: "agarwood",
    message: "何もしない時間を、自分に。\n深く静かな沈香とともに。",
  },
  {
    id: "kansha",
    label: "感謝",
    fragranceSlug: "magnolia",
    message: "言葉にしきれない「ありがとう」を、\nやわらかな木蓮の香りに託して。",
  },
  {
    id: "totonoeru",
    label: "心を整える",
    fragranceSlug: "sandalwood",
    message: "ゆっくりと息をして、\nこころを、まんなかへ。",
  },
  {
    id: "ippo",
    label: "新しい一歩",
    fragranceSlug: "marine",
    message: "神々を迎える浜の風のように、\n新しい朝をひらく香りを。",
  },
  {
    id: "mirai",
    label: "未来",
    fragranceSlug: "frankincense",
    message: "まだ見ぬ日々へ、\n海のめぐみと静かな祈りを。",
  },
];
