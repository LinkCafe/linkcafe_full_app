import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import axiosClient from '../utils/axiosClient'

function Articulos() {


const [articulos, setArticulos] = useState ([])


const getArticulos = async () => {
  try {
    const response = await axiosClient.get('/articulos')
    if (response.status === 200) {
      setArticulos(response.data)
    }else{
        alert('Error al obtener los artículos');
    }
  } catch (error) {
    console.error(error)
    
  }

}

useEffect (() => {
  getArticulos()
}, [])



const handleDelete = async (id) => {
  try {
    if (confirm('¿Estás Seguro De Eliminar Este Articulo?')) {
    const  response = await axiosClient.delete(`/articulos/${id}`)
      if(response.status === 200) {
        getArticulos()
      }
    }else{
      alert('Articulo No Eliminado')
    }
  } catch (error) {
    console.error(error)
  }
}

  return (
    <>
      <DefaultLayout>
      <div className='w-full h-full flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Articulos</h1>
            {/* <button className='text-white bg-primary p-2 rounded transition-all hover:scale-[105%]' onClick={() => setOpenCreatePublicacionesModal(true)}>Crear Articulo</button> */}
            {/* <CreatePublicacionesModal open={openCreatePublicacionesModal} onClose={() => setOpenCreatePublicacionesModal(false)} /> */}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
            {articulos.map((b, index) => (
              <div key={index} className='w-full bg-gray-200 rounded-xl p-5'>
                {/* <EditPublicacionesModal open={openEditPublicacionesModal} onClose={() => setOpenEditPublicacionesModal(false)} data={b} /> */}
                <div className='text-sm flex flex-row justify-between gap-5'>
                  <span>Andres_España</span>
                  <span className='bg-white rounded-xl p-1'>{b.tipo}</span>
                </div>
                <div className='bg-white rounded-xl p-2 mt-2'>
                  <p className='text-xs'>{b.enlace}</p>
                  <div className='text-sm flex flex-row justify-between gap-5 pt-2'>
                    <p className='text-xl'>{b.nombre}</p>
                    <p>{b.fecha}</p>
                  </div>
                  <div className='p-2'>
                    <p className='text-center text-base'>{b.autor}</p>
                  </div>
                  <div className='text-sm flex flex-row gap-2 justify-center mt-2'>
                    <button className='bg-primary w-10 rounded-xl' onClick={() => setOpenEditPublicacionesModal(true)}>.</button>
                    <button className='bg-red-600 w-10 rounded-xl' onClick={() => handleDelete(b.id)}>.</button>
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