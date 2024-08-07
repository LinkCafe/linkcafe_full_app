import { Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react"
import axiosClient from "../../utils/axiosClient"

function ViewComentariosModal({ open, onClose, row }) {
    const [comentarios, setComentarios] = useState([])
    const [ totalComentarios, setTotalComentarios ] = useState(0)
    const getComentarios = async () => {
        try {
            await axiosClient.get(`/comentarios/publicacion/${row.id}`).then((response) => {
                setComentarios({})
                if (response.status === 200) {
                    setTotalComentarios(response.data.total)
                    setComentarios(response.data.comentarios)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (open) {
            setTotalComentarios(0)
            setComentarios([])
            getComentarios()
        }
    }, [open, row])

    const handleDelete = async (id) => {
        try {
            if (confirm('¿Estás seguro de eliminar este comentario?')) {
                await axiosClient.delete(`/comentarios/${id}`).then((response) => {
                    if (response.status === 200) {
                        getComentarios()
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal open={open} onClose={onClose} className="flex justify-center items-center">
            <div className="lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col max-h-[90%] h-auto overflow-hidden">
                <div className="flex justify-end">
                    <CloseIcon className="hover:text-gray-200 transition-all" onClick={() => onClose()} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-xl font-semibold">Lista de comentarios</h1>
                    <div className="flex flex-row gap-5">
                        <div className="w-1/2 flex flex-col gap-2 h-auto overflow-y-scroll">
                            <img src={`http://localhost:3333/public/img/${row.imagen}`} className="w-full max-h-80 object-cover" alt={row.nombre} />
                            <div className="w-full flex flex-row">
                                <p className="w-[25%] font-semibold">Nombre:</p>
                                <p className="w-[75%]">{row.nombre}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-[25%] font-semibold">Descripción:</p>
                                <p className="w-[75%]">{row.descripcion}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-[25%] font-semibold">Fuentes:</p>
                                <p className="w-[75%] truncate break-all ">{row.fuentes}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-[25%] font-semibold">Tipo:</p>
                                <p className="w-[75%]">{row.tipo}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-[25%] font-semibold">Estado:</p>
                                <p className="w-[75%]">{row.estado}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-[25%] font-semibold">Idioma:</p>
                                <p className="w-[75%]">{row.idioma}</p>
                            </div>
                        </div>
                        <div className="w-1/2 h-auto overflow-y-auto">
                            <h1>Comentarios, total {totalComentarios} :</h1>
                            <div className="flex flex-col gap-2">
                                {comentarios.length > 0 ? comentarios.map((c) => (
                                    <div key={c.id} className="flex flex-col gap-2 border border-gray-300 rounded-lg p-2">
                                        <div className="flex flex-row gap-2 justify-between items-center">
                                            <p className="font-semibold">{c.nombre_usuario}</p>
                                            <div className="flex flex-row gap-1 items-center">
                                                <p className="text-sm">{new Date(c.fecha).toLocaleDateString()}</p>
                                                <button className="text-red-500" onClick={() => handleDelete(c.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <p>{c.comentario}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-center text-gray-500">No hay comentarios</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>

    )
}

export default ViewComentariosModal
