import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteSpotForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spotData, setSpotData] = useState(null);  // Store spot data
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  // Fetch spot data on component mount
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/spots/${id}/`)
      .then((response) => setSpotData(response.data))
      .catch((error) => {
        console.error("Error fetching spot data:", error);
        setError("Failed to load spot data.");
      });
  }, [id]);

  const handleDelete = () => {
    if (!confirmDelete) {
      alert("Please confirm that you want to delete this spot.");
      return;
    }

    axios
      .delete(`http://127.0.0.1:8000/api/spots/${id}/`)
      .then(() => {
        alert("Spot deleted successfully!");
        navigate("/");  // Redirect after deletion
      })
      .catch((error) => {
        console.error("Error deleting spot:", error);
        setError("Failed to delete the spot.");
      });
  };

  return (
    <div className="p-4 border rounded shadow-md space-y-3 w-80">
      <h2 className="text-lg font-semibold">Delete Spot</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {spotData ? (
        <div className="space-y-2">
          <p><strong>Building Name:</strong> {spotData.building_name}</p>
          <p><strong>From:</strong> {spotData.time_available_from}</p>
          <p><strong>To:</strong> {spotData.time_available_till}</p>
          <p><strong>Campus Side:</strong> {spotData.campus_side}</p>
          <p><strong>Description:</strong> {spotData.description}</p>
        </div>
      ) : (
        <p>Loading spot details...</p>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.checked)}
          id="confirmDelete"
        />
        <label htmlFor="confirmDelete" className="text-sm">Confirm that you want to delete this spot</label>
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 w-full rounded hover:bg-red-600"
      >
        Delete Spot
      </button>
    </div>
  );
}

export default DeleteSpotForm;
