import {
  Controller,
  Get,
  Query,
  Req,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { GetUsersFilterDto } from "./dto/get-user-filter.dto";
import { User } from "@prisma/client";
import { Public } from "../auth/decorators/public.decorator";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getAll(@Query() filtersDto: GetUsersFilterDto, @Req() req: User) {
    return this.userService.getAll(filtersDto, req);
  }

  @Public()
  @Get("/:id/info")
  async getOne(@Param("id", ParseUUIDPipe) id: string, @Req() req: User) {
    return this.userService.getOne(id, req);
  }
}
