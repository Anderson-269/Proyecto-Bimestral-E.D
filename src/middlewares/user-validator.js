`use strict`

import { param, body, query } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const getUsersValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    query("limit").optional().isInt({ min: 1 }).withMessage("El límite debe ser un número entero mayor a 0"),
    query("from").optional().isInt({ min: 0 }).withMessage("El valor 'from' debe ser un número entero mayor o igual a 0"),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("name").optional().isString().withMessage("El nombre debe ser una cadena de texto"),
    body("email").optional().isEmail().withMessage("El email debe ser válido"),
    body("username").optional().isString().withMessage("El nombre de usuario debe ser una cadena de texto"),
    validarCampos,
    handleErrors
];

export const updatePasswordValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("newPassword").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo"),
    validarCampos,
    handleErrors
];