import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth-credential.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient, User } from "@prisma/client";
import { BadRequestException } from "@nestjs/common";
import { AccessToken } from "./types/AccessToken";
import { RegisterUserDto } from "./dto/register.dto";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: PrismaClient,
          useValue: {
            user: {
              findFirstOrThrow: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe("login", () => {
    it("should return an access token and user", async () => {
      const result: AccessToken = {
        access_token: "test_token",
        user: {
          id: "1",
          name: "Test User",
          email: "test@test.com",
          password: "hashed_password",
          status: true,
          createdAt: new Date(),
          createdBy: "system",
          updatedAt: new Date(),
          updatedBy: "system",
        },
      };
      const loginDto: LoginDto = {
        email: "test@test.com",
        password: "password",
      };
      const req: any = {};

      jest.spyOn(authService, "login").mockImplementation(async () => result);

      expect(await authController.login(loginDto, req)).toBe(result);
    });

    it("should throw BadRequestException if credentials are invalid", async () => {
      const loginDto: LoginDto = {
        email: "invalid@test.com",
        password: "password",
      };
      const req: any = {};

      jest.spyOn(authService, "login").mockImplementation(async () => {
        throw new BadRequestException();
      });

      await expect(authController.login(loginDto, req)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe("register", () => {
    it("should return an access token and user", async () => {
      const result: AccessToken = {
        access_token: "test_token",
        user: {
          id: "1",
          name: "Test User",
          email: "test@test.com",
          password: "hashed_password",
          status: true,
          createdAt: new Date(),
          createdBy: "system",
          updatedAt: new Date(),
          updatedBy: "system",
        },
      };
      const registerDto: RegisterUserDto = {
        email: "test@test.com",
        password: "password",
        confirmPassword: "password",
        name: "Test User",
      };
      const req: any = {};

      jest
        .spyOn(authService, "register")
        .mockImplementation(async () => result);

      expect(await authController.register(registerDto, req)).toBe(result);
    });

    it("should throw BadRequestException if registration fails", async () => {
      const registerDto: RegisterUserDto = {
        email: "invalid@test.com",
        password: "password",
        confirmPassword: "password",
        name: "Invalid User",
      };
      const req: any = {};

      jest.spyOn(authService, "register").mockImplementation(async () => {
        throw new BadRequestException();
      });

      await expect(authController.register(registerDto, req)).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
