import { atom } from "jotai";
import { atomFamily, selectAtom } from "jotai/utils";
import { Task, Value } from "@/types";
import { TasksService } from "@/behaviour";
import deepEqual from "fast-deep-equal";

const baseTasksAtom = atom<Value<Task[]>>([]);

baseTasksAtom.onMount = (setAtom) => {
  setAtom(TasksService.getTasks());
  return TasksService.subscribe("onTasksChange", setAtom);
};

export const allTasksAtom = selectAtom(
  baseTasksAtom,
  (tasks) => tasks,
  deepEqual
);

export const tasksByContactIdAtom = atomFamily((contactId: string) =>
  atom(
    (get) =>
      get(baseTasksAtom)?.filter((task) => task.contactId === contactId) ?? [],
    deepEqual
  )
);

export const taskByIdAtom = atomFamily((taskId: string) =>
  atom(
    (get) => get(baseTasksAtom)?.find((task) => task.id === taskId),
    deepEqual
  )
);
