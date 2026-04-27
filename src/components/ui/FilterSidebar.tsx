'use client';

import { FilterChip } from './FilterChip';

// Placeholder filter options — replace or populate from API per client
const DEFAULT_CATEGORIES = ['All', 'Category A', 'Category B', 'Category C'];
const DEFAULT_TAGS = ['New', 'Sale', 'Featured', 'Popular'];

interface FilterSidebarProps {
  categories?: string[];
  tags?: string[];
  selectedCategory?: string;
  selectedTags?: string[];
  onCategoryChange?: (cat: string) => void;
  onTagToggle?: (tag: string) => void;
}

export function FilterSidebar({
  categories = DEFAULT_CATEGORIES,
  tags = DEFAULT_TAGS,
  selectedCategory = '',
  selectedTags = [],
  onCategoryChange,
  onTagToggle,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
      {/* Category */}
      <div className="space-y-4">
        <h3 className="label-caps font-bold text-foreground">Categories</h3>
        <div className="flex flex-col space-y-3">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center group cursor-pointer"
              onClick={() => onCategoryChange?.(cat)}
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                selectedCategory === cat ? 'border-primary' : 'border-border group-hover:border-primary'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${
                  selectedCategory === cat ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'
                }`} />
              </div>
              <span className={`ml-3 text-sm ${
                selectedCategory === cat ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="space-y-4">
          <h3 className="label-caps font-bold text-foreground">Filter by Tag</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <FilterChip
                key={tag}
                label={tag}
                active={selectedTags.includes(tag)}
                onClick={() => onTagToggle?.(tag)}
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
