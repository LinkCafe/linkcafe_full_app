import React from 'react'
import Sidebar from '../components/organismos/Sidebar'

export default function DefaultLayout({children}) {
  return (
    <div className='flex h-screen overflow-hidden'>
        <Sidebar />

        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200'>
            <main>
                <div className='p-6'>
                    {children}
                </div>
            </main>
        </div>
    </div>
  )
}
