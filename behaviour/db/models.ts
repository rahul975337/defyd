//@ts-nocheck
import { Model } from "@nozbe/watermelondb";
import {
  field,
  date,
  readonly,
  text,
  children,
  relation,
} from "@nozbe/watermelondb/decorators";

export class ContactModel extends Model {
  static table = "contacts";

  @text("name") name;
  @text("phone_number") phoneNumber;
  @children("tasks") tasks;
}

export class TaskModel extends Model {
  static table = "tasks";

  @text("title") title;
  @text("priority") priority;
  @text("description") description;
  @field("completed") completed;
  @text("contact_id") contactId;
  @relation("contact_id", "contacts") contact;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}
