import { useEffect, useState } from "react";
import axios from "axios";
import AddSpotForm from "./components/AddSpot.js";
import SearchSpotForm from "./components/SearchSpotForm.js"

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

  const handleSearch = (searchData) => {
    console.log("Searching with:", searchData);
    // Here you can make an API request with the search data
  };





  // Start of Add Spot Component //
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/spots/", data);
      console.log("Spot added:", response.data);
      alert("Spot successfully added!");
    } catch (error) {
      console.log("Error adding spot:", error.response?.data || error.message);
      alert("Failed to add spot. Please check your input.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SearchSpotForm onSearch={handleSearch} />


    

      <AddSpotForm onSubmit={handleFormSubmit} />
    </div>
  );
  // End of Add Spot Component //
}

export default App;
