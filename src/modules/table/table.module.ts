import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
    providers: [TableService],
    controllers: [TableController],
    exports: [TableService],
    imports: [DatabaseModule, AuthModule],
})
export class TableModule {}
