import { TasksService } from "@/behaviour";
import { TaskList } from "./task-list";
import { withObservables } from "@nozbe/watermelondb/react";

export const withTasks = withObservables([], () => ({
  tasks: TasksService.getTasks(),
}));
