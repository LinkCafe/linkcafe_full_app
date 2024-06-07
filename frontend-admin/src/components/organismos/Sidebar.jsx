import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUsers, faHouse, faUpload, faNewspaper, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Zoom, styled } from '@mui/material';

// Estilo personalizado del Tooltip con la fuente Poppins y color de fondo gris claro
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F0F3F4',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    fontFamily: 'Poppins',
  },
}));

// Estilo CSS para la animación de crecimiento
const iconStyle = {
  transition: 'transform 0.3s ease',
  transform: 'scale(1) translate'
};

function Sidebar() {

  const { pathname } = useLocation();

  return (
    <div className="bg-gray-800 h-screen flex justify-center">
      <div className="flex w-21 flex-col items-center space-y-3 py-2">
        <div className="flex items-center justify-center rounded-md bg-gray-900 p-4 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-8 cursor-pointer"
            data-tip="Logo"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>
        </div>

        <div className="space-y-35 rounded-md bg-gray-900 text-base h-full">
          <ul>
            <li className="p-5">
              <LightTooltip title="Inicio" placement="right" TransitionComponent={Zoom}>
                <Link to="/inicio" className={`h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-primary ${pathname.includes('inicio') ? " text-primary" : ""}`} style={iconStyle}>
                  <FontAwesomeIcon icon={faHouse} className="transition-transform hover:scale-150" />
                </Link>
              </LightTooltip>
            </li>
            <li className="p-5">
              <LightTooltip title="Usuarios" placement="right" TransitionComponent={Zoom}>
                <Link to="/usuarios" className={`h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-primary ${pathname.includes('usuarios') ? " text-primary" : ""}`} style={iconStyle}>
                  <FontAwesomeIcon icon={faUsers} className="transition-transform hover:scale-150" />
                </Link>
              </LightTooltip>
            </li>
            <li className="p-5">
              <LightTooltip title="Publicaciones" placement="right" TransitionComponent={Zoom}>
                <Link to="/publicaciones" className={`h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-primary ${pathname.includes('publicaciones') ? " text-primary" : ""}`} style={iconStyle}>
                  <FontAwesomeIcon icon={faUpload} className="transition-transform hover:scale-150" />
                </Link>
              </LightTooltip>
            </li>
            <li className="p-5">
              <LightTooltip title="Comentarios" placement="right" TransitionComponent={Zoom}>
                <Link to="/comentarios" className={`h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-primary ${pathname.includes('comentarios') ? " text-primary" : ""}`} style={iconStyle}>
                  <FontAwesomeIcon icon={faComments} className="transition-transform hover:scale-150" />
                </Link>
              </LightTooltip>
            </li>
            <li className="p-5">
              <LightTooltip title="Artículos" placement="right" TransitionComponent={Zoom}>
                <Link to="/articulos" className={`h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-primary ${pathname.includes('articulos') ? " text-primary" : ""}`} style={iconStyle}>
                  <FontAwesomeIcon icon={faNewspaper} className="transition-transform hover:scale-150" />
                </Link>
              </LightTooltip>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
