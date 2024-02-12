import express from 'express'
import body_parser from 'body-parser'

const server = express()
const PORT = 3333

// Configuración
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))

server.set('views engine', 'ejs')
server.set('views', './views')

server.get("/document", (req,res) => {
    res.render('articulos.documents.ejs')
})

server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto http://localhost:${PORT}`);
})
