'use client'

import React, { useCallback, useEffect, useState } from 'react'
import date from '../../../../public/date.png';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Link from 'next/link';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const page = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  // const [date, setDate] = useState((new Date()));
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  // const [date2, setDate2] = useState((new Date()));

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

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    // 날짜 선택 시 조건 체크: 다음날로 넘어가는 날짜 선택을 막기
    if (end && start > end) {
      alert('종료일은 시작일 이후여야 합니다.');
      return;
    }
    console.log(formatDate(start), formatDate(end));
    setOpenCalendar((prev) => !prev);
    (document.getElementById('setDate1') as HTMLDivElement).innerHTML = `${formatDate(start)}`;
    (document.getElementById('setDate2') as HTMLDivElement).innerHTML = `${formatDate(end)}`;
    setDateRange(dates);
  }

  // const onChangeDate = useCallback((newValue: any) => {
    
  //   const _newValue = formatDate(newValue);
    
  //   const compareDate = (document.getElementById('setDate2') as HTMLDivElement).innerHTML
  //   const _year2= compareDate.split('.')[0];
  //   const _month2 = compareDate.split('.')[1];
  //   const _date2 = compareDate.split('.')[2].split(' ')[0];
  //   const _year = _newValue.split('.')[0];
  //   const _month = _newValue.split('.')[1];
  //   const _date = _newValue.split('.')[2].split(' ')[0];
  //   if((parseInt(_year2) - parseInt(_year) < 0)) {
  //     return alert("다시 입력해주세요");
  //   }
  //   setDate(newValue);
  //   console.log(date)
  //   setOpenCalendar(false);
  //   setOpenCalendar2(false);
  //   const select = document.getElementById('setDate1') as HTMLDivElement;
  //   select.innerHTML = `${_newValue}`
  // }, [date]);

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
                    {/* <input type="date" className='w-10 h-10 border border-black opacity-0 selection:w-40' /> */}
                    <div className='w-full flex items-center text-3xl'>
                      <div onClick={onClickCalendarIcon} id='setDate1' className='w-32 h-8 border border-black text-sm'></div>
                      <div>~</div>
                      <div onClick={onClickCalendarIcon} id='setDate2' className='w-32 h-8 border border-black text-sm'></div>
                    </div>
                    <Calendar className='calendar' selectRange onChange={handleDateChange} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} />
                    {/* <Calendar className='calendar' onChange={onChangeDate} value={date} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} /> */}
                    {/* <Calendar className='calendar2' onChange={onChangeDate2} value={date2} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} /> */}
                </div>
                <div className='w-full border border-black mt-4 flex pl-4'>
                  <span className='w-3/12 h-10 flex items-center'>
                    <div className='w-4 h-4 border border-black bg-yellow-400 mr-1'></div>
                    <span>쉬움</span>
                  </span>
                  <span className='w-3/12 h-10 flex items-center'>
                    <div className='w-4 h-4 border border-black bg-green-400 mr-1'></div>
                    <span>보통</span>
                  </span>
                  <span className='w-3/12 h-10 flex items-center'>
                    <div className='w-4 h-4 border border-black bg-red-400 mr-1'></div>
                    <span>어려움</span>
                  </span>
                </div>
            </div>
            <div className='w-full fixed flex bottom-0 left-0 justify-between border border-black'>
              <Link href={'/todolist'} className='w-6/12 h-14 border border-black flex items-center justify-center'>취소</Link>
              <div onClick={onClickSave} className='w-6/12 h-14 border border-black flex items-center justify-center'>저장</div>
            </div>
        </div>
    </div>
  )
}

export default page