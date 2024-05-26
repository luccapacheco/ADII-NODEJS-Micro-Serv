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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MailController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const client_1 = require("@prisma/client");
const microservices_1 = require("@nestjs/microservices");
let MailController = MailController_1 = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
        this.logger = new common_1.Logger(MailController_1.name);
    }
    async getMail(idUser) {
        return await this.mailService.getMailByIdUser(idUser);
    }
    async readRegisterPayment(payload, context) {
        try {
            this.logger.log(`data: ${JSON.stringify(payload)}`);
            const dataMessage = JSON.parse(payload.data.notification);
            const channel = context.getChannelRef();
            const originalMesage = context.getMessage();
            channel.ack(originalMesage);
            await this.mailService.sendMail(dataMessage, client_1.MailType.orderConfirmation);
            await this.mailService.persistNotification(dataMessage, client_1.MailType.orderConfirmation);
        }
        catch (error) {
            console.log(error);
        }
    }
    async readConfimationPayment(payload, context) {
        try {
            const dataMessage = JSON.parse(payload.data.notification);
            const channel = context.getChannelRef();
            const originalMesage = context.getMessage();
            channel.ack(originalMesage);
            await this.mailService.sendMail(dataMessage, client_1.MailType.paymentConfirmation);
            await this.mailService.persistNotification(dataMessage, client_1.MailType.paymentConfirmation);
        }
        catch (ex) {
            console.log(ex);
        }
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "getMail", null);
__decorate([
    (0, microservices_1.MessagePattern)('register'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "readRegisterPayment", null);
__decorate([
    (0, microservices_1.MessagePattern)('confirmation'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "readConfimationPayment", null);
exports.MailController = MailController = MailController_1 = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.conntroller.js.map