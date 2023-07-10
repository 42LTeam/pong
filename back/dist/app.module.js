"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const redisStore = require("cache-manager-redis-store");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("./prisma/prisma.service");
const user_service_1 = require("./prisma/user.service");
const user_controller_1 = require("./prisma/user.controller");
const chat_gateway_1 = require("./chat/chat.gateway");
const friend_service_1 = require("./prisma/friend.service");
const friend_controller_1 = require("./prisma/friend.controller");
const message_controller_1 = require("./prisma/message.controller");
const message_service_1 = require("./prisma/message.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                store: redisStore,
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            }),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, friend_controller_1.FriendController, message_controller_1.MessageController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, user_service_1.UserService, friend_service_1.FriendService, message_service_1.MessageService, chat_gateway_1.ChatGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map