import { Paper, Box, Typography, Stack, Divider } from "@mui/material";
import React, {} from "react";

interface WalletProps {
    balance: string;
    address: string | null
}

function Wallet(props: WalletProps) {
  return (
    <Box justifyContent="center" sx={{ display: "flex" }}>
      <Paper
        sx={{
          width: "50%",
          minHeight: "300px",
          marginLeft: "3rem",
          marginRight: "3rem",
          marginBottom: "0px",
          background: "rgb(97,34,225)",
        }}
      >
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{ display: "flex", height: "100%" }}
        >
          <Stack justifyContent={"center"} sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontWeight: 300, fontSize: "28px", color: "white" }}
            >
            {props?.balance.toString()}
            </Typography>
            <Typography color="white" variant="caption">
              Ethereum
            </Typography>

            <Typography
              sx={{
                marginTop: "1rem",
                fontWeight: 200,
                fontSize: "18px",
                color: "white",
              }}
            >
              {props.address}
            </Typography>
            <Typography color="white" variant="caption">
              Address
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default Wallet;
