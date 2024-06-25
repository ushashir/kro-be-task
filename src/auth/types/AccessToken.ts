import { User } from "@prisma/client";

export type AccessToken = {
  access_token: string;
  user: User;
};
