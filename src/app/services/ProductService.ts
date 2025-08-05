import axios from "axios"
import { serverApi } from "../../lib/config"
import { Product, ProductInquiry } from "../../lib/types/product"

class ProductService {
  private readonly path: string

  constructor() {
    this.path = serverApi
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`

      if (input.productCategory) {
        if (Array.isArray(input.productCategory)) {
          url += `&productCategory=${input.productCategory.join(",")}`
        } else {
          url += `&productCategory=${input.productCategory}`
        }
      }

      if (input.search) url += `&search=${input.search}`

      const result = await axios.get(url)
      return result.data
    } catch (err) {
      console.log("Error, getProducts: ", err)
      throw err
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`
      const result = await axios.get(url, { withCredentials: true })

      console.log("getProduct: ", result)
      return result.data
    } catch (err) {
      console.log("Error, getProduct: ", err)
      throw err
    }
  }
}

export default ProductService

// import { useState, useMemo, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Dispatch } from "@reduxjs/toolkit"
// import { createSelector } from "reselect"
// import { useNavigate } from "react-router-dom"
// import "../../../css/menu.css"
// import { Search, Grid, List, Clock, Eye } from "lucide-react"
// import {
//   ProductCategory,
//   ProductSize,
//   ProductSpice,
//   ProductTime,
//   SortOptions,
// } from "../../../lib/enums/product.enum"
// import ProductService from "../../services/ProductService"
// import { Product, ProductInquiry } from "../../../lib/types/product"
// import { serverApi } from "../../../lib/config"
// import Pagination from "@mui/material/Pagination"
// import PaginationItem from "@mui/material/PaginationItem"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import { setProducts } from "./slice"
// import { retrieveProducts } from "./selector"

// // REDUX SLICE & SELECTOR
// const actionDispatch = (dispatch: Dispatch) => ({
//   setProducts: (data: Product[]) => dispatch(setProducts(data)),
// })

// // REDUX SELECTOR
// const productsRetriever = createSelector(retrieveProducts, products => ({
//   products,
// }))

// const RestaurantMenu = () => {
//   const navigate = useNavigate()
//   const { setProducts } = actionDispatch(useDispatch())
//   const { products } = useSelector(productsRetriever)

//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState<
//     ProductCategory | "ALL"
//   >("ALL")
//   const [selectedTime, setSelectedTime] = useState<ProductTime | "ALL">("ALL")
//   const [selectedSpice, setSelectedSpice] = useState<ProductSpice | "ALL">(
//     "ALL",
//   )
//   const [selectedSize, setSelectedSize] = useState<ProductSize | "ALL">("ALL")
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
//   const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.POPULAR)
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)

//   const [productSearch, setProductSearch] = useState<ProductInquiry>({
//     order: "productOrders",
//     page: 1,
//     limit: 6,
//     search: "",
//   })

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true)
//       try {
//         const productService = new ProductService()
//         const products = await productService.getProducts(productSearch)
//         setProducts(products)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [productSearch, setProducts])

//   // Filter and sort products client-side for time, spice, size and price
//   const filteredProducts = useMemo(() => {
//     return products.filter(product => {
//       // Time filter
//       if (
//         selectedTime !== "ALL" &&
//         !product.productTime.includes(selectedTime)
//       ) {
//         return false
//       }

//       // Spice filter
//       if (selectedSpice !== "ALL" && product.productSpice !== selectedSpice) {
//         return false
//       }

//       // Size filter
//       if (selectedSize !== "ALL" && product.productSize !== selectedSize) {
//         return false
//       }

//       // Price filter
//       if (
//         product.productPrice < priceRange[0] ||
//         product.productPrice > priceRange[1]
//       ) {
//         return false
//       }

//       return true
//     })
//   }, [products, selectedTime, selectedSpice, selectedSize, priceRange])

//   const getSpiceIcon = (spice: ProductSpice | "ALL") => {
//     switch (spice) {
//       case ProductSpice.HOT:
//         return "🌶️🌶️🌶️"
//       case ProductSpice.MEDIUM:
//         return "🌶️🌶️"
//       case ProductSpice.NONE:
//         return "🌿"
//       default:
//         return ""
//     }
//   }

