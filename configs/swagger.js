import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Tienda Online",
            version:"1.0.0",
            description: "tienda en línea, enfocada en la venta de productos y la administración de usuarios",
            contact:{
                name: "Anderson Lopez",
                email: "alopez-2023269@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/onlineSale/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/category/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }