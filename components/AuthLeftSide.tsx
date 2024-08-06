import { Box } from "@mui/material";
import BookIcon from "./BookIcon";


export default function AuthLeftSide() {
  return <>
    <Box
      sx={{
        flex: { xs: "none", md: 1 },
        bgcolor: "#171B36",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BookIcon />
    </Box>
  </>
}
