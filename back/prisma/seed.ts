import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.userFriendship.deleteMany();
    await prisma.userMatch.deleteMany();
    await prisma.block.deleteMany();
    await prisma.userChannel.deleteMany();
    await prisma.message.deleteMany();
    await prisma.channel.deleteMany();
    await prisma.match.deleteMany();
    await prisma.user.deleteMany();

    for (let i = 3; i < 10; i++) {
        await prisma.user.create({
            data: {
                id: i,
                avatar: `avatar${i}`,
                username: `username${i}`,
                secretO2FA: `secret${i}`,
                xp: 0,
            },
        });
    }
    const user1: User = await prisma.user.create({
        data: {
            id:1,
            avatar: 'avatar1',
            username: 'ragotte',
            secretO2FA: 'secret1',
            xp: 100,
        },
    });

    const user2: User = await prisma.user.create({
        data: {
            id:2,
            avatar: 'avatar2',
            username: 'username2',
            secretO2FA: 'secret2',
            xp: 200,
        },
    });



    const match = await prisma.match.create({
        data: {
            users: {
                create: [
                    {
                        user: { connect: { id: user1.id } },
                        score: 10,
                    },
                    {
                        user: { connect: { id: user2.id } },
                        score: 15,
                    },
                ],
            },
        },
    });

    const block = await prisma.block.create({
        data: {
            blockerId: user1.id,
            blockedId: 3,
            createdAt: new Date(),
        },
    });

    const channel = await prisma.channel.create({
        data: {
            name: 'channel1',
            password: 'pass1',
            creatorId: user1.id,
            privated: false,
            created_at: new Date(),
            users: {
                create: [
                    {
                        userId: user1.id,
                        isAdmin: true,
                        isBlocked: false,
                        exited: false,
                    },
                    {
                        userId: user2.id,
                        isAdmin: false,
                        isBlocked: false,
                        exited: false,
                    },
                ],
            },
        },
    });

    const message = await prisma.message.create({
        data: {
            content: 'Hello, World!',
            userId: user1.id,
            channelId: channel.id,
            created_at: new Date(),
            readBy: {
                connect: { id: user2.id },
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
