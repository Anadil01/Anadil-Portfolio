import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectScreenshot {
  src: string;
  alt: string;
}

export interface IProjectCaseStudy {
  challenge: string;
  solution: string;
  result: string;
  screenshots: IProjectScreenshot[];
}

export type ProjectStatus = "draft" | "published";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  impact: string;
  highlights: string[];

  caseStudy: IProjectCaseStudy;

  stack: string[];

  image: {
    src: string;
    alt: string;
  };

  liveDemo?: string;
  github?: string;

  featured: boolean;
  status: ProjectStatus;
  order: number;

  createdAt: Date;
  updatedAt: Date;
}

const ProjectScreenshotSchema = new Schema<IProjectScreenshot>(
  {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ProjectCaseStudySchema = new Schema<IProjectCaseStudy>(
  {
    challenge: {
      type: String,
      default: "",
    },
    solution: {
      type: String,
      default: "",
    },
    result: {
      type: String,
      default: "",
    },
    screenshots: {
      type: [ProjectScreenshotSchema],
      default: [],
    },
  },
  { _id: false }
);

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

    impact: {
      type: String,
      default: "",
    },

    highlights: {
      type: [String],
      default: [],
    },

    caseStudy: {
      type: ProjectCaseStudySchema,
      default: () => ({
        challenge: "",
        solution: "",
        result: "",
        screenshots: [],
      }),
    },

    stack: {
      type: [String],
      default: [],
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

    liveDemo: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
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