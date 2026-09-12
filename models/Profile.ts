import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocialLink {
  label: string;
  href: string;
}

export interface IProfile extends Document {
  name: string;
  role: string;
  location: string;
  email: string;
  availability: string;

  image: {
    src: string;
    alt: string;
  };

  tagline: string;
  bio: string;

  certifications: string[];
  socials: ISocialLink[];

  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>(
  {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

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
      src: {
        type: String,
        default: "",
      },
      alt: {
        type: String,
        default: "",
      },
    },

    tagline: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    certifications: {
      type: [String],
      default: [],
    },

    socials: {
      type: [SocialLinkSchema],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

const Profile: Model<IProfile> =
  mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;