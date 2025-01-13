import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function LoadingEvents() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={80} sx={{ marginBottom: 2 }} />{" "}
      <Typography variant="h5">Loading Events...</Typography>{" "}
    </Box>
  );
}
