import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import axiosClient from '../utils/axiosClient';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import EditComentariosModal from '../components/organismos/EditComentariosModal';
import toast from 'react-hot-toast';

function Comentarios() {
  // constante de estado para almacenar los comentarios
  const [comentarios, setComentarios] = useState([])
  // constante de estado para abrir el modal de editar Comentarios
  const [ openEditComentariosModal, setOpenEditComentariosModal ] = useState(false)
  // constante de estado para almacenar la fila seleccionada
  const [ row, setRow ] = useState({})


  // funcion encargada de traer los comentarios de la base de datos
  const getComentarios = async () => {
    try {
      const  response = await axiosClient.get('/comentarios')
      if (response.status == 200) {
        console.log(response.data)
        setComentarios(response.data)
      } else {
        alert('No Se Encontro Ningun Comentario')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect (() => {
    getComentarios()
  }, [openEditComentariosModal])

  // función para eliminar un Comentario
  const handleDelete = async (id) => {
    try {
      if (confirm('¿Estás Seguro De Eliminar Este Comenatario?')) {
      const  response = await axiosClient.delete(`/comentarios/${id}`)
        if(response.status === 200) {
          toast.success('Comentario Eliminado')
          getComentarios()
        }
      }else{
        toast.error('Comenatario No Eliminado')
      }
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <>
      <DefaultLayout>
        <div className='w-full h-[91%] flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>
            <div className='flex flex-row justify-between '>
              <h1 className='text-2xl'>Comentarios</h1>
              <EditComentariosModal  open={openEditComentariosModal} onClose={() => setOpenEditComentariosModal(false)} row={row} />
            </div>
            <DataGrid 
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                slots={{toolbar: GridToolbar}}
                columns={[
                  {
                    field:'id', headerName: 'ID', flex: 1
                  },
                  {
                    field: 'comentario', headerName: 'Comentario', flex: 1
                  },
                  {
                    field: 'fecha', headerName: 'Fecha', flex: 1
                  },
                  { 
                    field: 'actions',
                    type: 'actions',
                    getActions: ({ row }) => [
                      <GridActionsCellItem label="Editar" title="Editar" icon={<EditIcon/>} onClick={() => {
                        setRow(row)
                        setOpenEditComentariosModal(true)
                      }}/>,
                      <GridActionsCellItem label="Eliminar" title="Eliminar" icon={<DeleteIcon/>} onClick={ () => handleDelete(row.id) } />
                    ],
                    flex: 1
                  }
                ]}
                rows={comentarios}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    printOptions: {
                      disableToolbarButton: true,
                    },
                  }
                }}
            />   
        </div>
      </DefaultLayout>
    </>
  );
}

export default Comentarios;