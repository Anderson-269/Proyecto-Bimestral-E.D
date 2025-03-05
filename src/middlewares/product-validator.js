'use strict';

import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productExists, productNameExists } from "../helpers/db-validators.js";

export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("brand").notEmpty().withMessage("La marca es requerida"),
    body("price").isNumeric().withMessage("El precio debe ser un número"),
    body("stock").optional().isNumeric().withMessage("El stock debe ser un número"),
    validarCampos,
    handleErrors
]

export const getProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const getProductsOutOfStockValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const getBestSellerValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(productExists),
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    body("description").optional().notEmpty().withMessage("La descripción es requerida"),
    body("brand").optional().notEmpty().withMessage("La marca es requerida"),
    body("price").optional().isNumeric().withMessage("El precio debe ser un número"),
    body("stock").optional().isNumeric().withMessage("El stock debe ser un número"),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(productExists),
    validarCampos,
    handleErrors
]

export const getProductByNameValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("El nombre del producto es requerido"),
    body("name").custom(productNameExists),
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]
