import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchSpotForm.css";  // Import the CSS file

function SearchSpotForm({ onSearch }) {
  const [campusSide, setCampusSide] = useState("N/A");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/spots/search/?campus_side=${campusSide}&time=${time}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching spots:", error);
      alert("Failed to fetch spots. Please try again.");
    }
  };

  const handleUpdate = (spotId) => {
    navigate(`/update-spot/${spotId}`);
  };

  const handleDelete = (spotId) => {
    navigate(`/delete-spot/${spotId}`);
  };

  return (
    <div className="search-spot-form text-align: center" >
  <h2>Find Your Spot</h2>

  <form onSubmit={handleSubmit} className="space-y-3">
    <div className="form-group">
      <label>Where</label>
      <select
        value={campusSide}
        onChange={(e) => setCampusSide(e.target.value)}
      >
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Central">Central</option>
        <option value="N/A">N/A</option>
      </select>
    </div>

    <div className="form-group">
      <label>When</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>

    <button type="submit" className="button">
      Get Spot
    </button>
  </form>

  {/* Results Section */}
  {results.length > 0 && (
    <div className="result-list ">
      <h3>Results</h3>
      {results.map((spot) => (
        <div key={spot.id} className="result-item">
          <p><strong>Place Name:</strong> {spot.building_name}</p>
          <p><strong>Description:</strong> {spot.description}</p>
          <p><strong>Available Time:</strong> {spot.time_available_from} - {spot.time_available_till}</p>
          <p><strong>Campus Side:</strong> {spot.campus_side}</p>
          <button onClick={() => handleUpdate(spot.id)}>Update Information</button>
          <button onClick={() => handleDelete(spot.id)}>Delete Spot</button>
        </div>
      ))}
    </div>
  )}

  {results.length === 0 && <p>No spots found.</p>}
</div>
  );
}

export default SearchSpotForm;
