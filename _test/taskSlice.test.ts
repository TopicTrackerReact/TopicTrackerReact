import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { RootState } from "@/_redux/store/store";
import { useStore } from "react-redux";
import reducer, {
  createTask,
  updateTask,
  updateCompleted,
  deleteTask,
} from "@/_redux/features/taskSlice";
import type { InitialState } from "@/_redux/features/taskSlice";
import type { Task } from "@/_redux/features/taskSlice";

import store from "@/_redux/store/store";

describe("Tests for proper functionality of reducer functions in taskSlice", () => {
  let taskState: InitialState;

  beforeEach(() => {
    taskState = store.getState().task;
    console.log("current state: ", taskState);

    // RESET IF ENTRIES PERSIST
    if (Object.keys(taskState.taskNames).length !== 0) {
      taskState = {
        ...taskState,
        taskCache: {},
        taskNames: {},
        maxId: 0,
        totalTasks: 0,
      };
      console.log("Current State post reset: ", taskState);
    }
  });

  describe("Create task function test", () => {
    it("Should create a new task and populate the taskCache", () => {
      expect(reducer(taskState, createTask("React"))).toEqual({
        taskCache: {
          0: { id: 0, taskName: "React", notes: "", isCompleted: false },
        },
        taskNames: { React: 0 },
        totalTasks: 1,
        maxId: 1,
      });
    });
  });
  describe("Update task function test", () => {
    it("Should update a task and not add to the taskCache", () => {
      // console.log('taskState after first test: ', taskState.taskCache);

      // ADD NEW TASK
      store.dispatch(createTask("React"));
      console.log('current taskCache after dispatch in update: ', store.getState().task);

      const testTask: Task = {
        id: 0,
        taskName: "Redux",
        notes: "",
        isCompleted: false,
      };

      // store.dispatch(updateTask(testTask));
      // console.log('post update taskCache: ', store.getState().task);

      const testState: InitialState = store.getState().task;

      // CHANGE TASK TO NEW NAME
      expect(reducer(testState, updateTask(testTask))).toEqual({
        taskCache: {
          1: { id: 1, taskName: "Redux", notes: "", isCompleted: false },
        },
        taskNames: { React: 0, Redux: 1 },
        totalTasks: 1,
        maxId: 2,
      });

      const {taskNames, taskCache} = reducer(testState, updateTask(testTask));
      // TASK NAMES HAS NEW LENGTH, TASK CACHE HAS SAME LENGTH
      expect(Object.keys(taskNames).length).toBe(2);
      expect(Object.keys(taskCache).length).toBe(1);
    });
  });
  describe("Update task as completed function test", () => {});
  describe("Delete task function test", () => {});
});