//   const resetFilters = () => {
//     setSearchTerm("")
//     setSelectedCategory("ALL")
//     setSelectedTime("ALL")
//     setSelectedSpice("ALL")
//     setSelectedSize("ALL")
//     setPriceRange([0, 50])
//     setSortBy(SortOptions.POPULAR)
//     setProductSearch(prev => ({ ...prev, page: 1 }))
//     setCurrentPage(1)
//   }

//   const chooseProductHandler = (id: string) => {
//     navigate(`/products/${id}`)
//   }

//   const handlePageChange = (
//     _event: React.ChangeEvent<unknown>,
//     page: number,
//   ) => {
//     setCurrentPage(page)
//     setProductSearch(prev => ({ ...prev, page }))
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h1>

//           {/* Search Bar */}
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search menu items..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               onKeyDown={e =>
//                 e.key === "Enter" &&
//                 setProductSearch(prev => ({
//                   ...prev,
//                   search: searchTerm,
//                   page: 1,
//                 }))
//               }
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar Filters */}
//           <div className="lg:w-64 space-y-6">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={resetFilters}
//                   className="text-sm text-orange-600 hover:text-orange-800"
//                 >
//                   Reset
//                 </button>
//               </div>

//               {/* Category Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={selectedCategory}
//                   onChange={e => {
//                     setSelectedCategory(
//                       e.target.value as ProductCategory | "ALL",
//                     )
//                     setProductSearch(prev => ({
//                       ...prev,
//                       productCategory:
//                         e.target.value === "ALL"
//                           ? undefined
//                           : (e.target.value as ProductCategory),
//                       page: 1,
//                     }))
//                   }}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="ALL">All Categories</option>
//                   {Object.values(ProductCategory).map(cat => (
//                     <option key={cat} value={cat}>
//                       {cat.charAt(0) +
//                         cat.slice(1).toLowerCase().replace("_", " ")}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Time Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Available Time
//                 </label>
//                 <select
//                   value={selectedTime}
//                   onChange={e =>
//                     setSelectedTime(e.target.value as ProductTime | "ALL")
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="ALL">All Day</option>
//                   {Object.values(ProductTime).map(time => (
//                     <option key={time} value={time}>
//                       {time.charAt(0) +
//                         time.slice(1).toLowerCase().replace("_", " ")}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Spice Level Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Spice Level
//                 </label>
//                 <select
//                   value={selectedSpice}
//                   onChange={e =>
//                     setSelectedSpice(e.target.value as ProductSpice | "ALL")
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="ALL">All Levels</option>
//                   {Object.values(ProductSpice).map(spice => (
//                     <option key={spice} value={spice}>
//                       {spice.charAt(0) + spice.slice(1).toLowerCase()}{" "}
//                       {getSpiceIcon(spice)}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Size Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Size
//                 </label>
//                 <select
//                   value={selectedSize}
//                   onChange={e =>
//                     setSelectedSize(e.target.value as ProductSize | "ALL")
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="ALL">All Sizes</option>
//                   {Object.values(ProductSize).map(size => (
//                     <option key={size} value={size}>
//                       {size.charAt(0) + size.slice(1).toLowerCase()}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price Range Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price Range: ${priceRange[0]} - ${priceRange[1]}
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="range"
//                     min="0"
//                     max="50"
//                     value={priceRange[0]}
//                     onChange={e =>
//                       setPriceRange([Number(e.target.value), priceRange[1]])
//                     }
//                     className="flex-1"
//                   />
//                   <input
//                     type="range"
//                     min="0"
//                     max="50"
//                     value={priceRange[1]}
//                     onChange={e =>
//                       setPriceRange([priceRange[0], Number(e.target.value)])
//                     }
//                     className="flex-1"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Controls Bar */}
//             <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-4">
//                 <span className="text-gray-600">
//                   {filteredProducts.length} items found
//                   {isLoading && <span className="ml-2">Loading...</span>}
//                 </span>
//               </div>

