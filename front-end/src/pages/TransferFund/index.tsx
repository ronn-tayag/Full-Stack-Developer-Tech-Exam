import { useEffect, useState } from "react";
import mainBg from "../../assets/main-bg.png";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { BasicModal } from "../../components/Modal";
import { useFetchWalletInfo } from "../../hooks/useFetchWalletInfo";
import { useFetchTransfer } from "../../hooks/useFetchTransfer";

interface IfieldData {
  ownerAddress: string | undefined;
  recieverAddress: string | undefined;
  amount: string | undefined;
}

export function TransferFund() {
  const [balance, setBalance] = useState("0.0");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [fieldData, setFieldData] = useState({
    ownerAddress: "",
    recieverAddress: "",
    amount: "",
  });

  const { response, fetchWalletApi } = useFetchWalletInfo();
  const { response: transferResponse, fetchTransferApi } = useFetchTransfer();

  useEffect(() => {
    fetchWalletApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log("response", response);
      setBalance(response.balance);
      setFieldData((prev) => ({ ...prev, ownerAddress: response.address }));
    }
  }, [response]);

  useEffect(() => {
    if (transferResponse.success) {
      console.log("transferResponse", transferResponse);
      setShowModal({
        open: true,
        title: "Transfer Funds",
        message: `Successfully transfer the funds to ${fieldData.recieverAddress}`,
      });
      setFieldData((prev) => ({ ...prev, recieverAddress: "", amount: "" }));
      fetchWalletApi();
    }
  }, [transferResponse]);

  const onConfirm = () => {
    if (fieldData.recieverAddress && fieldData.amount)
      fetchTransferApi({
        address: fieldData.recieverAddress,
        amount: fieldData.amount,
      });
  };

  const showConfirmModal = () => {
    setShowModal({
      open: true,
      title: "Transfer Funds",
      message: "Are you sure you want to proceed with fund transfer?",
    });
  };

  const showSuccessModal = () => {
    setShowModal({
      open: true,
      title: "Transfer Funds",
      message: `Successfully transfer the funds`,
    });
  };

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
          Transfer
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
        <Box alignSelf={"center"} sx={{ background: "white", width: "30%" }}>
          <Stack spacing={2} sx={{ padding: "2rem" }}>
            <TextField
              error
              id="outlined-error"
              value={fieldData.ownerAddress}
              disabled
            />
            <TextField
              error
              id="outlined-error"
              label="Receiver Address"
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
                  amount: String(e.target.value),
                }))
              }
            />
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                showConfirmModal();
              }}
            >
              Transfer
            </Button>
          </Stack>
        </Box>
      </Box>
      <BasicModal
        title={showModal.title}
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
