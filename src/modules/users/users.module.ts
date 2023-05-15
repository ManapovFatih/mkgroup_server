import { MailModule } from './../mail/mail.module';
import { FileModule } from './../file/file.module';
import { SessionService } from './session/session.service';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { VerificationService } from './verification/verification.service';
import { PasswordController } from './password/password.controller';
import { PasswordService } from './password/password.service';
import { ImageService } from '../file/image.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [UsersController, PasswordController],
    providers: [UsersService, SessionService, PasswordService, VerificationService, ImageService],
    exports: [UsersService, SessionService, PasswordService, VerificationService],
    imports: [DatabaseModule, AuthModule, FileModule, MailModule],
})
export class UsersModule {}
