import { useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState([]);

  function handleLoadDataCLick() {
    async function requestData() {
      console.debug("Hello from Client (React / JS)");
      const response = await fetch("/api/animals");
      console.debug(response);
      console.debug("Response Status: ", response.ok);
      const json = await response.json();
      console.debug(json);
      setAnimals(json);
    }
    requestData();
  }

  return (
    <div>
      <p>My API Client</p>
      <button onClick={handleLoadDataCLick}>Load Data</button>
      <ul>
        {animals.map((animal) => {
          console.log("map", animal);
          return (
            <li key={animal.name}>
              {animal.name} ({animal.age})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
