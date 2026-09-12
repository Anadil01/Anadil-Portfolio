import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: String,

    current: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
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

const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;