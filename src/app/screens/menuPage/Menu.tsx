import { useState, useMemo } from "react"
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

// Mock data based on your schema
const mockProducts = [
  {
    _id: "1",
    productName: "Classic Beef Burger",
    productCategory: "BURGERS",
    productPrice: 12.99,
    productDesc:
      "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
    productImages: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    ],
    productSize: "REGULAR",
    productVolume: 1,
    productTime: ["LUNCH", "DINNER"],
    productSpice: "NONE",
    calories: 520,
    preparationTime: 12,
    productViews: 1250,
    productOrders: 340,
    productLeftCount: 25,
    productStatus: "PROCESS",
    tags: ["popular", "classic"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    productName: "Spicy Chicken Burger",
    productCategory: "BURGERS",
    productPrice: 11.49,
    productDesc:
      "Crispy chicken breast with spicy mayo, jalapeños, and coleslaw",
    productImages: [
      "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=300&h=200&fit=crop",
    ],
    productSize: "REGULAR",
    productVolume: 1,
    productTime: ["LUNCH", "DINNER"],
    productSpice: "MEDIUM",
    calories: 480,
    preparationTime: 10,
    productViews: 980,
    productOrders: 275,
    productLeftCount: 18,
    productStatus: "PROCESS",
    tags: ["spicy", "popular"],
    createdAt: "2024-01-20T11:30:00Z",
  },
  {
    _id: "3",
    productName: "Truffle Mushroom Pizza",
    productCategory: "PIZZA",
    productPrice: 16.99,
    productDesc:
      "Wood-fired pizza with truffle oil, wild mushrooms, and mozzarella",
    productImages: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
    ],
    productSize: "LARGE",
    productVolume: 1,
    productTime: ["DINNER"],
    productSpice: "NONE",
    calories: 890,
    preparationTime: 20,
    productViews: 750,
    productOrders: 210,
    productLeftCount: 12,
    productStatus: "PROCESS",
    tags: ["gourmet", "vegetarian"],
    createdAt: "2024-02-05T09:15:00Z",
  },
  {
    _id: "4",
    productName: "Caesar Salad",
    productCategory: "SALADS",
    productPrice: 9.99,
    productDesc:
      "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    productImages: [
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
    ],
    productSize: "REGULAR",
    productVolume: 1,
    productTime: ["LUNCH"],
    productSpice: "NONE",
    calories: 320,
    preparationTime: 8,
    productViews: 620,
    productOrders: 190,
    productLeftCount: 30,
    productStatus: "PROCESS",
    tags: ["healthy", "light"],
    createdAt: "2024-01-25T14:20:00Z",
  },
  {
    _id: "5",
    productName: "Margherita Pizza",
    productCategory: "PIZZA",
    productPrice: 14.99,
    productDesc: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
    productImages: [
      "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=300&h=200&fit=crop",
    ],
    productSize: "MEDIUM",
    productVolume: 1,
    productTime: ["LUNCH", "DINNER"],
    productSpice: "NONE",
    calories: 780,
    preparationTime: 15,
    productViews: 1100,
    productOrders: 420,
    productLeftCount: 8,
    productStatus: "LOW_STOCK",
    tags: ["classic", "vegetarian"],
    createdAt: "2024-01-10T08:45:00Z",
  },
  {
    _id: "6",
    productName: "Chicken Wings",
    productCategory: "APPETIZERS",
    productPrice: 8.99,
    productDesc: "Crispy fried chicken wings with your choice of sauce",
    productImages: [
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&h=200&fit=crop",
    ],
    productSize: "REGULAR",
    productVolume: 6,
    productTime: ["LUNCH", "DINNER"],
    productSpice: "HOT",
    calories: 450,
    preparationTime: 12,
    productViews: 850,
    productOrders: 310,
    productLeftCount: 5,
    productStatus: "LOW_STOCK",
    tags: ["spicy", "shareable"],
    createdAt: "2024-02-10T16:30:00Z",
  },
  {
    _id: "7",
    productName: "Chocolate Lava Cake",
    productCategory: "DESSERTS",
    productPrice: 7.49,
    productDesc:
      "Warm chocolate cake with a molten center, served with vanilla ice cream",
    productImages: [
      "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=300&h=200&fit=crop",
    ],
    productSize: "REGULAR",
    productVolume: 1,
    productTime: ["DINNER"],
    productSpice: "NONE",
    calories: 580,
    preparationTime: 10,
    productViews: 920,
    productOrders: 380,
    productLeftCount: 15,
    productStatus: "PROCESS",
    tags: ["sweet", "popular"],
    createdAt: "2024-01-30T13:10:00Z",
  },
  {
    _id: "8",
    productName: "Vegetable Stir Fry",
    productCategory: "MAIN_COURSES",
    productPrice: 13.99,
    productDesc: "Fresh seasonal vegetables stir-fried in a light garlic sauce",
    productImages: [
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=300&h=200&fit=crop",
    ],
    productSize: "REGULAR",
    productVolume: 1,
    productTime: ["LUNCH", "DINNER"],
    productSpice: "LOW",
    calories: 320,
    preparationTime: 15,
    productViews: 540,
    productOrders: 180,
    productLeftCount: 22,
    productStatus: "PROCESS",
    tags: ["healthy", "vegan"],
    createdAt: "2024-02-15T12:45:00Z",
  },
  {
    _id: "9",
    productName: "Iced Caramel Latte",
    productCategory: "DRINKS",
    productPrice: 4.99,
    productDesc: "Espresso with milk, ice, and caramel syrup",
    productImages: [
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=200&fit=crop",
    ],
    productSize: "MEDIUM",
    productVolume: 1,
    productTime: ["BREAKFAST", "LUNCH"],
    productSpice: "NONE",
    calories: 180,
    preparationTime: 5,
    productViews: 680,
    productOrders: 420,
    productLeftCount: 40,
    productStatus: "PROCESS",
    tags: ["cold", "sweet"],
    createdAt: "2024-01-18T07:30:00Z",
  },
  {
    _id: "10",
    productName: "BBQ Ribs Platter",
    productCategory: "MAIN_COURSES",
    productPrice: 18.99,
    productDesc: "Slow-cooked pork ribs with homemade BBQ sauce and sides",
    productImages: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
    ],
    productSize: "LARGE",
    productVolume: 1,
    productTime: ["DINNER"],
    productSpice: "MEDIUM",
    calories: 950,
    preparationTime: 25,
    productViews: 720,
    productOrders: 230,
    productLeftCount: 7,
    productStatus: "LOW_STOCK",
    tags: ["signature", "meat"],
    createdAt: "2024-02-01T18:20:00Z",
  },
]

