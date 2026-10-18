import React, { useState } from "react";
import { storeCategories as categories, storeProducts as products } from "@/data/staticData";
import { StoreProductCard } from "./StoreProductCard";

const PINK = "linear-gradient(135deg, hsl(338, 82%, 58%) 0%, hsl(338, 100%, 72%) 100%)";

export const StoreProductGrid: React.FC = () => {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={
              active === cat.id
                ? { background: PINK, color: "white", boxShadow: "0 4px 14px hsla(338,82%,58%,0.35)" }
                : { background: "white", color: "#6b7280", border: "1px solid #e5e7eb" }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <StoreProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
