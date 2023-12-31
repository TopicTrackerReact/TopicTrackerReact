"use client";

import { Fragment, use } from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/_redux/store/store";
import {
  updateTask,
  updateCompleted,
  deleteTask,
  updateState,
} from "@/_redux/features/taskSlice";
import { AppDispatch } from "@/_redux/store/store";
import { taskApi } from "@/_redux/features/apiSlice";
import { useGetUserDataQuery } from "@/_redux/features/apiSlice";

export const AllTasksDemo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [initialized, setInitialized] = useState(false);
  // const noTaskNames = useSelector((state: RootState) => Object.keys(state.task.taskNames).length === 0)

  const [task, setTask] = useState({
    id: NaN,
    taskName: "",
    notes: "",
    isCompleted: false,
  });

  // const [open, setOpen] = useState(0);

  const { email } = useSelector((state: RootState) => state.auth);
  const { data } = useGetUserDataQuery(email);
  console.log("dataQuery :", data);
  if (data !== undefined && !initialized) {
    // const { data } = dataQuery;
    const { initialState } = data;
    dispatch(updateState(initialState));
    setInitialized(true);
  }

  // console.log(email);

  // const helper = async (input: string) => {

  //   console.log('helper input: ', input);

  //   const data = await fetch(`/api/sql/getUser?email=${input}`);
  //   const state = await data.json();

  //   console.log('in helper');
  //   console.log('fetch data: ', data);
  //   console.log('state: ', state.initialState);

  //   dispatch(updateState(state.initialState));

  // }

  // if (email && !initialized) setInitialized(true), helper(email);
  // if (noTaskNames) setInitialized(false);

  const { taskCache, taskNames } = useSelector(
    (state: RootState) => state.task
  );
  const keys = Object.keys(taskCache);

  console.log(taskNames);

  const arrOfTasks: any[] = [];
  keys.forEach((currentId, idx) => {
    arrOfTasks.push(
      <Fragment key={idx}>
        <button
          id={currentId}
          data-testid="button-test"
          className={`btn ${
            taskCache[Number(currentId)].isCompleted
              ? "bg-green-500 hover:bg-green-600 border-0 dark:text-white"
              : "dark:bg-zinc-700 dark:text-white border-0 hover:scale-105"
          }`}
          onClick={() => openModal(currentId)}
        >
          {taskCache[Number(currentId)].taskName}
        </button>
      </Fragment>
    );
  });
  const openModal = (name: string) => {
    // console.log('current task id: ', task.id)
    setTask({ ...task, ...taskCache[Number(name)] });
    window.my_modal.showModal();
    // setOpen(open + 1)
  };

  // useEffect(() => {
  //   console.log('Current Task ID: ', task.id);
  //   console.log('Task: ', task);
  //   console.log('Redux Task: ', taskCache[task.id]);
  //   console.log('Task Names: ', taskNames);
  // }, [open])

  const setCompleted = () => {
    setTask({ ...task, isCompleted: task.isCompleted ? false : true });
    dispatch(updateCompleted(task.id));
  };

  const deleteButton = () => {
    // console.log('delete button event: ', e.target.id)
    dispatch(deleteTask(task.id));
  };

  // const notesRef = useRef(task.notes)
  return (
    <div className="flex flex-wrap gap-3">
      {arrOfTasks}
      <dialog id="my_modal" className="modal fixed left-0">
        <div className="modal-box flex flex-col">
          <form method="dialog" className="flex flex-col gap-3">
            <input
              className="input focus:input-bordered bg-inherit m-auto text-center font-bold focus:outline-none"
              value={task.taskName !== "" ? task.taskName : ""}
              onChange={(e) =>
                setTask({ ...task, taskName: e.target.value.toUpperCase() })
              }
            />
            <textarea
              className="textarea textarea-bordered focus:outline-none"
              value={task.notes !== "" ? task.notes : ""}
              onChange={(e) => setTask({ ...task, notes: e.target.value })}
            />
            <div className="flex justify-around">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setTask({ ...task, ...taskCache[task.id] })}
              >
                Close
              </button>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => dispatch(updateTask(task))}
              >
                Save & Close
              </button>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={deleteButton}>
              🗑️
            </button>
          </form>
          <button className="btn btn-sm btn-ghost" onClick={setCompleted}>
            {task.isCompleted ? "Complete" : "Incomplete"}
          </button>
        </div>
      </dialog>
    </div>
  );
};
