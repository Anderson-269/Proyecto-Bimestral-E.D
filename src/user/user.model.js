'use strict';

import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [15, 'Numero de caracteres de Nombre es de 15'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profilePicture:{
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN_ROLE', 'CLIENT_ROLE'],
      default: 'CLIENT_ROLE',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model('User', userSchema);