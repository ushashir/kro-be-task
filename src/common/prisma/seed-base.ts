import { PrismaClient } from "@prisma/client";
import seedTransactions from "../database/seed-data/transactions.seed";

const prisma = new PrismaClient();

const promises = [];

// 1. Seed transactions data
promises.push(
  new Promise(async (res, rej) => {
    try {
      await prisma.transaction.createMany({
        data: seedTransactions,
        skipDuplicates: true,
      });

      res(true);
    } catch (e) {
      rej(e);
    }
  })
);

Promise.all(promises)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Kro DB Seeded successfully");
    await prisma.$disconnect();
  });
