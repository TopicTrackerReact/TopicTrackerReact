'use client';

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store/store";
import { updateTask } from "@/redux/slices/taskSlice";

export const AllTasks = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    taskName: '',
    notes: '',
    isCompleted: false
  });

  const { taskCache } = useSelector((state: RootState) => state.task);
  const keys = Object.keys(taskCache)

  const arrOfTasks: any[] = [];
  keys.forEach(current => {
    arrOfTasks.push(
      <>
        <button id={current} className="btn" onClick={() => openModal(current)}>
          {current}
        </button>
      </>)
  })

  // const arrOfTasks = useRef<any>([]);

  // useEffect(() => {

  //   arrOfTasks.current = [];
  //   keys.forEach(current => {
  //     arrOfTasks.current.push(
  //       <>
  //         <button id={current} className="btn" onClick={() => openModal(current)}>
  //           {current}
  //         </button>
  //       </>)
  //   })
  // }, [taskCache])


  const openModal = (name: string) => {
    window.my_modal.showModal();
    setTask({ ...task, ...taskCache[name] });
  }


  return (
    <div className="flex flex-wrap gap-3">
      {arrOfTasks}
      <dialog id='my_modal' className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex flex-col gap-3">
            <input className="input focus:input-bordered  max-w-xs bg-inherit focus:outline-none" defaultValue={task.taskName !== '' ? task.taskName : ''} onChange={(e) => setTask({ ...task, taskName: e.target.value })} />
            <textarea className="textarea textarea-bordered focus:outline-none" defaultValue={task.notes !== '' ? task.notes : ''} onChange={(e) => setTask({ ...task, notes: e.target.value })} />
            <div className="flex justify-around">
              <button className="btn btn-sm btn-ghost">
                Close
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => dispatch(updateTask(task))}>
                Save & Close
              </button>
            </div>
          </form>
          <button className="btn btn-sm btn-ghost" onClick={
            () => setTask({ ...task, isCompleted: task.isCompleted ? false : true })
          }>
            {task.isCompleted ? 'Complete' : 'Incomplete'}
          </button>
        </div>
      </dialog>
    </div>
  )
}