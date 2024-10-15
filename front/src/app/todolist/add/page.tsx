'use client'

import React, { useCallback, useEffect, useState } from 'react'
import date from '../../../../public/date.png';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Link from 'next/link';
import ClockImage from '../../../../public/clock.png';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const page = () => {
  const [date, setDate] = useState((new Date()));
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    // 요일 배열을 정의 (일~토)
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
    // 연도, 월, 일 추출
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');
  
    // 요일 추출
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    // 원하는 형식으로 반환
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const onChangeDate = useCallback((newValue: any) => {
    
    const _newValue = formatDate(newValue);

    setDate(newValue);
    console.log(date)
    setOpenCalendar(false);
    const select = document.createElement('div');
    const dltBtn = document.createElement('div');
    dltBtn.classList.add('date-dlt-btn');
    select.classList.add('date-box');
    select.innerHTML = `${_newValue}`
    select.append(dltBtn)
    document.getElementById('dateBoxes')?.append(select);
  }, [date]);

  // const onChangeDate2 = useCallback((newValue: any) => {
  //   const _newValue = formatDate(newValue);
  //   setDate2(newValue);
  //   console.log(date)
  //   setOpenCalendar(false);
  //   setOpenCalendar2(false);
  //   const select = document.getElementById('setDate2') as HTMLDivElement;
  //   select.innerHTML = `${_newValue}`
  // }, [date2]);

  const onClickCalendarIcon = () => {
    setOpenCalendar((prev) => !prev);
  }

  const onClickSave = () => {
    
  }

  useEffect(() => {
    const calendar = document.querySelector('.calendar') as HTMLElement;
    console.log("바뀜")
    openCalendar ? calendar.style.display = "block" : calendar.style.display = "none";
  }, [openCalendar]);

  return (
    <div className='w-full flex justify-center'>
        <div className='w-11/12'>
            <div className='w-full mt-4'>
              <h1 className='text-2xl'>새 할일 리스트</h1>
            </div>
            <div className='w-full flex flex-col items-center mt-8'>
                <textarea name="" id="" className='border border-black w-full h-24 input-padding2 text-lg'></textarea>
                <div className='w-full relative mt-4'>
                  <div className='flex items-center h-14 border rounded-sm px-2' onClick={onClickCalendarIcon}>
                    <span>
                      <Image src={ClockImage} width={32} height={32} alt='시계' / >
                    </span>
                    <span className='text-lg ml-1'>시간</span>
                  </div>
                    <div id='dateBoxes' className='w-25 text-3xl mt-4 grid grid-cols-3'>
                      <div className='date-box relative'>
                        <div className='date-dlt-btn'></div>
                      </div>
                      <div className='date-box'></div>
                      <div className='date-box'></div>
                      <div className='date-box'></div>
                      <div className='date-box'></div>
                    </div>
                  <Calendar className='calendar' onChange={onChangeDate} value={date} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} />
                </div>
                <div className='w-full border border-black mt-3 flex pl-4 text-lg'>
                  <span className='w-3/12'>
                    <div className='w-8/12 h-12 flex items-center cursor-pointer'>
                      <div className='w-4 h-4 border border-black bg-yellow-400 mr-1'></div>
                      <span>쉬움</span>
                    </div>
                  </span>
                  <span className='w-3/12 h-12 flex items-center'>
                    <div className='w-4 h-4 border border-black bg-green-400 mr-1'></div>
                    <span>보통</span>
                  </span>
                  <span className='w-3/12 h-12 flex items-center'>
                    <div className='w-4 h-4 border border-black bg-red-400 mr-1'></div>
                    <span>어려움</span>
                  </span>
                </div>
            </div>
            {/* <div className='w-full fixed flex bottom-0 left-0 justify-between border border-black'>
              <Link href={'/todolist'} className='w-6/12 h-14 border border-black flex items-center justify-center'>취소</Link>
              <div onClick={onClickSave} className='w-6/12 h-14 border border-black flex items-center justify-center'>저장</div>
            </div> */}
        </div>
    </div>
  )
}

export default page