import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const useFilterParams = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const getFilteredParams = () => {
    const initialProducts = searchParams.getAll('cat')
    return initialProducts.map(Number)
  }

  const updateFilteredParams = (selectedProducts: number[]) => {
    const url = new URL(`${pathname}#`, window.location.origin)
    const productParams = new URLSearchParams(url.search)

    selectedProducts.forEach((productId) =>
      productParams.append('cat', productId.toString())
    )

    router.replace(`${url.pathname}?${productParams.toString()}`)
  }

  return {
    getFilteredParams,
    updateFilteredParams,
  }
}

export default useFilterParams
