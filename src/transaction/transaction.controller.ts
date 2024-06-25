import {
  Controller,
  Get,
  Query,
  Req,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { TransactionService } from "./transaction.service";
import { GetTransactionFilterDto } from "./dto/get-transactions-filter.dto";

@ApiBearerAuth()
@ApiTags("Transactions")
@Controller("api/transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions(
    @Query() dto: GetTransactionFilterDto,
    @Req() req: User
  ) {
    return this.transactionService.getAllTransactions(dto, req);
  }

  @Get("/:id/info")
  async getOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.transactionService.findFirstOrThrow({ where: { id } });
  }
}
