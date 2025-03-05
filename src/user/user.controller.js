`use strict`;

import { hash, verify } from "argon2";
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import User from "./user.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

//------------------------------------------------------- defaultAdmin --------------------------------------------------------------------//
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

//------------------------------------------------------- Funciones de Administrador --------------------------------------------------------------------//

//Administrador que puede Eliminar (Desactivar) la Cuenta de un usuario(Cliente)
export const deleteUser = async (req, res) => {
    try {
        const {uid} = req.params;
  
        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });
  
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
  
// Administrador que puede activar la cuenta de un usuario (Cliente)
export const activateUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await User.findByIdAndUpdate(uid, { status: true }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Usuario activado exitosamente",
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al activar al usuario",
            error: err.message
        })
    }
}

//Administrador que puede Actualizar la Cuenta de los usuarios(Clientes)
export const updateUserAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            success: true,
            msg: "Usuario Actulizado Exitosamente",
            user,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar Usuario",
            error: err.message
        })
    }
}

//Administrador que puede convertir usuario(Cliente) a Administrador
export const updateRole = async (req,res) =>{
    try{
        const {uid} = req.params;
        const role = req.body;

        const user = await User.findByIdAndUpdate(uid,role,{new: true})
        
        return res.status(200).json({
            success: true,
            message: "Rol acctualizado exitosamente",
            user
        })
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar role",
            error: err.message
        })
    }
}

//Administrador puede ver los datos de todos los Usuarios
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
  
//----------------------------------------------------- Funciones Individules de Usuarios  ----------------------------------------------------------------//

//Usuario(Cliente - Administrador) puede ver sus datos
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

//Usuario(Cliente - Administrador) pueden actualizar sus fotos de perfil
export const updateProfilePicture = async (req, res) => {
  try {
      const _id = req.user;
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

//Usuario(Cliente - Administrador) pueden actulizar su contraseña
export const updatePassword = async(req,res) =>{
  try {
      const _id = req.user;
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
  
//Usuario(Cliente - Administrador) pueden eliminar su propia Cuenta
export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const _id = req.user;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const isMatch = await verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Contraseña incorrecta"
            })
        }

        await User.findByIdAndUpdate(_id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            message: "Cuenta eliminada exitosamente"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la cuenta",
            error: err.message
        })
    }
}
  
//Usuario(Cliente - Administrador) pueden actualizar su propia Cuenta
export const updateUser = async (req, res) => {
    try {
        const _id = req.user;
        const data = req.body;

        const user = await User.findByIdAndUpdate(_id, data, { new: true })

        res.status(200).json({
            success: true,
            msg: "Usuario Actulizado Exitosamente",
            user,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar Usuario",
            error: err.message
        })
    }
}
