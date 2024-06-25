import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { CrudService } from "../common/database/crud.service";
import { AppUtilities } from "../app.utilities";
import moment from "moment";
import { TransactionMapType } from "./transaction.maptype";
import {
  GetTransactionFilterDto,
  MapTransactionByToValue,
} from "./dto/get-transactions-filter.dto";

@Injectable()
export class TransactionService extends CrudService<
  Prisma.TransactionDelegate,
  TransactionMapType
> {
  constructor(private prisma: PrismaClient) {
    super(prisma.transaction);
  }

  async getAllTransactions(
    {
      page,
      size,
      orderBy,
      cursor,
      direction,
      ...filters
    }: GetTransactionFilterDto,
    req: User
  ) {
    const parseSplittedTermsQuery = (term: string) => {
      const parts = term.trim().split(/\s+/);
      if (parts.length > 0) {
        return {
          name: { in: parts, mode: "insensitive" },
        };
      }
      return undefined;
    };

    const parsedQueryFilters = this.parseQueryFilter(filters, [
      {
        key: "term",
        where: parseSplittedTermsQuery,
      },
      {
        key: "startDate",
        where: (startDate, filterDto) => {
          const mStartDate = moment
            .parseZone(filterDto.startDate)
            .startOf("day")
            .toDate();
          return {
            createdAt: {
              gte: mStartDate,
              ...(!filterDto.endDate && {
                lte: moment
                  .parseZone(filterDto.startDate)
                  .endOf("day")
                  .toDate(),
              }),
            },
          };
        },
      },
      {
        key: "endDate",
        where: (endDate, filterDto) => {
          const mEndDate = moment
            .parseZone(filterDto.endDate)
            .endOf("day")
            .toDate();
          return {
            createdAt: {
              lte: mEndDate,
              ...(!filterDto.startDate && {
                gte: moment
                  .parseZone(filterDto.endDate)
                  .startOf("day")
                  .toDate(),
              }),
            },
          };
        },
      },
      {
        key: "status",
        where: (value: string) => {
          return { status: value === "true" };
        },
      },
    ]);

    const args: Prisma.TransactionFindManyArgs = {
      where: {
        ...parsedQueryFilters,
        status: true,
      },
      include: {
        user: { select: { name: true } },
      },
    };

    return this.findManyPaginate(args, {
      page,
      size,
      cursor,
      direction,
      orderBy:
        orderBy &&
        AppUtilities.unflatten({
          [MapTransactionByToValue[orderBy]]: direction,
        }),
    });
  }

  async getSingleTransaction(id: string) {
    return this.prisma.transaction.findFirstOrThrow({
      where: { id, status: true },
      include: {
        user: true,
      },
    });
  }
}
