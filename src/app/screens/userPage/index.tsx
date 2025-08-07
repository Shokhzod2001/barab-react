import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TelegramIcon from "@mui/icons-material/Telegram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import "../../../css/userPage.css"
import { Settings } from "./Settings"
import { useNavigate } from "react-router-dom"
import { useGlobals } from "../../hooks/useGlobals"
import { serverApi } from "../../../lib/config"

export default function UserPage() {
  const navigate = useNavigate()
  const { authMember } = useGlobals()

  if (!authMember) navigate("/")

  return (
    <div className="user-page">
      <div className="user-page-container">
        <div className="user-page-grid">
          <div className="form-section">
            <Settings />
          </div>

          <div className="profile-card modern-card">
            <div className="profile-cover"></div>

            <div className="profile-content">
              <div className="profile-avatar-container">
                <div className="profile-avatar-wrapper">
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    alt="Profile"
                    className="profile-avatar"
                  />
                </div>
                <button className="avatar-edit-button">
                  <CameraAltIcon />
                </button>
              </div>

              <div className="profile-info">
                <h2 className="profile-name">{authMember?.memberNick}</h2>

                <div className="contact-info">
                  <div className="contact-item">
                    <PhoneIcon />
                    <span>{authMember?.memberPhone}</span>
                  </div>
                  <div className="contact-item">
                    <LocationOnIcon />
                    <span>
                      {authMember?.memberAddress === "no address"
                        ? "No address"
                        : authMember?.memberAddress}
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="social-links">
                  <button className="social-button facebook">
                    <FacebookIcon />
                  </button>
                  <button className="social-button instagram">
                    <InstagramIcon />
                  </button>
                  <button className="social-button telegram">
                    <TelegramIcon />
                  </button>
                  <button className="social-button youtube">
                    <YouTubeIcon />
                  </button>
                </div>

                <div className="profile-description">
                  <p>
                    {!authMember?.memberDesc
                      ? "Add a description to tell others about yourself..."
                      : authMember?.memberDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
