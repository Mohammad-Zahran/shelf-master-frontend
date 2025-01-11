import React, { useState } from "react";
import { supabase } from "../../../supabase.js";

const AddModel = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [model3D, setModel3D] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!name || !photo || !model3D) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Upload photo to the "Images" bucket
      const photoExt = photo.name.split(".").pop();
      const photoPath = `photos/${Date.now()}.${photoExt}`;
      const { data: photoData, error: photoError } = await supabase.storage
        .from("Images")
        .upload(photoPath, photo);

      if (photoError) throw photoError;

      // Upload 3D model to the "Models3d" bucket
      const modelExt = model3D.name.split(".").pop();
      const modelPath = `models/${Date.now()}.${modelExt}`;
      const { data: modelData, error: modelError } = await supabase.storage
        .from("Models3d")
        .upload(modelPath, model3D);

      if (modelError) throw modelError;

      // Get public URLs for uploaded files
      const photoURL = supabase.storage.from("Images").getPublicUrl(photoPath)
        .data.publicUrl;
      const modelURL = supabase.storage.from("Models3d").getPublicUrl(modelPath)
        .data.publicUrl;

      console.log("Photo URL:", photoURL);
      console.log("3D Model URL:", modelURL);

      // Send metadata to the backend
      const response = await fetch("http://localhost:8080/3d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          photo: photoURL,
          model3D: modelURL,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Backend error:", result.message);
        throw new Error(result.message);
      }

      console.log("Model saved to MongoDB:", result.data);
      alert("3D model added successfully!");
    } catch (error) {
      console.error("Error uploading files:", error.message);
      alert("Error uploading files.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <input type="file" onChange={(e) => setModel3D(e.target.files[0])} />
      <button type="submit">Upload Model</button>
    </form>
  );
};

export default AddModel;
