import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import settings from "../config/settings";

const setup = () => {
  if (!settings.database.url) {
    console.error("DATABASE_URL is not set");
    throw new Error("Database connection failed");
  }

  // for query purposes
  const queryClient = postgres(settings.database.url);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
