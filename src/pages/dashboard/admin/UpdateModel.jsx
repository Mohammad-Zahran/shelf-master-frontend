import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabase.config.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateModel = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [model3D, setModel3D] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentModel3D, setCurrentModel3D] = useState(null);
  const [currentPhotoName, setCurrentPhotoName] = useState(""); // To store photo file name
  const [currentModel3DName, setCurrentModel3DName] = useState(""); // To store model file name
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axiosSecure.get(`/3d/${id}`);
        const { name, photo, model3D, photoName, model3DName } = response.data.data;
        setName(name);
        setCurrentPhoto(photo);
        setCurrentPhotoName(photoName); // Set the photo file name
        setCurrentModel3D(model3D);
        setCurrentModel3DName(model3DName); // Set the model file name
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch model details. Please try again.",
        });
      }
    };

    fetchModel();
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name && !photo && !model3D) {
      Swal.fire({
        icon: "warning",
        title: "No Changes",
        text: "No changes detected. Please update at least one field.",
      });
      return;
    }

    try {
      let photoURL = currentPhoto;
      let modelURL = currentModel3D;

      if (photo instanceof File) {
        const photoExt = photo.name.split(".").pop();
        const photoPath = `photos/${Date.now()}.${photoExt}`;
        const { error: photoError } = await supabase.storage
          .from("Images")
          .upload(photoPath, photo);

        if (photoError) throw photoError;

        photoURL = supabase.storage.from("Images").getPublicUrl(photoPath).data.publicUrl;
      }

      if (model3D instanceof File) {
        const modelExt = model3D.name.split(".").pop();
        const modelPath = `models/${Date.now()}.${modelExt}`;
        const { error: modelError } = await supabase.storage
          .from("Models3d")
          .upload(modelPath, model3D);

        if (modelError) throw modelError;

        modelURL = supabase.storage.from("Models3d").getPublicUrl(modelPath).data.publicUrl;
      }

      // Build the update payload dynamically
      const updatePayload = {};
      if (name !== "") updatePayload.name = name;
      if (photoURL !== currentPhoto) updatePayload.photo = photoURL;
      if (modelURL !== currentModel3D) updatePayload.model3D = modelURL;

      const response = await axiosSecure.put(`/3d/${id}`, updatePayload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "3D model updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the model. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6"
      >
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Update <span className="text-steelBlue">3D Model</span>
        </h2>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="mb-4">
          <label className="block text-gray-700">Current Photo:</label>
          {currentPhoto && (
            <>
              <p className="text-sm text-gray-500">{currentPhotoName}</p> {/* Display photo name */}
              <img
                src={currentPhoto}
                alt="Current"
                className="w-full h-48 object-cover border rounded-md"
              />
            </>
          )}
          <input
            className="w-full mt-2 file:px-4 file:py-2 file:border file:border-gray-300 file:bg-steelBlue file:text-white file:font-medium file:hover:bg-white file:hover:text-steelBlue file:rounded-md file:cursor-pointer"
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current 3D Model:</label>
          {currentModel3D && (
            <>
              <p className="text-sm text-gray-500">{currentModel3DName}</p> {/* Display model name */}
              <a
                href={currentModel3D}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View/Download Current 3D Model
              </a>
            </>
          )}
          <input
            className="w-full mt-2 file:px-4 file:py-2 file:border file:border-gray-300 file:bg-steelBlue file:text-white file:font-medium file:hover:bg-white file:hover:text-steelBlue file:rounded-md file:cursor-pointer"
            type="file"
            onChange={(e) => setModel3D(e.target.files[0])}
          />
        </div>
        <button type="submit" className="w-full py-2 btn normal">
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
