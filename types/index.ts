export type Value<T> = T | null | undefined;
export type Priority = "low" | "medium" | "high";
export type Task = {
  id?: string;
  title: string;
  priority?: Priority;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  contactId: string;
};
