import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_URL = "https://ok.ru/videoembed/7671976495862";

const episodesT1 = [
  {
    number: 1,
    title: "Tarjeta de Navidad",
    description: "Una pareja está por divorciarse, pero el hombre contrata a expertos para que lo ayuden a reconquistar a su esposa.",
    videoUrl: "https://ok.ru/videoembed/7671976495862",
    thumbnailUrl: "https://i.imgur.com/L58yQxL.jpg",
  },
  {
    number: 2,
    title: "Diagnóstico rectoscópico",
    description: "Laguzzi, un usurero despiadado, amenaza de muerte a los hijos de Vanegas, su cliente, si no paga la deuda antes de determinada fecha. Vanegas contrata a los Simuladores.",
    videoUrl: "https://ok.ru/videoembed/7678848010998",
  },
  {
    number: 3,
    title: "Seguro de desempleo",
    description: "Despiden a Feler tras cuarenta años de trabajo en una fábrica láctea. Los Simuladores se encargarán de conectar a Feler directamente con los dueños de la fábrica.",
    videoUrl: "https://ok.ru/videoembed/7683459779318",
  },
  {
    number: 4,
    title: "El testigo español",
    description: "Alicia, oftalmóloga, casada y madre de dos hijos, recibe sorpresivamente la visita de Villarreal, un egocéntrico colega español que quiere chantajearla.",
    videoUrl: "https://ok.ru/videoembed/13041721936630",
  },
  {
    number: 5,
    title: "El joven simulador",
    description: "A la mujer del arquitecto Miguens podrían quedarle pocos meses de vida. El médico recomienda que no le den malas noticias. Pero su hijo está a punto de repetir el año.",
    videoUrl: "https://ok.ru/videoembed/13041722067702",
  },
  {
    number: 6,
    title: "El pequeño problema del gran hombre",
    description: "El Dr. Agustín Mendilaharzu, Presidente de la Nación, sufre de impotencia sexual. Por miedo a que la prensa se entere, se niega a ver a un sexólogo.",
    videoUrl: "https://ok.ru/videoembed/13041722591990",
  },
  {
    number: 7,
    title: "Fuera de cálculo",
    description: "Los Simuladores entran a un banco para extraer los negativos con fotos de Sorkin, su cliente, junto a su amante, de la caja de seguridad de un extorsionador.",
    videoUrl: "https://ok.ru/videoembed/13041722002166",
  },
  {
    number: 8,
    title: "El pacto Copérnico",
    description: "Zarazola es un abogado adúltero que desea desprenderse de Laura, su mujer, sin sentir culpa. Contacta a los Simuladores para que ella lo deje a él.",
    videoUrl: "https://ok.ru/videoembed/13041722788598",
  },
  {
    number: 9,
    title: "El último héroe",
    description: "Milazzo, un falso representante de artistas, explota diversos barrios pobres, cobrando a sus clientes una matrícula para hacerlos famosos y llevarlos a trabajar.",
    videoUrl: "https://ok.ru/videoembed/13041722854134",
  },
  {
    number: 10,
    title: "Los impresentables",
    description: "Clara, de padres muy ordinarios, está de novia con Federico, hijo de una familia elegante. Ante un encuentro familiar, Los Simuladores se encargan de que todo salga bien.",
    videoUrl: "https://ok.ru/videoembed/13041722329846",
  },
  {
    number: 11,
    title: "El colaborador foráneo",
    description: "Crucitti es un comisario corrupto que extorsiona a los dueños de los locales comerciales de su zona. Pero Los Simuladores se encargarán de resolver el problema.",
    videoUrl: "https://ok.ru/videoembed/13060697492214",
  },
  {
    number: 12,
    title: "Marcela & Pau",
    description: "Marcela está sumergida en una profunda depresión. No puede dormir bien y molesta permanentemente a su exmarido y a Natalia, su hija, quien convoca a Los Simuladores.",
    videoUrl: "https://ok.ru/videoembed/13060988078838",
  },
  {
    number: 13,
    title: "Un trabajo involuntario",
    description: "Los Simuladores están pensando en tomarse unas vacaciones cuando secuestran a Santos, el estratega del grupo.",
    videoUrl: "https://ok.ru/videoembed/13061005642486",
  },
];

