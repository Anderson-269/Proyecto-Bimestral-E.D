import User from "../user/user.model.js"

export const isActive =  () => {
    return async (req, res, next) => {


        const user =  await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
        

        if(user.status != true){
            return res.status(401).json({
                success: false,
                message: `Usuario desactivado no se puede proseguir con la funcion`
            })
        }
        next()
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