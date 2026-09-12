import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResume extends Document {
  name: string;
  url: string;
  publicId?: string;
  uploadedAt: Date;
  active: boolean;
}

const ResumeSchema = new Schema<IResume>(
  {
    name: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    publicId: String,

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    active: {
      type: Boolean,
      default: true,
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