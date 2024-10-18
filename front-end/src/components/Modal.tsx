import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";


interface IBasicModal {
  open: boolean;
  title: string;
  message: string;
  okText: string | null;
  cancelText: string | null;
  handleClose: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}

const BasicModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function BasicModal(props: IBasicModal) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={BasicModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            paddingTop: "4rem",
          }}
        >
          <Stack direction={"row"} spacing={1}>
            <Button variant="contained" color="error" onClick={props.handleCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={props.handleOk}
            >
              OK
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
