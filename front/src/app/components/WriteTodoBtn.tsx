import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

const WriteTodoBtn = ({content, dateArr, difficulty} : {content: string, dateArr: string[], difficulty: string}) => {

    const todoMutation = useMutation({
      mutationFn: async (data: {content: string, dateArr: string[], difficulty: string}) => {
        console.log(data);
        return await axios.post('http://localhost:4000/schedule', data, {
          withCredentials: true
        });
      },
      onError(err) {
        console.log(err);
      }
    })

    const onClickSave = () => {
      todoMutation.mutate({content, dateArr, difficulty});
    }

  return (
    <Link href={'/todolist'} onClick={onClickSave} className='w-6/12 h-14 border border-black flex items-center justify-center'>저장</Link>
  )
}

export default WriteTodoBtn