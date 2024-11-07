import { Task, Value } from "@/types";
import { EventEmitter } from "fbemitter";

export class TasksService {
  private static _emitter = new EventEmitter();
  private static _tasks: Task[] = [];

  static copy<T>(value: Value<T>) {
    if (Array.isArray(value)) {
      return [...value] as T;
    } else if (typeof value === "object" && value !== null) {
      return { ...value };
    }
    return value;
  }

  static getTasks() {
    return this._tasks;
  }

  static getTask(id: string) {
    return this._tasks.find((task) => task.id === id);
  }

  static getTasksByContactId(contactId: string) {
    return this._tasks.filter((task) => task.contactId === contactId);
  }

  static createTask(task: Task) {
    task.id = (this._tasks.length + 1).toString();
    this._tasks.push(task);
    this.changeTasks(this._tasks);
    return task;
  }

  static updateTask(task: Task) {
    const index = this._tasks.findIndex((t) => t.id === task.id);
    this._tasks[index] = task;
    this.changeTasks(this._tasks);
    return task;
  }

  static deleteTask(id: string) {
    const index = this._tasks.findIndex((t) => t.id === id);
    this._tasks.splice(index, 1);
    this.changeTasks(this._tasks);
  }

  private static changeTasks(value: Value<Task[]>) {
    if (!value) return;
    this._tasks = value;
    this._emitter.emit("onTasksChange", this.copy(value));
  }

  public static subscribe(
    event: "onTasksChange",
    callback: (value: Value<Task[]>) => void
  ) {
    const subscription = this._emitter.addListener(event, callback);
    return subscription.remove.bind(subscription);
  }
}
