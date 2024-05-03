import { Link, useLocation } from 'react-router-dom';
import Vector from '../../assets/Vector.png';

function Sidebar({ Open }) {

    const { pathname } = useLocation();

    return (
        <nav className={`w-64 h-[43.5rem] bg-white rounded-2xl flex-col justify-between my-2 ml-2 ${Open ? 'block' : 'hidden'} lg:block`}>
           
            <button className="openbtn lg:hidden fixed top-0 left-0 p-4">&#9776;</button>
            
            <div className="flex items-center">
                <img src={Vector} alt="LINK_CAFE" className="ms-6 h-7 w-8" />
                <a className="text-title-lg block py-4 px-6 font-bold -ml-4">
                    LINK_CAFE
                </a>
            </div>

            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-2 "></hr>

            <div>
                <Link to={'/inicio'} className={`block py-2 px-6 mt-1 hover:bg-[#09AF37] ${pathname.includes('inicio') ? "bg-[#09AF37] text-white" : ""} rounded-md mx-2 text-title-sm`}>
                    Inicio
                </Link>
                <Link to={'/usuarios'} className={`block py-2 px-6 mt-1 hover:bg-[#09AF37] ${pathname.includes('usuarios') ? "bg-[#09AF37] text-white" : ""} rounded-md mx-2 text-title-sm`}>
                    Usuarios
                </Link>
                <Link to={'/articulos'} className={`block py-2 px-6 mt-1 hover:bg-[#09AF37] ${pathname.includes('articulos') ? "bg-[#09AF37] text-white" : ""} rounded-md mx-2 text-title-sm`}>
                    Articulos
                </Link>
                <Link to={'/publicaciones'} className={`block py-2 px-6 mt-1 hover:bg-[#09AF37] ${pathname.includes('publicaciones') ? "bg-[#09AF37] text-white" : ""} rounded-md mx-2 text-title-sm`}>
                    Publicaciones
                </Link>
                <Link to={'/comentarios'} className={`block py-2 px-6 mt-1 hover:bg-[#09AF37] ${pathname.includes('comentarios') ? "bg-[#09AF37] text-white" : ""} rounded-md mx-2 text-title-sm`}>
                    Comentarios
                </Link>
            </div>
            <div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-2 mt-[34rem]"></hr>
                <a href="/logout" className=" block py-2 px-6 hover:bg-[#09AF37] text-center rounded-md mx-4 my-2 text-title-sm">
                    Cerrar sesión
                </a>
            </div>
        </nav>
    )
}

export default Sidebar;