'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Link from 'next/link';
import ClockImage from '../../../../public/clock.png';
import WriteTodoBtn from '@/app/components/WriteTodoBtn';
import styles from '../todolist.module.css'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const page = () => {
  const [date, setDate] = useState((new Date()));
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<string[]>([]);
  const [isDateDelete, setisDeleteDate] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const [difficulty, setDifficulty] = useState('');

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

  const onChangeContent = useCallback((e: any) => {
    setContent(e.target.value);
  }, [content])

  const onChangeDate = useCallback((newValue: any) => {
    
    const _newValue = formatDate(newValue);

    setDate(newValue);
    setSelectDate([...selectDate, _newValue])
    setOpenCalendar(false);
  }, [date]);

  useEffect(() => {
    if(!isDateDelete) {
      (document.getElementById('dateBoxes') as HTMLDivElement).innerHTML = '';
      for(let i = 0; i < selectDate.length; i++) {
      const select = document.createElement('div');
      const dltBtn = document.createElement('div');
      dltBtn.classList.add(`${styles.dateDltBtn}`);
      dltBtn.onclick = selectDateDelete
      select.classList.add(`${styles.dateBox}`);
      select.innerHTML = `${selectDate[i]}`
      select.append(dltBtn);
      (document.getElementById('dateBoxes') as HTMLDivElement).append(select);
      }
    }else {
      setisDeleteDate(false);
    }
  }, [selectDate])

  const selectDateDelete = (e: any) => {
    let index = -1;
    for(let i = 0; i < selectDate.length; i++) {
      if(selectDate[i] === e.target.parentNode.innerHTML.split('<')[0]) {
        index = i;
      }
    }
    setisDeleteDate(true);
    setSelectDate(selectDate.splice(index, 1));
    (document.getElementById('dateBoxes') as HTMLDivElement).innerHTML = '';
    for(let i = 0; i < selectDate.length; i++) {
      const select = document.createElement('div');
      const dltBtn = document.createElement('div');
      dltBtn.classList.add(`${styles.dateDltBtn}`);
      dltBtn.onclick = selectDateDelete
      select.classList.add(`${styles.dateBox}`);
      select.innerHTML = `${selectDate[i]}`
      select.append(dltBtn);
      (document.getElementById('dateBoxes') as HTMLDivElement).append(select);
    }
    console.log(selectDate)
  };

  const onClickCalendarIcon = () => {
    setOpenCalendar((prev) => !prev);
  }

  useEffect(() => {
    const calendar = document.querySelector('.calendar') as HTMLElement;
    openCalendar ? calendar.style.display = "block" : calendar.style.display = "none";
  }, [openCalendar]);

  const selectDifficulty = (e: any) => {
    // console.log(e.target.getAttribute('data-difficulty'));
    setDifficulty(e.target.getAttribute('data-difficulty'));
  }

  useEffect(() => {
    switch(difficulty) {
      case "easy" :
        (document.getElementById(`difficulty_${difficulty}`) as HTMLDivElement).style.backgroundColor = "gray";
        (document.getElementById(`difficulty_normal`) as HTMLDivElement).style.backgroundColor = "white";
        (document.getElementById(`difficulty_hard`) as HTMLDivElement).style.backgroundColor = "white";
        break;
      case "normal" :
        (document.getElementById(`difficulty_${difficulty}`) as HTMLDivElement).style.backgroundColor = "gray";
        (document.getElementById(`difficulty_easy`) as HTMLDivElement).style.backgroundColor = "white";
        (document.getElementById(`difficulty_hard`) as HTMLDivElement).style.backgroundColor = "white";
        break;
      case "hard" :
        (document.getElementById(`difficulty_${difficulty}`) as HTMLDivElement).style.backgroundColor = "gray";
        (document.getElementById(`difficulty_easy`) as HTMLDivElement).style.backgroundColor = "white";
        (document.getElementById(`difficulty_normal`) as HTMLDivElement).style.backgroundColor = "white";
        break;
    }
    console.log(difficulty);
  }, [difficulty]);

  return (
    <div className='w-full flex justify-center'>
        <div className='w-11/12'>
            <div className='w-full mt-4'>
              <h1 className='text-2xl'>새 할일 리스트</h1>
            </div>
            <div className='w-full flex flex-col items-center mt-8'>
                <textarea name="" id="content" onChange={onChangeContent} className={`border border-black w-full h-24 ${styles.inputPadding2} text-lg resize-none overflow-hidden`}></textarea>
                <div className='w-full relative mt-4'>
                  <div className='flex items-center h-14 border rounded-sm px-2' onClick={onClickCalendarIcon}>
                    <span>
                      <Image src={ClockImage} width={32} height={32} alt='시계' / >
                    </span>
                    <span className='text-lg ml-1'>시간</span>
                  </div>
                    <div id='dateBoxes' className='w-25 text-3xl mt-4 grid grid-cols-3'></div>
                  <Calendar className={`${styles.calendar} ml-4 calendar`} onChange={onChangeDate} value={date} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} />
                </div>
                <div className='w-full border h-14 border-black mt-3 flex items-center text-lg px-3'>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_easy' data-difficulty='easy' onClick={selectDifficulty}>
                      <div className='w-4 h-4 border border-black bg-yellow-400 mr-1' data-difficulty='easy'></div>
                      <span data-difficulty='easy'>쉬움</span>
                    </div>
                  </span>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_normal' data-difficulty='normal' onClick={selectDifficulty}>
                      <div className='w-4 h-4 border border-black bg-green-400 mr-1' data-difficulty='normal'></div>
                      <span data-difficulty='normal'>보통</span>
                    </div>
                  </span>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_hard' data-difficulty='hard' onClick={selectDifficulty}>
                      <div className='w-4 h-4 border border-black bg-red-400 mr-1' data-difficulty='hard'></div>
                      <span data-difficulty='hard'>어려움</span>
                    </div>
                  </span>
                  {/* <span className='w-3/12 h-12 flex items-center' data-difficulty='normal' onClick={selectDifficulty}>
                    <div className='w-4 h-4 border border-black bg-green-400 mr-1' data-difficulty='normal'></div>
                    <span data-difficulty='normal'>보통</span>
                  </span>
                  <span className='w-3/12 h-12 flex items-center' data-difficulty='hard' onClick={selectDifficulty}>
                    <div className='w-4 h-4 border border-black bg-red-400 mr-1'data-difficulty='hard'></div>
                    <span data-difficulty='hard'>어려움</span>
                  </span> */}
                </div>
            </div>
            <div className='w-full fixed flex bottom-0 left-0 justify-between border border-black'>
              <Link href={'/todolist'} className='w-6/12 h-14 border border-black flex items-center justify-center'>취소</Link>
              <WriteTodoBtn content={content} dateArr={selectDate} difficulty={difficulty} />
            </div>
        </div>
    </div>
  )
}

export default page