import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear temporada 1
  const temporada1 = await prisma.season.upsert({
    where: { number: 1 },
    update: {},
    create: {
      number: 1,
      title: "Temporada 1",
      description: "Primera temporada de Los Simuladores",
      year: 2002,
      posterUrl: "https://m.media-amazon.com/images/S/pv-target-images/a44101d5d735b683f0e2fa3cbb9e003ff8338d3908c27a602e60ec318ade50d9.jpg",
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
