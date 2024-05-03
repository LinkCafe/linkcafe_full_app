import React, { useState } from 'react';
import Sidebar from '../components/organismos/Sidebar';
import Header from '../components/organismos/Header';

export default function DefaultLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar Open={openSidebar} />

      <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200 ${openSidebar ? '' : ''}`}>
        <button className="openbtn lg:hidden fixed top-0 left-0 p-4" onClick={toggleSidebar}></button>
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
