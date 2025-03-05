'use strict';

import { Router } from 'express';
import { getCategories, getCategoryByName, createCategory, updateCategory, deleteCategory } from './category.controller.js';
import { getCategoriesValidator, getCategoryByIdValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from '../middlewares/category-validator.js';

const router = Router();

/**
 * @swagger
 * /getCategories:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Obtiene la lista de todas las categorías disponibles en el sistema.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lista de categorías obtenida exitosamente
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 60f9b2b7f4f4d456c8f8e8b1
 *                       name:
 *                         type: string
 *                         example: Tecnología
 *                       description:
 *                         type: string
 *                         example: Categoría dedicada a artículos tecnológicos
 *       500:
 *         description: Error al obtener las categorías.
 */
router.get('/getCategories', getCategoriesValidator, getCategories)

/**
 * @swagger
 * /getCategoryByName/{name}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     description: Obtiene los detalles de una categoría específica por su ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: El ID de la categoría
 *         schema:
 *           type: string
 *           example: 60f9b2b7f4f4d456c8f8e8b1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categoría encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60f9b2b7f4f4d456c8f8e8b1
 *                     name:
 *                       type: string
 *                       example: Tecnología
 *                     description:
 *                       type: string
 *                       example: Categoría dedicada a artículos tecnológicos
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error al obtener la categoría.
 */
router.get('/getCategoryByName/:name', getCategoryByIdValidator, getCategoryByName)

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Crea una nueva categoría con los detalles proporcionados.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tecnología
 *               description:
 *                 type: string
 *                 example: Categoría dedicada a artículos tecnológicos
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Categoría creada exitosamente
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60f9b2b7f4f4d456c8f8e8b1
 *                     name:
 *                       type: string
 *                       example: Tecnología
 *                     description:
 *                       type: string
 *                       example: Categoría dedicada a artículos tecnológicos
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error al crear la categoría.
 */
router.post('/createCategory', createCategoryValidator, createCategory)

/**
 * @swagger
 * /updateCategory/{uid}:
 *   put:
 *     summary: Actualizar una categoría
 *     description: Actualiza los detalles de una categoría existente.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: El ID de la categoría
 *         schema:
 *           type: string
 *           example: 60f9b2b7f4f4d456c8f8e8b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tecnología Avanzada
 *               description:
 *                 type: string
 *                 example: Actualización de categoría para tecnología avanzada
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Categoría actualizada
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60f9b2b7f4f4d456c8f8e8b1
 *                     name:
 *                       type: string
 *                       example: Tecnología Avanzada
 *                     description:
 *                       type: string
 *                       example: Actualización de categoría para tecnología avanzada
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error al actualizar la categoría.
 */
router.put('/updateCategory/:uid', updateCategoryValidator, updateCategory)

/**
 * @swagger
 * /categories/{uid}:
 *   patch:
 *     summary: Desactivar una categoría
 *     description: Desactiva (elimina) una categoría cambiando su estado a falso.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: El ID de la categoría
 *         schema:
 *           type: string
 *           example: 60f9b2b7f4f4d456c8f8e8b1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categoría desactivada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Categoría desactivada exitosamente
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60f9b2b7f4f4d456c8f8e8b1
 *                     name:
 *                       type: string
 *                       example: Tecnología
 *                     description:
 *                       type: string
 *                       example: Categoría dedicada a artículos tecnológicos
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error al desactivar la categoría.
 */
router.patch('/deleteCategory/:uid', deleteCategoryValidator, deleteCategory);

export default router;
