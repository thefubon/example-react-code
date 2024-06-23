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
  image?: string
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
  {
    id: 6,
    name: 'Одежда и обувь',
    category: (
      <>
        <FaCheck /> Одежда и обувь
      </>
    ),
    price: 35,
  },
  {
    id: 7,
    name: 'Всё для дома',
    category: (
      <>
        <FaCheck /> Всё для дома
      </>
    ),
    price: 35,
  },
  {
    id: 8,
    name: 'Авто',
    category: (
      <>
        <FaCheck /> Авто
      </>
    ),
    price: 35,
  },
  {
    id: 9,
    name: 'Подарки',
    category: (
      <>
        <FaCheck /> Подарки
      </>
    ),
    price: 35,
  },
  {
    id: 10,
    name: 'Путешествия',
    category: (
      <>
        <FaCheck /> Путешествия
      </>
    ),
    price: 35,
  },
  {
    id: 11,
    name: 'Развлечения',
    category: (
      <>
        <FaCheck /> Развлечения
      </>
    ),
    price: 35,
  },
  {
    id: 12,
    name: 'Финансы',
    category: (
      <>
        <FaCheck /> Финансы
      </>
    ),
    price: 35,
  },
  {
    id: 13,
    name: 'Карьера и образование',
    category: (
      <>
        <FaCheck /> Карьера и образование
      </>
    ),
    price: 35,
  },
  {
    id: 14,
    name: 'Страхование',
    category: (
      <>
        <FaCheck /> Страхование
      </>
    ),
    price: 35,
  },
  {
    id: 15,
    name: 'Маркетплейс',
    category: (
      <>
        <FaCheck /> Маркетплейс
      </>
    ),
    price: 35,
  },
  {
    id: 16,
    name: 'Техника',
    category: (
      <>
        <FaCheck /> Техника
      </>
    ),
    price: 35,
  },
  {
    id: 17,
    name: 'Для детей',
    category: (
      <>
        <FaCheck /> Для детей
      </>
    ),
    price: 35,
  },
  {
    id: 18,
    name: 'Доставка еды',
    category: (
      <>
        <FaCheck /> Доставка еды
      </>
    ),
    price: 35,
  },
  {
    id: 19,
    name: 'Другое',
    category: (
      <>
        <FaCheck /> Другое
      </>
    ),
    price: 35,
  },
]

const MultiFilter: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [showAllCategories, setShowAllCategories] = useState(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const initialProducts: string = searchParams.get('cat') || ''
    if (initialProducts) {
      setSelectedProducts(initialProducts.split('-').map(Number))
    }
  }, [searchParams])

  useEffect(() => {
    const url = new URL(`${pathname}`, window.location.origin)
    const productParams = new URLSearchParams(url.search)
    if (selectedProducts.length > 0) {
      productParams.set('cat', encodeURIComponent(selectedProducts.join('-')))
    } else {
      productParams.delete('cat')
    }
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
    <div className="space-y-6">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex flex-wrap gap-4">
          {categoryButtons
            .slice(0, showAllCategories ? categoryButtons.length : 16)
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

          <button
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700"
            onClick={handleShowAllCategories}>
            {showAllCategories ? (
              <IoClose size={24} />
            ) : (
              <BsThreeDots size={24} />
            )}
          </button>

          {selectedProducts.length > 0 && (
            <button
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
              onClick={handleResetProducts}>
              <BsFilterRight className="inline-block mr-2" />
              Сбросить все
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredProducts.slice(0, 12).map((product) => (
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
