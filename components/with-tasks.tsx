import { TasksService } from "@/behaviour";
import { withObservables } from "@nozbe/watermelondb/react";

export const withTasks = withObservables(["tasks"], () => ({
  tasks: TasksService.getTasks().observe(),
}));
