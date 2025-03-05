import Product from "./product.model.js"

export const addProduct = async(req,res) =>{
    try{
        const data = req.body
        
        await Product.create(data)

        res.status(200).json({
            success: true,
            message: 'Producto creado exitosamente'
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al guardar el producto'
        })
    }
}

export const getProducts = async(req,res) =>{
    try{
        const products = await Product.find()

        res.status(200).json({
            success: true,
            products: products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener todo el catálogo'
        })
    }
}

export const getProductsOutOfStock = async(req,res) =>{
    try{
        const products = await Product.find({ stock: 0  })

        res.status(200).json({
            success: true,
            products: products
        })
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los artículos agotados'
        })
    }
}

export const getBestSeller = async(req,res) =>{
    try{
        const products = await Product.find().sort({soldCantity: -1})

        res.status(200).json({
            success: true,
            products: products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los mejores vendedores'
        })
    }
}

export const updateProduct = async(req,res) =>{
    try{
        const {uid} = req.params
        const data = req.body


        if(!data || Object.keys(data).length === 0){
            return res.status(200).json({
                success: true,
                message: "No se cambió nada porque no hubo cambios en la solicitud."
            })
        }
        const product = await Product.findByIdAndUpdate(uid,data,{new: true})
        
        return res.status(200).json({
            success: true,
            message: "producto actualizado exitosamente",
            product: product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto'
        })
    }
}

export const deleteProduct = async(req, res) =>{
    try{
        const {uid} = req.params

        await Product.findByIdAndUpdate(uid,{status: false},{new: true})

        return res.status(200).json({
            success: true,
            message: 'Usuario eliminado exitosamente'
        })
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario'
        })
    }
}

export const getProductByName = async(req,res) =>{
    try{
        const {name} = req.body

        const products = await Product.find({name:name})

        
        return res.status(200).json({
            success: false,
            products: products
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            messagge: 'Error al obtener los productos o productos con el nombre'
        })
    }
}