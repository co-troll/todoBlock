import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import instance from '../instance';

const UpdateTodoBtn = ({content, dateArr, difficulty, paramId} : {content: string, dateArr: string[], difficulty: string, paramId: string}) => {

  const router = useRouter();

  const queryClient = useQueryClient();

    const todoMutation = useMutation({
      mutationFn: async (data: {content: string, dateArr: string[], difficulty: string}) => {
        console.log(data);
        return await instance.patch(`schedule/update/${paramId}`, data, {
          withCredentials: true
        });
      },
      onError(err) {
        console.log(err);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['viewTodo']);
      }
    })

    const onClickSave = async (e: any) => {
      if(!content) {
        alert('내용을 입력해주세요');
        e.stopPropagation();
      }else {
        await todoMutation.mutateAsync({content, dateArr, difficulty});
        router.push(`/todolist/view/${paramId}`)
      }
    }

  return (
    <div onClick={onClickSave} className='w-6/12 h-14 border border-black flex items-center justify-center'>저장</div>
  )
}

export default UpdateTodoBtn;