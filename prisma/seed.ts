import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Criar um cliente
  const customer = await prisma.customer.create({
    data: {
      name: 'Cliente Exemplo',
      email: 'cliente@example.com',
      users: {
        create: [
          {
            email: 'admin@marquei.com',
            password: '1234567890',
            name: 'Admin User',
            phone: '1234567890',
            address: '123 Admin St',
          },
        ],
      },
      clinics: {
        create: [
          {
            name: 'Empresa Exemplo',
            cnpj: '12345678000100',
            address: '123 Empresa St',
            logoUrl: 'http://example.com/logo.png',
          },
        ],
      },
    },
  });

  // Criar um exame
  const exam = await prisma.exams.create({
    data: {
      logoUrl: 'http://example.com/exam-logo.png',
      name: 'Exame Exemplo',
      description: 'Descrição do exame exemplo',
    },
  });

  // Criar um controle de cron
  const cron = await prisma.cron_control.create({
    data: {
      name: 'cron_exemplo',
      isActive: true,
      interval: '*/5 * * * *',
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
