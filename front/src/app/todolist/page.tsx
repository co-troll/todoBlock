import Link from 'next/link'
import React from 'react'

const page = () => {

  const openMenu = () => {
    
  }

  return (
    <>
      <div className='w-9/12 h-screen border border-black absolute z-20 bg-white'>

      </div>
      <div className='w-full flex justify-center'>
          <div className='w-11/12'>
            <div className='w-full h-10 flex justify-between pt-3'>
              <div className='w-10 h-6 flex flex-col justify-between'>
                <span className='bg-black w-7 h-1 rounded-sm'></span>
                <span className='bg-black w-7 h-1 rounded-sm'></span>
                <span className='bg-black w-7 h-1 rounded-sm'></span>
              </div>
              <div className='flex h-10 mr-1'>
                <Link href={'/todolist/search'} className='search-icon'></Link>
              </div>
            </div>
            <div className='w-11/12 fixed bottom-10 flex justify-between px-3'>
              <div className='w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'></div>
              <Link href={'/todolist/add'} className='w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'>
                <span className='pb-1'>+</span>
              </Link>
            </div>
            <div className='w-full mt-10 flex justify-end'>
                <select name="" id="" className='h-30 w-30 selection:appearance-none'>
                  <option value="">오래된순</option>
                  <option value="">중요도순</option>
                  <option value="">최신순</option>
                </select>
            </div>
            <div className='w-full'>
              <div className='w-full h-14 border border-gray-300 mt-3 rounded-lg p-1 px-2 text-lg'>
                <div className='w-full'>
                  <span>안녕</span>
                </div>
                <div className='w-50 text-sm'>
                  몇일 전
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default page