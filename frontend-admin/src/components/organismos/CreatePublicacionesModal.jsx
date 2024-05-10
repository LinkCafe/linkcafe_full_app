import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../utils/axiosClient';

export default function CreatePublicacionesModal({ open, onClose }) {
    const [user, setUser] = useState({});
    const nombreRef = useRef(null);
    const descripcionRef = useRef(null);
    const fuentesRef = useRef(null);
    const tipoRef = useRef(null);
    const imagenRef = useRef(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (confirm('¿Estás seguro de crear esta publicación?')) {
                const formData = new FormData();
                formData.append('nombre', nombreRef.current.value);
                formData.append('descripcion', descripcionRef.current.value);
                formData.append('fuentes', fuentesRef.current.value);
                formData.append('tipo', tipoRef.current.value);
                formData.append('id_usuario', user.id);
                formData.append('imagen', imagenRef.current.files[0]);

                const response = await axiosClient.post('/publicaciones', formData, {});

                if (response && response.status === 200) {
                    alert('Publicación creada correctamente');
                    onClose();
                } else {
                    alert('Error al crear la publicación');
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
                    <h1 className='text-2xl'>Crear Publicación</h1>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2'>
                            <label>Nombre</label>
                            <input type="text" placeholder='Nombre' className='border border-gray-400 p-1 rounded' required ref={nombreRef} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Descripción</label>
                            <input type="text" placeholder='Descripción' className='border border-gray-400 p-1 rounded' required ref={descripcionRef} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Fuentes</label>
                            <input type="text" placeholder='Fuentes' className='border border-gray-400 p-1 rounded' required ref={fuentesRef} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Tipo</label>
                            <select className='border border-gray-400 p-1 rounded' required ref={tipoRef}>
                                <option value="">Seleccionar...</option>
                                <option value="1">Producción</option>
                                <option value="2">Barismo</option>
                                <option value="3">Otros</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Seleccionar Imagen</label>
                            <input type="file" className='border border-gray-400 p-1 rounded' accept="image/*" ref={imagenRef} required />
                        </div>
                        <button type='submit' className='w-full p-1 text-white bg-primary rounded hover:scale-[101%] text-xl'>Crear</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
