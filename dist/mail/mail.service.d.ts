import { Mail, MailType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import DataMessage from './types/message';
export declare class MailService {
    private prisma;
    constructor(prisma: PrismaService);
    getMailByIdUser(idUser: string): Promise<Mail[] | null>;
    sendMail(content: DataMessage, type: string): Promise<void>;
    persistNotification(content: DataMessage, type: MailType): Promise<void>;
    getDestination(idUser: string): string;
    makeContent(orderNumber: number, orderValue: number): string;
}
