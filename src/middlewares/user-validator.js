`use strict`

import { param, body } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { userExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { isActiveParam } from "./validate-status.js";

//------------------------------------------------------- Validadores de Administrador --------------------------------------------------------------------//

//Validador de deleteUser
export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

// Validador para activar un usuario
export const validateActivateUser = [
    validateJWT, 
    hasRoles("ADMIN_ROLE"), 
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"), 
    validarCampos, 
    handleErrors 
]

//validador de updateUserAdmin
export const updateUserAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("name").not().isEmpty().withMessage("El nombre no puede estar vacío"),
    body("username").not().isEmpty().withMessage("El nombre de usuario no puede estar vacío"),
    body("password").not().isEmpty().withMessage("La contraseña no puede estar vacía"),
    body("email").not().isEmpty().isEmail().withMessage("El correo electrónico no puede estar vacío y debe ser válido"),
    body("phone").not().isEmpty().withMessage("El teléfono no puede estar vacío"),
    validarCampos,
    handleErrors
]

//Validador de updateRole
export const changeRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    isActiveParam(),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

//Validador de getUsers
export const getUsersValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

//----------------------------------------------------- Funciones Individules de Usuarios  ----------------------------------------------------------------//

//Validadores de getUserById
export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    validarCampos,
    handleErrors
]

//Validador de updateProfilePicture
export const updateProfilePictureValidator = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
]

//Validador de updatePassword
export const updatePasswordValidator = [
    validateJWT,
    body("newPassword").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"),
    validarCampos,
    handleErrors
]

//Validador de deleteAccount
export const deleteAccountValidator = [
    validateJWT,
    body("password").exists().withMessage("La contraseña es obligatoria"),
    validarCampos,
    handleErrors
]

// validador de updateUser
export const updateUserValidator = [
    validateJWT,
    body("name").not().isEmpty().withMessage("El nombre no puede estar vacío"),
    body("username").not().isEmpty().withMessage("El nombre de usuario no puede estar vacío"),
    body("password").not().isEmpty().withMessage("La contraseña no puede estar vacía"),
    body("email").not().isEmpty().isEmail().withMessage("El correo electrónico no puede estar vacío y debe ser válido"),
    body("phone").not().isEmpty().withMessage("El teléfono no puede estar vacío"),
    validarCampos,
    handleErrors
]
