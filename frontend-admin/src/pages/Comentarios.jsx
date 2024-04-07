import React from 'react';
import Sidebar from '../components/organismos/Sidebar';

function Comentarios() {
  return (
    <>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
      <div className='bg-gray-200 flex min-h-screen'>
        <Sidebar />
        <div className='bg-gray-100 rounded-2xl border border-gray-100 dark:border-whiten fixed inset-y-0 left-5 w-[77rem] ml-67 my-4 mt-22 p-4 h-15'>
          <div className="flex justify-between">
            <div className="font-bold text-lg">Comentarios</div>
            <div className="font-bold text-lg ml-[65%]">Actualizar</div>
            <div className="font-bold text-lg mr-14">Eliminar</div>
          </div>
        </div>

        <hr className="h-px bg-gray-700 border-0 dark:bg-gray-700 mx-6 mt-14" />
        <div className='bg-gray-100 rounded-2xl border border-gray-100 dark:border-whiten fixed inset-y-0 left-5 w-[77rem] ml-67 my-4 mt-44 p-4 h-lvh'>
          <div className='flex flex-col'>
            <div className='w-full h-27 border border-gray-100 bg-gray-200 p-4 my-4 flex flex-col items-start'>
              <div className="font-bold text-xl">Titulo Comentario</div>
              <p className="text-lg w-[38rem] font-bold rounded-2xl border ">Muy bien empaquetado, aroma intenso, pero no los he probado.</p>
              <div className="flex justify-end mt-[-3.5%] ml-[77%] ">
                <div className="bg-green-500 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2 mr-8 ml-5 "><i class="fa-solid fa-pen-to-square"></i></div>
                <div className="bg-red-600 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2 "><i class="fa-solid fa-delete-left"></i></div>
              </div>
            </div>
            <hr className="h-px bg-gray-500 border-0 dark:bg-gray-700 mx-2" />
            <div className='w-full h-27 border border-gray-100 bg-gray-200 p-4 my-4 flex flex-col items-start'>
              <div className="font-bold text-xl">Titulo Comentario</div>
              <p className="text-lg w-[38rem] font-bold rounded-2xl border ">Muy bien empaquetado, aroma intenso, pero no los he probado.</p>
              <div className="flex justify-end mt-[-3.5%] ml-[77%] ">
                <div className="bg-green-500 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2 mr-8 ml-5 "><i class="fa-solid fa-pen-to-square"></i></div>
                <div className="bg-red-600 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2"><i class="fa-solid fa-delete-left"></i></div>
              </div>
            </div>
            <hr className="h-px bg-gray-400 border-0 dark:bg-gray-500 mx-2" />
            <div className='w-full h-27 border border-gray-100 bg-gray-200 p-4 my-4 flex flex-col items-start'>
              <div className="font-bold text-xl">Titulo Comentario</div>
              <p className="text-lg w-[38rem] font-bold rounded-2xl border ">Muy bien empaquetado, aroma intenso, pero no los he probado.</p>
              <div className="flex justify-end mt-[-3.5%] ml-[77%] ">
                <div className="bg-green-500 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2 mr-8 ml-5 "><i class="fa-solid fa-pen-to-square"></i></div>
                <div className="bg-red-600 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2"><i class="fa-solid fa-delete-left"></i></div>
              </div>
            </div>
            <hr className="h-px bg-gray-700 border-0 dark:bg-gray-700 mx-2" />
            <div className='w-full h-27 border border-gray-100 bg-gray-200 p-4 my-4 flex flex-col items-start'>
              <div className="font-bold text-xl">Titulo Comentario</div>
              <p className="text-lg w-[38rem] font-bold rounded-2xl border ">Muy bien empaquetado, aroma intenso, pero no los he probado.</p>
              <div className="flex justify-end mt-[-3.5%] ml-[77%] ">
                <div className="bg-green-500 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2 mr-8 ml-5 "><i class="fa-solid fa-pen-to-square"></i></div>
                <div className="bg-red-600 font-bold text-xl rounded-2xl border dark:border-white px-9 py-2"><i class="fa-solid fa-delete-left"></i></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Comentarios;