import "@testing-library/jest-dom";
import reducer, {
  createTask,
  updateTask,
  updateCompleted,
  deleteTask,
} from "@/_redux/features/taskSlice";
import type { InitialState, Task } from "@/_redux/features/taskSlice";

describe("Tests for proper functionality of reducer functions in taskSlice", () => {

  let taskState: InitialState;

  beforeEach(() => {
    taskState = {
      taskCache: {},
      taskNames: {},
      maxId: 0,
      totalTasks: 0,
    };
  });


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

  it("Should update a task and not add to the taskCache", () => {

    // INITIALIZE STATE WITH AN ENTRY
    const newState: InitialState = {
      ...taskState,
      taskCache: {
        0: { id: 0, taskName: "React", notes: "", isCompleted: false },
      },
      taskNames: { React: 0 },
      totalTasks: 1,
      maxId: 1,
    }

    // UPDATE WITH NEW TASK
    const testTask: Task = {
      id: 0,
      taskName: "Redux",
      notes: "",
      isCompleted: false,
    };

    // CHANGE TASK TO NEW NAME
    expect(reducer(newState, updateTask(testTask))).toEqual({
      taskCache: {
        1: { id: 1, taskName: "Redux", notes: "", isCompleted: false },
      },
      taskNames: { React: 0, Redux: 1 },
      totalTasks: 1,
      maxId: 2,
    });

    const { taskNames, taskCache } = reducer(newState, updateTask(testTask));
    // TASK NAMES HAS NEW LENGTH, TASK CACHE HAS SAME LENGTH
    expect(Object.keys(taskNames).length).toBe(2);
    expect(Object.keys(taskCache).length).toBe(1);
  });


  it("Should update a task as completed", () => {

    // INITIALIZE STATE WITH AN ENTRY
    const newState: InitialState = {
      ...taskState,
      taskCache: {
        0: { id: 0, taskName: "React", notes: "", isCompleted: false },
      },
      taskNames: { React: 0 },
      totalTasks: 1,
      maxId: 1,
    }

    // DEFAULT IS INCOMPLETE (isComplete = false)
    // FIRST ENTRY ID IS 0
    const testID = 0;


    expect(reducer(newState, updateCompleted(testID))).toEqual({
      taskCache: {
        0: { id: 0, taskName: "React", notes: "", isCompleted: true },
      },
      taskNames: { React: 0 },
      totalTasks: 1,
      maxId: 1,
    })
  })

  it('Should delete a task properly from taskCache and not remove from taskNames', () => {

    // INITIALIZE STATE WITH AN ENTRY
    const newState: InitialState = {
      ...taskState,
      taskCache: {
        0: { id: 0, taskName: "React", notes: "", isCompleted: false },
      },
      taskNames: { React: 0 },
      totalTasks: 1,
      maxId: 1,
    }

    const testTask: Task = {
      id: 0,
      taskName: "React",
      notes: '',
      isCompleted: false
    }

    expect(reducer(newState, deleteTask(testTask.id))).toEqual({
      taskCache: {},
      taskNames: { React: 0 },
      totalTasks: 0,
      maxId: 1
    })
  })

});
