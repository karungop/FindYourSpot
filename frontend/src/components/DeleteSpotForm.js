import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteSpotForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spotData, setSpotData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

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
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting spot:", error);
        setError("Failed to delete the spot.");
      });
  };

  return (
    <div className="search-spot-form">
      <h2>Delete Spot</h2>
      {error && <p className="error">{error}</p>}
      {spotData ? (
        <div className="result-item">
          <p><strong>Building Name:</strong> {spotData.building_name}</p>
          <p><strong>From:</strong> {spotData.time_available_from}</p>
          <p><strong>To:</strong> {spotData.time_available_till}</p>
          <p><strong>Campus Side:</strong> {spotData.campus_side}</p>
          <p><strong>Description:</strong> {spotData.description}</p>
        </div>
      ) : (
        <p>Loading spot details...</p>
      )}
      <div className="form-group">
        <input
          type="checkbox"
          checked={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.checked)}
          id="confirmDelete"
        />
        <label htmlFor="confirmDelete">Confirm that you want to delete this spot</label>
      </div>
      <button onClick={handleDelete} className="button delete-button">
        Delete Spot
      </button>
    </div>
  );
}

export default DeleteSpotForm;
