import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "contacts",
      columns: [
        { name: "name", type: "string" },
        { name: "phone_number", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "priority", type: "string", isOptional: true },
        { name: "description", type: "string", isOptional: true },
        { name: "completed", type: "boolean", isOptional: true },
        { name: "contact_id", type: "string", isOptional: false },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
