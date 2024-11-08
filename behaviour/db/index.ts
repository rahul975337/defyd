import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import { TaskModel, ContactModel } from "./models";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "task-db",
  jsi: Platform.OS === "ios",
  onSetUpError: (error) => {},
});

const database = new Database({
  adapter,
  modelClasses: [TaskModel, ContactModel],
});

const resetDB = async () => {
  await database.write(async () => {
    await database.unsafeResetDatabase();
  });
};

export { TaskModel, ContactModel, database, resetDB };
