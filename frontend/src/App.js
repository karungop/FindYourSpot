import { useEffect, useState } from "react";
import axios from "axios";
import AddSpotForm from "./components/AddSpot.js";
import SearchSpotForm from "./components/SearchSpotForm.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateSpotForm from "./components/UpdateSpotForm";
import DeleteSpotForm from "./components/DeleteSpotForm";


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

  const handleSearch = async (searchData) => {
    try {
      const response = await fetch(
        `/api/spots/search/?campus_side=${searchData.campus_side}&time=${searchData.time}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Spots found:", data);
      } else {
        console.error("Error:", data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to fetch spots. Please try again.");
    }
  };





  // Start of Add Spot Component //
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/spots/add/", data);
      console.log("Spot added:", response.data);
      alert("Spot successfully added!");
    } catch (error) {
      console.log("Error adding spot:", error.response?.data || error.message);
      alert("Failed to add spot. Please check your input.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="flex justify-center items-center min-h-screen">
            <SearchSpotForm onSearch={handleSearch} />
            <AddSpotForm onSubmit={handleFormSubmit} />
          </div>
         }/>
        <Route path="/update-spot/:id" element={<UpdateSpotForm />} />
        <Route path="/delete-spot/:id" element={<DeleteSpotForm />} />
      </Routes>
    </Router>
  );
  // End of Add Spot Component //
}

export default App;
