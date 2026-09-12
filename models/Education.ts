import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  institution: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: true,
    },

    institution: {
      type: String,
      required: true,
    },

    field: String,

    startYear: String,

    endYear: String,

    description: String,
  },
  {
    timestamps: true,
  }
);

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);

export default Education;