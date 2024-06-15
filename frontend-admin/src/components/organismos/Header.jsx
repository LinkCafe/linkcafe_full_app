import React, { useState } from 'react';

function Header() {
  // Obtener el usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Obtener solo el nombre completo del usuario
  const nombreCompleto = user ? user.nombre_completo : '';

  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para alternar el menú desplegable
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    // Redirigir a la página de iniciar sesion
    window.location.href = '/logout';
  };

  return (
    <header>
      <nav className="bg-[#352011] border-primary lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center w-full">
          <img 
          src="/logo_completo_white.svg" 
          alt="" 
          className='h-13 w-28 ml-1'
          />
          <div className="flex items-center lg:order-2 relative">
            <span
              className='text-white dark:text-white hover:bg-[#6B4A33] focus:ring-gray-300 rounded-lg text-lg px-5 py-2.5 cursor-pointer'
              onClick={toggleDropdown}
            >
              {nombreCompleto}
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-25 bg-[#352011] dark:bg-gray-700 rounded-md shadow-lg">
                <button
                  className="px-5 text-center w-46 py-2.5 rounded-md text-white dark:text-white hover:bg-[#6B4A33] dark:hover:bg-gray-600"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;