const RestaurantMenu = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [selectedTime, setSelectedTime] = useState("ALL")
  const [selectedSpice, setSelectedSpice] = useState("ALL")
  const [selectedSize, setSelectedSize] = useState("ALL")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.POPULAR)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cart, setCart] = useState<Record<string, number>>({})

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Only show available products
      if (
        product.productStatus !== ProductStatus.PROCESS ||
        product.productLeftCount <= 0
      ) {
        return false
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if (
          !product.productName.toLowerCase().includes(searchLower) &&
          !product.productDesc.toLowerCase().includes(searchLower) &&
          !product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        ) {
          return false
        }
      }

      // Category filter
      if (
        selectedCategory !== "ALL" &&
        product.productCategory !== selectedCategory
      ) {
        return false
      }

      // Time filter
      if (
        selectedTime !== "ALL" &&
        !product.productTime.includes(selectedTime)
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

      // Price filter
      if (
        product.productPrice < priceRange[0] ||
        product.productPrice > priceRange[1]
      ) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case SortOptions.POPULAR:
        filtered.sort((a, b) => b.productOrders - a.productOrders)
        break
      case SortOptions.PRICE_LOW_HIGH:
        filtered.sort((a, b) => a.productPrice - b.productPrice)
        break
      case SortOptions.PRICE_HIGH_LOW:
        filtered.sort((a, b) => b.productPrice - a.productPrice)
        break
      case SortOptions.ALPHABETICAL:
        filtered.sort((a, b) => a.productName.localeCompare(b.productName))
        break
      case SortOptions.NEWEST:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break
    }

    return filtered
  }, [
    searchTerm,
    selectedCategory,
    selectedTime,
    selectedSpice,
    selectedSize,
    priceRange,
    sortBy,
  ])

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
                  onChange={e => setSelectedCategory(e.target.value)}
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
                  onChange={e => setSelectedTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Day</option>
                  {Object.values(ProductTime).map(time => (
                    <option key={time} value={time}>
                      {time.charAt(0) +
                        time.slice(1).toLowerCase().replace("_", " ")}
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
                  onChange={e => setSelectedSize(e.target.value)}
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
              {filteredAndSortedProducts.map(product => (
                <div
                  key={product._id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    viewMode === "list" ? "flex gap-4 p-4" : "overflow-hidden"
                  }`}
                >
                  <div
                    className={
                      viewMode === "list" ? "w-32 h-24 flex-shrink-0" : "h-48"
                    }
                  >
                    <img
                      src={product.productImages[0]}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
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
                        {product.preparationTime}min
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {product.productViews}
                      </div>
                      <span className="text-orange-600 font-medium">
                        {product.productSize}
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

                    {product.productLeftCount < 10 && (
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
