import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CreatePublicacionesModal from '../components/organismos/CreatePublicacionesModal';
import axiosClient from '../utils/axiosClient';
import EditPublicacionesModal from '../components/organismos/EditPublicacionesModal';
import Button from '../components/moleculas/Button';
import toast from 'react-hot-toast';

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [openCreatePublicacionesModal, setOpenCreatePublicacionesModal] = useState(false); // Estado para el modal de creación de publicaciones
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);

  const getPublicaciones = async () => {
    try {
      const response = await axiosClient.get('/publicaciones');
      if (response.status === 200) {
        setPublicaciones(response.data);
        console.log(response.data);
      } else {
        alert('No Se Encontraron Publicaciones');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicaciones();
  }, [openCreatePublicacionesModal]);

  // Definir función para manejar el éxito de la edición
  const handleEditSuccess = () => {
    getPublicaciones(); // Actualizar la lista de publicaciones después de editar con éxito
  };

  const handleDelete = async (id) => {
    try {
      if (confirm('¿Estás Seguro De Eliminar Esta Publicacion?')) {
        const response = await axiosClient.delete(`/publicaciones/${id}`);
        if (response.status === 200) {
          toast.success('publicacion Eliminada');
          getPublicaciones();
        }
      } else {
        toast.error('Publicacion No Eliminada');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    getPublicaciones();
  };

  const getDomain = (url) => {
    const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/i);
    return match ? match[1] : '';
  }


  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'En proceso':
        return 'bg-yellow-500 text-white';
      case 'No Veridica':
        return 'bg-red-500 text-white';
      case 'Verídica':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <>
      <DefaultLayout title="LinkCafé | Publicaciones">
        <div className='w-full h-full flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Publicaciones</h1>
            <Button variant="success" onClick={() => setOpenCreatePublicacionesModal(true)}>Crear Publicacion</Button>
            <CreatePublicacionesModal open={openCreatePublicacionesModal} onClose={() => setOpenCreatePublicacionesModal(false)} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto h-[calc(100vh-200px)]'>
            {publicaciones.map((d, index) => (
              <div className="max-w-sm bg-[#f8f4f1] h-min border border-gray-300 rounded-lg shadow-xl mb-5" key={index}>
                <EditPublicacionesModal
                  open={selectedPublicacion === d.id}
                  onClose={() => setSelectedPublicacion(null)}
                  data={d}
                  handleEditSuccess={handleEditSuccess}
                />
                <a href="#">
                  <img className="rounded-t-lg w-full h-40 object-cover" src={`http://10.193.129.240:3333/public/img/${d.imagen}`} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{d.nombre}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {expanded[d.id] ? d.descripcion : `${d.descripcion.slice(0, 100)}...`}
                    {d.descripcion.length > 100 && (
                      <button onClick={() => toggleReadMore(d.id)} className="text-blue-500 ml-2">
                        {expanded[d.id] ? 'Leer menos' : 'Leer más'}
                      </button>
                    )}
                  </p>
                  <div className='flex justify-between items-center mb-3'>
                    <a href={d.fuentes} target='_blank' className="mb-3 font-normal text-sm dark:text-gray-400 underline text-blue-500 cursor-pointer">{getDomain(d.fuentes)}</a>
                    <p className={`font-normal text-sm rounded p-1.5 ${getEstadoClass(d.estado)}`}>{d.estado}</p>
                  </div>
                  <div className='flex flex-row gap-2 items-center justify-center h-full'>
                    <Button variant="success" onClick={() => setSelectedPublicacion(d.id)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(d.id)}>Eliminar</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default Publicaciones;

