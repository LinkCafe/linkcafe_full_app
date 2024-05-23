import React, { useState } from 'react';
import Sidebar from '../components/organismos/Sidebar';
import Header from '../components/organismos/Header';

export default function DefaultLayout({ children }) {

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar/>

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
        
        <main className='p-6'>
          {children}
        </main>

        <div className='absolute top-0 right-0 p-7'>
          <Header />
        </div>
      </div>
    </div>
  );
}
