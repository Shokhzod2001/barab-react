import { Box, Button, Container, Stack } from "@mui/material"
import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
import { useNavigate } from "react-router-dom"
import { Product } from "../../../lib/types/product"
import { setChosenProduct, setProducts } from "./slice"
import { retrieveChosenProduct, retrieveProducts } from "./selector"
import { useParams } from "react-router-dom"
import ProductService from "../../services/ProductService"
import { serverApi } from "../../../lib/config"
import { CartItem } from "../../../lib/types/search"

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
})

// REDUX SELECTOR
const ChosenProductRetriever = createSelector(
  retrieveChosenProduct,
  chosenProduct => ({
    chosenProduct,
  }),
)

const ProductsRetriever = createSelector(retrieveProducts, products => ({
  products,
}))

export default function ChosenProduct() {
  const { productId } = useParams<{ productId: string }>()
  const { setChosenProduct } = actionDispatch(useDispatch())
  const { chosenProduct } = useSelector(ChosenProductRetriever)
  const { products } = useSelector(ProductsRetriever)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    if (!productId) return

    const product = new ProductService()
    product
      .getProduct(productId)
      .then(data => {
        setChosenProduct(data)

        if (data?.productCategory && products) {
          const related = products
            .filter(
              p =>
                p.productCategory === data.productCategory &&
                p._id !== data._id,
            )
            .slice(0, 4)
          setRelatedProducts(related)
        }
      })
      .catch(err => console.log(err))
  }, [productId, products])

  const navigate = useNavigate()

  const chooseDishHandler = (id: string) => {
    navigate(`/menu/${id}`)
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  if (!chosenProduct) return
  const imagePath = `${serverApi}/${chosenProduct.productImages[0]}`
  return (
    <div className="chosenProduct">
      <Container className="container">
        <Stack className="detail">
          <Stack className="main">
            <Stack className="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="548"
                height="558"
                viewBox="0 0 748 758"
                fill="none"
              >
                <path
                  d="M34.8744 45.2945C-9.79291 268.645 -13.2621 523.496 34.4159 714.414C36.2482 721.751 42.1539 727.32 49.5698 728.801C310.08 780.827 579.923 752.061 695.125 728.82C702.458 727.341 708.234 721.773 710.085 714.525C778.216 447.696 739.538 176.498 709.803 44.6624C708.124 37.2199 702.299 31.4428 694.841 29.8344C448.186 -23.3571 171.45 6.08918 50.2105 29.9279C42.4312 31.4575 36.4292 37.5203 34.8744 45.2945Z"
                  fill="#F7F2E2"
                />
              </svg>
              <div className="imageFrame">
                <img src={imagePath} alt="" />
              </div>
            </Stack>
            <Stack className="info">
              <h3>{chosenProduct.productName}</h3>
              <p>
                The registration fee covers access to all conference sessions,
                workshops, networking <br /> events, exhibition areas, and
                conference materials. Please refer to the registration <br />{" "}
                page for a detailed breakdown of inclusions.
              </p>
              <span>${chosenProduct.productPrice}</span>
              <div className="line"></div>
              <Stack className="cartSections">
                <Box className="minus">
                  <img src="/img/minus.svg" alt="" />
                </Box>
                <Box className="number">1</Box>
                <Box className="plus">
                  <img src="/img/plus.svg" alt="" />
                </Box>
                <Button className="addingCart">ADD TO CART</Button>
                <Box className="like">
                  <img src="/img/heart.svg" alt="" />
                </Box>
              </Stack>
              <div className="line"></div>
              <h5>Share</h5>
              <Stack className="shareMedia">
                <a href="">
                  <Box className="media">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Box>
                </a>
                <a href="">
                  <Box className="media">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Box>
                </a>
                <a href="https://www.youtube.com/@shahzodabdumalikov1333">
                  <Box className="media">
                    <i className="fa-brands fa-youtube"></i>
                  </Box>
                </a>
                <a href="https://www.instagram.com/shahzod.abdumalikov.01/">
                  <Box className="media">
                    <i className="fa-brands fa-instagram"></i>
                  </Box>
                </a>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="desc">
            <Box
              className={`btn ${!showDescription ? "collapsed" : ""}`}
              onClick={toggleDescription}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="172"
                height="54"
                viewBox="0 0 182 56"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M145.761 2.16512C130.564 3.2664 113.442 4.20592 107.712 4.25254C101.28 4.30481 97.9872 4.56053 99.106 4.92009C100.167 5.26128 97.1619 5.40185 91.8587 5.25987C85.857 5.0981 83.8694 5.20971 85.9702 5.59046C88.0366 5.96486 85.5127 6.09342 78.7229 5.95991C70.9574 5.80733 69.4581 5.90269 72.8345 6.3343C76.1664 6.75956 74.6101 6.8521 66.946 6.68397C59.4541 6.52009 57.5453 6.62887 60.1516 7.07179C62.9283 7.54437 62.0903 7.61431 56.5651 7.37272C50.2292 7.0951 0.90478 9.63603 0.0242302 10.2845C-0.161482 10.4215 0.740809 15.3953 2.02902 21.3376C3.31633 27.2798 4.61088 33.8896 4.9044 36.0265C5.19882 38.1634 6.10564 43.5313 6.92096 47.9555L8.40304 56L19.3293 55.5698C25.3391 55.3339 35.556 54.8132 42.0333 54.4127C48.5106 54.0129 77.8623 53.3679 107.259 52.9808C136.656 52.593 162.457 51.9975 164.595 51.6577C168.379 51.0566 170.729 50.1545 168.513 50.1545C167.906 50.1545 168.448 49.4036 169.718 48.486L172.028 46.8168L167.274 46.0913C164.659 45.6922 161.254 45.5191 159.705 45.7063C157.68 45.9514 156.735 45.731 156.336 44.9222C155.855 43.9453 156.836 43.7969 163.775 43.7969H171.767L172.352 38.3922C172.674 35.4197 172.938 31.3134 172.938 29.2669C172.938 27.2205 173.233 24.9635 173.593 24.2522C174.136 23.1785 174.349 23.319 174.844 25.0773C175.225 26.4272 175.513 24.8887 175.639 20.8389C175.746 17.3422 176.145 12.7329 176.524 10.596C177.091 7.39815 177.235 8.26208 177.34 15.4822C177.411 20.3062 177.614 24.1208 177.795 23.959C177.974 23.7966 178.382 18.7811 178.699 12.812L179.276 1.95956L175.428 2.37068C173.311 2.59744 167.095 2.93227 161.614 3.11523L151.649 3.44865L163.879 2.48865C170.605 1.96026 177.081 1.50252 178.269 1.47073L180.431 1.4128L179.871 10.0662C178.586 29.9401 178.303 41.2948 179.116 40.2649C179.844 39.3438 182.008 11.378 182 3.00221L181.997 0L177.694 0.0812362C175.327 0.12574 160.957 1.06313 145.761 2.16512ZM49.9773 8.23382C49.364 8.42737 48.141 8.43938 47.2596 8.25996C46.3781 8.08053 46.88 7.9223 48.3747 7.90817C49.8695 7.89404 50.5906 8.04027 49.9773 8.23382ZM176.738 26.4901C176.757 27.6556 176.959 28.047 177.19 27.3596C177.42 26.6723 177.404 25.7187 177.156 25.2404C176.908 24.7622 176.72 25.3245 176.738 26.4901ZM174.16 33.2009C174.16 36.5033 174.317 37.854 174.507 36.2031C174.698 34.5515 174.698 31.8495 174.507 30.1987C174.317 28.5471 174.16 29.8985 174.16 33.2009ZM173.081 41.6777C173.081 42.649 173.287 43.0467 173.538 42.5607C173.79 42.0754 173.79 41.2807 173.538 40.7947C173.287 40.3094 173.081 40.7064 173.081 41.6777Z"
                  fill="#EB1400"
                />
              </svg>
              <span>DESCRIPTION</span>
            </Box>
            {showDescription && (
              <Stack className="productInfo">
                <div className="line"></div>
                <div className="mainPart">
                  <Box className="img">
                    <img src={imagePath} alt="" />
                  </Box>
                  <Box className="text">
                    Welcome to Restar, where culinary excellence meets
                    exceptional service. Our restaurant is a haven for food
                    enthusiasts seeking an elevated dining experience.
                    <br /> Immerse yourself in a sophisticated and inviting
                    ambiance. The carefully curated decor sets the stage for
                    intimate dinners, celebrations, and memorable <br /> moments
                    shared with friends and family. Indulge in a gourmet journey
                    with a menu that showcases a fusion of flavors. Our chefs
                    use the finest ingredients to <br /> create dishes that are
                    not just meals but unforgettable experiences. Elevate your
                    dining experience with our extensive selection of fine wines
                    and expertly <br /> crafted cocktails. Each sip complements
                    the richness of our dishes, creating a symphony of taste.{" "}
                    <br /> From crispy and golden fries to mouthwatering burgers
                    and wraps, our menu offers a variety of fast-food favorites.
                    Each item is crafted with quality ingredients <br /> to
                    ensure a tasty experience with every order. Enjoy your quick
                    meal in a casual and friendly setting. Whether you're
                    grabbing a bite on your lunch break or <br /> stopping by
                    for a snack, our welcoming atmosphere makes every visit
                    enjoyable. We believe that great food shouldn't break the
                    bank.
                  </Box>
                </div>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Stack className="relatedProducts">
          <h2>Related Products</h2>
          <p>
            From our juicy burgers to our crispy fries and hand-tossed pizzas,
            <br />
            every item is crafted with unique house-made sauces.
          </p>
          <Stack className="card-wrapper">
            {relatedProducts.length === 0 ? (
              <Box className="empty-list">No related products found</Box>
            ) : (
              relatedProducts.map(product => (
                <Stack
                  className="card"
                  key={product._id}
                  onClick={() => chooseDishHandler(product._id)}
                >
                  <img
                    src={`${serverApi}/${product.productImages[0]}`}
                    alt={product.productName}
                    className="popularImg"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="300"
                    height="300"
                    viewBox="0 0 362 362"
                    fill="none"
                  >
                    <path
                      d="M15.5528 28.3166C-4.32745 130.923 -5.87461 246.425 15.1249 334.938C16.8695 342.292 22.8042 347.865 30.2332 349.254C149.915 371.619 272.482 359.897 330.253 349.244C337.606 347.888 343.418 342.347 345.202 335.087C375.004 213.802 358.832 91.6284 344.93 27.6787C343.309 20.2243 337.448 14.445 329.968 12.9454C216.524 -9.79847 91.4505 2.15137 30.9078 13.0578C23.1051 14.4634 17.0609 20.533 15.5528 28.3166Z"
                      fill="#F7F2E2"
                    />
                  </svg>
                  <Box className="info">
                    <p className="title">{product.productName}</p>
                    <Box className="price">${product.productPrice}</Box>
                  </Box>
                </Stack>
              ))
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
