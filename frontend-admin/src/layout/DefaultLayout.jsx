import React, { useEffect, useState } from 'react';
import Sidebar from '../components/organismos/Sidebar';
import Header from '../components/organismos/Header';

export default function DefaultLayout({ children, title }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar/>

      <div className="relative flex flex-1 flex-col overflow-hidden">
        
        <main className=' mt-2'>
          {children}
        </main>

      </div>

        <div className='absolute w-full'>
          <Header />
        </div>

    </div>
  );
}