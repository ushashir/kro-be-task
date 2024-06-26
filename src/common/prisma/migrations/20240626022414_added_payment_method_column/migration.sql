-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('Cash', 'Bank', 'Mobile', 'Card');

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "paymentMethod" "paymentMethod";
