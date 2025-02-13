import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateSpotForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [buildingName, setBuildingName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [campusSide, setCampusSide] = useState("N/A");
  const [description, setDescription] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
        setLastUpdated(data.last_updated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching spot data:", error);
        setError("Failed to load spot data.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      building_name: buildingName,
      time_available_from: fromTime,
      time_available_till: toTime,
      campus_side: campusSide,
      description,
    };

    axios
      .put(`http://127.0.0.1:8000/api/spots/${id}/`, updatedData)
      .then(() => {
        alert("Spot updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating spot:", error);
        setError("Failed to update spot.");
      });
  };

  const handleReset = () => {
    setBuildingName(buildingName);
    setFromTime(fromTime);
    setToTime(toTime);
    setCampusSide(campusSide);
    setDescription(description);
  };

  if (loading) {
    return <p>Loading spot details...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="update-spot-form">
      <h2>Update Spot</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Building Name"
        value={buildingName}
        onChange={(e) => setBuildingName(e.target.value)}
        className="input-field"
        required
      />

      <div className="form-group">
        <label>From:</label>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <div className="form-group">
        <label>To:</label>
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <select
        value={campusSide}
        onChange={(e) => setCampusSide(e.target.value)}
        className="input-field"
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
        className="input-field"
        rows="3"
      />

      <p><strong>Last Updated:</strong> {new Date(lastUpdated).toLocaleString("en-US", { timeZone: "EST" })}</p>

      <div className="button-group">
        <button type="submit" className="button update-button">Update Spot</button>
        <button type="button" onClick={handleReset} className="button reset-button">Reset</button>
      </div>
    </form>
  );
}

export default UpdateSpotForm;
