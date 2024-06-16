import React, { useRef } from 'react'
import { Modal } from '@mui/material';
import axiosClient from '../../utils/axiosClient';
import CloseIcon from '@mui/icons-material/Close';
import Input from '../moleculas/Input';
import Label from '../moleculas/Label';
import Select from '../moleculas/Select';
import Button from '../moleculas/Button';
import toast from 'react-hot-toast';

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
                    toast.success('¡Artículo editado con éxito!');
                    onClose()
                }
            }

        } catch (error) {
            console.error(error)
            toast.error('Error al editar el articulo')
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
                            <Label>Nombre</Label>
                            <Input type="text" placeholder='Nombre' required ref={nombre} defaultValue={data.nombre} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Tipo</Label>
                            <Select required ref={tipo} defaultValue={data.tipo}>
                                <option value="">Seleccionar...</option>
                                {tipos.map(tipo => (
                                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Enlace</Label>
                            <Input type="text" placeholder='Enlace' required ref={enlace} defaultValue={data.enlace}/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Autor</Label>
                            <Input type="text" placeholder='Autor' required ref={autor} defaultValue={data.autor}/>
                        </div>

                        <Button type='submit' variant="success" >Editar</Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
