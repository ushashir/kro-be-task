import { Test } from "@nestjs/testing";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { GetTransactionFilterDto } from "./dto/get-transactions-filter.dto";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "@nestjs/common";

describe("TransactionController", () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: PrismaClient,
          useValue: {
            transaction: {
              findFirstOrThrow: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    transactionService = moduleRef.get<TransactionService>(TransactionService);
    transactionController = moduleRef.get<TransactionController>(
      TransactionController
    );
  });

  describe("getAllTransactions", () => {
    it("should return an array of transactions", async () => {
      const result = ["test"];
      const dto: GetTransactionFilterDto = {};
      const user: User = { id: "1", name: "Test User" } as User;
      jest
        .spyOn(transactionService, "getAllTransactions")
        .mockImplementation(() => Promise.resolve(result));

      expect(await transactionController.getAllTransactions(dto, user)).toBe(
        result
      );
    });
  });

  describe("getOne", () => {
    it("should return a single transaction", async () => {
      const result = { id: "1", name: "Test Transaction" };
      jest
        .spyOn(transactionService, "findFirstOrThrow")
        .mockImplementation(() => Promise.resolve(result));

      expect(await transactionController.getOne("1")).toBe(result);
    });

    it("should throw NotFoundException if transaction not found", async () => {
      jest
        .spyOn(transactionService, "findFirstOrThrow")
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      await expect(transactionController.getOne("1")).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
