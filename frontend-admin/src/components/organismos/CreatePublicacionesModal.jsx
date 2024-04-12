import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../../utils/axiosClient'

export default function CreatePublicacionesModal({open, onClose}) {
    const [ user, setUser ] = useState({})
    const nombre = useRef(null)
    const descripcion = useRef(null)
    const fuentes = useRef(null)
    const tipo = useRef(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(confirm('¿Estas seguro de crear esta publicacion?')){
                const data = {
                    nombre: nombre.current.value,
                    descripcion: descripcion.current.value,
                    fuentes: fuentes.current.value,
                    tipo: parseInt(tipo.current.value),
                    id_usuario: user.id
                }
                const response = await axiosClient.post(`/publicaciones`, data)
                    if(response.status === 201){
                        alert('Publicacion Creada Correctamente')
                        onClose()
                    }
            }
        }catch (error) {
            console.error(error)
        }
    }

  return (
    <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
        <div className='lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col'>
            <div className='flex justify-end'>
                <CloseIcon className='hover:text-gray-200 transition-all' onClick={() => onClose()}/>
            </div>
            <div className='w-full flex flex-col gap-5'>
                <h1 className='text-2xl'>Crear Publicacion</h1>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label>Nombre</label>
                        <input type="text" placeholder='Nombre' className='border border-gray-400 p-1 rounded' required ref={nombre}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Descripcion</label>
                        <input type="text" placeholder='Descripcion' className='border border-gray-400 p-1 rounded' required ref={descripcion}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Fuentes</label>
                        <input type="text" placeholder='Fuentes' className='border border-gray-400 p-1 rounded' required ref={fuentes}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Tipo</label>
                        <select className='border border-gray-400 p-1 rounded' required ref={tipo}>
                            <option value="">Seleccionar...</option>
                            <option value="1">Produccion</option>
                            <option value="2">Barismo</option>
                            <option value="3">Otros</option>
                        </select>
                    </div>
                    <button type='submit' className='w-full p-1 text-white bg-primary rounded hover:scale-[101%] text-xl'>Crear</button>
                </form>
            </div>
        </div>
    </Modal>
  )
}
