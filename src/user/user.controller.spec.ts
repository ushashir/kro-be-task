import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { GetUsersFilterDto } from "./dto/get-user-filter.dto";
import { User } from "@prisma/client";
import { NotFoundException } from "@nestjs/common";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn(),
            getOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe("getAll", () => {
    it("should return an array of users", async () => {
      const result = [{ id: "1", name: "Test User" }];
      const filtersDto: GetUsersFilterDto = {};
      const user: User = { id: "1", name: "Test User" } as User;

      jest
        .spyOn(userService, "getAll")
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.getAll(filtersDto, user)).toBe(result);
    });
  });

  describe("getOne", () => {
    it("should return a single user", async () => {
      const result = { id: "1", name: "Test User" };
      const user: User = { id: "1", name: "Test User" } as User;

      jest
        .spyOn(userService, "getOne")
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.getOne("1", user)).toBe(result);
    });

    it("should throw NotFoundException if user not found", async () => {
      const user: User = { id: "1", name: "Test User" } as User;

      jest.spyOn(userService, "getOne").mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(userController.getOne("1", user)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
