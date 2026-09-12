import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfile extends Document {
  name: string;
  role: string;
  location: string;
  email: string;
  availability: string;
  image: string;
  tagline: string;
  bio: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    availability: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    tagline: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    github: String,

    linkedin: String,

    website: String,
  },
  {
    timestamps: true,
  }
);

const Profile: Model<IProfile> =
  mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;