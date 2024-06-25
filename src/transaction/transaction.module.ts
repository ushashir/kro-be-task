import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AppUtilities } from "../app.utilities";
import { TransactionService } from "./transaction.service";

@Module({
  providers: [TransactionService, PrismaClient, AppUtilities],
  exports: [TransactionService],
})
export class TransactionModule {}
