import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import instance from '../instance';

const WriteTodoBtn = ({content, dateArr, difficulty} : {content: string, dateArr: string[], difficulty: string}) => {

  const router = useRouter();

    const todoMutation = useMutation({
      mutationFn: async (data: {content: string, dateArr: string[], difficulty: string}) => {
        console.log(data);
        return await instance.post('schedule', data, {
          withCredentials: true
        });
      },
      onError(err) {
        console.log(err);
      }
    })

    const onClickSave = (e: any) => {
      if(!content) {
        alert("내용을 입력해주세요");
        e.stopPropagation();
      }else if(!difficulty){
        alert("난이도를 선택해주세요")
      }
      else {
        todoMutation.mutate({content, dateArr, difficulty});
        router.push('/todolist')
      }
    }

  return (
    <div onClick={onClickSave} className='w-6/12 h-14 border border-black flex items-center justify-center'>저장</div>
  )
}

export default WriteTodoBtn