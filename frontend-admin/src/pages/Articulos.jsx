import { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import axiosClient from '../utils/axiosClient'
import CreateArticulosModal from '../components/organismos/CreateArticulosModal'
import EditArticulosModal from '../components/organismos/EditArticulosModal'
import Button from '../components/moleculas/Button'
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Articulos() {
  const [articulos, setArticulos] = useState([])
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

  const getDomain = (url) => {
    const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/i);
    return match ? match[1] : '';
  }

  return (
    <>
      <DefaultLayout title="LinkCafé | Articulos">
        <div className='w-full h-full flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Articulos</h1>
            <Button variant="success" onClick={() => setOpenCreateArticulosModal(true)}>Crear Articulo</Button>
            <CreateArticulosModal open={openCreateArticulosModal} onClose={() => setOpenCreateArticulosModal(false)} />
          </div>
          <div className='flex flex-wrap gap-4 overflow-y-auto h-[calc(100vh-200px)]'>
            {articulos.map((a, index) => (
              <div className="w-full max-w-md p-6 grid gap-6 shadow-lg border border-gray-300 rounded" key={index}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{a.nombre}</h3>
                  <div className="flex items-center flex-col gap-2 text-sm text-muted-foreground">
                    <span>{new Date(a.fecha).toLocaleDateString()}</span>
                    <div className='flex flex-row gap-2 items-center'>
                      <FontAwesomeIcon icon={faFile} />
                      <span>{a.tipo}</span>
                    </div>
                    <EditArticulosModal open={selectedArticulo === a.id} onClose={() => { setSelectedArticulo(null); handleEdit(); }} data={a} />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {a.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <a href={a.enlace} className="text-blue-400 underline text-sm" target='_blank'>
                    {getDomain(a.enlace)}
                  </a>
                  <div className="flex items-center gap-2">
                    <button className='flex flex-row gap-1 justify-center items-center' onClick={() => setSelectedArticulo(a.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                      Editar
                    </button>
                    <button className='flex flex-row gap-1 justify-center items-center text-white p-2 bg-red-600 hover:bg-red-700 transition-all rounded' onClick={() => handleDelete(a.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                      Eliminar
                    </button>
                  </div>
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