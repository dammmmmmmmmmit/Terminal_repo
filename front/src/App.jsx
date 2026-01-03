import { useState } from "react";
import Loader from "./components/loader/Loader";
import Terminal from "./components/terminal/Terminal";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <Loader onFinish={() => setBooted(true)} />}
      {booted && <Terminal />}
    </>
  );
}
