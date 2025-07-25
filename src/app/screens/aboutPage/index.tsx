import Invite from "./Invite"
import Order from "./Order"
import Process from "./Process"
import Reservation from "./Reservation"
import Sale from "./sale"
import Voucher from "./Voucher"
import "../../../css/about.css"

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <Voucher />
      <Invite />
      <Process />
      <Order />
      <Sale />
      <Reservation />
    </div>
  )
}
