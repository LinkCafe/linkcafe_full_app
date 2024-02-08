import express from 'express'
import body_parser from 'body-parser'
import rutasArticulos from './src/routes/articulos.routes.js'
import rutasComentarios from './src/routes/comentarios.routes.js'
import rutasPublicaciones from './src/routes/publicaciones.routes.js'

const server = express()
const PORT = 3333

// Configuración
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))

server.use(rutasArticulos)
server.use(rutasComentarios)
server.use(rutasPublicaciones)

server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto http://localhost:${PORT}`);
})
