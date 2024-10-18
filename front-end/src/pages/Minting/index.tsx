import { useEffect, useState } from "react";
import mainBg from "../../assets/main-bg.png";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { BasicModal } from "../../components/Modal";
import { useFetchWalletInfo } from "../../hooks/useFetchWalletInfo";
import { useFetchMint } from "../../hooks/useFetchMint";

interface IfieldData {
  ownerAddress: string | undefined;
  recieverAddress: string | undefined;
  amount: number | undefined;
}

export function Minting() {
  const [showModal, setShowModal] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [balance, setBalance] = useState("");
  const [fieldData, setFieldData] = useState<IfieldData>({
    ownerAddress: "",
    recieverAddress: "",
    amount: 0,
  });

  const { response, fetchWalletApi } = useFetchWalletInfo();
  const { response: mintResponse, fetchMintApi } = useFetchMint();

  useEffect(() => {
    fetchWalletApi();
  }, []);

  useEffect(() => {
    console.log("response", response);
    setBalance(response?.balance ?? "");
  }, [response]);

  const showConfirmModal = () => {
    setShowModal({
      open: true,
      title: "Mint",
      message: "Are you sure you want to proceed with Token minting?",
    });
  };

  const onConfirm = () => {
    fetchMintApi({
      address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      amount: "100",
    });
  };

  useEffect(() => {
    if (mintResponse.success) {
      fetchWalletApi();
      setShowModal({
        open: true,
        title: "Mint",
        message: `Successfully mintted`,
      });
      setFieldData((e) => ({ ...e, recieverAddress: "", amount: 0 }));
    }
  }, [mintResponse]);

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
      <Box
        justifyContent={"space-between"}
        sx={{
          height: "100px",
          background: "rgb(106, 90, 205)",
          padding: "10px",
        }}
      >
        <Typography variant="h3" color="white">
          Mint
        </Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", fontWeight: 200 }}
          >
            Balance:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", fontWeight: 900 }}
          >
            {balance}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          height: "500px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box alignSelf={"center"} sx={{ background: "white", width: "40%" }}>
          <Stack spacing={2} sx={{ padding: "2rem" }}>
            <TextField
              error
              id="outlined-error"
              label="Address"
              value={fieldData.recieverAddress}
              onChange={(e) =>
                setFieldData((prev) => ({
                  ...prev,
                  recieverAddress: String(e.target.value),
                }))
              }
            />
            <TextField
              type="number"
              error
              id="outlined-error"
              label="Amount"
              value={fieldData.amount}
              onChange={(e) =>
                setFieldData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
            <Button
              disabled={mintResponse?.isLoading}
              variant="contained"
              color="warning"
              onClick={() => showConfirmModal()}
            >
              Mint
            </Button>
          </Stack>
        </Box>
      </Box>
      <BasicModal
        title="Token Minting"
        message={showModal.message}
        open={showModal.open}
        cancelText={"cancel"}
        okText={"ok"}
        handleClose={() => {
          setShowModal((prev) => ({ ...prev, open: false }));
        }}
        handleCancel={() => {
          setShowModal((prev) => ({ ...prev, open: false }));
        }}
        handleOk={() => {
          setShowModal((prev) => ({ ...prev, open: false }));
          onConfirm();
        }}
      />
    </Box>
  );
}
