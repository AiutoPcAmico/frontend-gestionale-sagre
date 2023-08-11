import { useEffect, useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";

import "./pagesCSS.css";
import logo_parrocchia from "../images/logo_parrocchia.png";
import { postLogin } from "../apis/indexSagreApi";
import { Copyright } from "../components/Copyright";
import { useDispatch } from "react-redux";
import { setSessionDetails, setSessionUser } from "../stores/sessionInfo";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SnackMessage } from "../components/SnackMessage";
import { waitforme } from "../utils/waitForMe";

// TODO remove, this demo shouldn't need to reset the theme.
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackOpened, setSnackOpened] = useState(false);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [errorLogin, setErrorLogin] = useState(
    "Immetti nome utente e password!"
  );
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  async function callLogin() {
    console.log("Logging");
    const response = await postLogin(loginData.username, loginData.password);
    console.log({ response });
    if (response.isError) {
      //if there is an error, i don't proceed
      setErrorLogin(response.messageError);
      setDisabledLogin(true);
    } else {
      //if login ok, I'll save the token
      console.log("Login!");
      const user = jwtDecode(response.data.data); // decode your token here
      dispatch(
        setSessionDetails({
          sessionStarted: user.iat,
          sessionExpire: user.exp,
          sessionToken: response.data.data,
        })
      );

      console.log({ loginData });
      dispatch(
        setSessionUser({
          username: user.username,
          role: "admin",
        })
      );

      setSnackOpened(true);
      await waitforme(4000);
      navigate("/");
    }
  }

  useEffect(() => {
    if (
      loginData.username !== "" &&
      loginData.password !== "" &&
      loginData.password.length > 4
    ) {
      setDisabledLogin(false);
      setErrorLogin("");
    } else {
      setErrorLogin("Immetti nome utente e password (>4)");
      setDisabledLogin(true);
    }
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

          {disabledLogin && (
            <Alert style={{ marginTop: "20px" }} severity="error">
              {errorLogin}
            </Alert>
          )}
        </div>
        <div className="item" style={{ flexGrow: 1 }}>
          <img alt="logo" src={logo_parrocchia} className="logo"></img>
          <h3>
            Oratorio S. Stefano <br></br>~<br></br>Cividate Camuno
          </h3>
        </div>
      </div>
      <Copyright></Copyright>
      <SnackMessage
        duration={6000}
        isOpened={snackOpened}
        message={"Login effettuato con successo!\nAttendi..."}
        type={"success"}
        setIsOpened={() => {
          setSnackOpened(false);
        }}
      />
    </div>
  );
}

export { SignIn };
