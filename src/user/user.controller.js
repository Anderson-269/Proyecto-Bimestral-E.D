`use strict`;

import { hash } from "argon2";
import User from "./user.model.js";

export const defaultAdmin = async () => {
  const defaultAdmin = {
      "name": "Anderson",
      "email": "alopez-2023269@gmail.com",
      "phone": "35978171",
      "password": "Ziloyta.269",
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
    const { uid } = req.user;
    const user = await User.findById(uid)

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
    const { uid } = req.params;
    const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Usuario eliminado",
      user,
    })
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
      error: err.message,
    })
  }
}

export const updateUser = async (req, res) => {
  try {
      const { uid } = req.params;
      const { name, username, email } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
          uid,
          { name, username, email },
          { new: true, runValidators: true }
      ).select("-password");

      if (!updatedUser) {
          return res.status(404).json({
              success: false,
              message: "Usuario no encontrado",
          })
      }

      return res.status(200).json({
          success: true,
          message: "Usuario actualizado exitosamente",
          user: updatedUser,
      })

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Error al actualizar el usuario",
          error: err.message,
      })
  }
}

export const updateUserRole = async (req, res) => {
  try {
      const { uid } = req.params;
      const { role } = req.body;

      if (!["ADMIN_ROLE", "CLIENT_ROLE"].includes(role)) {
          return res.status(400).json({
              success: false,
              message: "Rol no válido. Debe ser 'ADMIN' o 'CLIENT'.",
          });
      }

      const updatedUser = await User.findByIdAndUpdate(
          uid,
          { role },
          { new: true, runValidators: true }
      ).select("-password")

      if (!updatedUser) {
          return res.status(404).json({
              success: false,
              message: "Usuario no encontrado",
          })
      }

      return res.status(200).json({
          success: true,
          message: "Rol de usuario actualizado exitosamente",
          user: updatedUser,
      })

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Error al actualizar el rol del usuario",
          error: err.message,
      })
  }
}
