import { useState, useMemo, useEffect } from "react"
import "../../../css/menu.css"
import { Search, Grid, List, Clock, ShoppingCart, Eye } from "lucide-react"
import {
  ProductCategory,
  ProductSize,
  ProductSpice,
  ProductStatus,
  ProductTime,
  SortOptions,
} from "../../../lib/enums/product.enum"
import ProductService from "../../services/ProductService"
import { useNavigate } from "react-router-dom"
import { serverApi } from "../../../lib/config"
import { Product } from "../../../lib/types/product"
import { useDispatch, useSelector } from "react-redux"
import { createSelector, Dispatch } from "@reduxjs/toolkit"
import { setProducts } from "./slice"
import { retrieveProducts } from "./selector"
import { useSearchParams } from "react-router-dom"

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
})

// REDUX SELECTOR
const ProductsRetriever = createSelector(retrieveProducts, products => ({
  products,
}))

const RestaurantMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlCategory = searchParams.get("category")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "ALL"
  >(
    urlCategory &&
      Object.values(ProductCategory).includes(urlCategory as ProductCategory)
      ? (urlCategory as ProductCategory)
      : "ALL",
  )
  const [selectedTime, setSelectedTime] = useState<ProductTime | "ALL">("ALL")
  const [selectedSpice, setSelectedSpice] = useState<ProductSpice | "ALL">(
    "ALL",
  )
  const [selectedSize, setSelectedSize] = useState<ProductSize | "ALL">("ALL")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.POPULAR)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cart, setCart] = useState<Record<string, number>>({})

  const { setProducts } = actionDispatch(useDispatch())
  const { products } = useSelector(ProductsRetriever)

  // Map UI sort options to API order parameters
  const mapSortOptionToOrder = (sortOption: SortOptions): string => {
    switch (sortOption) {
      case SortOptions.POPULAR:
        return "productOrders"
      case SortOptions.PRICE_LOW_HIGH:
        return "productPrice"
      case SortOptions.PRICE_HIGH_LOW:
        return "-productPrice"
      case SortOptions.ALPHABETICAL:
        return "productName"
      case SortOptions.NEWEST:
        return "createdAt"
      default:
        return "productOrders"
    }
  }

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      const productService = new ProductService()
      const data = await productService.getProducts({
        order: mapSortOptionToOrder(sortBy),
        page: 1,
        limit: 50,
        productCategory:
          selectedCategory !== "ALL" ? selectedCategory : undefined,
        search: searchTerm,
      })
      setProducts(data)
    }

    fetchProducts()
  }, [searchTerm, selectedCategory, sortBy])

  useEffect(() => {
    if (
      urlCategory &&
      Object.values(ProductCategory).includes(urlCategory as ProductCategory)
    ) {
      setSelectedCategory(urlCategory as ProductCategory)
    } else {
      setSelectedCategory("ALL")
    }
  }, [urlCategory])

  // Filter products based on client-side filters
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      // Only show available products
      if (
        product.productStatus !== ProductStatus.PROCESS ||
        product.productLeftCount <= 0
      ) {
        return false
      }

      // Price filter
      if (
        product.productPrice < priceRange[0] ||
        product.productPrice > priceRange[1]
      ) {
        return false
      }

      // Time filter
      if (
        selectedTime !== "ALL" &&
        !product.productTime?.includes(selectedTime)
      ) {
        return false
      }

      // Spice filter
      if (selectedSpice !== "ALL" && product.productSpice !== selectedSpice) {
        return false
      }

      // Size filter
      if (selectedSize !== "ALL" && product.productSize !== selectedSize) {
        return false
      }

      return true
    })

    // Client-side sorting as fallback
    switch (sortBy) {
      case SortOptions.POPULAR:
        filtered.sort(
          (a: Product, b: Product) =>
            (b.productOrders || 0) - (a.productOrders || 0),
        )
        break
      case SortOptions.PRICE_LOW_HIGH:
        filtered.sort(
          (a: Product, b: Product) => a.productPrice - b.productPrice,
        )
        break
      case SortOptions.PRICE_HIGH_LOW:
        filtered.sort(
          (a: Product, b: Product) => b.productPrice - a.productPrice,
        )
        break
      case SortOptions.ALPHABETICAL:
        filtered.sort((a: Product, b: Product) =>
          a.productName.localeCompare(b.productName),
        )
        break
      case SortOptions.NEWEST:
        filtered.sort(
          (a: Product, b: Product) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        )
        break
    }

    return filtered
  }, [products, selectedTime, selectedSpice, selectedSize, sortBy, priceRange])

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const getSpiceIcon = (spice: ProductSpice | "ALL") => {
    switch (spice) {
      case ProductSpice.HOT:
        return "🌶️🌶️🌶️"
      case ProductSpice.MEDIUM:
        return "🌶️🌶️"
      case ProductSpice.NONE:
        return "🌿"
      default:
        return ""
    }
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("ALL")
    setSelectedTime("ALL")
    setSelectedSpice("ALL")
    setSelectedSize("ALL")
    setPriceRange([0, 50])
    setSortBy(SortOptions.POPULAR)
  }

  // Render the product image with server URL
  const renderProductImage = (product: Product) => {
    const imagePath = product.productImages?.[0]
      ? `${serverApi}/${product.productImages[0]}`
      : "https://via.placeholder.com/300x200?text=No+Image"

    return (
      <img
        src={imagePath}
        alt={product.productName}
        className="w-full h-full object-cover"
      />
    )
  }

  const navigate = useNavigate()

  const chooseDishHandler = (id: string) => {
    navigate(`/menu/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h1>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-orange-600 hover:text-orange-800"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e =>
                    setSelectedCategory(
                      e.target.value as ProductCategory | "ALL",
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Categories</option>
                  {Object.values(ProductCategory).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0) +
                        cat.slice(1).toLowerCase().replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time
                </label>
                <select
                  value={selectedTime}
                  onChange={e =>
                    setSelectedTime(e.target.value as ProductTime | "ALL")
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Day</option>
                  {Object.values(ProductTime).map(time => (
                    <option key={time} value={time}>
                      {time.charAt(0) + time.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spice Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spice Level
                </label>
                <select
                  value={selectedSpice}
                  onChange={e =>
                    setSelectedSpice(e.target.value as ProductSpice | "ALL")
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Levels</option>
                  {Object.values(ProductSpice).map(spice => (
                    <option key={spice} value={spice}>
                      {spice.charAt(0) + spice.slice(1).toLowerCase()}{" "}
                      {getSpiceIcon(spice)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  value={selectedSize}
                  onChange={e =>
                    setSelectedSize(e.target.value as ProductSize | "ALL")
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Sizes</option>
                  {Object.values(ProductSize).map(size => (
                    <option key={size} value={size}>
                      {size.charAt(0) + size.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[0]}
                    onChange={e =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={e =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {filteredAndSortedProducts.length} items found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOptions)}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value={SortOptions.POPULAR}>Most Popular</option>
                  <option value={SortOptions.PRICE_LOW_HIGH}>
                    Price: Low to High
                  </option>
                  <option value={SortOptions.PRICE_HIGH_LOW}>
                    Price: High to Low
                  </option>
                  <option value={SortOptions.ALPHABETICAL}>Alphabetical</option>
                  <option value={SortOptions.NEWEST}>Newest First</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-600"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedProducts.map((product: Product) => (
                <div
                  key={product._id}
                  onClick={() => chooseDishHandler(product._id)}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    viewMode === "list" ? "flex gap-4 p-4" : "overflow-hidden"
                  }`}
                >
                  <div
                    className={
                      viewMode === "list" ? "w-32 h-24 flex-shrink-0" : "h-48"
                    }
                  >
                    {renderProductImage(product)}
                  </div>

                  <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.productName}
                      </h3>
                      <div className="flex items-center gap-1">
                        {getSpiceIcon(product.productSpice as ProductSpice)}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.productDesc}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {product.preparationTime || 10}min
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {product.productViews || 0}
                      </div>
                      <span className="text-orange-600 font-medium">
                        {product.productSize || "REGULAR"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ${product.productPrice}
                        </span>
                        {product.calories && (
                          <span className="text-xs text-gray-500 ml-2">
                            {product.calories} cal
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product._id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add {cart[product._id] ? `(${cart[product._id]})` : ""}
                      </button>
                    </div>

                    {product.productLeftCount &&
                      product.productLeftCount < 10 && (
                        <div className="mt-2 text-xs text-red-600 font-medium">
                          Only {product.productLeftCount} left!
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No items found</div>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantMenu
