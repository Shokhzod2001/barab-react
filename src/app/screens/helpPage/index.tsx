import React from "react"
import { Box, Container, Stack, Tabs } from "@mui/material"
import Typography from "@mui/material/Typography"
import Tab from "@mui/material/Tab"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import "../../../css/help.css"
import { faq } from "../../../lib/data/faq"
import { terms } from "../../../lib/data/terms"
import emailjs from "@emailjs/browser"

export default function HelpPage() {
  const [value, setValue] = React.useState("1")
  const [formData, setFormData] = React.useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  })

  /** HANDLERS **/
  const handleTabChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add this to your handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await emailjs.send(
        "service_ttc0yua",
        "template_ox9si5l",
        formData,
        "vlBZiuzJsAnVmUwFw",
      )

      alert("Thank you for your message! We will get back to you soon.")
      setFormData({
        firstName: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      alert("Failed to send message. Please try again later.")
    }
  }

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="Help section tabs"
                className={"table_list"}
              >
                <Tab label="TERMS" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="CONTACT" value={"3"} />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <TabPanel value={"1"}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${number}-content`}
                          id={`panel${number}-header`}
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Stack className="contactInfo">
                      <h3>
                        Contact <span>Information</span>
                      </h3>
                      <p>
                        Relax and enjoy your food in our cozy restaurant, or
                        take it to-go. Great taste,
                        <br /> great service — every visit is a flavorful
                        experience worth coming back for.
                      </p>
                      <Box className="info">
                        <div className="img">
                          <img src="/icons/map.svg" alt="Map icon" />
                        </div>
                        <div className="data">
                          <h5>Our Address</h5>
                          <p>8502 Kiki Rd. HANYANG, SEOUL 98380</p>
                        </div>
                      </Box>
                      <Box className="info">
                        <div
                          className="img"
                          style={{ background: "#3F9065", marginLeft: "-40px" }}
                        >
                          <img src="/icons/phone.svg" alt="Phone icon" />
                        </div>
                        <div className="data">
                          <h5>Contact Number & Email</h5>
                          <p>
                            Mobile: +256-6547-98749 <br /> Email: info@barab.com
                          </p>
                        </div>
                      </Box>
                      <Box className="info">
                        <div
                          className="img"
                          style={{ background: "#FF9924", marginLeft: "-20px" }}
                        >
                          <img src="/icons/clock.svg" alt="Clock icon" />
                        </div>
                        <div className="data">
                          <h5>Opening Time</h5>
                          <p>
                            Monday - Saturday: 9:00am - 18:00pm <br /> Sunday
                            are Closed
                          </p>
                        </div>
                      </Box>
                      <img
                        src="img/leavesContact.png"
                        alt="Decorative leaves"
                        className="leaves"
                      />
                    </Stack>
                    <Stack className="contactForm">
                      <h1>Get In Touch</h1>
                      <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                          <div className="form-group">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First Name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Your Mail"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Subjects</option>
                            <option value="order-inquiry">Order Inquiry</option>
                            <option value="delivery">Delivery Issues</option>
                            <option value="food-quality">Food Quality</option>
                            <option value="catering">Catering Services</option>
                            <option value="franchise">
                              Franchise Opportunities
                            </option>
                            <option value="feedback">Customer Feedback</option>
                            <option value="complaint">Complaint</option>
                            <option value="nutritional">
                              Nutritional Information
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Your Message"
                            required
                          />
                        </div>

                        <button type="submit" className="submit-btn">
                          Send Message
                          <svg className="icon" viewBox="0 0 24 24">
                            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                          </svg>
                        </button>
                      </form>
                    </Stack>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  )
}
