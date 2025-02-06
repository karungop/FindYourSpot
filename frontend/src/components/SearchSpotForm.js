import { useState } from "react";
import { useNavigate } from "react-router-dom";  // For navigation
import { Link } from "react-router-dom";


function SearchSpotForm({ onSearch }) {
  const [campusSide, setCampusSide] = useState("N/A");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);  // State to store search results

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
    if (!validateTime(time)) {
      alert("Please enter a valid time in HH:MM format.");
      return;
    }
      */
    /*
    const searchData = {
      campus_side: campusSide,
      time: time,
    };
    */

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/spots/search/?campus_side=${campusSide}&time=${time}`
      );
      const data = await response.json();
      setResults(data);  // Store results in state
    } catch (error) {
      console.error("Error fetching spots:", error);
      alert("Failed to fetch spots. Please try again.");
    }
  };
  /*
  const validateTime = (time) => {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;  // Validates HH:MM format
    return timeRegex.test(time);
  };
  */

  const handleUpdate = (spotId) => {
    navigate(`/update-spot/${spotId}`);  // Navigate to the update page with spot ID
  };

  const handleDelete = (spotId) => {
    navigate(`/delete-spot/${spotId}`);  // Navigate to the delete page with spot ID
  };

  return (
    <div className="p-4 border rounded shadow-md space-y-4 w-80">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-lg font-semibold">Find a Spot</h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Where</label>
          <select
            value={campusSide}
            onChange={(e) => setCampusSide(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Central">Central</option>
            <option value="N/A">N/A</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">When</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600">
          Get Spots
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">Search Results</h3>
          <ul className="space-y-2">
            {results.map((spot) => (
              <li key={spot.id} className="p-2 border rounded">
                <p><strong>Building:</strong> {spot.building_name}</p>
                <p><strong>Time Available:</strong> {spot.time_available_from} - {spot.time_available_till}</p>
                <p><strong>Campus Side:</strong> {spot.campus_side}</p>
                <p><strong>Description:</strong> {spot.description}</p>
                <button
                  onClick={() => handleUpdate(spot.id)}
                  className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Update Spot
                </button>

                
                <button
                  onClick={() => handleDelete(spot.id)}
                  className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Delete Spot
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && <p className="mt-4 text-sm text-gray-500">No spots found.</p>}
    </div>
  );
}

export default SearchSpotForm;
