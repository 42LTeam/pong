import { PrismaClient } from '@prisma/client';

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

    for (let i = 6; i < 10; i++) {
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




    const user1 = await prisma.user.create(
        {
            data: {
                id: 1,
                avatar: `https://cdn.intra.42.fr/users/d059badf1d05f4365aa5a664419b6dc1/shalimi.jpg`,
                username: `shai_from_seed`,
                secretO2FA: `j'aime les hommes`,
                xp: 10,
            },
        });

    const user2 = await prisma.user.create({
        data: {
            id:2,
            avatar: 'https://cdn.intra.42.fr/users/5adf0bb2897326c325314edaeef0161e/ncotte.jpg',
            username: 'ncotte_from_seed',
            secretO2FA: 'secret2',
            xp: 20120,
        },
    });

    const user3 = await prisma.user.create({
        data: {
            id:3,
            avatar: 'https://cdn.intra.42.fr/users/70f64fba2e18a69e9bef1f5baf2f49db/lzima.jpg',
            username: 'lzima_from_seed',
            secretO2FA: 'secret2',
            xp: 2040,
        },
    });

    const user4 = await prisma.user.create({
        data: {
            id:4,
            avatar: 'https://cdn.intra.42.fr/users/628b6a897b44b6983dd7f52cc925c11c/esanchez.jpg',
            username: 'esanchez_from_seed',
            secretO2FA: 'secret2',
            xp: 20,
        },
    });

    const user5 = await prisma.user.create({
        data: {
            id:5,
            avatar: 'https://cdn.intra.42.fr/users/fa69acc1dfa3b6097be387091ceda771/rmonney.jpg',
            username: 'rmonney_from_seed',
            secretO2FA: 'je suis chinois',
            xp: 8,
        },
    });



    prisma.match.create({
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

    await prisma.block.create({
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
                    },
                    {
                        userId: user2.id,
                    },
                ],
            },
        },
    });

    prisma.message.create({
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
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
