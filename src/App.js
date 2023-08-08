import "./App.css";

import { AlertDialogSlide } from "./myDialogTest";
import { NavigationBar } from "./components/navigation/navigationBar";
import { Counter } from "./components/Counter";
import { useState } from "react";
import { RouterHandler } from "./routes/RouterHandler";

function App() {
  var name = "Andrea";

  const [pageOpened, setPageOpened] = useState("home");

  return (
    <div className="App">
      <NavigationBar></NavigationBar>

      <AlertDialogSlide></AlertDialogSlide>
      <Counter></Counter>
      <RouterHandler></RouterHandler>
    </div>
  );
}

export default App;
