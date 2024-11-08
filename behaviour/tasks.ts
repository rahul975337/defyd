import { TaskModel, database } from "@/behaviour/db";
import { Q } from "@nozbe/watermelondb";
import { Task } from "@/types";

export class TasksService {
  static getTasks() {
    return database.get<TaskModel>("tasks").query(Q.sortBy("title")).observe();
  }
  static createTask(task: Task) {
    const newTaskList = database.write(async () => {
      const newTaskList = await database
        .get<TaskModel>("tasks")
        .create((_task) => {
          _task.title = task.title;
          _task.description = task.description;
          _task.contactId = task.contactId;
        });
      return newTaskList;
    });
    return newTaskList;
  }

  static deleteTask(id: string) {
    database.write(async () => {
      const taskList = await database.get<TaskModel>("tasks").find(id);
      await taskList.markAsDeleted();
    });
  }

  static updateTask(id: string, task: Task) {
    database.write(async () => {
      const taskList = await database.get<TaskModel>("tasks").find(id);
      await taskList.update((_task) => {
        _task.title = task.title;
        _task.description = task.description;
        _task.contactId = task.contactId;
      });
    });
  }
}
