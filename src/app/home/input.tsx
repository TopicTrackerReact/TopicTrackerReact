'use client';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createTask } from '@/_redux/slices/taskSlice';
import store from '@/_redux/store/store';
import { AppDispatch } from '@/_redux/store/store'

export const Input = () => {

  const [task, setTask] = useState('');

  const { taskNames } = store.getState().task;

  const dispatch = useDispatch<AppDispatch>();

  const submitTask = () => {
    console.log('task: ', task);
    if (task !== '') {
      if (taskNames[task]) alert('No Duplicate Entries Allowed');
      else {
        dispatch(createTask(task));
        setTask('');
      }
    }
  }

  return (
    <div id='inputComp'>
      <input type="text" value={task} onChange={
        (e) => setTask(e.target.value)
      } className="input input-bordered m-3 max-w-xs" />
      <button className='btn' onClick={submitTask}>
        Create
      </button>
    </div>
  )

}