import React from 'react'
import LoginImage from '../../assets/img Login.png'


function Login() {
  return (
    <>
      <div className='bg-gray-200 flex min-h-screen'>
          <div className='flex items-center'>
              <div className='xl:w-1/2 '>
                <img src={LoginImage} alt="" className='max-h-screen object-center ml-30'/>
              </div>
              <div className='bg-whiten rounded-2xl border-stroke dark:border-whiten h-90 w-90 ml-40'>
                <div className=' xl:p-9.5'>
                  <h2 className='text-2xl text-center xl:h-15'>
                    Inicio De Sesión
                  </h2>

                  <form>
                    <div className='mb-4'>
                      <div className='relative'>
                        <input
                          type="email"
                          placeholder='Correo'
                          className='w-full rounded-2xl border my-1 border-strokedark bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-input dark:bg-form-input dark:focus:border-primary'
                        />
                      </div>
                    </div>

                    <div className='mb-6'>
                      <div className='relative'>
                        <input
                          type="password"
                          placeholder='Contraseña'
                          className='w-full rounded-2xl border border-strokedark bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-input dark:focus:border-primary'
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