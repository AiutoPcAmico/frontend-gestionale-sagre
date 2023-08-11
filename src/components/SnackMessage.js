import { Alert, Snackbar } from "@mui/material";

function SnackMessage({ message, duration, type, isOpened, setIsOpened }) {
  return (
    <Snackbar open={isOpened} autoHideDuration={duration} onClose={setIsOpened}>
      <Alert onClose={setIsOpened} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export { SnackMessage };
