type Task = {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  contactId: string;
};

export class Tasks {
  private static _tasks: Task[] = [];
  static async getTasks() {
    return this._tasks;
  }

  static async getTask(id: string) {
    return this._tasks.find((task) => task.id === id);
  }

  static async getTasksByContactId(contactId: string) {
    return this._tasks.filter((task) => task.contactId === contactId);
  }

  static async createTask(task: Task) {
    this._tasks.push(task);
    return task;
  }

  static async updateTask(task: Task) {
    const index = this._tasks.findIndex((t) => t.id === task.id);
    this._tasks[index] = task;
    return task;
  }

  static async deleteTask(id: string) {
    const index = this._tasks.findIndex((t) => t.id === id);
    this._tasks.splice(index, 1);
  }
}
