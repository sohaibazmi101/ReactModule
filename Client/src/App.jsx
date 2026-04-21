import { useState } from "react";
import ToDo from "./ToDo";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const myName = "sohaib";

  function handleIncrease() {
    setCount(count + 2);
  }
  function handleDecrease() {
    if (count == 0) {
      return;
    }
    setCount(count - 1);
  }
  function handleReset() {
    setCount(0);
  }
  function handleResetName(){
    setName("");
  }

  function greeting(){
    return(
      document.getElementById("greet").textContent = 'Hello '+ myName
    )
  }
  return (
    <div>
      <h2>Hello {name || "Guest"}</h2>
      <h1>Counter: {count}</h1>
      <div className="clickable">
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease} id="decrease">Decrease</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <input 
        type="text"
        placeholder="Enter Name"
        value={name} onChange={(e) => setName(e.target.value)}
      />
      <p>Your name : {name}</p>
      <button onClick={handleResetName}>Reset Name</button>
      <button onClick={greeting}>Show Greeting</button>
      <h1 id="greet"></h1>
      <ToDo />
    </div>
  );
}

export default App;