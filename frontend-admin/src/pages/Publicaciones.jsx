import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CreatePublicacionesModal from '../components/organismos/CreatePublicacionesModal';
import axiosClient from '../utils/axiosClient';
import EditPublicacionesModal from '../components/organismos/EditPublicacionesModal';
import Button from '../components/moleculas/Button';
import toast, { Toaster } from 'react-hot-toast';

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [openCreatePublicacionesModal, setOpenCreatePublicacionesModal] = useState(false); // Estado para el modal de creación de publicaciones
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);

  const getPublicaciones = async () => {
    try {
      const response = await axiosClient.get('/publicaciones');
      if (response.status === 200) {
        setPublicaciones(response.data);
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
        const response = await axiosClient.delete(`/Publicaciones/${id}`);
        if (response.status === 200) {
          toast.success('publicacion Eliminada')
          getPublicaciones();
        }
      } else {
        toast.error('Publicacion No Eliminada')
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleEdit = () => {
    getPublicaciones();
  };
  return (
    <>
      <DefaultLayout>
        <div className='w-full h-full flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>
          <Toaster />
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Publicaciones</h1>
            <Button variant="success" onClick={() => setOpenCreatePublicacionesModal(true)}>Crear Publicacion</Button>
            <CreatePublicacionesModal open={openCreatePublicacionesModal} onClose={() => setOpenCreatePublicacionesModal(false)} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto h-[calc(100vh-200px)]'>
            {publicaciones.map((d, index) => (
              <div className="max-w-sm bg-[#f8f4f1] border border-gray-300 rounded-lg shadow-xl" key={index}>
                <EditPublicacionesModal
                  open={selectedPublicacion === d.id}
                  onClose={() => { setSelectedPublicacion(null); }}
                  data={d}
                  handleEditSuccess={handleEditSuccess} // Pasar la función para manejar el éxito de la edición
                />
                <a href="#">
                  <img className="rounded-t-lg w-full" src={`http://localhost:3333/public/img/${d.imagen}`} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{d.nombre}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.descripcion}</p>
                  <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">{d.fuentes}</p>
                  <div className='flex flex-row gap-2 items-center justify-center'>
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