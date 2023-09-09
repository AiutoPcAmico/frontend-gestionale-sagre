import { SnackbarProvider } from "notistack";
import "./App.css";

import { NavigationBar } from "./components/navigation/navigationBar";
import { RouterHandler } from "./routes/RouterHandler";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <NavigationBar key={"navbar"} />
        <h3>ATTENZIONE: sei sul ramo newreservationview</h3>
        <RouterHandler></RouterHandler>
      </SnackbarProvider>
    </div>
  );
}

export default App;
