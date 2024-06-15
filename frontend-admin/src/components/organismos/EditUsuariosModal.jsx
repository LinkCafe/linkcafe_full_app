import React, { useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Modal } from '@mui/material'
import axiosClient from '../../utils/axiosClient'
import InputFile from '../moleculas/InputFile';
import Label from '../moleculas/Label';
import Select from '../moleculas/Select';
import Button from '../moleculas/Button';
import Input from '../moleculas/Input';
import toast from 'react-hot-toast';


export default function EditUsuariosModal({open, onClose, row}) {

    const nombre_completo = useRef(null)
    const Correo = useRef(null)
    const tipo = useRef(null)

    const tipos = [
        {
            id: 1,
            nombre: 'Usuario'
        },
        {
            id: 2,
            nombre: 'Admin'
        },
        {
            id: 3,
            nombre: 'Redactor'
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(confirm('¿Estas seguro de editar este usuario?')){
                const data = {
                    nombre_completo: nombre_completo.current.value,
                    correo: Correo.current.value,
                    tipo: tipo.current.value
                }
                const response = await axiosClient.put(`/usuarios/${row.id}`, data)
                    if(response.status === 200){
                        toast.success('Usuario Editado Correctamente')
                        onClose()
                    }
            }
        }catch (error) {
            console.error(error)
        }
    }

  return (
    <Modal open={open} onClose={onClose} className='flex justify-center items-center' >
        <div className='lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col'>
            <div className='flex justify-end'>
                <CloseIcon className='hover:text-gray-200 transition-all' onClick={() => onClose()}/>
            </div>
        
            <div className='w-full flex flex-col gap-5'>
                <h1 className='text-2xl'>Editar Usuario</h1>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <Label>Nombre</Label>
                        <Input type="text" placeholder='Nombre Usuario' required ref={nombre_completo} defaultValue={row.nombre_completo}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Correo</Label>
                        <Input type="text" placeholder='Correo' required ref={Correo} defaultValue={row.correo}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Tipo</Label>
                        <Select required ref={tipo}>
                            <option value="">Seleccionar...</option>
                            {tipos.map(tipo => (
                                <option key={tipo.id} value={tipo.id} selected={row.tipo === tipo.nombre.toLocaleLowerCase() ? true : false}>{tipo.nombre}</option>
                            ))}
                        </Select>
                    </div>
                    <Button type="submit" variant="success">Editar</Button>
                </form>
            </div>
        </div>
    </Modal>
  )
}
