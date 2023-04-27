import { PrismaClient, CameraStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed 12 unique cameras
  for (let i = 1; i <= 12; i++) {
    await prisma.camera.create({
      data: {
        name: `Camera ${i}`,
        location: `Location ${i}`,
        status: i % 2 === 0 ? CameraStatus.ONLINE : CameraStatus.OFFLINE,
        videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
      },
    });
  }

  console.log("Seeded 12 cameras");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
