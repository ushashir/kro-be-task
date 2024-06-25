import { TransactionType } from "@prisma/client";
import { PaginationSearchOptionsDto } from "../../common/interfaces/pagination-search-options.dto";
import { Type } from "class-transformer";
import {
  IsBooleanString,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { SortDirection } from "src/common/interfaces";

export enum TransactionColumns {
  CreatedAt = "createdAt",
  Name = "name",
}

export const MapTransactionByToValue = {
  createdAt: "createdAt",
  name: "name",
};

export class GetTransactionFilterDto extends PaginationSearchOptionsDto {
  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @IsOptional()
  @IsString()
  discription?: string;

  @IsEnum(TransactionColumns)
  @IsOptional()
  orderBy?: TransactionColumns;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
