import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className='w-11/12'>
            <div className='w-full h-11 border border-black mt-2 flex items-center'>
                <div className='w-full h-10 flex justify-center items-center before:w-4 before:h-1 before:bg-black after:w-4 after:h-1 after:bg-black after:rotate-45 before:-rotate-45 after:absolute after:top-8 after:left-5 before:absolute before:top-6 before:left-5'>
                <input type="text" className='w-5/6 h-8 input-padding focus:outline-none' placeholder='검색어를 입력하세요' />
                </div>
            </div>
            <div className='w-full h-20 mt-4 border border-black'>

            </div>
        </div>
    </div>
  )
}

export default page