'use strict';

import { param, body } from 'express-validator';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';
import { isActiveParam } from './validate-status.js';
import { categoryExists } from '../helpers/db-validators.js';

export const getCategoryByIdValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(categoryExists),
    validarCampos,
    handleErrors
]

export const getCategoriesValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validarCampos,
    handleErrors
]

export const createCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body('name').notEmpty().withMessage('El nombre de la categoría es obligatorio'),
    body('description').optional().isString().withMessage('La descripción debe ser un texto'),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(categoryExists),
    body('name').optional().isString().withMessage('El nombre debe ser un texto'),
    body('description').optional().isString().withMessage('La descripción debe ser un texto'),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('uid').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('uid').custom(categoryExists),
    isActiveParam(),
    validarCampos,
    handleErrors
]
