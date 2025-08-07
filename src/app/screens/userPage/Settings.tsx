import { useState } from "react"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import SaveIcon from "@mui/icons-material/Save"
import PersonIcon from "@mui/icons-material/Person"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import MessageIcon from "@mui/icons-material/Message"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { useGlobals } from "../../hooks/useGlobals"
import { Messages, serverApi } from "../../../lib/config"
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert"
import { T } from "../../../lib/types/common"
import MemberService from "../../services/MemberService"
import { MemberUpdateInput } from "../../../lib/types/member"

export function Settings() {
  const { authMember, setAuthMember } = useGlobals()
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg",
  )

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  )

  // HANDLERS
  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value
    setMemberUpdateInput({ ...memberUpdateInput })
  }
  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value
    setMemberUpdateInput({ ...memberUpdateInput })
  }
  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value
    setMemberUpdateInput({ ...memberUpdateInput })
  }
  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value
    setMemberUpdateInput({ ...memberUpdateInput })
  }

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2)
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3)
      }

      const member = new MemberService()
      const result = await member.updateMember(memberUpdateInput)
      setAuthMember(result)

      await sweetTopSmallSuccessAlert("Modified successfully!", 700)
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0]
    console.log("file: ", file)
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"]

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then()
    } else {
      if (file) {
        memberUpdateInput.memberImage = file
        setMemberUpdateInput({ ...memberUpdateInput })
        setMemberImage(URL.createObjectURL(file))
      }
    }
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
            src={memberImage}
            alt="Current avatar"
            className="current-avatar"
          />
          <div className="upload-info">
            <h4>Change your picture</h4>
            <p>JPG, JPEG, PNG formats. Max size 5MB</p>
            <label className="upload-button" onChange={handleImageViewer}>
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
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label className="form-label">
              <PersonIcon />
              Username
            </label>
            <input
              type="text"
              value={memberUpdateInput.memberNick}
              onChange={memberNickHandler}
              className="form-input"
              placeholder="Enter username"
              name="memberNick"
            />
          </div>

          {/* Phone and Address */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <PhoneIcon />
                Phone Number
              </label>
              <input
                type="text"
                value={memberUpdateInput.memberPhone}
                onChange={memberPhoneHandler}
                className="form-input"
                placeholder="Enter phone number"
                name="memberPhone"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <LocationOnIcon />
                Address
              </label>
              <input
                type="text"
                value={memberUpdateInput.memberAddress}
                onChange={memberAddressHandler}
                className="form-input"
                placeholder="Enter your address"
                name="memberAddress"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              <MessageIcon />
              About Me
            </label>
            <textarea
              value={memberUpdateInput.memberDesc}
              onChange={memberDescHandler}
              className="form-textarea"
              placeholder="Tell us about yourself..."
              name="memberDesc"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <button onClick={handleSubmitButton} className="save-button">
          <SaveIcon />
          Save Changes
        </button>
      </div>
    </>
  )
}
