//@ts-nocheck
import { Model } from "@nozbe/watermelondb";
import { field, date, readonly, text } from "@nozbe/watermelondb/decorators";

export class TaskModel extends Model {
  static table = "tasks";

  @text("title") title;
  @text("priority") priority;
  @text("description") description;
  @field("completed") completed;
  @text("contact_id") contactId;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}

export class ContactModel extends Model {
  static table = "contacts";

  @text("name") name;
  @text("email") email;
  @text("phone") phone;
}