//               <div className="flex items-center gap-4">
//                 {/* Sort Dropdown */}
//                 <select
//                   value={sortBy}
//                   onChange={e => {
//                     setSortBy(e.target.value as SortOptions)
//                     setProductSearch(prev => ({
//                       ...prev,
//                       order: getOrderFromSortOption(
//                         e.target.value as SortOptions,
//                       ),
//                       page: 1,
//                     }))
//                   }}
//                   className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value={SortOptions.POPULAR}>Most Popular</option>
//                   <option value={SortOptions.PRICE_LOW_HIGH}>
//                     Price: Low to High
//                   </option>
//                   <option value={SortOptions.PRICE_HIGH_LOW}>
//                     Price: High to Low
//                   </option>
//                   <option value={SortOptions.ALPHABETICAL}>Alphabetical</option>
//                   <option value={SortOptions.NEWEST}>Newest First</option>
//                 </select>

//                 {/* View Mode Toggle */}
//                 <div className="flex border border-gray-300 rounded-md">
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-600"}`}
//                   >
//                     <Grid className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-600"}`}
//                   >
//                     <List className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid/List */}
//             <div
//               className={
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                   : "space-y-4"
//               }
//             >
//               {filteredProducts.map(product => {
//                 const imagePath = product.productImages?.[0]
//                   ? `${serverApi}/${product.productImages[0]}`
//                   : "https://via.placeholder.com/300x200"

//                 return (
//                   <div
//                     key={product._id}
//                     className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
//                       viewMode === "list" ? "flex gap-4 p-4" : "overflow-hidden"
//                     }`}
//                     onClick={() => chooseProductHandler(product._id)}
//                   >
//                     <div
//                       className={
//                         viewMode === "list" ? "w-32 h-24 flex-shrink-0" : "h-48"
//                       }
//                     >
//                       <img
//                         src={imagePath}
//                         alt={product.productName}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <div className={viewMode === "list" ? "flex-1" : "p-4"}>
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {product.productName}
//                         </h3>
//                         <div className="flex items-center gap-1">
//                           {getSpiceIcon(product.productSpice as ProductSpice)}
//                         </div>
//                       </div>

//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {product.productDesc}
//                       </p>

//                       <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           {product.preparationTime}min
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Eye className="w-3 h-3" />
//                           {product.productViews}
//                         </div>
//                         <span className="text-orange-600 font-medium">
//                           {product.productSize}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center">
//                         <div>
//                           <span className="text-xl font-bold text-gray-900">
//                             ${product.productPrice}
//                           </span>
//                           {product.calories && (
//                             <span className="text-xs text-gray-500 ml-2">
//                               {product.calories} cal
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {product.productLeftCount < 10 && (
//                         <div className="mt-2 text-xs text-red-600 font-medium">
//                           Only {product.productLeftCount} left!
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>

//             {filteredProducts.length === 0 && !isLoading && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 text-lg mb-2">No items found</div>
//                 <p className="text-gray-500">
//                   Try adjusting your search or filters
//                 </p>
//               </div>
//             )}

//             {/* Pagination */}
//             <div className="flex justify-center mt-8">
//               <Pagination
//                 count={
//                   products.length === productSearch.limit
//                     ? currentPage + 1
//                     : currentPage
//                 }
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 color="primary"
//                 shape="rounded"
//                 disabled={isLoading}
//                 renderItem={item => (
//                   <PaginationItem
//                     components={{
//                       previous: ArrowBackIcon,
//                       next: ArrowForwardIcon,
//                     }}
//                     {...item}
//                   />
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Helper function to convert SortOptions to API order strings
// const getOrderFromSortOption = (sortOption: SortOptions): string => {
//   switch (sortOption) {
//     case SortOptions.POPULAR:
//       return "productOrders"
//     case SortOptions.PRICE_LOW_HIGH:
//       return "productPrice"
//     case SortOptions.PRICE_HIGH_LOW:
//       return "-productPrice"
//     case SortOptions.NEWEST:
//       return "-createdAt"
//     case SortOptions.ALPHABETICAL:
//       return "productName"
//     default:
//       return "productOrders"
//   }
// }

// export default RestaurantMenu
