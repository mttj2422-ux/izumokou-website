import Image from "next/image";
import type { ImageSlotData } from "@/data/images";

type Props = {
  slot: ImageSlotData;
  /** 写真がないときに表示するもの。null なら何も表示しない */
  fallback?: React.ReactNode;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * 差し替え可能な写真枠。data/images.ts の src が入れば写真を、なければ fallback を表示。
 * 写真はごくゆっくりとズームする（.image-slot--breathe）。
 */
export default function ImageSlot({ slot, fallback = null, sizes = "100vw", priority, className }: Props) {
  if (!slot.src) return <>{fallback}</>;
  return (
    <div className={`image-slot ${className ?? ""}`}>
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="image-slot__img"
      />
    </div>
  );
}

export function hasImage(slot: ImageSlotData): boolean {
  return Boolean(slot.src);
}
