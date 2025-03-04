'use strict';

import Category from './category.model.js';

export const getCategoryById = async (req, res) => {
  try {
    const {uid} = req.params
    const category = await Category.findById(uid)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      })
    }

    return res.status(200).json({
      success: true,
      category,
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la categoría',
      error: err.message,
    })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    return res.status(200).json({
      message: 'Lista de categorías obtenida exitosamente',
      categories,
    })

  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener las categorías',
      error: err.message,
    })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const {uid} = req.params
    const category = await Category.findByIdAndUpdate(uid, { status: false }, { new: true })

    return res.status(200).json({
      success: true,
      message: 'Categoría desactivada exitosamente',
      category,
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error al desactivar la categoría',
      error: err.message,
    })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const {uid} = req.params;
    const data = req.body;

    const category = await Category.findByIdAndUpdate(uid, data, { new: true })

    return res.status(200).json({
      success: true,
      msg: 'Categoría actualizada',
      category,
    })
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Error al actualizar la categoría',
      error: err.message,
    })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();

    return res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      category,
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear la categoría',
      error: err.message,
    })
  }
}
