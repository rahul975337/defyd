import { TaskModel, database } from "@/behaviour/db";
import { Q } from "@nozbe/watermelondb";
import { Task } from "@/types";

export class TasksService {
  static getTasks() {
    return database.get<TaskModel>("tasks").query(Q.sortBy("priority", "desc"));
  }
  static createTask(task: Task) {
    const newTask = database.write(async () => {
      const taskToCreate = await database
        .get<TaskModel>("tasks")
        .create((_task) => {
          _task.title = task.title;
          _task.description = task.description;
          _task.contactId = task.contactId;
        });
      return taskToCreate;
    });
    return newTask;
  }

  static updateTask(id: string, task: Task) {
    database.write(async () => {
      const taskToUpdate = await database.get<TaskModel>("tasks").find(id);
      await taskToUpdate.update((_task) => {
        _task.title = task.title;
        _task.description = task.description;
      });
    });
  }

  static deleteTask(id: string) {
    database.write(async () => {
      const taskToDelete = await database.get<TaskModel>("tasks").find(id);
      await taskToDelete.markAsDeleted();
    });
  }
}