const episodesT2 = [
  {
    number: 1,
    title: "Los cuatro Notables",
    description: "Una mujer tiene que operar a su padre de urgencia, y en la clínica le dan la noticia de que su seguro médico no cubre el tratamiento de la operación.",
    videoUrl: "https://ok.ru/videoembed/13061006297846",
  },
  {
    number: 2,
    title: "Z-9000",
    description: "Una mujer, que recibe golpes y maltratos por parte de su marido, contacta a Los Simuladores para que le resuelvan el problema.",
    videoUrl: "https://ok.ru/videoembed/13061005970166",
  },
  {
    number: 3,
    title: "La gargantilla de las cuatro estaciones",
    description: "Las mujeres son la debilidad de un joven arquitecto. El problema es que está por casarse y no quiere serle infiel a su novia y futura esposa.",
    videoUrl: "https://ok.ru/videoembed/13041722526454",
  },
  {
    number: 4,
    title: "El clan Motul",
    description: "Un grupo de ancianos que vive en un hogar se entera de que el dueño lo quiere vender para su demolición. Los Simuladores montan un fantasioso operativo.",
    videoUrl: "https://ok.ru/videoembed/13041722657526",
  },
  {
    number: 5,
    title: "El vengador infantil",
    description: "Un niño de séptimo grado, gordito y distinto a los demás, es el chivo expiatorio de sus compañeros. Los Simuladores intentarán revertir la situación por medio de un falso concurso.",
    videoUrl: "https://ok.ru/videoembed/13041722723062",
  },
  {
    number: 6,
    title: "El matrimonio mixto",
    description: "Una joven pareja con familias de distintas religiones (católicos y judíos) contacta a Los Simuladores para que sus padres dejen de lado sus pensamientos estructurados.",
    videoUrl: "https://ok.ru/videoembed/13041722395382",
  },
  {
    number: 7,
    title: "La Brigada B",
    description: "El FBI captura a la Brigada B por llevar a cabo un operativo relacionado con árabes y terroristas para Los Simuladores sin su autorización.",
    videoUrl: "https://ok.ru/videoembed/13041722264310",
  },
  {
    number: 8,
    title: "Fin de semana de descanso",
    description: "Los Simuladores interrumpen sus tranquilas vacaciones en Entre Ríos cuando intervienen en una pelea de pareja que pasa a mayores.",
    videoUrl: "https://ok.ru/videoembed/13041722133238",
  },
  {
    number: 9,
    title: "El debilitador social",
    description: "Los Simuladores simulan un juicio internacional contra un manager de modelos que presiona a las jóvenes a caer en hábitos alimenticios poco saludables.",
    videoUrl: "https://ok.ru/videoembed/13061075438326",
  },
  {
    number: 10,
    title: "El anillo de Salomón",
    description: "Un famoso director de orquesta contrata a Los Simuladores para deshacerse de un cada vez más insistente fanático.",
    videoUrl: "https://ok.ru/videoembed/13061075241718",
  },
  {
    number: 11,
    title: "Episodio final",
    description: "Los Simuladores deberán enfrentarse finalmente a Milazzo y, además, afrontarán su último caso antes de separarse indefinidamente: intentar convencer a un ambicioso empleado de una corporación para que vuelva a su casa y ayude en el negocio familiar.",
    videoUrl: "https://ok.ru/videoembed/13061075372790",
  },
];

async function main() {
  // Temporada 1
  const temporada1 = await prisma.season.upsert({
    where: { number: 1 },
    update: {
      description: "Cuatro expertos en simulación resuelven los problemas más insólitos de sus clientes usando el ingenio, la planificación y el engaño.",
      posterUrl: "https://i.imgur.com/SHxwVT9.jpg",
    },
    create: {
      number: 1,
      title: "Temporada 1",
      description: "Cuatro expertos en simulación resuelven los problemas más insólitos de sus clientes usando el ingenio, la planificación y el engaño.",
      year: 2002,
      posterUrl: "https://i.imgur.com/SHxwVT9.jpg",
    },
  });
  console.log("Temporada 1:", temporada1.id);

  for (const ep of episodesT1) {
    const existing = await prisma.episode.findFirst({
      where: { seasonId: temporada1.id, number: ep.number },
    });
    const saved = existing
      ? await prisma.episode.update({
          where: { id: existing.id },
          data: { title: ep.title, description: ep.description, videoUrl: ep.videoUrl, thumbnailUrl: ep.thumbnailUrl ?? null },
        })
      : await prisma.episode.create({
          data: {
            seasonId: temporada1.id,
            number: ep.number,
            title: ep.title,
            description: ep.description,
            videoUrl: ep.videoUrl,
            thumbnailUrl: ep.thumbnailUrl ?? null,
            isPublished: true,
          },
        });
    console.log(`  EP ${ep.number} — ${ep.title} (id: ${saved.id})`);
  }

  // Temporada 2
  const temporada2 = await prisma.season.upsert({
    where: { number: 2 },
    update: {
      description: "Los Simuladores regresan con nuevos casos y más ingenio. La segunda y última temporada cierra la historia del grupo más hábil de la televisión argentina.",
      posterUrl: "https://i.imgur.com/sdVy3wr.jpg",
    },
    create: {
      number: 2,
      title: "Temporada 2",
      description: "Los Simuladores regresan con nuevos casos y más ingenio. La segunda y última temporada cierra la historia del grupo más hábil de la televisión argentina.",
      year: 2003,
      posterUrl: "https://i.imgur.com/sdVy3wr.jpg",
    },
  });
  console.log("Temporada 2:", temporada2.id);

  for (const ep of episodesT2) {
    const existing = await prisma.episode.findFirst({
      where: { seasonId: temporada2.id, number: ep.number },
    });
    const saved = existing
      ? await prisma.episode.update({
          where: { id: existing.id },
          data: { title: ep.title, description: ep.description, videoUrl: ep.videoUrl },
        })
      : await prisma.episode.create({
          data: {
            seasonId: temporada2.id,
            number: ep.number,
            title: ep.title,
            description: ep.description,
            videoUrl: ep.videoUrl,
            isPublished: true,
          },
        });
    console.log(`  EP ${ep.number} — ${ep.title} (id: ${saved.id})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
