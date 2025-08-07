import { Container, Stack } from "@mui/material"
import { useState } from "react"

interface ReservationFormData {
  name: string
  phone: string
  persons: string
  date: string
  time: string
  table: string
}

// Initial form state
const initialFormState: ReservationFormData = {
  name: "",
  phone: "",
  persons: "",
  date: "",
  time: "",
  table: "",
}
export default function Reservation() {
  const [formData, setFormData] =
    useState<ReservationFormData>(initialFormState)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "http://localhost:3009/admin/reserve/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      )

      const data = await response.json()
      if (response.ok) {
        alert("Reservation created successfully!")
        // Reset form to initial state
        setFormData(initialFormState)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert("Failed to submit reservation")
      console.error(error)
    }
  }

  // Get today's date in YYYY-MM-DD format for the min date
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="reservationFrame">
      <Container className="container">
        <Stack className="video">
          <Stack className="video-box">
            <div className="greenBack">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="404"
                height="518"
                viewBox="0 0 604 818"
                fill="none"
              >
                <path
                  d="M0 60C0 26.8629 26.8629 0 60 0H544C577.137 0 604 26.8629 604 60V758C604 791.137 577.137 818 544 818H60C26.8629 818 0 791.137 0 758V60Z"
                  fill="#3F9065"
                />
              </svg>
            </div>

            <video
              className={"ads-video"}
              autoPlay={true}
              loop
              muted
              playsInline
              data-video-media=""
            >
              <source type="video/mp4" src="video/videoRes.mp4" />
            </video>
          </Stack>
        </Stack>
        <Stack className="reserve">
          <div className="reservation-title">RESERVATION TABLE</div>
          <div className="main-title">
            BOOK A <span style={{ color: "#ff4444" }}>TABLE</span>
          </div>
          <div className="recommendation">*reservations recommended</div>

          <form id="bookingForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                id="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <div className="input-icon">👤</div>
            </div>

            <div className="form-group">
              <input
                type="tel"
                className="form-input"
                id="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleInputChange}
                title="Please enter a 10-digit phone number"
              />
              <div className="input-icon">📱</div>
            </div>

            <div className="form-group">
              <select
                className="form-input"
                id="persons"
                required
                value={formData.persons}
                onChange={handleInputChange}
              >
                <option value="">Select Person</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7">7 People</option>
                <option value="8">8+ People</option>
              </select>
              <div className="input-icon">👥</div>
            </div>

            <div className="form-group">
              <input
                type="date"
                className="form-input"
                id="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                min={today}
              />
              <div className="input-icon">📅</div>
            </div>

            <div className="form-group">
              <select
                className="form-input"
                id="time"
                required
                value={formData.time}
                onChange={handleInputChange}
              >
                <option value="">Select Time</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
              <div className="input-icon">🕐</div>
            </div>

            <div className="form-group">
              <select
                className="form-input"
                id="table"
                required
                value={formData.table}
                onChange={handleInputChange}
              >
                <option value="">Select Table</option>
                <option value="Window Table">Window Table</option>
                <option value="Booth">Booth</option>
                <option value="Private Room">Private Room</option>
                <option value="Bar Seating">Bar Seating</option>
                <option value="Outdoor Patio">Outdoor Patio</option>
                <option value="No Preference">No Preference</option>
              </select>
              <div className="input-icon">🍽️</div>
            </div>

            <button type="submit" className="book-button">
              BOOK NOW
            </button>
          </form>

          <div className="powered-by">*Powered by Open Table</div>
        </Stack>
      </Container>
    </div>
  )
}
