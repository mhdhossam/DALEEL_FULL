import React from "react";
import { ShoppingBag, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/staticData";

interface StoreProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

export const StoreProductCard: React.FC<StoreProductCardProps> = React.memo(({ product, onAddToCart }) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-1 text-right"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
    >
      {/* Image placeholder */}
      <div
        className="w-full h-48 flex items-center justify-center relative"
        style={{ background: "hsl(338,100%,97%)" }}
      >
        <ShoppingBag size={48} color="hsl(338,82%,80%)" />
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
          style={
            product.available
              ? { background: "hsl(142,76%,94%)", color: "hsl(142,76%,36%)" }
              : { background: "hsl(0,86%,95%)",   color: "hsl(0,86%,50%)"   }
          }
        >
          {product.available ? "متوفر" : "غير متوفر"}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-base font-black text-gray-900 leading-snug">{product.title}</h3>
        {product.desc && <p className="text-xs text-gray-400 leading-6 flex-1">{product.desc}</p>}

        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-gray-900">{product.price}</span>
          {product.rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star size={13} fill="hsl(338,82%,58%)" color="hsl(338,82%,58%)" />
              <span className="text-xs font-semibold text-gray-500">{product.rating}</span>
            </div>
          )}
        </div>

        <button
          disabled={!product.available}
          onClick={() => onAddToCart?.(product)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white border-0"
          style={{ background: PINK }}
        >
          <ShoppingCart size={15} />
          إضافة إلى السلة
        </button>
      </div>
    </div>
  );
});

StoreProductCard.displayName = "StoreProductCard";
