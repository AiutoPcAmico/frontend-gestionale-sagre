import logo from "./logo.svg";
import "./App.css";
import { Button, Link } from "@mui/material";
import { AlertDialogSlide } from "./myDialogTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React in Pippo Website! con aiutopcamico!
          <Link variant="contained" href="https://dev.andreafelappi.it">
            Hello World
          </Link>
        </a>
        <AlertDialogSlide></AlertDialogSlide>
      </header>
    </div>
  );
}

export default App;
