"use client";

type Props = {
  years: number[];
  categories: readonly string[];
  year: number | "all";
  category: string;
  onYear: (v: number | "all") => void;
  onCategory: (v: string) => void;
};

export function GalleryFilters({
  years,
  categories,
  year,
  category,
  onYear,
  onCategory,
}: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-group" role="group" aria-label="Filter by year">
        <span>Year</span>
        <button
          className={year === "all" ? "chip is-active" : "chip"}
          aria-pressed={year === "all"}
          onClick={() => onYear("all")}
        >
          All
        </button>
        {years.map((y) => (
          <button
            key={y}
            className={year === y ? "chip is-active" : "chip"}
            aria-pressed={year === y}
            onClick={() => onYear(y)}
          >
            {y}
          </button>
        ))}
      </div>
      <div
        className="filter-group"
        role="group"
        aria-label="Filter by event category"
      >
        <span>Category</span>
        <button
          className={category === "all" ? "chip is-active" : "chip"}
          aria-pressed={category === "all"}
          onClick={() => onCategory("all")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={category === c ? "chip is-active" : "chip"}
            aria-pressed={category === c}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
