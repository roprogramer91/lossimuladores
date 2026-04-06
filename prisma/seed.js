import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_URL = "https://ok.ru/videoembed/7671976495862";

const episodes = [
  {
    number: 1,
    title: "Tarjeta de Navidad",
    description: "Una pareja está por divorciarse, pero el hombre contrata a expertos para que lo ayuden a reconquistar a su esposa.",
    videoUrl: "https://ok.ru/videoembed/7671976495862",
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
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 5,
    title: "El joven simulador",
    description: "A la mujer del arquitecto Miguens podrían quedarle pocos meses de vida. El médico recomienda que no le den malas noticias. Pero su hijo está a punto de repetir el año.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 6,
    title: "El pequeño problema del gran hombre",
    description: "El Dr. Agustín Mendilaharzu, Presidente de la Nación, sufre de impotencia sexual. Por miedo a que la prensa se entere, se niega a ver a un sexólogo.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 7,
    title: "Fuera de cálculo",
    description: "Los Simuladores entran a un banco para extraer los negativos con fotos de Sorkin, su cliente, junto a su amante, de la caja de seguridad de un extorsionador.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 8,
    title: "El pacto Copérnico",
    description: "Zarazola es un abogado adúltero que desea desprenderse de Laura, su mujer, sin sentir culpa. Contacta a los Simuladores para que ella lo deje a él.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 9,
    title: "El último héroe",
    description: "Milazzo, un falso representante de artistas, explota diversos barrios pobres, cobrando a sus clientes una matrícula para hacerlos famosos y llevarlos a trabajar.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 10,
    title: "Los impresentables",
    description: "Clara, de padres muy ordinarios, está de novia con Federico, hijo de una familia elegante. Ante un encuentro familiar, Los Simuladores se encargan de que todo salga bien.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 11,
    title: "El colaborador foráneo",
    description: "Crucitti es un comisario corrupto que extorsiona a los dueños de los locales comerciales de su zona. Pero Los Simuladores se encargarán de resolver el problema.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 12,
    title: "Marcela & Pau",
    description: "Marcela está sumergida en una profunda depresión. No puede dormir bien y molesta permanentemente a su exmarido y a Natalia, su hija, quien convoca a Los Simuladores.",
    videoUrl: PLACEHOLDER_URL,
  },
  {
    number: 13,
    title: "Un trabajo involuntario",
    description: "Los Simuladores están pensando en tomarse unas vacaciones cuando secuestran a Santos, el estratega del grupo.",
    videoUrl: PLACEHOLDER_URL,
  },
];

async function main() {
  const temporada1 = await prisma.season.upsert({
    where: { number: 1 },
    update: {
      description: "La primera temporada sigue a un grupo de cuatro expertos en simulación que resuelven los problemas más insólitos de sus clientes usando el ingenio, la planificación y el engaño.",
      posterUrl: "https://i.imgur.com/SHxwVT9.jpg",
    },
    create: {
      number: 1,
      title: "Temporada 1",
      description: "La primera temporada sigue a un grupo de cuatro expertos en simulación que resuelven los problemas más insólitos de sus clientes usando el ingenio, la planificación y el engaño.",
      year: 2002,
      posterUrl: "https://i.imgur.com/SHxwVT9.jpg",
    },
  });

  console.log("Temporada 1:", temporada1.id);

  for (const ep of episodes) {
    const created = await prisma.episode.upsert({
      where: { id: ep.number }, // ep.number coincide con id en la DB inicial
      update: {
        title: ep.title,
        description: ep.description,
        videoUrl: ep.videoUrl,
        seasonId: temporada1.id,
        number: ep.number,
      },
      create: {
        seasonId: temporada1.id,
        number: ep.number,
        title: ep.title,
        description: ep.description,
        videoUrl: ep.videoUrl,
        isPublished: true,
      },
    });
    console.log(`  EP ${ep.number} — ${ep.title} (id: ${created.id})`);
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
