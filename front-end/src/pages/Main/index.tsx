import { Container, Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import transferFundsImage from "../../assets/transfer-funds.png";
import mintImage from "../../assets/mint.png";
import walletImage from "../../assets/wallet.png";
import mainBg from "../../assets/main-bg.png";
import { Link } from "react-router-dom";

export function Main() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100wh",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${mainBg})`,
      }}
    >
      <Container>
        <Box
          sx={{ width: "100%", display: "flex", paddingTop: "6rem" }}
          justifyContent={"center"}
        >
          <Box justifyContent={"center"} sx={{ width: "70%" }}>
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <Link to="/wallet">
                  <Box sx={{ padding: "5px" }}>
                    <Stack spacing={"5px"}>
                      <Paper
                        sx={{
                          height: "250px",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${walletImage})`,
                        }}
                      />
                      <Box
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                          display: "flex",
                          height: "50px",
                          background: "white",
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: "center" }}
                        >
                          Wallet
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Link>
              </Grid2>

              <Grid2 size={4}>
                <Link to="/minting">
                  <Box sx={{ padding: "5px" }}>
                    <Stack spacing={"5px"}>
                      <Paper
                        sx={{
                          height: "250px",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${mintImage})`,
                        }}
                      />
                      <Box
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                          display: "flex",
                          height: "50px",
                          background: "white",
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: "center" }}
                        >
                          Mint
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Link>
              </Grid2>

              <Grid2 size={4}>
                <Link to="/transfer-fund">
                  <Box sx={{ padding: "5px" }}>
                    <Stack spacing={"5px"}>
                      <Paper
                        sx={{
                          height: "250px",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${transferFundsImage})`,
                        }}
                      />
                      <Box
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                          display: "flex",
                          height: "50px",
                          background: "white",
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: "center" }}
                        >
                          Transfer Funds
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Link>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
