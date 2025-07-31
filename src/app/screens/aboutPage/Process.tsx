import { Container, Stack } from "@mui/material"

export default function Process() {
  return (
    <div className="processFrame">
      <Container className="container">
        <Stack className="box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1300"
            height="587"
            viewBox="0 0 1720 587"
            fill="none"
          >
            <path
              d="M0 135.274C0 103.221 25.1937 76.8282 57.2123 75.339L1657.21 0.920361C1691.41 -0.670081 1720 26.6241 1720 60.8556V527C1720 560.137 1693.14 587 1660 587H60C26.8629 587 0 560.137 0 527V135.274Z"
              fill="#3F9065"
            />
          </svg>
          <Stack className="info">
            <p>Work Process</p>
            <h3>
              how we work process in <br />
              our restaurant!
            </h3>
            <span>
              Here's a simple and clear 3-step work process for a restaurant,
              ideal
              <br /> for a website section or brochure to show how your service
              flows —<br /> especially for dine-in or fast-casual restaurants
            </span>
          </Stack>
          <Stack className="process">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="650"
              height="508"
              viewBox="0 0 986 508"
              fill="none"
            >
              <path
                d="M986 478V30.487C986 13.349 971.668 -0.306374 954.55 0.522071L28.5498 45.337C12.5637 46.1107 0 59.2972 0 75.302V478C0 494.569 13.4315 508 30 508H956C972.569 508 986 494.569 986 478Z"
                fill="white"
              />
            </svg>
            <img src="img/process.jpg" alt="" />
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
