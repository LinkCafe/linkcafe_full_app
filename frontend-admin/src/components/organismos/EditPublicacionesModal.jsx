import React, { useRef } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../utils/axiosClient';
import Input from '../moleculas/Input';
import InputFile from '../moleculas/InputFile';
import Label from '../moleculas/Label';
import Select from '../moleculas/Select';
import Button from '../moleculas/Button';

export default function EditPublicacionesModal({ open, onClose, data, handleEditSuccess }) {
  const nombre = useRef(null);
  const descripcion = useRef(null);
  const fuentes = useRef(null);
  const tipo = useRef(null);
  const imagen = useRef(null); // Referencia al campo de entrada de la imagen

  const tipos = [
    {
      id: 1,
      nombre: 'Producción'
    },
    {
      id: 2,
      nombre: 'Barismo'
    },
    {
      id: 3,
      nombre: 'Otros'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (confirm('¿Estás seguro de editar esta Publicación?')) {
        const formData = new FormData(); // Utilizar FormData para enviar archivos
        formData.append('nombre', nombre.current.value);
        formData.append('descripcion', descripcion.current.value);
        formData.append('fuentes', fuentes.current.value);
        formData.append('tipo', tipo.current.value);
        formData.append('imagen', imagen.current.files[0]); 

        const response = await axiosClient.put(`/publicaciones/${data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          alert('Publicación Editada Correctamente');
          handleEditSuccess(); // Llamar a la función para manejar el éxito de la edición
          onClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
      <div className='lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col'>
        <div className='flex justify-end'>
          <CloseIcon className='hover:text-gray-200 transition-all' onClick={() => onClose()} />
        </div>
        <div className='w-full flex flex-col gap-5'>
          <h1 className='text-2xl'>Editar Publicación</h1>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <Label>Nombre</Label>
              <Input type="text" placeholder='Nombre' required ref={nombre} defaultValue={data.nombre} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Descripción</Label>
              <Input type="text" placeholder='Descripción' required ref={descripcion} defaultValue={data.descripcion} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Fuentes</Label>
              <Input type="text" placeholder='Fuentes' required ref={fuentes} defaultValue={data.fuentes} />
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
              <Label>Seleccionar Nueva Imagen</Label>
              <InputFile accept="image/*" ref={imagen} />
            </div>
            <Button type='submit' variant="success">Editar Publicación</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
