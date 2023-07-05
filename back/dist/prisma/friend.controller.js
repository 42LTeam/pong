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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const friend_service_1 = require("./friend.service");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async createFriend(id, user_1, user_2, status, created_at) {
        return this.friendService.createFriend(id, user_1, user_2, status, created_at);
    }
    async getAllUsers() {
        return this.friendService.getAllFriends();
    }
    async getUserById(id) {
        return this.friendService.getFriendById(Number(id));
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('user_1')),
    __param(2, (0, common_1.Body)('user_2')),
    __param(3, (0, common_1.Body)('status')),
    __param(4, (0, common_1.Body)('created_at')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "createFriend", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "getUserById", null);
FriendController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [typeof (_a = typeof friend_service_1.FriendService !== "undefined" && friend_service_1.FriendService) === "function" ? _a : Object])
], FriendController);
exports.FriendController = FriendController;
//# sourceMappingURL=friend.controller.js.map