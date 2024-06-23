import MultiFilter from "@/components/MultiFilter";
import { FaAddressCard, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type CategoryItem = any;
type Card = any;

export default function PageMultiFilter() {
  // Массив с кнопками категорий
  const categories: CategoryItem[] = [
    { name: "Category 1", icon: <FaCheckCircle /> },
    { name: "Category 2", icon: <FaTimesCircle /> },
    { name: "Category 3", icon: <FaAddressCard /> },
  ];

  // Массив с карточками
  const cards: Card[] = [
    { id: 1, title: "Card 1", category: "Category 1" },
    { id: 2, title: "Card 2", category: "Category 1" },
    { id: 3, title: "Card 3", category: "Category 1" },
    { id: 4, title: "Card 4", category: "Category 2" },
    { id: 5, title: "Card 5", category: "Category 3" },
    { id: 6, title: "Card 6", category: "Category 3" },
  ];

  return <MultiFilter categories={categories} cards={cards} />;
}
