import React from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const test = async () => {
    const { data } = await axios.get("http://localhost:3333/");
  };

  React.useEffect(() => {
    test();
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
