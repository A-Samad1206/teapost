import { Document, model, Schema } from "mongoose";

export interface TagDocument extends Document {
  title: String;
}

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "This tag already exist"],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Tag = model("Tag", tagSchema);

export default Tag;