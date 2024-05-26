"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MailService = class MailService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMailByIdUser(idUser) {
        try {
            return await this.prisma.mail.findMany({ where: { idUser } });
        }
        catch (error) {
            console.error('Error fetching mails by user ID:', error);
            return null;
        }
    }
    async sendMail(content, type) {
        console.log(`Email Type ==> ${type}`);
        console.log(`Email Content ==> ${JSON.stringify(content)}`);
    }
    async persistNotification(content, type) {
        const data = {
            idUser: content.idUser,
            mailDestination: this.getDestination(content.idUser),
            mailContent: this.makeContent(content.orderNumber, content.orderValue),
            mailType: type,
        };
        try {
            await this.prisma.mail.create({ data });
            console.log('Notification persisted successfully');
        }
        catch (error) {
            console.error('Error persisting notification:', error);
        }
    }
    getDestination(idUser) {
        switch (idUser) {
            case '10':
                return 'user@teste.com.br';
            case '20':
                return 'user@teste.com.br';
            default:
                return 'user-default@teste.com.br';
        }
    }
    makeContent(orderNumber, orderValue) {
        return `Número do pedido: ${orderNumber} \n\n Valor do pedido: ${orderValue}`;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MailService);
//# sourceMappingURL=mail.service.js.map