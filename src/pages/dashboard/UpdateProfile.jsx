import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";

const UpdateProfile = () => {
  const { updateuserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    console.log("Form Data Submitted:", data); // Debug: Log form data

    updateuserProfile({ name, photoURL })
      .then(() => {
        console.log("Profile successfully updated!"); // Success log
      })
      .catch((error) => {
        console.error("Error updating profile:", error); // Error log
      });
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
              {...register("name")}
              type="text"
              placeholder="your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              {...register("photoURL")}
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              required
            />
            {/* Upload Image will be done later */}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
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
