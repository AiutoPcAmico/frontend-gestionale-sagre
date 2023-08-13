import "./App.css";

import { NavigationBar } from "./components/navigation/navigationBar";
import { RouterHandler } from "./routes/RouterHandler";

function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <RouterHandler></RouterHandler>
    </div>
  );
}

export default App;
