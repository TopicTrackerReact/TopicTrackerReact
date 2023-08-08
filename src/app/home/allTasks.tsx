'use client';

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/_redux/store/store";
import { updateTask, updateCompleted, deleteTask } from "@/_redux/slices/taskSlice";
import { AppDispatch } from '@/_redux/store/store'

export const AllTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [task, setTask] = useState({
    id: NaN,
    taskName: '',
    notes: '',
    isCompleted: false
  });

  const [open, setOpen] = useState(0);

  const { taskCache } = useSelector((state: RootState) => state.task);
  const keys = Object.keys(taskCache)

  const arrOfTasks: any[] = [];
  keys.forEach(currentId => {
    arrOfTasks.push(
      <>
        <button id={currentId}
          className={
            `btn ${Number(currentId) === task.id ?
              (task.isCompleted ? 'bg-green-700 hover:bg-green-900' : null) : null}`
          }
          onClick={() => openModal(currentId)}>
          {taskCache[Number(currentId)].taskName}
        </button>
      </>)
  })

  const openModal = (name: string) => {
    setTask({ ...task, ...taskCache[Number(name)] })
    window.my_modal.showModal();
    setOpen(open + 1)
  }

  useEffect(() => {
    console.log('Task: ', task);
    console.log('Redux Task: ', taskCache[task.id]);
  }, [open])

  const setCompleted = () => {
    setTask({ ...task, isCompleted: task.isCompleted ? false : true })
    dispatch(updateCompleted(task.id))
  }

  // const notesRef = useRef(task.notes)
  return (
    <div className="flex flex-wrap gap-3">
      {arrOfTasks}
      <dialog id='my_modal' className="modal absolute">
        <div className="modal-box flex flex-col">
          <form method="dialog" className="flex flex-col gap-3">
            <input className="input focus:input-bordered  max-w-xs bg-inherit focus:outline-none" value={task.taskName !== '' ? task.taskName : ''} onChange={(e) => setTask({ ...task, taskName: e.target.value.toUpperCase() })} />
            <textarea className="textarea textarea-bordered focus:outline-none" value={task.notes !== '' ? task.notes : ''} onChange={(e) => setTask({ ...task, notes: e.target.value })} />
            <div className="flex justify-around">
              <button className="btn btn-sm btn-ghost" onClick={() => setTask({ ...task, ...taskCache[task.id] })}>
                Close
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => dispatch(updateTask(task))}>
                Save & Close
              </button>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={() => dispatch(deleteTask(task.id))}>
              🗑️
            </button>
          </form>
          <button className="btn btn-sm btn-ghost" onClick={setCompleted}>
            {task.isCompleted ? 'Complete' : 'Incomplete'}
          </button>
        </div>
      </dialog >
    </div >
  )
}