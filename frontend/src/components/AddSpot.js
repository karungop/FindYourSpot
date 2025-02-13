import { useState } from "react";
import '../styles.css';

function AddSpotForm({ onSubmit }) {
  const [buildingName, setBuildingName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [campusSide, setCampusSide] = useState("N/A");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTime()) return;

    const formData = {
      building_name: buildingName,
      time_available_from: fromTime,
      time_available_till: toTime,
      campus_side: campusSide,
      description,
    };

    onSubmit(formData);
    setError("");
    resetForm();  // Reset form only if the submission succeeds
  };

  const validateTime = () => {
    const convertToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    if (!fromTime || !toTime) {
      setError("Both time fields are required.");
      return false;
    }

    if (convertToMinutes(toTime) <= convertToMinutes(fromTime)) {
      setError("End time must be later than start time.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setBuildingName("");
    setFromTime("");
    setToTime("");
    setCampusSide("N/A");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md space-y-3 w-80">
      <h2 className="text-lg font-semibold">Add Spot</h2>

      <div>
        <input
          type="text"
          placeholder="Building Name"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="block font-medium">Time Available From:</label>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="block font-medium">Time Available Till:</label>
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Campus Side:</label>
        <select
          value={campusSide}
          onChange={(e) => setCampusSide(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="N/A">N/A</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Central">Central</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Spot Description:</label>
        <textarea
          placeholder="Spot Description and Details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          rows="3"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
        Add Spot
      </button>
    </form>
  );
}

export default AddSpotForm;
