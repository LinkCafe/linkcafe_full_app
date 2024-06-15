import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import axiosClient from '../utils/axiosClient'
import CreateArticulosModal from '../components/organismos/CreateArticulosModal'
import EditArticulosModal from '../components/organismos/EditArticulosModal'
import Button from '../components/moleculas/Button'
import toast, { Toaster } from 'react-hot-toast';

function Articulos() {

  // constante para llamar datos de la base de datos
  const [articulos, setArticulos] = useState([])
  // constante para crear articulos
  const [openCreateArticulosModal, setOpenCreateArticulosModal] = useState(false)

  const [selectedArticulo, setSelectedArticulo] = useState(null);


  const getArticulos = async () => {
    try {
      const response = await axiosClient.get('/articulos')
      if (response.status === 200) {
        setArticulos(response.data)
      } else {
        alert('Error al obtener los artículos');
      }
    } catch (error) {
      console.error(error)

    }

  }

  const handleDelete = async (id) => {
    try {
      if (confirm('¿Estás Seguro De Eliminar Este Articulo?')) {
        const response = await axiosClient.delete(`/articulos/${id}`);
        if (response.status === 200) {
          toast.success('Articulo Eliminado')
          getArticulos();
        }
      } else {
        toast.error('Articulo No Eliminado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticulos()
  }, [openCreateArticulosModal])


  const handleEdit = () => {
    getArticulos();
  };

  return (
    <>
      <DefaultLayout>
        <div className='w-full h-full flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>
          <Toaster />
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Articulos</h1>
            <Button variant="success" onClick={() => setOpenCreateArticulosModal(true)}>Crear Articulo</Button>
            <CreateArticulosModal open={openCreateArticulosModal} onClose={() => setOpenCreateArticulosModal(false)} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {articulos.map((a, index) => (
              <div className="max-w-sm p-6 bg-[#f8f4f1] border border-gray-200 rounded-lg shadow" key={index}>
                <EditArticulosModal open={selectedArticulo === a.id} onClose={() => { setSelectedArticulo(null); handleEdit(); }} data={a} />
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{a.nombre}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 ">{a.enlace}</p>
                <div className="flex items-center justify-between">
                  <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">{a.tipo}</p>
                  <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">{a.autor}</p>
                </div>
                <div className='flex flex-row gap-2 items-center justify-center'>
                  <Button variant="success" onClick={() => setSelectedArticulo(a.id)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDelete(a.id)}>Eliminar</Button>
                </div>
              </div>

            ))}
          </div>
        </div>

      </DefaultLayout>

    </>
  )
}

export default Articulos