import React, { useRef } from 'react'
import LoginImage from '../../assets/img Login.png'
import axiosClient from '../../utils/axiosClient'
import { useNavigate} from 'react-router-dom'

function Login() {
  const correo = useRef(null)
  const clave = useRef(null)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        correo: correo.current.value,
        clave: clave.current.value
      }

      const response = await axiosClient.post("/login", data)
      if (response.status == 200) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/inicio')
      } else if (response.status == 404 || response.status == 500 ) {
        alert('Credenciales erroneas')
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='bg-gray-200 w-full h-screen overflow-hidden flex justify-center items-center'>
          <div className='flex items-center flex-row gap-10'>
              <div className='xl:w-1/2 hidden lg:flex items-center justify-center'>
                <img src={LoginImage} alt=""/>
              </div>
              <div className='bg-whiten rounded-2xl border-stroke dark:border-whiten h-90 w-[90%] lg:w-1/2'>
                <div className='p-10'>
                  <h2 className='text-2xl text-center py-5'>
                    Inicio De Sesión
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                      <div className='relative'>
                        <input
                          type="email"
                          placeholder='Correo'
                          className='w-full rounded-2xl border my-1 border-strokedark bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-input dark:bg-form-input dark:focus:border-primary'
                          ref={correo}
                        />
                      </div>
                    </div>

                    <div className='mb-6'>
                      <div className='relative'>
                        <input
                          type="password"
                          placeholder='Contraseña'
                          className='w-full rounded-2xl border border-strokedark bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-input dark:focus:border-primary'
                          ref={clave}
                        />
                      </div>
                    </div>

                    <div className='mb-5'>
                      <input
                        type="submit"
                        value='Iniciar Sesion'
                        className='w-full cursor-pointer rounded-3xl border bg-[#09AF37] p-3 text-white transition hover:opacity-90 my-3'
                      />
                    </div>
                  </form>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Login