import { PrismaService } from '../../database/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class VerificationService {
    constructor(private prismaService: PrismaService) {}

    async setForgotPasswordToken(email: string, forgotPasswordCode: string) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: { email },
        });

        await this.prismaService.verification.upsert({
            where: {
                userId: user.id,
            },
            update: { forgotPasswordCode },
            create: { userId: user.id, forgotPasswordCode },
        });
        return forgotPasswordCode;
    }

    async verifyPasswordForgotCode(email: string, forgotPasswordCode: string) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: { email },
        });

        const forgotPasswordCodeInDB = await this.prismaService.verification.findFirstOrThrow({
            where: {
                userId: user.id,
            },
        });
        if (!forgotPasswordCodeInDB.forgotPasswordCode) {
            throw new BadRequestException('You did not ask for restore yet');
        }
        if (forgotPasswordCodeInDB.forgotPasswordCode == forgotPasswordCode) {
            await this.prismaService.verification.update({
                where: {
                    userId: user.id,
                },
                data: {
                    forgotPasswordCode: null,
                },
            });
            return user;
        }
        throw new BadRequestException('Wrong verification code');
    }
}
