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
        <table className="min-w-full border border-gray-300 bg-white rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Photo
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                3D Model
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-gray-700">
                  {model.name}
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={model.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Photo
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={model.model3D}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View 3D Model
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageModel;
