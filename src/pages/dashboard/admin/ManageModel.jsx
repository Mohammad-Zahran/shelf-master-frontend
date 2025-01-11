import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageModel = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axiosSecure.get("/3d");
        setModels(response.data.data);
      } catch (error) {
        console.error("Error fetching models:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/3d/${id}`);
      setModels((prevModels) => prevModels.filter((model) => model._id !== id));
      alert("Model deleted successfully.");
    } catch (error) {
      console.error("Error deleting model:", error.message);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the update page
    window.location.href = `/dashboard/update-model/${id}`;
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Manage Models
      </h1>
      {models.length === 0 ? (
        <p className="text-gray-500">No models available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {models.map((model) => (
            <div
              key={model._id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
            >
              <img
                src={model.photo}
                alt={model.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {model.name}
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={() => handleUpdate(model._id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(model._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageModel;
