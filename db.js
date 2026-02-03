import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const db = new PrismaClient({
  log: ["query", "error", "warn"],
});

export default db;
