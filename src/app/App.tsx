import { Button, Container, Stack } from "@mui/material"
import "../css/app.css"

export const App = () => {
  return (
    <Container>
      <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <div>HOME</div>
        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  )
}
