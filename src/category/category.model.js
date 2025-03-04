'use strict';

import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      maxLength: [50, 'Maximum length for category name is 50 characters']
    },
    description: {
      type: String,
      maxLength: [200, 'Maximum length for description is 200 characters']
    },
    status: {
      type: Boolean,
      default: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

categorySchema.methods.toJSON = function () {
  const { _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

export default model('Category', categorySchema);
