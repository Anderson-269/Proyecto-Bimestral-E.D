`use strict`;

import { hash, verify } from "argon2";
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import User from "./user.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url))


export const defaultAdmin = async () => {
  const defaultAdmin = {
      "name": "Anderson",
      "username": "ZiloyTA59",
      "password": "Ziloyta.269",
      "profilePicture": "la wea o lo que sea.jpg",
      "email": "alopez-2023269@gmail.com",
      "phone": "35978171",
      "role": "ADMIN_ROLE"
  }

  const user = await User.findOne({email: defaultAdmin.email})
  if(!user){
      defaultAdmin.password =  await hash(defaultAdmin.password)
      await User.create(defaultAdmin)
  }
}

export const getUserById = async (req, res) => {
  try {
    const _id = req.user;
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no existe",
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
      error: err.message,
    })
  }
}

export const getUsers = async (req, res) => {
  try {
      const users = await User.find().select("-password")

      return res.status(200).json({
          message: "Lista de usuarios obtenida exitosamente",
          users
      })

  } catch (err) {
      return res.status(500).json({
          message: "Error al obtener los usuarios",
          error: err.message
      })
  }
}

export const deleteUser = async (req, res) => {
  try {
      const _id = req.user

      const user = await User.findByIdAndUpdate(_id, { status: false }, { new: true });

      return res.status(200).json({
          success: true,
          message: "Usuario eliminado exitosamente",
          user
      })

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Error al eliminar al usuario",
          error: err.message
      })
  }
}

export const updateUser = async (req, res) => {
  try {
      const _id = req.user;
      const data = req.body;

      console.log(_id)
      const user = await User.findByIdAndUpdate(_id, data, { new: true });

      res.status(200).json({
          success: true,
          msg: 'User updated',
          user,
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: 'Error while updating the user',
          error: err.message
      });
  }
}

export const updateRole = async (req,res) =>{
  try{
      const {uid} = req.params
      const {role} = req.body

      const user = await User.findByIdAndUpdate(uid,role,{new: true})
      
      return res.status(200).json({
          success: true,
          message: "Rol acctualizado exitosamente",
          user
      });
     
  }catch(err){
      return res.status(500).json({
          success: false,
          message: "Error al actualizar role",
          error: err.message
      })
  }
}

export const updateProfilePicture = async (req, res) => {
  try {
      const { _id } = req.usuario;
      let newProfilePicture = req.file ? req.file.filename : null;

      if (!newProfilePicture) {
          return res.status(400).json({
              success: false,
              msg: 'No se ha proporcionado ninguna foto de perfil.',
          });
      }

      const user = await User.findById(_id);
      

      if (user.profilePicture) {
          const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
          await fs.unlink(oldProfilePicturePath)
      }

      user.profilePicture = newProfilePicture;
      await user.save();

      res.status(200).json({
          success: true,
          msg: 'Foto de perfil actualizada',
          user,
      })
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: 'Error al actualizar la foto de perfil',
          error: err.message
      })
  }
}

export const updatePassword = async(req,res) =>{
  try {
      const  _id  = req.usuario;
      const { newPassword } = req.body;

      const user = await User.findById(_id)

      const matchOldAndNewPassword = await verify(user.password, newPassword);

      if (matchOldAndNewPassword) {
          return res.status(400).json({
              success: false,
              message: "La nueva contraseña no puede ser la misma que la anterior."
          })
      }

      const encryptedPassword = await hash(newPassword);

      await User.findByIdAndUpdate(_id, { password: encryptedPassword }, { new: true });

      return res.status(200).json({
          success: true,
          message: "Contraseña actualizada exitosamente",
      })
  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Error al actualizar la contraseña",
          error: err.message
      })
  }
}
