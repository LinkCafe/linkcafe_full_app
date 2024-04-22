import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Inicio from "./pages/Inicio"
import Usuarios from "./pages/Usuarios"
import Articulos from "./pages/Articulos"
import Publicaciones from "./pages/Publicaciones"
import Comentarios from "./pages/Comentarios"
import Logout from "./pages/auth/Logout"
import PrivateRoutes from "./utils/PrivateRoutes"

function App() {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/logout" Component={Logout} />
      <Route element={<PrivateRoutes />}>
        <Route path="/inicio" Component={Inicio} />
        <Route path="/usuarios" Component={Usuarios} />
        <Route path="/articulos" Component={Articulos} />
        <Route path="/publicaciones" Component={Publicaciones} />
        <Route path="/comentarios" Component={Comentarios} />
      </Route>
    </Routes>
  )
}

export default App
