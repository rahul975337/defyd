export type Value<T> = T | null | undefined;

export type Task = {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  contactId: string;
};
