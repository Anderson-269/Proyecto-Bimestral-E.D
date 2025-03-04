'use strict';

import Category from './category.model.js';

export const getCategories = async (req, res) => {
  try {

    const categories = await Category.find();

    res.status(200).json({ message: 'Lista de categorías obtenida', categories })

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error })
  }
}

export const getCategoryById = async (req, res) => {
  try {

    const category = await Category.findById(req.params.id)

    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' })

    res.status(200).json({ message: 'Categoría encontrada', category })

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error })
  }
}

export const createCategory = async (req, res) => {
  try {

    const { name, description } = req.body;

    const category = new Category({ name, description })

    await category.save()

    res.status(201).json({ message: 'Categoría creada exitosamente', category })

  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error })
  }
}

export const updateCategory = async (req, res) => {
  try {

    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    )

    if (!updatedCategory) return res.status(404).json({ message: 'Categoría no encontrada' })

    res.status(200).json({ message: 'Categoría actualizada', updatedCategory })

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error })
  }
}

export const deleteCategory = async (req, res) => {
    try {

      const category = await Category.findByIdAndUpdate(req.params.id, { status: false }, { new: true })

      if (!category) return res.status(404).json({ message: 'Categoría no encontrada' })

      res.status(200).json({ message: 'Categoría desactivada', category })

    } catch (error) {
      res.status(500).json({ message: 'Error al desactivar la categoría', error })
    }
}