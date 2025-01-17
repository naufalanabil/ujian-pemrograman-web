import { PrismaClient } from "@prisma/client";
import { content } from "./example";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      profileImgUrl:
        "https://res.cloudinary.com/da6hciwjn/image/upload/v1737113889/samples/outdoor-woman.jpg",
      name: "Naufal Ardra Anabil",
      email: "naufalanabil73@gmail.com",
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const user = await prisma.user.create({
    data: {
      profileImgUrl:
        "https://res.cloudinary.com/da6hciwjn/image/upload/v1737113889/samples/outdoor-woman.jpg",
      email: "naufalanabil70@gmail.com",
      name: "Naufal",
      emailVerified: new Date(),
    },
  });

  for (let i = 0; i < 1; i++) {
    await prisma.book.create({
      data: {
        name: `Book ${i}`,
        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, doloribus. ${i}`,
        imageUrl:
          "https://res.cloudinary.com/da6hciwjn/image/upload/v1737113889/samples/outdoor-woman.jpg",
        author: "J.K. Rowling",
        category: "Fiction",
        content,
        userId: admin.id,
        comments: {
          create: {
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, doloribus.",
            userId: user.id,
          },
        },
        ratings: {
          create: {
            rate: 5,
            userId: user.id,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
