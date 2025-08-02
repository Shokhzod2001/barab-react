import { useState } from "react"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import MessageIcon from "@mui/icons-material/Message"
import CameraAltIcon from "@mui/icons-material/CameraAlt"

export function Settings() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: "Martin",
    phone: "821024694424",
    address: "no address",
    description: "no description",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Add your save logic here
    console.log("Saving data:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data if needed
    setIsEditing(false)
  }

  return (
    <>
      <div className="image-upload-card modern-card">
        <div className="card-header">
          <h3 className="card-title">Profile Picture</h3>
          <div className="card-icon">
            <CameraAltIcon style={{ color: "#2563eb", fontSize: 16 }} />
          </div>
        </div>

        <div className="upload-content">
          <img
            src="/icons/default-user.svg"
            alt="Current avatar"
            className="current-avatar"
          />
          <div className="upload-info">
            <h4>Change your picture</h4>
            <p>JPG, JPEG, PNG formats. Max size 5MB</p>
            <label className="upload-button">
              <CloudUploadIcon />
              Upload Image
              <input type="file" accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="personal-info-card modern-card">
        <div className="card-header">
          <h3 className="card-title">Personal Information</h3>
          <button
            onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
            className={`edit-button ${isEditing ? "editing" : ""}`}
          >
            {isEditing ? <CloseIcon /> : <EditIcon />}
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label className="form-label">
              <PersonIcon />
              Username
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.username}
                onChange={e => handleInputChange("username", e.target.value)}
                className="form-input"
                placeholder="Enter username"
              />
            ) : (
              <div className="form-display">{formData.username}</div>
            )}
          </div>

          {/* Phone and Address */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <PhoneIcon />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => handleInputChange("phone", e.target.value)}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="form-display">{formData.phone}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                <LocationOnIcon />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => handleInputChange("address", e.target.value)}
                  className="form-input"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="form-display">
                  {formData.address === "no address"
                    ? "No address provided"
                    : formData.address}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              <MessageIcon />
              About Me
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                className="form-textarea"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <div className="form-display textarea">
                {formData.description === "no description"
                  ? "No description provided"
                  : formData.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <button onClick={handleSave} className="save-button">
          <SaveIcon />
          Save Changes
        </button>
      </div>
    </>
  )
}
