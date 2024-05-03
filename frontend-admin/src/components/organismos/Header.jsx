import React from 'react';

function Header() {
  // Obtener el usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Obtener solo el nombre completo del usuario
  const nombreCompleto = user ? user.nombre_completo : '';

  return (
    <div className="">
      {/* Mostrar el nombre completo del usuario */}
      <span className='bg-white rounded-2xl p-3'>{nombreCompleto}</span>
    </div>
  )
}

export default Header;
