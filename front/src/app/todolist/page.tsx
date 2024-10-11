import Link from 'next/link'
import React from 'react'

const page = () => {

  const openMenu = () => {
    
  }

  return (
    <>
      <div className='w-full flex justify-center'>
          <div className='w-11/12'>
            <div className='w-full h-10 flex justify-between pt-3'>
              ㅇㅇ님 환영합니다
              <div>로그아웃버튼</div>
            </div>
            <div className='w-full h-80 border border-black mt-20'></div>
            <div className='w-full mt-8'>
              <h1>해야 할 일</h1>
              <div className='w-full border border-black'>
                <details>
                  <summary className='todo_title'>오늘</summary>
                  <div className='w-full min-h-8 border border-black mt-2'>할일 리스트</div>
                  <div className='w-full h-8 border border-black mt-2'>할일 리스트</div>
                  <div className='w-full h-8 border border-black mt-2'>할일 리스트</div>
                </details>
              </div>
              <div className='w-full border border-black'>
                <details>
                  <summary className='todo_title'>내일</summary>
                  <div className='w-full min-h-8 border border-black mt-2'>할일 리스트</div>
                  <div className='w-full h-8 border border-black mt-2'>할일 리스트</div>
                  <div className='w-full h-8 border border-black mt-2'>할일 리스트</div>
                </details>
              </div>
            </div>
            <div className='w-full mt-8'>
              <h1>완료된 일</h1>
              <div className='w-full'>
                <h1>오늘</h1>
                <div className='w-full h-8 border border-black mt-2'></div>
              </div>
            </div>
            <div className='w-11/12 fixed bottom-10 flex justify-between px-3'>
              <div className='bg-white w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'></div>
              <Link href={'/todolist/add'} className='bg-white w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'>
                <span className='pb-1'>+</span>
              </Link>
            </div>
            {/* <div className='w-full mt-10 flex justify-end'>
                <select name="" id="" className='h-30 w-30 selection:appearance-none'>
                  <option value="">오래된순</option>
                  <option value="">중요도순</option>
                  <option value="">최신순</option>
                </select>
            </div> */}
            {/* <div className='w-full'>
              <div className='w-full h-14 border border-gray-300 mt-3 rounded-lg p-1 px-2 text-lg'>
                <div className='w-full'>
                  <span>안녕</span>
                </div>
                <div className='w-50 text-sm'>
                  몇일 전
                </div>
              </div>
            </div> */}
            <div></div>
          </div>
      </div>
    </>
  )
}

export default page