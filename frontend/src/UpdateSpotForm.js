import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";  // Assuming React Router is used

function UpdateSpotForm() {
  const { id } = useParams();  // Get the spot ID from the URL
  const navigate = useNavigate();  // To navigate back after update

  const [buildingName, setBuildingName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [campusSide, setCampusSide] = useState("N/A");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Fetch existing spot data when component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/spots/${id}/`)
      .then((response) => {
        const data = response.data;
        setBuildingName(data.building_name);
        setFromTime(data.time_available_from);
        setToTime(data.time_available_till);
        setCampusSide(data.campus_side);
        setDescription(data.description);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
        setError("Failed to load spot data.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      building_name: buildingName,
      time_available_from: fromTime,
      time_available_till: toTime,
      campus_side: campusSide,
      description: description,
    };

    axios
      .put(`http://127.0.0.1:8000/api/spots/${id}/`, updatedData)
      .then(() => {
        alert("Spot updated successfully!");
        navigate("/");  // Redirect to the main page after update
      })
      .catch((error) => {
        console.error("Error updating spot:", error);
        setError("Failed to update spot.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md space-y-3 w-80">
      <h2 className="text-lg font-semibold">Update Spot</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Building Name"
        value={buildingName}
        onChange={(e) => setBuildingName(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      <div className="flex space-x-2">
        <label className="text-sm font-medium">From:</label>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div className="flex space-x-2">
        <label className="text-sm font-medium">To:</label>
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <select
        value={campusSide}
        onChange={(e) => setCampusSide(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Central">Central</option>
        <option value="N/A">N/A</option>
      </select>

      <textarea
        placeholder="Spot Description and Details"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
        rows="3"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
        Update Spot
      </button>
    </form>
  );
}

export default UpdateSpotForm;
