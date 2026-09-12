import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  category?: string;
  technologies: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Full Stack",
    },

    technologies: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    liveUrl: {
      type: String,
      default: "",
    },

    githubUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;