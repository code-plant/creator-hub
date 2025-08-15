import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  try {
    await prisma.user.create({
      data: {
        name: "Admin",
        role: "admin",
        holder: {
          create: {
            type: "user",
          },
        },
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
