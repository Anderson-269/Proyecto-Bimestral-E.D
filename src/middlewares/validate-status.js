import User from "../user/user.model.js"

export const isActive = () => {
    return async (req, res, next) => {
        try {
            const user = await User.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }],
            })

            if (!user) {  // Verificar si el usuario no existe
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                })
            }

            if (user.status !== true) {
                return res.status(401).json({
                    success: false,
                    message: `Usuario desactivado, no se puede proseguir con la función`,
                })
            }

            next()
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al verificar el estado del usuario',
                error: err.message,
            })
        }
    }
}

export const isActiveParam = () =>{
    return async (req, res, next) => {

        const {uid} = req.params

        const user =  await User.findById(
            uid
      );
        

        if(user.status != true){
            return res.status(401).json({
                success: false,
                message: `Usuario desactivado no se puede proseguir con la funcion`
            })
        }
        next()
    }
}