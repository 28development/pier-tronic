import { getBunnyStreamUrl, VIDEO_IDS } from "./bunny-cdn";

export interface Artist {
  id: string;
  name: string;
  role: string;
  location: string;
  isFeatured?: boolean;
  images: string[];
  videos?: string[];
  links: {
    instagram?: string;
    soundcloud?: string;
    youtube?: string;
    spotify?: string;
    tiktok?: string;
    website?: string;
    ra?: string;
    facebook?: string;
  };
  bio?: {
    de: {
      short: string;
      long: string;
    };
    en?: {
      short: string;
      long: string;
    };
  };
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  locationFull: string;
  description: {
    en: string;
    de: string;
  };
  highlights: {
    en: string[];
    de: string[];
  };
  artists: string[]; // Artist IDs
  ticketsUrl: string;
  stageDatesId: string;
  heroImage?: string;
}

export const ARTISTS: Record<string, Artist> = {
  anaPak: {
    id: "anaPak",
    name: "Ana Pak",
    role: "Afro House",
    location: "Tenerife, Spain",
    images: [
      "/images/ana_pak/IMG_0112.webp",
      "/images/ana_pak/IMG_0114.webp",
      "/images/ana_pak/IMG_0577.webp",
      "/images/ana_pak/IMG_0578.webp",
      "/images/ana_pak/IMG_0841.webp",
      "/images/ana_pak/IMG_0845.webp",
      "/images/ana_pak/IMG_0878.webp",
      "/images/ana_pak/IMG_3253.webp",
      "/images/ana_pak/IMG_3987.webp",
      "/images/ana_pak/IMG_4987.webp",
      "/images/ana_pak/IMG_5014.webp",
      "/images/ana_pak/IMG_5085.webp",
      "/images/ana_pak/IMG_5870.webp",
      "/images/ana_pak/IMG_5871.webp",
      "/images/ana_pak/IMG_6948.webp",
    ],
    videos: [
      getBunnyStreamUrl(VIDEO_IDS.anaPak.clip1),
      getBunnyStreamUrl(VIDEO_IDS.anaPak.clip2),
    ],
    links: {
      instagram: "https://www.instagram.com/anapak__/",
      soundcloud: "https://soundcloud.com/anapak_dj",
      youtube: "https://www.youtube.com/@anapakdj/videos",
    },
  },
  inanBatman: {
    id: "inanBatman",
    name: "Inan Batman",
    role: "Afro House",
    location: "Berlin, Germany",
    images: ["/images/inan_batman/inan_batman.webp"],
    videos: [getBunnyStreamUrl(VIDEO_IDS.inanBatman.clip1)],
    links: {
      instagram: "https://www.instagram.com/inanbatman/?hl=de",
      soundcloud: "https://soundcloud.com/inanbatman",
      youtube: "https://www.youtube.com/@inanbatman",
    },
  },
  quincyKluivert: {
    id: "quincyKluivert",
    name: "Quincy Kluivert",
    role: "Techhouse",
    location: "Amsterdam, Netherlands",
    images: ["/images/quincy_kluivert/quincy_kluivert_1.webp"],
    videos: [getBunnyStreamUrl(VIDEO_IDS.quincyKluivert.clip1)],
    links: {
      website: "https://quincy-kluivert.webnode.nl/",
      instagram: "https://www.instagram.com/quincy_kluivert/",
      soundcloud: "https://soundcloud.com/quincy-kluivert",
    },
  },
  claudiaLeon: {
    id: "claudiaLeon",
    name: "Claudia León",
    role: "Afro House / Latin House",
    location: "Madrid, Spain",
    images: [
      "/images/claudia_leon/claudia_leon_1.webp",
      "/images/claudia_leon/claudia_leon_2.webp",
      "/images/claudia_leon/claudia_leon_3.webp",
    ],
    videos: [
      getBunnyStreamUrl(VIDEO_IDS.claudia_leon.clip1),
      getBunnyStreamUrl(VIDEO_IDS.claudia_leon.clip2),
    ],
    links: {
      spotify: "https://open.spotify.com/artist/0n6py2ZuBUL7f2qYjaAUTh",
      youtube: "https://www.youtube.com/@djclaudialeon",
      instagram: "https://www.instagram.com/djclaudialeon/",
      tiktok: "https://www.tiktok.com/@djclaudialeon",
    },
  },
  noorSanchez: {
    id: "noorSanchez",
    name: "Noor Sanchez",
    role: "House, Afro House, Tribal House, Melodic Techno, Tech House",
    location: "Berlin, Germany",
    images: [
      "/images/noor_sanchez/noor_sanchez_1.webp",
      "/images/noor_sanchez/noor_sanchez_2.webp",
      "/images/noor_sanchez/noor_sanchez_3.webp",
    ],
    videos: [
      getBunnyStreamUrl(VIDEO_IDS.noorSanchez.clip1),
      getBunnyStreamUrl(VIDEO_IDS.noorSanchez.clip2),
    ],
    links: {
      soundcloud: "https://soundcloud.com/noor-sanchez",
      instagram: "https://www.instagram.com/noor_sanchez7/",
      ra: "https://de.ra.co/dj/noorsanchez",
      youtube: "https://www.youtube.com/@NoorSanchez",
    },
    bio: {
      de: {
        short:
          "Noor Sanchez ist eine DJ mit persischen Wurzeln und Berliner Herzschlag. Aufgewachsen in den 90er Jahren und geprägt von einer Welt aus Führung, Struktur und Analytik fand sie in der Musik den Raum, in dem Freiheit, Intuition und Emotion ihren Platz haben.",
        long: "Noor Sanchez, bürgerlich Sanaz, ist eine in Berlin lebende DJ mit persischen Wurzeln. Wenn sie nicht Teams in einem großen IT Unternehmen führt, steht sie hinter den Decks und verwandelt ihre Leidenschaft für Musik in einen kraftvollen kreativen Ausdruck. Für sie ist Musik mehr als Klang. Sie ist der Ausgleich zu einer strukturierten Welt, ein Raum für Freiheit, Intuition und kreativen Flow.\n\nIhr Sound bewegt sich zwischen House, Afro House, Melodic Techno und Tech House angereichert mit lateinamerikanischen und orientalischen Einflüssen. Organische Percussion, hypnotische Basslines und melodische Tiefe verschmelzen zu einer Energie, die sowohl Bewegung als auch Emotion auf dem Dancefloor auslöst.\n\nJedes Set von Noor Sanchez spiegelt ihre persönliche Entwicklung wider. Eine Reise des Loslassens, des tiefen Fühlens und der Übersetzung von Emotion in Klang. Uplifting, groovig und soulful laden ihre Performances dazu ein, sich im Rhythmus zu verlieren, sich zu verbinden und lebendig zu sein.\n\nNach Auftritten in Venues wie dem Weekend Club, Klunkerkranich, Beate Uwe und Süß war gestern sowie auf Festivals wie Prärie und Kallisto setzt Noor ihren Weg in der Berliner elektronischen Szene konsequent fort. Ihr Sound wirkt zugleich erdend und erhebend und ist Ausdruck ihrer Wurzeln, ihres Rhythmus und ihrer fortlaufenden Reise.",
      },
    },
  },
  namito: {
    id: "namito",
    name: "Namito",
    role: "Deep, Melodic & Oriental House",
    location: "Berlin, Germany",
    images: [
      "/images/namito/namito_1.webp",
      "/images/namito/namito_2.webp",
      "/images/namito/namito_3.webp",
      "/images/namito/namito_4.webp",
    ],
    links: {
      instagram: "https://www.instagram.com/namitoofficial/",
      soundcloud: "https://soundcloud.com/namito",
      spotify: "https://open.spotify.com/artist/6E8wYeE1CsvOUO031l9QGJ",
      youtube: "https://www.youtube.com/@Namitoofficial",
      facebook: "https://www.facebook.com/djnamito",
    },
    bio: {
      en: {
        short:
          "Namito is a Berlin-based DJ and producer known for 'Stone Flower', Beatport's top-selling Electronica track. Founder of Ubersee Music, he blends deep house with Persian vocals.",
        long: "Namito is a Berlin-based DJ and producer known for 'Stone Flower', Beatport's top-selling Electronica track of all time. As the founder of Ubersee Music, he masterfully blends deep house with Persian vocals and organic textures. With global tours and acclaimed releases on top-tier labels, he recently received the Global Recognition Award. Describing his style as the 'acoustic crystallisation' of his being, Namito builds on a foundation of classic house music while infusing the soul of his Iranian heritage. He continues to push the boundaries of Iranian dance music by blending Berlin's electronic pulse with his Persian roots.",
      },
      de: {
        short:
          "Namito ist ein in Berlin ansässiger DJ und Produzent, bekannt für 'Stone Flower', den meistverkauften Electronica-Track auf Beatport. Als Gründer von Ubersee Music verbindet er Deep House mit persischem Gesang.",
        long: "Namito ist ein in Berlin ansässiger DJ und Produzent, bekannt für 'Stone Flower', den meistverkauften Electronica-Track in der Geschichte von Beatport. Als Gründer von Ubersee Music verbindet er meisterhaft Deep House mit persischen Vocals und organischen Elementen. Mit weltweiten Touren und zahlreichen gefeierten Veröffentlichungen auf renommierten Labels wurde er kürzlich mit dem Global Recognition Award ausgezeichnet. Sein Stil ist eine akustische Kristallisation seines Seins: Das Fundament ist klassische House-Musik, aber die Seele kommt aus seiner Geburtsstätte im Iran. Er prägt die Zukunft der iranischen Dance Music, indem er Berliner Beats mit seinen persischen Wurzeln vereint.",
      },
    },
  },
  colle: {
    id: "colle",
    name: "Collé",
    role: "Melodic Organic House",
    location: "Netherlands",
    images: [
      "/images/colle/colle_1.webp",
      "/images/colle/colle_2.webp",
      "/images/colle/colle_3.webp",
      "/images/colle/colle_4.webp",
      "/images/colle/colle_5.webp",
      "/images/colle/colle_6.webp",
    ],
    links: {
      instagram: "https://www.instagram.com/collemusic/",
      soundcloud: "https://soundcloud.com/collemusic",
      spotify: "https://open.spotify.com/artist/5QTxFnGygVM4jFQiBovmRo",
    },
    bio: {
      en: {
        short:
          "Collé is a versatile producer with a unique, emotional sound. His breakthrough came in 2018 with the anthem 'Owami,' heavily supported by Solomun, Âme, and Black Coffee.",
        long: "Collé is a versatile producer with a unique, emotional sound that reflects years of musical experience and cultural influences. His breakthrough came in 2018 with the anthem 'Owami,' heavily supported by major names like Solomun, Âme, and Black Coffee. With releases on renowned labels such as Human by Default, Calamar Records, Siamese, and Zamna, Collé continues to evolve. He is also one of the driving forces behind the label Point in Time, which focuses on vocal electronic music while avoiding clichés. His track 'Kupata' was heavily supported by Keinemusik. Collé has delivered incredible performances at Tomorrowland, Pacha, and Mysteryland, to name just a few. Always in search of timeless originality, exciting new projects are on the horizon.",
      },
      de: {
        short:
          "Collé ist ein vielseitiger Produzent mit einem einzigartigen, emotionalen Sound. Sein Durchbruch kam 2018 mit der Hymne 'Owami', stark unterstützt von Solomun, Âme und Black Coffee.",
        long: "Collé ist ein vielseitiger Produzent mit einem einzigartigen, emotionalen Sound, der jahrelange musikalische Erfahrung und kulturelle Einflüsse widerspiegelt. Sein Durchbruch kam 2018 mit der Hymne 'Owami', die von großen Namen wie Solomun, Âme und Black Coffee stark unterstützt wurde. Mit Veröffentlichungen auf renommierten Labels wie Human by Default, Calamar Records, Siamese und Zamna entwickelt sich Collé stetig weiter. Er ist auch eine der treibenden Kräfte hinter dem Label Point in Time, das sich auf vokale elektronische Musik konzentriert und dabei Klischees vermeidet. Sein Track 'Kupata' wurde von Keinemusik stark unterstützt. Collé hat unglaubliche Auftritte bei Tomorrowland, Pacha und Mysteryland abgeliefert, um nur einige zu nennen. Immer auf der Suche nach zeitloser Originalität stehen spannende neue Projekte am Horizont.",
      },
    },
  },
};

