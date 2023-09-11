import { PrismaClient } from "@prisma/client";

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

  const user1 = await prisma.user.create({
    data: {
      id: 1,
      avatar: `avatar1`,
      username: `shai`,
      secretO2FA: `j'aime les hommes`,
      xp: 0,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      secretO2FA: true,
      xp: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 2,
      avatar: "avatar2",
      username: "username2",
      secretO2FA: "secret2",
      xp: 200,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      secretO2FA: true,
      xp: true,
    },
  });

  prisma.match.create({
    data: {
      users: {
        create: [
          {
            user: { connect: { id: user1.id } },
            score: 10,
            isWin: false,
          },
          {
            user: { connect: { id: user2.id } },
            score: 15,
            isWin: true,
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

  // const channel = await prisma.channel.create({
  //   data: {
  //     name: "channel1",
  //     password: "pass1",
  //     creatorId: user1.id,
  //     created_at: new Date(),
  //     users: {
  //       create: [
  //         {
  //           userId: user1.id,
  //         },
  //         {
  //           userId: user2.id,
  //         },
  //       ],
  //     },
  //   },
  // });

  // prisma.message.create({
  //   data: {
  //     content: "Hello, World!",
  //     userId: user1.id,
  //     channelId: channel.id,
  //     created_at: new Date(),
  //     readBy: {
  //       connect: { id: user2.id },
  //     },
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
