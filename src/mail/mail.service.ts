import { Injectable } from '@nestjs/common';
import { $Enums, Mail, MailType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service'; // Certifique-se de que o caminho está correto
import DataMessage from './types/message';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getMailByIdUser(idUser: string): Promise<Mail[] | null> {
    try {
      return await this.prisma.mail.findMany({ where: { idUser }});
    } catch (error) {
      console.error('Error fetching mails by user ID:', error);
      return null;
    }
  }

  async sendMail(content: DataMessage, type: string) {
    console.log(`Email Type ==> ${type}`);
    console.log(`Email Content ==> ${JSON.stringify(content)}`);
    // Implementar lógica para envio de email aqui
  }

  async persistNotification(content: DataMessage, type: MailType) {
    const data = {
      idUser: content.idUser,
      mailDestination: this.getDestination(content.idUser),
      mailContent: this.makeContent(content.orderNumber, content.orderValue),
      mailType: type,
    };

    try {
      await this.prisma.mail.create({ data });
      console.log('Notification persisted successfully');
    } catch (error) {
      console.error('Error persisting notification:', error);
    }
  }

  getDestination(idUser: string): string {
    switch (idUser) {
      case '10':
        return 'user@teste.com.br';
      case '20':
        return 'user@teste.com.br';
      default:
        return 'user-default@teste.com.br';
    }
  }

  makeContent(orderNumber: number, orderValue: number): string {
    return `Número do pedido: ${orderNumber} \n\n Valor do pedido: ${orderValue}`;
  }
}
