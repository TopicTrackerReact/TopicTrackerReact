'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from '@/_redux/store/store';
import { createTask } from '@/_redux/features/taskSlice';
import store from '@/_redux/store/store';
import { AppDispatch } from '@/_redux/store/store'

export const Input = () => {

  const [task, setTask] = useState('');

  // const { taskNames } = store.getState().task;
  const {taskNames, taskCache} = useSelector((state: RootState) => state.task);

  const dispatch = useDispatch<AppDispatch>();

  const submitTask = () => {
    console.log('task: ', task);
    if (task !== '') {
      console.log(taskNames);
      const tempID = taskNames[task] !== undefined ? taskNames[task] : null;
      if (tempID !== null && taskCache[tempID] !== undefined) alert('No Duplicate Entries Allowed');
      else {
        dispatch(createTask(task));
        setTask('');
      }
    }
  }

  return (
    <div id='inputComp'>
      <input placeholder="Add Topic" type="text" value={task} onChange={
        (e) => setTask(e.target.value.toUpperCase())
      } className="input input-bordered m-3 max-w-xs" />
      <button data-testid="input-test" className='btn' onClick={submitTask}>
        Create
      </button>
    </div>
  )

}