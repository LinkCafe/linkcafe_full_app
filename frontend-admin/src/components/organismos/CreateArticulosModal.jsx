import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../../utils/axiosClient';

export default function CreateArticulosModal({open, onClose}) {

    const [user, setUser] = useState({})
    const nombre = useRef(null)
    const tipo = useRef(null)
    const enlace = useRef(null)
    const autor = useRef(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(confirm('¿Estas seguro de crear este Articulo?')){
            const data = {
                nombre: nombre.current.value,
                tipo: tipo.current.value,
                enlace: enlace.current.value,
                autor: autor.current.value,
                id_usuario: user.id
            }
            const response = await axiosClient.post('/articulos', data)
                if (response.status === 200) {
                    alert('Articulo Creado Correctamente')
                    onClose()
                }
            }
        } catch (error) {
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
                <h1 className='text-2xl'>Crear Articulos</h1>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label>Nombre</label>
                        <input type="text" placeholder='Nombre' className='border border-gray-400 p-1 rounded' required ref={nombre}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Tipo</label>
                        <select className='border border-gray-400 p-1 rounded' required ref={tipo}>
                            <option value="">Seleccionar...</option>
                            <option value="1">PDF</option>
                            <option value="2">Noticia</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Enlace</label>
                        <input type="text" placeholder='Enlace' className='border border-gray-400 p-1 rounded' required ref={enlace}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Autor</label>
                        <input type="text" placeholder='Autor' className='border border-gray-400 p-1 rounded' required ref={autor}/>
                    </div>
                    
                    <button type='submit' className='w-full p-1 text-white bg-primary rounded hover:scale-[101%] text-xl'>Crear</button>
                </form>
            </div>
        </div>
    </Modal>
  )
}
