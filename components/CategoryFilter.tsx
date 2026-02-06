
import React from 'react';
import { Category } from '../types';

const categories: Category[] = [
  'Tecnologia', 'Educação', 'Saúde & Fitness', 'Jogos', 
  'Negócios', 'Entretenimento', 'Culinária', 'Viagens'
];

interface CategoryFilterProps {
  activeCategory?: Category;
  onSelect: (category: Category | undefined) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
      <button
        onClick={() => onSelect(undefined)}
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategory ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
