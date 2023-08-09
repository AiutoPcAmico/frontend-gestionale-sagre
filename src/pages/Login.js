import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import "./pagesCSS.css";

import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://aiutopcamico.altervista.org/">
        Andrea Felappi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
function SignIn() {
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  function callLogin() {
    console.log("Logging");
  }

  useEffect(() => {
    console.log({ loginData });
    if (
      loginData.username !== "" &&
      loginData.password !== "" &&
      loginData.password.length > 4
    )
      setDisabledLogin(false);
    else setDisabledLogin(true);
  }, [loginData]);

  return (
    <div className="pages">
      <div className="loginPage">
        <div className="item" style={{ flexGrow: 3 }}>
          <h2>Login</h2>
          <Box className="row">
            <label htmlFor="username">Username:&nbsp;&nbsp;</label>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setLoginData((props) => ({
                  ...props,
                  username: e.target.value,
                }));
              }}
            />
          </Box>
          <Box className="row">
            <label htmlFor="password">Password:&nbsp;&nbsp;&nbsp;</label>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => {
                setLoginData((props) => ({
                  ...props,
                  password: e.target.value,
                }));
              }}
            />
          </Box>

          <Button
            variant="contained"
            style={{ marginTop: "20px" }}
            disabled={disabledLogin}
            onClick={callLogin}
          >
            Accedi
          </Button>
        </div>
        <div className="item" style={{ flexGrow: 1 }}>
          Qui ci sarà il logo e <br></br>il nome dell'oratorioQui ci sarà il
          logo e il nome dell'oratorioQui <br></br>ci sarà il logo e il nome
          dell'oratorioQui<br></br> ci sarà il logo e il nome dell'oratorioQui
          ci sarà il logo e il nome dell'or<br></br>atorioQui ci sarà il logo e
          il nome dell'oratorioQ<br></br>ui ci sarà il logo e il nome
          dell'oratorioQui ci sarà il logo e i<br></br>l nome dell'oratorioQui
          ci sarà il logo e il nome dell'o<br></br>ratorioQui ci sarà il logo e
          il nome dell'oratorioQui ci sa<br></br>rà il logo e il nome
          dell'oratorioQui ci sarà il logo e il nome dell'o<br></br>ratorioQui
          ci sarà il logo e il nome dell'orato<br></br>ioQui ci sarà il logo e
          il nome dell'oratorioQui ci sa<br></br>à il logo e il nome
          dell'oratorioQui ci sarà il<br></br> logo e il nome dell'oratorioQui
          ci sarà il logo e il nome<br></br> dell'oratorioQui ci sarà il logo e
          il nome dell'oratorio
        </div>
      </div>
      <Copyright></Copyright>
    </div>
  );
}

export { SignIn };
