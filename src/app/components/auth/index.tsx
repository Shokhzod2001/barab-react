import { useState } from "react"
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Stack,
  TextField,
  styled,
  Box,
  Typography,
  IconButton,
} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CloseIcon from "@mui/icons-material/Close"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { T } from "../../../lib/types/common"
import { Messages } from "../../../lib/config"
import { LoginInput, MemberInput } from "../../../lib/types/member"
import MemberService from "../../services/MemberService"
import { sweetErrorHandling } from "../../../lib/sweetAlert"
import { useGlobals } from "../../hooks/useGlobals"

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const ModalContainer = styled(Box)(({}) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "24px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  overflow: "hidden",
  position: "relative",
  width: "900px",
  minHeight: "500px",
  backdropFilter: "blur(10px)",
}))

const ContentWrapper = styled(Stack)({
  height: "100%",
  position: "relative",
})

const ImageSection = styled(Box)({
  flex: 1,
  background:
    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('/img/auth.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.3,
    borderRadius: "20px 0 0 20px",
  },
})

const FormSection = styled(Box)(({}) => ({
  flex: 1,
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
}))

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "rgba(255, 255, 255, 0.1)",
  color: "white",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
})

// Updated modern input design with floating label effect
const StyledTextField = styled(TextField)({
  marginBottom: "24px",
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: "500",
    color: "#6B7280",
    transform: "translate(16px, 16px) scale(1)",
    transition: "all 0.2s ease-in-out",
    "&.Mui-focused": {
      color: "#667eea",
    },
    "&.MuiInputLabel-shrink": {
      transform: "translate(16px, -8px) scale(0.85)",
      backgroundColor: "white",
      padding: "0 8px",
      borderRadius: "4px",
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#F9FAFB",
    border: "2px solid transparent",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: "#F3F4F6",
      border: "2px solid #E5E7EB",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      border: "2px solid #667eea",
      boxShadow:
        "0 0 0 4px rgba(102, 126, 234, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08)",
      transform: "translateY(-2px)",
    },
    "& fieldset": {
      border: "none",
    },
    "& input": {
      padding: "16px",
      color: "#1F2937",
      "&::placeholder": {
        color: "#9CA3AF",
        opacity: 1,
        fontSize: "15px",
      },
    },
    "& .MuiInputAdornment-root": {
      marginRight: "12px",
      "& .MuiIconButton-root": {
        color: "#6B7280",
        transition: "color 0.2s ease",
        "&:hover": {
          color: "#667eea",
          backgroundColor: "rgba(102, 126, 234, 0.1)",
        },
      },
    },
  },
})

const StyledButton = styled(Button)(({}) => ({
  borderRadius: "12px",
  padding: "12px 32px",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "none",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
    boxShadow: "0 12px 25px rgba(102, 126, 234, 0.4)",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}))

const FormTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: "700",
  color: "#2D3748",
  marginBottom: "8px",
  textAlign: "center",
})

const FormSubtitle = styled(Typography)({
  fontSize: "16px",
  color: "#718096",
  marginBottom: "32px",
  textAlign: "center",
})

const DecorativeElement = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "200px",
  height: "200px",
  background:
    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
  borderRadius: "50%",
  zIndex: 1,
})

interface AuthenticationModalProps {
  signupOpen: boolean
  loginOpen: boolean
  handleSignupClose: () => void
  handleLoginClose: () => void
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props

  const [memberNick, setMemberNick] = useState<string>("")
  const [memberPhone, setMemberPhone] = useState<string>("")
  const [memberPassword, setMemberPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { setAuthMember } = useGlobals()

  /** HANDLERS **/
  const handleUsername = (e: T) => {
    setMemberNick(e.target.value)
  }
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value)
  }
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value)
  }
  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then()
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then()
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== ""
      if (!isFulfill) throw new Error(Messages.error3)

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      }

      const member = new MemberService()
      const result = await member.signup(signupInput)

      setAuthMember(result)
      handleSignupClose()
    } catch (err) {
      console.log(err)
      handleSignupClose()
      sweetErrorHandling(err).then()
    }
  }

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== ""
      if (!isFulfill) throw new Error(Messages.error3)

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      }

      const member = new MemberService()
      const result = await member.login(loginInput)

      setAuthMember(result)
      handleLoginClose()
    } catch (err) {
      console.log(err)
      handleLoginClose()
      sweetErrorHandling(err).then()
    }
  }

  return (
    <>
      {/* Signup Modal */}
      <StyledModal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          },
        }}
      >
        <Fade in={signupOpen}>
          <ModalContainer>
            <CloseButton onClick={handleSignupClose}>
              <CloseIcon />
            </CloseButton>
            <ContentWrapper direction="row">
              <ImageSection>
                <DecorativeElement />
              </ImageSection>
              <FormSection>
                <FormTitle>Create Account</FormTitle>
                <FormSubtitle>Join our community today</FormSubtitle>

                <StyledTextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={memberNick}
                  onChange={handleUsername}
                  placeholder="Enter your username"
                />

                <StyledTextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={memberPhone}
                  onChange={handlePhone}
                  placeholder="Enter your phone number"
                />

                <StyledTextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={memberPassword}
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  placeholder="Create a secure password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                <StyledButton
                  fullWidth
                  size="large"
                  onClick={handleSignupRequest}
                  startIcon={<PersonAddIcon />}
                >
                  Create Account
                </StyledButton>
              </FormSection>
            </ContentWrapper>
          </ModalContainer>
        </Fade>
      </StyledModal>

      {/* Login Modal */}
      <StyledModal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          },
        }}
      >
        <Fade in={loginOpen}>
          <ModalContainer sx={{ width: "800px" }}>
            <CloseButton onClick={handleLoginClose}>
              <CloseIcon />
            </CloseButton>
            <ContentWrapper direction="row">
              <ImageSection>
                <DecorativeElement />
              </ImageSection>
              <FormSection>
                <FormTitle>Welcome Back</FormTitle>
                <FormSubtitle>Sign in to your account</FormSubtitle>

                <StyledTextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={memberNick}
                  onChange={handleUsername}
                  placeholder="Enter your username"
                />

                <StyledTextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={memberPassword}
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  placeholder="Enter your password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                <StyledButton
                  fullWidth
                  size="large"
                  onClick={handleLoginRequest}
                  startIcon={<LoginIcon />}
                  sx={{ marginTop: "12px" }}
                >
                  Sign In
                </StyledButton>
              </FormSection>
            </ContentWrapper>
          </ModalContainer>
        </Fade>
      </StyledModal>
    </>
  )
}
