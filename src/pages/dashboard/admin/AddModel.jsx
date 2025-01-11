import React, { useState } from "react";
import axios from "axios";

const AddModel = () => {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    model3D: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("photo", formData.photo);
    formDataObj.append("model3D", formData.model3D);

    try {
      console.log("Submitting form with data:", formData);
      const response = await axios.post("http://localhost:8080/3d", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      setError(null);
      setFormData({ name: "", photo: null, model3D: null });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Add 3D Model</h1>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="model3D"
              className="block text-sm font-medium text-gray-700"
            >
              3D Model
            </label>
            <input
              type="file"
              id="model3D"
              name="model3D"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
