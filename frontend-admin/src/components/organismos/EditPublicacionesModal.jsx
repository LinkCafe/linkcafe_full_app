import React, { useRef } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../utils/axiosClient';

export default function EditPublicacionesModal({ open, onClose, data }) {
  const nombre = useRef(null);
  const descripcion = useRef(null);
  const fuentes = useRef(null);
  const tipo = useRef(null);

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
      if (confirm('¿Estas seguro de editar esta Publicacion?')) {
        const Data = {
          nombre: nombre.current.value,
          descripcion: descripcion.current.value,
          fuentes: fuentes.current.value,
          tipo: tipo.current.value
        };
        const response = await axiosClient.put(`/publicaciones/${data.id}`, Data);
        if (response.status === 200) {
          alert('Publicacion Editada Correctamente');
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
          <h1 className='text-2xl'>Editar Publicacion</h1>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label>Nombre</label>
              <input type="text" placeholder='Nombre' className='border border-gray-400 p-1 rounded' required ref={nombre} defaultValue={data.nombre} />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Descripcion</label>
              <input type="text" placeholder='Descripcion' className='border border-gray-400 p-1 rounded' required ref={descripcion} defaultValue={data.descripcion} />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Fuentes</label>
              <input type="text" placeholder='Fuentes' className='border border-gray-400 p-1 rounded' required ref={fuentes} defaultValue={data.fuentes} />
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
            <button type='submit' className='w-full p-1 text-white bg-primary rounded hover:scale-[101%] text-xl'>Editar Publicacion</button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
