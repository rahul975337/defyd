type Task = {
  id: string;
  title: string;
  description: string;
};

export class Tasks {
  static async getTasks() {
    return [];
  }

  static async getTask(id: string) {
    return null;
  }

  static async createTask(task: Task) {
    return task;
  }

  static async updateTask(task: Task) {
    return task;
  }

  static async deleteTask(id: string) {
    return id;
  }
}
