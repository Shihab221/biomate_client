import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  updateUserData,
  getUserToken,
  getLoggedUserData,
  uploadImage,
  getUploadUserImageStatus,
  getUpdateUserStatus,
  cleanUserUpdateMessage,
  getUserToEdit,
  setEditUserProfileForm,
  fetchUserData,
  cleanUploadImageStatus,
  fetchUsers,
  updateUserDataByAdmin,
} from "../../features/eLearningSlice";
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";

const EditProfile = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);
  const token = useSelector(getUserToken);
  const updateUserStatus = useSelector(getUpdateUserStatus);
  const uploadUserImageStatus = useSelector(getUploadUserImageStatus);
  const userToEdit = useSelector(getUserToEdit);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    error: "",
  });

  useEffect(() => {
    if (Object.keys(loggedUser).length === 0) {
      navigate("/dashboard");
    }

    setValues({
      email: userToEdit.email,
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
    });

    if (updateUserStatus?.message) {
      dispatch(cleanUploadImageStatus());
      dispatch(cleanUserUpdateMessage());

      if (userToEdit._id === loggedUser.user._id) {
        dispatch(fetchUserData(loggedUser.user._id));
      }

      if (loggedUser.user.role === "admin") {
        const users = {
          firstItem: 0,
          lastItem: 12,
        };
        if (userToEdit._id === loggedUser.user._id) {
          dispatch(setEditUserProfileForm(false));
          navigate("/dashboard");
        } else {
          dispatch(fetchUsers(users));
          navigate("/admin/users");
        }
      } else {
        dispatch(setEditUserProfileForm(false));
        navigate("/dashboard");
      }
    }
  }, [updateUserStatus, loggedUser]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      param: userToEdit._id,
      data: {
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        email: values.email || undefined,
        token: token.message,
        userImage: uploadUserImageStatus.imageUrl,
      },
    };

    if (userToEdit._id !== loggedUser.user._id) {
      dispatch(updateUserDataByAdmin(user));
    } else {
      dispatch(updateUserData(user));
    }
  };

  const cancel = () => {
    if (loggedUser.user.role === "admin") {
      dispatch(cleanUploadImageStatus());
      navigate("/admin/users");
    } else {
      dispatch(cleanUploadImageStatus());
      dispatch(setEditUserProfileForm(false));
    }
  };

  const uploadPhoto = () => {
    document.getElementById("userImage").click();
  };

  const handleUpload = (event) => {
    let formData = new FormData();

    formData.append(
      "userImage",
      event.target.files[0],
      `userImage${userToEdit._id}-${Date.now()}.${
        event.target.files[0].name.split(".")[1]
      }`
    );
    dispatch(uploadImage(formData));
  };

  return (
    <>
      {loggedUser?.user && loggedUser.user.firstName ? (
        <div className="max-w-lg mx-auto mt-10 p-4 text-center shadow-lg rounded-lg">
          <input
            type="file"
            className="hidden"
            id="userImage"
            onChange={handleUpload}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="mb-4">
                <label className="block text-left" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full border rounded p-2"
                  value={values.firstName ? values.firstName : ""}
                  onChange={handleChange("firstName")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-left" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full border rounded p-2"
                  value={values.lastName ? values.lastName : ""}
                  onChange={handleChange("lastName")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-left" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border rounded p-2"
                  value={values.email ? values.email : ""}
                  onChange={handleChange("email")}
                />
              </div>

              {updateUserStatus?.error && (
                <p className="text-red-500">{updateUserStatus.error}</p>
              )}
            </div>
            <div className="flex flex-col items-center">
              <img
                src={
                  uploadUserImageStatus.imageUrl
                    ? uploadUserImageStatus.imageUrl
                    : userToEdit?.userImage
                    ? userToEdit.userImage
                    : userImagePlaceholder
                }
                className="w-32 mt-5"
                alt="User"
              />
              {uploadUserImageStatus?.error && (
                <p className="text-red-500">{uploadUserImageStatus.error}</p>
              )}
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={uploadPhoto}
              >
                Upload photo
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={clickSubmit}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditProfile;
