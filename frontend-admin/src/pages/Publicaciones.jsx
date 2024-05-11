import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CreatePublicacionesModal from '../components/organismos/CreatePublicacionesModal';
import axiosClient from '../utils/axiosClient';
import EditPublicacionesModal from '../components/organismos/EditPublicacionesModal';

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
               getPublicaciones();
             }
           } else {
             alert('Publicacion No Eliminada');
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
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Publicaciones</h1>
            <button className='text-white bg-primary p-2 rounded transition-all hover:scale-[105%]' onClick={() => setOpenCreatePublicacionesModal(true)}>Crear Publicacion</button>
            {/* Utiliza el estado openCreatePublicacionesModal para controlar la apertura del modal de creación */}
            <CreatePublicacionesModal open={openCreatePublicacionesModal} onClose={() => setOpenCreatePublicacionesModal(false)} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
            {publicaciones.map((d, index) => (
              <div key={index} className='w-full bg-gray-200 rounded-xl p-5'>
                <EditPublicacionesModal
                  open={selectedPublicacion === d.id}
                  onClose={() => { setSelectedPublicacion(null); }}
                  data={d}
                  handleEditSuccess={handleEditSuccess} // Pasar la función para manejar el éxito de la edición
                />
                <div className='text-sm flex flex-row justify-between gap-5'>
                  <span>Andres_España</span>
                  <span className='bg-white rounded-xl p-1'>{d.tipo}</span>
                </div>
                <div className='bg-white rounded-xl p-2 mt-2'>
                  <p className='text-xs'>{d.fuentes}</p>
                  <div className='text-sm flex flex-row justify-between gap-5 pt-2'>
                    <p className='text-xl'>{d.nombre}</p>
                    <p>{new Date(d.fecha).toLocaleDateString()}</p>
                  </div>
                  <div className='p-2'>
                    <p className='text-center text-base'>{d.descripcion}</p>
                  </div>
                  <div>
                    <img src={`http://localhost:3333/public/img/${d.imagen}`} alt='' className='w-full p-1' />
                  </div>
                  <div className='text-sm flex flex-row gap-2 justify-center mt-2'>
                    <button className='bg-primary w-10 rounded-xl' onClick={() => setSelectedPublicacion(d.id)}>.</button>
                    <button className='bg-red-600 w-10 rounded-xl' onClick={() => handleDelete(d.id)}>.</button>
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
