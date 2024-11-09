//@ts-nocheck
import { associations, Model } from "@nozbe/watermelondb";
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

  static associations = {
    tasks: { type: "has_many", foreignKey: "contact_id" }, // Define association
  };
}

export class TaskModel extends Model {
  static table = "tasks";

  static associations = {
    contact: { type: "belongs_to", foreignKey: "contact_id" }, // Define association
  };

  @text("title") title;
  @text("priority") priority;
  @text("description") description;
  @field("completed") completed;
  @text("contact_id") contactId;
  @relation("contact_id", "contacts") contact;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}
