import { Module } from '@nestjs/common';
import { MailController } from './mail.conntroller';
import { MailService } from './mail.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MailController],
  providers: [PrismaService, MailService],
})
export class MailModule {}
