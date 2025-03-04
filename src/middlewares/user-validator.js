`use strict`

import { param, body } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { userExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { isActiveParam } from "./validate-status.js";

export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

export const getUsersValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const changeRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    isActiveParam(),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]