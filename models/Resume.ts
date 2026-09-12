import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResume extends Document {
  name: string;
  url: string;
  publicId: string;
  size: number;
  uploadedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: Number,
      required: true,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Resume: Model<IResume> =
  mongoose.models.Resume ||
  mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;