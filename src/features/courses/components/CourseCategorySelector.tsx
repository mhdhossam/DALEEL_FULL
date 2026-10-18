import React from "react";
interface CourseCategorySelectorProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const CourseCategorySelector: React.FC<CourseCategorySelectorProps> = ({
  activeCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div
      className="flex flex-wrap gap-2 mb-10 justify-center"
      role="tablist"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={activeCategory === cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat
              ? "gradient-pink text-primary-foreground"
              : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
