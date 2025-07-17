import Advertisement from "./Advertisement"
import Chef from "./Chef"
import Events from "./Events"
import FoodCategory from "./FoodCategory"
import History from "./History"
import Invitation from "./Invitation"
import PopularDishes from "./PopularDishes"
import "../../../css/home.css"

export default function HomePage() {
  return (
    <div className="homepage">
      <FoodCategory />
      <Invitation />
      <PopularDishes />
      <History />
      <Chef />
      <Advertisement />
      <Events />
    </div>
  )
}
