'use client';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createTask } from '@/redux/slices/taskSlice';

export const Input = () => {

  const [task, setTask] = useState('');

  const dispatch = useDispatch();

  const submitTask = () => {
    console.log('task: ', task);
    if (task !== '') {
      dispatch(createTask(task));
      setTask('');
    }
  }

  return (
    <div id='inputComp'>
      <input type="text" value={task} onChange={
        (e) => setTask(e.target.value)
      } className="input input-bordered w-full max-w-xs" />
      <button className='btn' onClick={submitTask}>
        Create
      </button>
    </div>
  )

}