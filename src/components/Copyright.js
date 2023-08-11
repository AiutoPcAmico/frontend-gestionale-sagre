import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="rgb(98,134,255)" href="https://aiutopcamico.altervista.org/">
        Andrea Felappi
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export { Copyright };
