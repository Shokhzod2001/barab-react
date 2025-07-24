import Advertisement from "./Advertisement"
import Chef from "./Chef"
import Events from "./Events"
import FoodCategory from "./FoodCategory"
import Invitation from "./Invitation"
import PopularDishes from "./PopularDishes"
import "../../../css/home.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function HomePage() {
  return (
    <div className="homepage">
      <FoodCategory />
      <Invitation />
      <PopularDishes />
      <Chef />
      <Advertisement />
      <Events />
    </div>
  )
}
