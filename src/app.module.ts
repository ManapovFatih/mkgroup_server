import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaService } from './modules/database/prisma.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
    imports: [
        ProductModule,
        CategoryModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
