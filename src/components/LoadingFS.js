import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./components.css";

function LoadingFS({ isOpened }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpened}
        className="loading"
      >
        <CircularProgress color="error" />
        <br></br>
        <Typography> Caricamento...</Typography>
      </Backdrop>
    </div>
  );
}

export { LoadingFS };
