import React, { useRef } from 'react'
import { Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../../utils/axiosClient'
import Input from '../moleculas/Input'
import Button from '../moleculas/Button'
import Label from '../moleculas/Label'


export default function EditComentariosModal({open, onClose, row}) {

    const  comentario = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(confirm('¿Estas seguro de editar este Comentario?')){
                const data = {
                    comentario: comentario.current.value,
                }
                const response = await axiosClient.put(`/comentarios/${row.id}`, data)
                    if(response.status === 200){
                        alert('Comentario Editado Correctamente')
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
                <h1 className='text-2xl'>Editar Comentario</h1>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <Label>Comentario</Label>
                        <Input type="text" placeholder='Comentario' className='border border-gray-200 p-1 rounded' required ref={comentario} defaultValue={row.comentario}/>
                    </div>
                    <Button type="submit" variant="success">Guardar</Button>
                </form>
            </div>
        </div>
    </Modal>
  )


}
