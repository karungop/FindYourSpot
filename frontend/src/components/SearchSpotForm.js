import { useState } from "react";

function SearchSpotForm({ onSearch }) {
  const [campusSide, setCampusSide] = useState("N/A");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTime(time)) {
      alert("Please enter a valid time in HH:MM format.");
      return;
    }

    const searchData = {
      campus_side: campusSide,
      time: time,
    };

    onSearch(searchData);  // Trigger the search with the form data
  };

  const validateTime = (time) => {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;  // Validates HH:MM format
    return timeRegex.test(time);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md space-y-3 w-80">
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
  );
}

export default SearchSpotForm;
