"use client";

import { FaAddressCard, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

// Массив с кнопками категорий
const categories = [
  { name: "Категория 1", icon: <FaCheckCircle /> },
  { name: "Категория 2", icon: <FaTimesCircle /> },
  { name: "Категория 3", icon: <FaAddressCard /> },
];

// Массив с карточками
interface Card {
  id: number;
  title: string;
  category: string;
}

const cards: Card[] = [
  { id: 1, title: "Card 1", category: "Категория 1" },
  { id: 2, title: "Card 2", category: "Категория 1" },
  { id: 3, title: "Card 3", category: "Категория 1" },
  { id: 4, title: "Card 4", category: "Категория 2" },
  { id: 5, title: "Card 5", category: "Категория 3" },
  { id: 6, title: "Card 6", category: "Категория 3" },
];

const MultiFilter: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleCategoryClick = (category: string) => {
    let newSelectedCategories = [...selectedCategories];
    if (newSelectedCategories.includes(category)) {
      newSelectedCategories = newSelectedCategories.filter(
        (cat) => cat !== category,
      );
    } else {
      newSelectedCategories.push(category);
    }

    setSelectedCategories(newSelectedCategories);
    updateURL(newSelectedCategories);
  };

  const handleResetCategories = () => {
    setSelectedCategories([]);
    updateURL([]);
  };

  const updateURL = (newSelectedCategories: string[]) => {
    const searchString = newSelectedCategories
      .map(
        (category) =>
          `cat-${cards.find((card) => card.category === category)?.id}`,
      )
      .join(",");
    const newURL = `${pathname}?${searchString}`;
    router.push(newURL);
  };

  const filteredCards = cards.filter(
    (card) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(card.category)) &&
      card.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedCards = filteredCards.sort((a, b) => {
    if (a.title < b.title) return sortDirection === "asc" ? -1 : 1;
    if (a.title > b.title) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

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
