'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import { BsFilterRight, BsThreeDots } from 'react-icons/bs'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

interface Product {
  id: number
  name: string
  category: any
  price: number
  image?: any
}

const products: Product[] = [
  {
    id: 0,
    name: 'Новинка!',
    category: (
      <>
        <FaCheck /> Новинка
      </>
    ),
    price: 10,
    image: '/example.png',
  },
  {
    id: 1,
    name: 'Хит!',
    category: (
      <>
        <FaCheck /> Хит
      </>
    ),
    price: 15,
  },
  {
    id: 2,
    name: 'Выгодно!',
    category: (
      <>
        <FaCheck /> Выгодно
      </>
    ),
    price: 20,
  },
  {
    id: 3,
    name: 'Здоровье',
    category: (
      <>
        <FaCheck /> Здоровье
      </>
    ),
    price: 25,
  },
  {
    id: 4,
    name: 'Красота',
    category: (
      <>
        <FaCheck /> Красота
      </>
    ),
    price: 30,
  },
  {
    id: 5,
    name: 'Рестораны',
    category: (
      <>
        <FaCheck /> Рестораны
      </>
    ),
    price: 35,
  },
]

const MultiFilter: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [showAllCategories, setShowAllCategories] = useState(false)

  // Добавление #хеш в URL запрос
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Получаем выбранные продукты из URL
    const initialProducts = searchParams.getAll('cat')
    setSelectedProducts(initialProducts.map(Number))
  }, [searchParams])

  useEffect(() => {
    // Обновляем URL при изменении выбранных продуктов
    const url = new URL(`${pathname}#`, window.location.origin)
    const productParams = new URLSearchParams(url.search)
    selectedProducts.forEach((productId) =>
      productParams.append('cat', productId.toString())
    )
    router.replace(`${url.pathname}?${productParams.toString()}`)
  }, [selectedProducts, pathname, router])

  const toggleProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const filteredProducts = selectedProducts.length
    ? products.filter((cat) => selectedProducts.includes(cat.id))
    : products

  const handleResetProducts = () => {
    setSelectedProducts([])
    router.replace(pathname)
  }

  const handleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories)
  }

  const categoryButtons = [...new Set(products.map((cat) => cat.category))]

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex flex-wrap gap-2">
          {categoryButtons
            .slice(0, showAllCategories ? categoryButtons.length : 5)
            .map((category, productId) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md flex items-center gap-1 ${
                  selectedProducts.includes(productId)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => toggleProduct(productId)}>
                {selectedProducts.includes(productId) && (
                  <FaTimesCircle className="mr-2" />
                )}
                {category}
              </button>
            ))}
          {categoryButtons.length > 5 && (
            <button
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700"
              onClick={handleShowAllCategories}>
              {showAllCategories ? (
                <IoClose size={24} />
              ) : (
                <BsThreeDots size={24} />
              )}
            </button>
          )}
        </div>

        {selectedProducts.length > 0 && (
          <button
            className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
            onClick={handleResetProducts}>
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
            {product.image && (
              <Image
                src={product.image}
                width={100}
                height={100}
                alt={product.name}
                className="w-10 h-10"
              />
            )}
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">Категория: {product.category}</p>
            <p className="text-gray-600 mb-2">Стоимость: {product.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiFilter
