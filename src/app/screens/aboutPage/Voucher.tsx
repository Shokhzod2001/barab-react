import { Box, Container, Stack } from "@mui/material"

export default function Voucher() {
  return (
    <div className="voucherFrame">
      <Container className="container">
        <Stack className="voucherBox">
          <Box className="imageBox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="81"
              viewBox="0 0 80 81"
              fill="none"
            >
              <path
                d="M1.78302 16.7841C-0.458004 33.1249 -0.642819 50.237 1.54908 65.0867C2.65267 72.5633 8.67101 78.222 16.1719 79.1465C34.0651 81.3517 51.429 80.5202 63.6002 79.0746C71.0244 78.1928 76.9712 72.6402 78.1821 65.2624C81.2077 46.8283 79.9699 29.022 77.9877 16.1558C76.8262 8.61621 70.9075 2.76473 63.3391 1.80821C46.3984 -0.33285 29.2602 0.481352 16.888 1.92177C9.01287 2.83863 2.86025 8.92927 1.78302 16.7841Z"
                fill="#072F25"
              />
            </svg>
            <img src="img/voucher1.svg" alt="" />
          </Box>
          <Box className="voucherInfo">
            <h3>Discount Voucher</h3>
            <p>
              Competently orchestrate integrated schema <br /> for quickly
              create optimal.
            </p>
          </Box>
        </Stack>
        <div className="line"></div>
        <Stack className="voucherBox">
          <Box className="imageBox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="81"
              height="81"
              viewBox="0 0 81 81"
              fill="none"
            >
              <path
                d="M2.28302 16.7841C0.0419962 33.1249 -0.142819 50.237 2.04908 65.0867C3.15267 72.5633 9.17101 78.222 16.6719 79.1465C34.5651 81.3517 51.929 80.5202 64.1002 79.0746C71.5244 78.1928 77.4712 72.6402 78.6821 65.2624C81.7077 46.8283 80.4699 29.022 78.4877 16.1558C77.3262 8.61621 71.4075 2.76473 63.8391 1.80821C46.8984 -0.33285 29.7602 0.481352 17.388 1.92177C9.51287 2.83863 3.36025 8.92927 2.28302 16.7841Z"
                fill="#EB1400"
              />
            </svg>
            <img src="img/voucher2.svg" alt="" />
          </Box>
          <Box className="voucherInfo">
            <h3>Fresh Healthy Foods</h3>
            <p>
              Competently orchestrate integrated schema <br /> for quickly
              create optimal.
            </p>
          </Box>
        </Stack>
        <div className="line"></div>
        <Stack className="voucherBox">
          <Box className="imageBox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="81"
              viewBox="0 0 80 81"
              fill="none"
            >
              <path
                d="M1.78302 16.7841C-0.458004 33.1249 -0.642819 50.237 1.54908 65.0867C2.65267 72.5633 8.67101 78.222 16.1719 79.1465C34.0651 81.3517 51.429 80.5202 63.6002 79.0746C71.0244 78.1928 76.9712 72.6402 78.1821 65.2624C81.2077 46.8283 79.9699 29.022 77.9877 16.1558C76.8262 8.61621 70.9075 2.76473 63.3391 1.80821C46.3984 -0.33285 29.2602 0.481352 16.888 1.92177C9.01287 2.83863 2.86025 8.92927 1.78302 16.7841Z"
                fill="#FF9924"
              />
            </svg>
            <img src="img/voucher3.svg" alt="" />
          </Box>
          <Box className="voucherInfo">
            <h3>Discount Voucher</h3>
            <p>
              Competently orchestrate integrated schema <br /> for quickly
              create optimal.
            </p>
          </Box>
        </Stack>
      </Container>
    </div>
  )
}
