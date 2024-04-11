import React from 'react'
import { Link } from 'react-router-dom'
import Vector from '../../assets/Vector.png'


function Sidebar() {
  return (
    <>
        <nav className=" w-64 h-[43.5rem] bg-white rounded-2xl flex-col justify-between my-4 ml-4">
            <div>
                <div className="flex items-center">
                    <img src={Vector} alt="LINK_CAFE" className="ms-6 h-7 w-8" />
                    <a className="text-title-lg block py-4 px-6 font-bold -ml-4">
                        LINK_CAFE
                    </a>
                </div>

                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-2 "></hr>

                <Link to={'/inicio'} className="block py-2 px-6 hover:bg-[#09AF37]  rounded-md mx-2 text-title-sm mt-2">
                    Inicio
                </Link>
                <Link to={'/Chat'} className="block py-2 px-6 hover:bg-[#09AF37]  rounded-md mx-2 text-title-sm">
                    Chat
                </Link>
                <Link to={'/usuarios'} className="block py-2 px-6 hover:bg-[#09AF37]  rounded-md mx-2 text-title-sm">
                    Usuarios
                </Link>
                <Link to={'/articulos'} className="block py-2 px-6 hover:bg-[#09AF37]  rounded-md mx-2 text-title-sm">
                    Articulos
                </Link>
                <Link to={'/Publicaciones'} className="block py-2 px-6 hover:bg-[#09AF37]  rounded-md mx-2 text-title-sm">
                    Publicaciones
                </Link>
                <Link to={'/Comentarios'} className="block py-2 px-6 hover:bg-[#09AF37]  rounded-md mx-2 text-title-sm">
                    Comentarios
                </Link>  
            </div>
            <div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-2 mt-[34rem]"></hr>

                <a href="#" className=" block py-2 px-6 hover:bg-[#09AF37] text-center rounded-md mx-4 my-2 text-title-sm">
                Cerrar sesión
                </a>
            </div>
      </nav>
    </>
  )
}

export default Sidebar