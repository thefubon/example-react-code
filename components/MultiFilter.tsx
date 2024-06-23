"use client";

import { useState } from "react";

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
}

interface Card {
  id: number;
  title: string;
  category: string;
}

interface MultiFilterProps {
  categories: CategoryItem[];
  cards: Card[];
}

const MultiFilter: React.FC<MultiFilterProps> = ({ categories, cards }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Функция для добавления/удаления категории из списка выбранных
  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Функция для сброса всех выбранных категорий
  const handleResetCategories = () => {
    setSelectedCategories([]);
  };

  // Функция для фильтрации карточек по категориям и поиску
  const filteredCards = cards.filter(
    (card) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(card.category)) &&
      card.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Функция для сортировки карточек по алфавиту
  const sortedCards = filteredCards.sort((a, b) => {
    if (a.title < b.title) return sortDirection === "asc" ? -1 : 1;
    if (a.title > b.title) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Функция для обработки ввода в поле поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Функция для переключения направления сортировки
  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Добавьте этот код, чтобы скрыть кнопку "Сбросить", когда категория не выбрана
  const isResetButtonVisible = selectedCategories.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-x-4">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mr-4 rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
        />
        <button
          onClick={handleSortDirectionChange}
          className="mr-4 rounded-md bg-gray-200 px-3 py-2 hover:bg-gray-300"
        >
          Сортировка {sortDirection === "asc" ? "▲" : "▼"}
        </button>

        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className={`rounded-md px-4 py-2 ${
              selectedCategories.includes(category.name)
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            } flex items-center gap-x-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}

        {isResetButtonVisible && (
          <button onClick={handleResetCategories}>Сбросить</button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {sortedCards.map((card) => (
          <div
            key={card.id}
            className="rounded-lg border bg-white p-4 transition-shadow duration-300 hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
            <p className="text-gray-600">Category: {card.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiFilter;
