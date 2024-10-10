import {
  List,
  Paper,
  ListItem,
  Divider,
  Box,
  Typography,
  ListItemAvatar,
  Avatar,
  Stack,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { ethers } from "ethers";
import { TransactionInterface } from "../../interface";

interface Itransaction {
  transactions: Array<TransactionInterface>;
}

function Transaction(props: Itransaction) {
  return (
    <Box justifyContent="center" sx={{ display: "flex" }}>
      {props.transactions.length == 0 && (
        <Box
          width={"100%"}
          justifyContent={'center'}
          sx={{ display: "flex", padding: "1rem", marginBottom: "1rem" }}
        >
          <Typography color="white" variant="h5">No Transaction Found</Typography>
        </Box>
      )}

      {props.transactions.length > 0 && (
        <Paper
          sx={{
            minHeight: "300px",
            margin: "4rem",
            background: "white",
          }}
        >
          <Box
            width={"100%"}
            sx={{ display: "flex", padding: "1rem", marginBottom: "1rem" }}
          >
            <Typography variant="h5">Transactions</Typography>
          </Box>

          <Box
            justifyContent="center"
            alignItems="center"
            sx={{ height: "400px", overflow: "auto" }}
          >
            <List sx={{ width: "100%" }}>
              {props.transactions.map((item: TransactionInterface) => {
                return (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ height: "30px", width: "30px" }}>
                          <ReceiptLongIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <Stack spacing={2}>
                        <Typography>{`HASH: ${item.hash}`}</Typography>
                        <Typography>{`VALUE: ${ethers.formatEther(
                          item.value
                        )}`}</Typography>
                        <Typography>{`TYPE: ${Math.floor(
                          Number(item.type)
                        )}`}</Typography>
                      </Stack>
                    </ListItem>

                    <Divider component="li" />
                  </>
                );
              })}
            </List>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default Transaction;
