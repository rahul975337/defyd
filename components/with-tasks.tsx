import { ContactsService, TasksService } from "@/behaviour";
import { withObservables } from "@nozbe/watermelondb/react";

export const withTasks = withObservables(["tasks"], () => ({
  tasks: TasksService.getTasks().observe(),
}));

export const withTaskById = withObservables(
  ["id"],
  ({ id }: { id: string }) => {
    return {
      task: TasksService.getTaskById(id),
    };
  }
);

export const withTaskByContactId = withObservables(
  ["contactId"],
  ({ contactId }: { contactId: string }) => ({
    tasks: TasksService.getTasksByContactId(contactId).observe(),
    contact: ContactsService.getContactById(contactId),
  })
);
