import { Friends } from '@prisma/client';
import { FriendService } from './friend.service';
declare class CreateFriendDto {
    id: number;
    user_1: number;
    user_2: number;
    status: string;
    created_at: Date;
}
export declare class FriendController {
    private friendService;
    constructor(friendService: FriendService);
    createFriend(createFriendDto: CreateFriendDto): Promise<Friends>;
    getAllUsers(): Promise<Friends[]>;
    getUserById(id: string): Promise<Friends | null>;
}
export {};
