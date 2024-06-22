'use client'

import React, { useState } from 'react'
import { BsFilterRight } from 'react-icons/bs'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

interface Product {
  id: number
  name: string
  category: React.ReactNode
  price: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    category: (
      <>
        <FaCheck /> Category A
      </>
    ),
    price: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    category: (
      <>
        <FaCheck /> Category A
      </>
    ),
    price: 15,
  },
  {
    id: 3,
    name: 'Product 3',
    category: (
      <>
        <FaCheck /> Category B
      </>
    ),
    price: 20,
  },
  {
    id: 4,
    name: 'Product 4',
    category: (
      <>
        <FaCheck /> Category B
      </>
    ),
    price: 25,
  },
  {
    id: 5,
    name: 'Product 5',
    category: (
      <>
        <FaCheck /> Category C
      </>
    ),
    price: 30,
  },
  {
    id: 6,
    name: 'Product 6',
    category: (
      <>
        <FaCheck /> Category C
      </>
    ),
    price: 35,
  },
]

const MultiFilter: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(product.category as string)
      )
    : products

  const handleResetCategories = () => {
    setSelectedCategories([])
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-lg font-bold mb-2">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {[
            ...new Set(products.map((product) => product.category as string)),
          ].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategories.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleCategory(category)}>
              {selectedCategories.includes(category) && (
                <FaTimesCircle className="mr-2" />
              )}
              {category}
            </button>
          ))}
        </div>

        {selectedCategories.length > 0 && (
          <button
            className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
            onClick={handleResetCategories}>
            <BsFilterRight className="inline-block mr-2" />
            Сбросить все
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiFilter
