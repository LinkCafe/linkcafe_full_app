import React, { useState } from 'react';
import Sidebar from '../components/organismos/Sidebar';
import Header from '../components/organismos/Header';

export default function DefaultLayout({ children }) {

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar/>

      <div className="relative flex flex-1 flex-col overflow-hidden bg-gray-200">
        
        <main className='p-6 mt-2'>
          {children}
        </main>

        <div className='absolute w-full'>
          <Header />
        </div>
      </div>
    </div>
  );
}
