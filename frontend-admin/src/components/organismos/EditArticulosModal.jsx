import React, { useRef } from 'react'
import { Modal } from '@mui/material';
import axiosClient from '../../utils/axiosClient';
import CloseIcon from '@mui/icons-material/Close';

export default function EditArticulosModal({ open, onClose, data }) {

    const nombre = useRef(null)
    const tipo = useRef(null)
    const enlace = useRef(null)
    const autor = useRef(null)

    const tipos = [
        {
            id: 1,
            nombre: 'PDF'
        },
        {
            id: 2,
            nombre: 'Noticia'
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (confirm('¿Estas seguro de editar este articulo?')) {
                const Data = {
                    nombre: nombre.current.value,
                    tipo: tipo.current.value,
                    enlace: enlace.current.value,
                    autor: autor.current.value
                }
                const response = await axiosClient.put(`/articulos/${data.id}`, Data)
                if (response.status === 200) {
                    alert('Articulo Creado Correctamente');
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
                    <CloseIcon className='hover:text-gray-200 transition-all' onClick={() => onClose()} />
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <h1 className='text-2xl'>Editar Articulo</h1>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2'>
                            <label>Nombre</label>
                            <input type="text" placeholder='Nombre' className='border border-gray-400 p-1 rounded' required ref={nombre} defaultValue={data.nombre} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Tipo</label>
                            <select className='border border-gray-400 p-1 rounded' required ref={tipo} defaultValue={data.tipo}>
                                <option value="">Seleccionar...</option>
                                {tipos.map(tipo => (
                                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Enlace</label>
                            <input type="text" placeholder='Enlace' className='border border-gray-400 p-1 rounded' required ref={enlace} defaultValue={data.enlace}/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Autor</label>
                            <input type="text" placeholder='Autor' className='border border-gray-400 p-1 rounded' required ref={autor} defaultValue={data.autor}/>
                        </div>

                        <button type='submit' className='w-full p-1 text-white bg-primary rounded hover:scale-[101%] text-xl'>Editar</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
