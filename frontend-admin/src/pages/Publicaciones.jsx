import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import CreatePublicacionesModal from '../components/organismos/CreatePublicacionesModal'

function Publicaciones() {
  // Estado Encargado de Mostrar las Publicaciones
  const [publicaciones, setPublicaciones] = useState([])
  // Estado Encargado de Mostrar el Modal de Crear Publicaciones
  const [openCreatePublicacionesModal, setOpenCreatePublicacionesModal] = useState(false)
  // Ejecutar la funciones que tiene dentro cada vez que alla un cambio en el componente

  const getPublicaciones = async () => {
    try {
      const response = await axiosClient.get('/publicaciones')
      if (response.status === 200) {
        setPublicaciones(response.data)
      }else{
        alert('No Se Encontraron Publicaciones')
      }
    } catch (error) {
      console.error(error)
    }
  
  }
  useEffect(() => {

  }, [openCreatePublicacionesModal])

  return (
    <>
    <DefaultLayout>
      <div className='-full h-screen flex flex-col p-10 gap-5  bg-white rounded-2xl mt-15'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-2xl'>Publicaciones</h1>
          <button className='text-white bg-primary p-2 rounded transition-all hover:scale-[105%]' onClick={() => setOpenCreatePublicacionesModal(true)}>Crear Publicacion</button>
          <CreatePublicacionesModal open={openCreatePublicacionesModal} onClose={() => setOpenCreatePublicacionesModal(false)}/>
        </div>
      </div>
    </DefaultLayout>
    </>
  )
}

export default Publicaciones