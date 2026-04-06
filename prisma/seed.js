import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear temporada 1
  const temporada1 = await prisma.season.upsert({
    where: { number: 1 },
    update: {
      posterUrl: "https://i.imgur.com/SHxwVT9.jpg",
    },
    create: {
      number: 1,
      title: "Temporada 1",
      description: "Primera temporada de Los Simuladores",
      year: 2002,
      posterUrl: "https://i.imgur.com/SHxwVT9.jpg",
    },
  });

  console.log("Temporada 1 creada:", temporada1.id);

  // Crear episodio 1
  const episodio1 = await prisma.episode.upsert({
    where: { id: 1 },
    update: {},
    create: {
      seasonId: temporada1.id,
      number: 1,
      title: "Episodio 1",
      description: "Primer episodio de Los Simuladores",
      videoUrl: "https://ok.ru/videoembed/7671976495862",
      isPublished: true,
    },
  });

  console.log("Episodio 1 creado:", episodio1.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
