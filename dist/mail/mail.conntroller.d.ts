import { MailService } from './mail.service';
import { Mail } from '@prisma/client';
import { RmqContext } from '@nestjs/microservices';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    private readonly logger;
    getMail(idUser: string): Promise<Mail[] | null>;
    readRegisterPayment(payload: any, context: RmqContext): Promise<void>;
    readConfimationPayment(payload: any, context: RmqContext): Promise<void>;
}
