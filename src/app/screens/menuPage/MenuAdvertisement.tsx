import { Box, Container, Stack } from "@mui/material"
import { useEffect, useState } from "react"

export default function MenuAdvertisement() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set your target end date here (e.g., 7 days from now)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7) // 7 days from now

    const updateTimer = () => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference <= 0) {
        // Timer has ended
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    // Update immediately
    updateTimer()

    // Then update every second
    const timer = setInterval(updateTimer, 1000)

    // Clean up interval on component unmount
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="advertisementFrame">
      <Container className="container">
        <Stack className="advertBox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="674"
            viewBox="0 0 1920 674"
            fill="none"
          >
            <path
              d="M1920 674V0L1895.46 18.8872C1875.38 34.3412 1847.77 35.5606 1826.4 21.9369L1823.74 20.2406C1804.58 8.01903 1779.9 8.71434 1761.45 21.9956C1742.56 35.597 1717.18 35.9692 1697.9 22.9278L1696.74 22.1396C1677.01 8.80138 1650.98 9.08347 1631.45 22.7035C1612.44 35.9575 1587.24 36.728 1567.55 24.52L1556.41 17.6145C1539.53 7.14801 1517.79 8.93453 1502.84 22.0169C1487.57 35.385 1465.26 36.928 1448.29 25.7896L1440.15 20.4496C1421.44 8.1689 1397.06 8.88537 1379.1 22.2432C1361.05 35.6747 1336.5 36.3181 1317.77 23.851L1313.5 21.0084C1295.21 8.83622 1271.24 9.46847 1253.62 22.5881C1235.88 35.7927 1211.73 36.3396 1193.42 23.9517L1190.58 22.0332C1171.07 8.83678 1145.34 9.41515 1126.44 23.4753C1109.1 36.376 1085.84 38.0198 1066.86 27.6864L1046.34 16.5147C1027.95 6.50592 1005.36 8.48177 988.989 21.5302C971.637 35.3608 947.427 36.6758 928.679 24.806L918.062 18.0839C901.176 7.39267 879.237 9.25482 864.394 22.6391C849.889 35.7186 828.557 37.826 811.773 27.8372L795.037 17.8766C776.933 7.10166 754.067 8.56129 737.48 21.5508C719.935 35.2901 695.504 36.055 677.134 23.4401L672.727 20.4139C655.035 8.26463 631.505 9.00127 614.608 22.2334C597.607 35.5467 573.908 36.2026 556.196 23.85L552.177 21.0465C534.154 8.47665 510.111 8.84457 492.482 21.9599C474.389 35.4195 449.611 35.4195 431.518 21.9599C413.889 8.84457 389.846 8.47664 371.823 21.0464L368.873 23.1043C350.495 35.922 325.928 35.3457 308.171 21.6801C291.222 8.63653 267.964 7.46144 249.787 18.7303L241.951 23.5885C221.198 36.4544 194.907 36.2875 174.319 23.1592L170.847 20.9451C151.013 8.29814 125.474 9.01766 106.385 22.7612C87.9157 36.0577 63.3395 37.2006 43.7163 25.6755L0 0V674H1920Z"
              fill="#FF9924"
            />
          </svg>
          <div className="advertBurger">
            <img src="img/advertBurger.png" alt="" />
          </div>
          <div className="advertSandwich">
            <img src="img/advertSandwich.webp" alt="" />
          </div>
        </Stack>
        <Stack className="advertText">
          <p>
            save up to <span>50%</span> off
          </p>
          <div>
            <span className="super">Super</span>
            <span className="delicious">Delicious</span>
          </div>
          <span className="burger">Burger</span>
          <span className="timeWord">Limited Time Offer</span>
          <Stack className="time">
            <div className="date">
              <Box className="input">
                {timeLeft.days.toString().padStart(2, "0")}
              </Box>
              <span>Days</span>
            </div>
            <div className="dotes">
              <span></span>
              <span></span>
            </div>
            <div className="date">
              <Box className="input">
                {timeLeft.hours.toString().padStart(2, "0")}
              </Box>
              <span>Hours</span>
            </div>
            <div className="dotes">
              <span></span>
              <span></span>
            </div>
            <div className="date">
              <Box className="input">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </Box>
              <span>Mins</span>
            </div>
            <div className="dotes">
              <span></span>
              <span></span>
            </div>
            <div className="date">
              <Box className="input">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </Box>
              <span>Secs</span>
            </div>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
