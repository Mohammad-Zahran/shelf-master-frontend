import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabase.config.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useParams } from "react-router-dom";

const UpdateModel = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [model3D, setModel3D] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axiosSecure.get(`/3d/${id}`);
        const { name, photo, model3D } = response.data.data;
        setName(name);
        setPhoto(photo);
        setModel3D(model3D);
      } catch (error) {
        console.error("Error fetching model details:", error.message);
      }
    };

    fetchModel();
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !photo || !model3D) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      let photoURL = photo;
      let modelURL = model3D;

      if (photo instanceof File) {
        const photoExt = photo.name.split(".").pop();
        const photoPath = `photos/${Date.now()}.${photoExt}`;
        const { error: photoError } = await supabase.storage
          .from("Images")
          .upload(photoPath, photo);

        if (photoError) throw photoError;

        photoURL = supabase.storage.from("Images").getPublicUrl(photoPath)
          .data.publicUrl;
      }

      if (model3D instanceof File) {
        const modelExt = model3D.name.split(".").pop();
        const modelPath = `models/${Date.now()}.${modelExt}`;
        const { error: modelError } = await supabase.storage
          .from("Models3d")
          .upload(modelPath, model3D);

        if (modelError) throw modelError;

        modelURL = supabase.storage.from("Models3d").getPublicUrl(modelPath)
          .data.publicUrl;
      }

      // Send updated metadata to the backend
      const response = await axiosSecure.put(`/3d/${id}`, {
        name,
        photo: photoURL,
        model3D: modelURL,
      });

      console.log("Model updated successfully:", response.data);
      alert("3D model updated successfully!");
    } catch (error) {
      console.error("Error updating model:", error.message);
      alert("Error updating model.");
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
        <input
          className="w-full mb-4 file:px-4 file:py-2 file:border file:border-gray-300 file:bg-steelBlue file:text-white file:font-medium file:hover:bg-white file:hover:text-steelBlue file:rounded-md file:cursor-pointer"
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <input
          className="w-full mb-4 file:px-4 file:py-2 file:border file:border-gray-300 file:bg-steelBlue file:text-white file:font-medium file:hover:bg-white file:hover:text-steelBlue file:rounded-md file:cursor-pointer"
          type="file"
          onChange={(e) => setModel3D(e.target.files[0])}
        />
        <button type="submit" className="w-full py-2 btn normal">
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
