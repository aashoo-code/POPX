import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "", // URL to the profile picture, Cloudinary will return this URL after uploading the image
  },
  profilePictureID: {
    type: String,
    default: "", // Cloudinary public ID for the profile picture, used for managing the image in Cloudinary
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  companyName: {
    type: String,
    required: true,
  },
  phone:{
     type: String,
     default: "",
  },
  isAgency: {
    type: Boolean,
    default: false,
  },

},
{
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
