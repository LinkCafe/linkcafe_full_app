import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Inicio from "./pages/Inicio"
import Chat from "./pages/Chat"
import Usuarios from "./pages/Usuarios"
import Articulos from "./pages/Articulos"
import Publicaciones from "./pages/Publicaciones"
import Comentarios from "./pages/Comentarios"

function App() {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/inicio" Component={Inicio} />
      <Route path="/chat" Component={Chat} />
      <Route path="/usuarios" Component={Usuarios} />
      <Route path="/articulos" Component={Articulos} />
      <Route path="/publicaciones" Component={Publicaciones} />
      <Route path="/comentarios" Component={Comentarios} />
    </Routes>
  )
}

export default App
