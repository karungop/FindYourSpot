import { useState } from "react";

function AddSpotForm({ onSubmit }) {
  const [buildingName, setBuildingName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [fromAmPm, setFromAmPm] = useState("AM");
  const [toTime, setToTime] = useState("");
  const [toAmPm, setToAmPm] = useState("AM");
  const [campusSide, setCampusSide] = useState("N/A");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate time logic
    if (!validateTime()) {
      setError("End time must be later than start time.");
      return;
    }

    const formData = {
      buildingName,
      fromTime: `${fromTime} ${fromAmPm}`,
      toTime: `${toTime} ${toAmPm}`,
      campusSide,
      description,
    };

    onSubmit(formData); // Function to send data to backend
    setError("");
  };

  const validateTime = () => {
    const convertTo24Hour = (time, ampm) => {
      let [hours, minutes] = time.split(":").map(Number);
      if (ampm === "PM" && hours !== 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes; // Convert to total minutes
    };

    if (!fromTime || !toTime) return false;

    return convertTo24Hour(toTime, toAmPm) > convertTo24Hour(fromTime, fromAmPm);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md space-y-3 w-80">
      <h2 className="text-lg font-semibold">Add Spot</h2>

      {/* Building Name Input */}
      <input
        type="text"
        placeholder="Building Name"
        value={buildingName}
        onChange={(e) => setBuildingName(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      {/* Time Available From */}
      <div className="flex space-x-2">
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="border p-2 w-2/3 rounded"
          required
        />
        
      </div>

      {/* Time Available Till */}
      <div className="flex space-x-2">
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="border p-2 w-2/3 rounded"
          required
        />
        
      </div>

      {/* Campus Side Dropdown */}
      <p>Which Side of Campus</p>
      <select
        value={campusSide}
        onChange={(e) => setCampusSide(e.target.value)}
        className="border p-2 w-full rounded"
      >
        
        <option>North</option>
        <option>South</option>
        <option>Central</option>
        <option>N/A</option>
      </select>

      <p></p>
      {/* Spot Description */}
      <input
        type="text"
        placeholder="Spot Description and Details"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <p></p>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
        Add Spot
      </button>
    </form>
  );
}

export default AddSpotForm;
