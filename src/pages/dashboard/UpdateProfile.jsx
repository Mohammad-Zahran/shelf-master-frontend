import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

const UpdateProfile = () => {
  const { updateuserProfile, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    try {
      await updateuserProfile({ name, photoURL });
      console.log("Firebase profile successfully updated!");

      const response = await axios.put("http://localhost:8080/users", {
        email: user.email,
        name,
        photoURL,
      });
      console.log("MongoDB profile successfully updated:", response.data);

      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating profile:", error);

      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to update profile. Try again!",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your name"
              className="input input-bordered"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              {...register("photoURL", { required: "Photo URL is required" })}
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photoURL && (
              <p className="text-red-600 text-sm">{errors.photoURL.message}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn normal">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
