import { Router } from "express";
import { activateUser, getUserById, getUsers, updatePassword, updateUser, updateProfilePicture, deleteUser, updateRole, updateUserAdmin } from "./user.controller.js";
import { validateActivateUser, updatePasswordValidator, getUserByIdValidator, getUsersValidator, updateUserValidator, updateProfilePictureValidator, deleteUserValidator, changeRoleValidator, updateUserAdminValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";

const router = Router();

/**
 * @swagger
 * /onlineSale/v1/user/findUser/{uid}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/findUser", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /onlineSale/v1/user:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 */
router.get("/", getUsersValidator, getUsers);

/**
 * @swagger
 * /onlineSale/v1/user/updatePassword:
 *   patch:
 *     summary: Actualizar contraseña del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /onlineSale/v1/user/updateUser:
 *   put:
 *     summary: Actualizar información del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put("/updateUser", updateUserValidator, updateUser);

/**
 * @swagger
 * /onlineSale/v1/user/updateProfilePicture:
 *   patch:
 *     summary: Actualizar foto de perfil del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada
 */
router.patch("/updateProfilePicture", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

/**
 * @swagger
 * /onlineSale/v1/user/deleteUser/{uid}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.patch("/deleteUser/:uid", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /onlineSale/v1/user/updateRole/{uid}:
 *   patch:
 *     summary: Actualizar rol de usuario
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Error al actualizar rol
 */
router.patch("/updateRole/:uid", changeRoleValidator, updateRole);

/**
 * @swagger
 * /onlineSale/v1/user/updateUserAdmin/{uid}:
 *   put:
 *     summary: Actualizar información de usuario como administrador
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               status:
 *                 type: boolean
 *                 description: Estado de activación del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/updateUserAdmin/:uid", updateUserAdminValidator, updateUserAdmin);

// Ruta para activar al usuario (cambiar su estado a activo)
router.patch('/activate/:uid', activateUser, validateActivateUser);


export default router;
