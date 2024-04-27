import React from 'react';
import Sidebar from '../components/organismos/Sidebar';
import sampleImage from '../assets/grafica.png';
import DefaultLayout from '../layout/DefaultLayout';

function Inicio() {
  return (
    <DefaultLayout>
      <div className='w-full h-full flex flex-col p-10 gap-5 bg-white rounded-2xl mt-15'>

        <div className='flex flex-col justify-between h-full gap-10'>
          <div className='flex justify-between'>
            <div className='w-[24%] h-36 border rounded-2xl border-gray-100 bg-gray-200 p-4 mx-2 mt-4'>
              <div className="font-bold text-lg">Usuarios</div>
              <div className="text-center text-5xl text-green-500 font-bold mt-4">80</div>
            </div>
            <div className='w-[24%] h-36 border rounded-2xl border-gray-100 bg-gray-200 p-4 mx-2 mt-4'>
              <div className="font-bold text-lg">Artículos</div>
              <div className="text-center text-5xl text-red-500 font-bold mt-4">50</div>
            </div>
            <div className='w-[24%] h-36 border rounded-2xl border-gray-100 bg-gray-200 p-4 mx-2 mt-4'>
              <div className="font-bold text-lg">Publicaciones</div>
              <div className="text-center text-5xl text-blue-500 font-bold mt-4">100</div>
            </div>
            <div className='w-[24%] h-36 border rounded-2xl border-gray-100 bg-gray-200 p-4 mx-2 mt-4'>
              <div className="font-bold text-lg">Comentarios</div>
              <div className="text-center text-5xl text-orange-500 font-bold mt-4">90</div>
            </div>
          </div>
          <div className='flex justify-center items-end h-[40%]'>

            <div className='w-[63%] h-96 p-4  bg-gray-200 border rounded-2xl border-gray-100 overflow-hidden'>

              <img src={sampleImage} alt="Sample" className="object-cover object-center w-[100%]  h-85 rounded-2xl" />
            </div>
          </div>
        </div>

      </div>
    </DefaultLayout>
  );
}

export default Inicio;