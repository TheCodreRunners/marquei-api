import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.client.create({
    data: {
      name: 'Cliente Exemplo',
      courts: {
        create: [
          {
            name: 'Quadra A',
            url: 'https://exemplo.com/quadra-a',
            cameraName: 'Camera A',
            recordings: {
              create: [
                {
                  data: new Date(),
                  isDone: false,
                  url: 'https://exemplo.com/recordings/record-1',
                  awsKey: 'record-1-key',
                },
                {
                  data: new Date(),
                  isDone: true,
                  url: 'https://exemplo.com/recordings/record-2',
                  awsKey: 'record-2-key',
                },
              ],
            },
          },
          {
            name: 'Quadra B',
            url: 'https://exemplo.com/quadra-b',
            cameraName: 'Camera B',
            recordings: {
              create: [
                {
                  data: new Date(),
                  isDone: true,
                  url: 'https://exemplo.com/recordings/record-3',
                  awsKey: 'record-3-key',
                },
              ],
            },
          },
        ],
      },
      users: {
        create: {
          email: 'admin@enquadra.com',
          password: 'admin',
        },
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
