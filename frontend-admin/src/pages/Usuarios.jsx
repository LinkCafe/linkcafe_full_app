import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import axiosClient from '../utils/axiosClient'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import EditUsuariosModal from '../components/organismos/EditUsuariosModal'
import toast from 'react-hot-toast'
import { Box } from '@mui/material'

function Usuarios() {
  // constante de estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([])
  // constante de estado para abrir el modal de editar usuarios
  const [openEditUsuariosModal, setOpenEditUsuariosModal] = useState(false)
  // constante de estado para almacenar la fila seleccionada
  const [row, setRow] = useState({})


  // Función para obtener Todos Los usuarios
  const getUsuarios = async () => {
    try {
      const response = await axiosClient.get('/usuarios')
      if (response.status === 200) {
        console.log(response.data)
        setUsuarios(response.data)
      } else {
        alert('No Se Encontraron Usuarios')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsuarios()
  }, [openEditUsuariosModal])

  // función para eliminar un usuario
  const handleDelete = async (id) => {
    try {
      if (confirm('¿Estás Seguro De Eliminar Este Usuario?')) {
        const response = await axiosClient.delete(`/usuarios/${id}`)
        if (response.status === 200) {
          toast.success('Usuario Eliminado')
          getUsuarios()
        }
      } else {
        toast.error('Usuario No Eliminado')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <DefaultLayout title="LinkCafé | Usuarios">
        <div className='w-full h-screen flex flex-col p-10 gap-5  bg-white rounded-2xl mt-15'>

          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl'>Usuarios</h1>
            <EditUsuariosModal open={openEditUsuariosModal} onClose={() => setOpenEditUsuariosModal(false)} row={row} />
          </div>
          <Box className="w-full h-[80%]">
            <DataGrid
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              columns={[
                { field: 'id', headerName: 'ID', width: 90, flex: 1 },
                { field: 'nombre_completo', headerName: 'Nombre', width: 150, flex: 1 },
                { field: 'correo', headerName: 'Correo', width: 150, flex: 1 },
                { field: 'tipo', headerName: 'Tipo', width: 150, flex: 1 },
                {
                  field: 'actions',
                  type: 'actions',
                  getActions: ({ row }) => [
                    <GridActionsCellItem label="Editar" title="Editar" icon={<EditIcon />} onClick={() => {
                      setRow(row)
                      setOpenEditUsuariosModal(true)
                    }} />,
                    <GridActionsCellItem label="Eliminar" title="Eliminar" icon={<DeleteIcon />} onClick={() => handleDelete(row.id)} />
                  ],
                  flex: 1
                }
              ]}
              rows={usuarios}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: {
                    disableToolbarButton: true,
                  },
                }
              }}
            />
          </Box>
        </div>
      </DefaultLayout>
    </>
  )
}

export default Usuarios