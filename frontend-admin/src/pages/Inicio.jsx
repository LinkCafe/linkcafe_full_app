import { faFire, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import DefaultLayout from '../layout/DefaultLayout';
import Counts from '../components/organismos/Counts';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import PublicacionesPorDia from '../components/organismos/PublicacionesPorDia';
import { Link } from 'react-router-dom';

function Inicio() {
  const [ totalUsuarios, setTotalUsuarios ] = useState(0)
  const [ totalArticulos, setTotalArticulos ] = useState(0)
  const [ totalPublicaciones, setTotalPublicaciones ] = useState(0)
  const [ totalComentarios, setTotalComentarios ] = useState(0)
  const [ publicaciones, setPublicaciones ] = useState([])

 

  const getData = async () => {
    try {
      await axiosClient.get("/publicaciones").then((response) => {
        if (response.status == 200) {
          setPublicaciones(response.data)
        } 
      })

      await axiosClient.get('/usuarios/contar').then((response) => {
        if (response.status == 200) {
          setTotalUsuarios(response.data.total)
        }
      })

      await axiosClient.get('/publicaciones/contar').then((response) => {
        if (response.status == 200) {
          setTotalPublicaciones(response.data.total)
        }
      })

      await axiosClient.get('/articulos/contar').then((response) => {
        if (response.status == 200) {
          setTotalArticulos(response.data.total)
        }
      })
      
      
      await axiosClient.get('/comentarios/contar').then((response) => {
        if (response.status == 200) {
          setTotalComentarios(response.data.total)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <DefaultLayout title="LinkCafé | Inicio">
      <div className='w-full h-[91%] flex flex-col p-20 gap-10 bg-white rounded-2xl mt-15 overflow-y-auto'>
        <div className='w-full flex flex-row flex-wrap gap-5 justify-center'>
          <Link to="/usuarios">
            <Counts icon={faUser} nombre={'Usuarios:'} cantidad={totalUsuarios} />
          </Link>
          <Link to="/articulos">
            <Counts icon={faNewspaper} nombre={'Articulos:'} cantidad={totalArticulos} />
          </Link>
          <Link to="/publicaciones">
            <Counts icon={faFire} nombre={'Publicaciones:'} cantidad={totalPublicaciones} />
          </Link>
          <Link to="/comentariosj">
            <Counts icon={faMessage} nombre={'Comentarios:'} cantidad={totalComentarios} />
          </Link>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <PublicacionesPorDia data={publicaciones} />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Inicio;