export const EVENTS: Event[] = [
  {
    id: "namito-x-noor-sanchez",
    name: "Namito x Noor Sanchez",
    slug: "namito-noor",
    date: "28 February 2026",
    time: "21:00 – 04:00",
    location: "EVE, Scheveningen – The Hague",
    locationFull: "EVE – Oceanfront Venue",
    description: {
      en: "For the first time, Namito performs live in Scheveningen — joined by Noor Sanchez for an unforgettable night of deep, melodic, and oriental house at EVE, directly by the North Sea.",
      de: "Zum ersten Mal tritt Namito live in Scheveningen auf – gemeinsam mit Noor Sanchez für eine unvergessliche Nacht voller Deep, Melodic und Oriental House bei EVE, direkt an der Nordsee.",
    },
    highlights: {
      en: [
        "First-ever Namito performance in the Netherlands",
        "Stunning oceanfront location at EVE, Scheveningen",
        "Deep, melodic & oriental house music",
        "High-quality sound, intimate atmosphere",
      ],
      de: [
        "Namitos erster Auftritt in den Niederlanden",
        "Atemberaubende Lage direkt am Meer bei EVE, Scheveningen",
        "Deep, Melodic & Oriental House Music",
        "Hochwertiger Sound, intime Atmosphäre",
      ],
    },
    artists: ["namito", "noorSanchez"],
    ticketsUrl:
      "https://stagedates.com/events/namito-x-noor-sanchez-the-hague-eve-scheveningen-20260228-kZrGl?embedded=true",
    stageDatesId:
      "stagedates-iframe-event-b7ca208c-d7bc-42d6-9743-d213697e7581",
    heroImage: "/images/namito/namito_3.webp",
  },
  {
    id: "pulse-of-the-pier",
    name: "Pulse of the Pier",
    slug: "pulse-of-the-pier",
    date: "July 18, 2026",
    time: "21:00 – 04:00",
    location: "Scheveningen, Netherlands",
    locationFull: "The Pier, Scheveningen",
    description: {
      en: "Join thousands of music lovers for a night of electrifying DJs, immersive light shows, and unforgettable experiences. Grab your tickets now and be part of the celebration!",
      de: "Erleben Sie eine Nacht mit elektrisierenden DJs, beeindruckenden Lichtshows und unvergesslichen Momenten. Sichern Sie sich jetzt Ihre Tickets und werden Sie Teil der Celebration!",
    },
    highlights: {
      en: [
        "Top international DJs",
        "Spectacular light show",
        "Beachfront location",
        "Immersive experience",
      ],
      de: [
        "Top internationale DJs",
        "Spektakuläre Lichtshow",
        "Direkt am Strand",
        "Immersives Erlebnis",
      ],
    },
    artists: ["anaPak", "inanBatman", "quincyKluivert", "claudiaLeon", "colle"],
    ticketsUrl:
      "https://stagedates.com/events/pulse-of-the-pier-the-pier-20260718-FPjdR?embedded=true",
    stageDatesId: "stagedates-iframe-event-1",
  },
];
