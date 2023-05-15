import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {
    }
    private logger = new Logger(MailService.name);
    async sendForgotPassword(email: string, token: string) {
        const url = `${process.env.HOST_URL}/password/restore/${token}`;

        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'RoweOil <ddsmailer@mail.ru>', // override default from
                subject: 'Восстановление пароля администратора RoweOil',
                template: './forgot-password', // `.hbs` extension is appended automatically
                context: {
                    // ✏️ filling curly brackets with content
                    url,
                },
            });
        } catch (error) {
            this.logger.log(error);
            throw error;
        }
    }
}
