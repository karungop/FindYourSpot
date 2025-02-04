import { useEffect, useState } from "react";
import axios from "axios";
import AddSpotForm from "./components/AddSpot.js";

function App() {
  /*const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/hello/")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>{message || "Loading..."}</h1>
    </div>
  );
  */


  // Start of Add Spot Component //
  const handleFormSubmit = (data) => {
    console.log("Submitting:", data);
    axios.post("http://127.0.0.1:8000/api/spots/", data)  // ✅ Ensure it's a POST request
  .then(response => console.log("Spot added:", response.data))
  .catch(error => console.error("Error adding spot:", error));

  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AddSpotForm onSubmit={handleFormSubmit} />
    </div>
  );
  // End of Add Spot Component //
}

export default App;
