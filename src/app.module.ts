import { Global, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppUtilities } from "./app.utilities";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import { UserController } from "./user/user.controller";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guards/jwt.guard";
import { TransactionModule } from "./transaction/transaction.module";
import { TransactionController } from "./transaction/transaction.controller";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    AuthModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [AppController, UserController, TransactionController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AppUtilities,
  ],
  exports: [AuthModule, AppUtilities, UserModule, TransactionModule],
})
export class AppModule {}
