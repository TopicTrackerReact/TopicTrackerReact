'use client';

import { Fragment } from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/_redux/store/store";
import { updateTask, updateCompleted, deleteTask } from "@/_redux/features/taskSlice";
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

  const { taskCache, taskNames } = useSelector((state: RootState) => state.task);
  const keys = Object.keys(taskCache)

  // useSelector((state: RootState) => console.log('task reducer: ', state.task.taskNames));
  // console.log('task Cache: ', taskCache)

  const arrOfTasks: any[] = [];
  keys.forEach((currentId, idx) => {
    arrOfTasks.push(
      <Fragment key={idx}>
        <button id={currentId}
          data-testid="button-test"
          className={
            `btn ${Number(currentId) === task.id ?
              (task.isCompleted ? 'bg-green-500 hover:bg-green-600' : null) : null}`
          }
          onClick={() => openModal(currentId)}>
          {taskCache[Number(currentId)].taskName}
        </button>
      </Fragment>)
  })
  const openModal = (name: string) => {
    // console.log('current task id: ', task.id);
    setTask({ ...task, ...taskCache[Number(name)] });
    window.my_modal.showModal();
    setOpen(open + 1)
  }

  useEffect(() => {
    console.log('Current Task ID: ', task.id);
    console.log('Task: ', task);
    console.log('Redux Task: ', taskCache[task.id]);
    console.log('Task Names: ', taskNames);
  }, [open])

  const setCompleted = () => {
    setTask({ ...task, isCompleted: task.isCompleted ? false : true })
    dispatch(updateCompleted(task.id))
  }
  const deleteButton = (e) => {
    console.log('delete button event: ', e.target.id)
    dispatch(deleteTask(e.target.id))
  }

  // const notesRef = useRef(task.notes)
  return (
    <div className="flex flex-wrap gap-3">
      {arrOfTasks}
      <dialog id='my_modal' className="modal absolute">
        <div className="modal-box flex flex-col">
          <form method="dialog" className="flex flex-col gap-3">
            <input className="input focus:input-bordered bg-inherit m-auto text-center font-bold focus:outline-none" value={task.taskName !== '' ? task.taskName : ''} onChange={(e) => setTask({ ...task, taskName: e.target.value.toUpperCase() })} />
            <textarea className="textarea textarea-bordered focus:outline-none" value={task.notes !== '' ? task.notes : ''} onChange={(e) => setTask({ ...task, notes: e.target.value })} />
            <div className="flex justify-around">
              <button className="btn btn-sm btn-ghost" onClick={() => setTask({ ...task, ...taskCache[task.id] })}>
                Close
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => dispatch(updateTask(task))}>
                Save & Close
              </button>
            </div>
            <button id={(task.id).toString()} className="btn btn-sm btn-ghost" onClick={(e) => deleteButton(e)}>
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