'use strict';

import { Router } from 'express';
import { addProductValidator, deleteProductValidator, getBestSellerValidator, getProductByNameValidator, getProductsOutOfStockValidator, getProductsValidator, updateProductValidator } from '../middlewares/product-validator.js';
import { addProduct, deleteProduct, getBestSeller, getProductByName, getProducts, getProductsOutOfStock, updateProduct } from './product.controller.js';

const router = Router();

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Crea un producto en el sistema. Solo administradores pueden crear productos.
 *     tags: [Products]
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
 *                 description: Nombre del producto.
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *               brand:
 *                 type: string
 *                 description: Marca del producto.
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *               stock:
 *                 type: number
 *                 description: Cantidad disponible en inventario.
 *     responses:
 *       200:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Solicitud inválida.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/addProduct', addProductValidator, addProduct)

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Obtiene la lista completa de productos. Solo administradores pueden ver todos los productos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/getProducts', getProductsValidator, getProducts)

/**
 * @swagger
 * /getProductsOutOfStock:
 *   get:
 *     summary: Obtiene productos agotados (stock = 0)
 *     description: Obtiene todos los productos que están agotados (stock = 0).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos agotados obtenida correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/getProductsOutOfStock', getProductsOutOfStockValidator, getProductsOutOfStock)

/**
 * @swagger
 * /getBestSeller:
 *   get:
 *     summary: Obtiene los productos más vendidos
 *     description: Obtiene los productos más vendidos, ordenados por la cantidad vendida.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los productos más vendidos obtenida correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/getBestSeller', getBestSellerValidator, getBestSeller)

/**
 * @swagger
 * /updateProduct/{uid}:
 *   put:
 *     summary: Actualiza un producto existente
 *     description: Actualiza la información de un producto existente mediante su ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del producto a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *               brand:
 *                 type: string
 *                 description: Marca del producto.
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *               stock:
 *                 type: number
 *                 description: Cantidad disponible en inventario.
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       400:
 *         description: Solicitud inválida.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/updateProduct/:uid', updateProductValidator, updateProduct)

/**
 * @swagger
 * /deleteProduct/{uid}:
 *   delete:
 *     summary: Elimina un producto (cambia el estado a false)
 *     description: Cambia el estado del producto a `false`, eliminándolo lógicamente.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del producto a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/deleteProduct/:uid', deleteProductValidator, deleteProduct)

/**
 * @swagger
 * /getProductByName/name:
 *   get:
 *     summary: Obtiene un producto por nombre
 *     description: Obtiene los productos que coinciden con el nombre proporcionado.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Nombre del producto.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/getProductByName/name', getProductByNameValidator, getProductByName)

export default router;
