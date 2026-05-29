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
    name: "Quincy Owen",
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
  lexlay: {
    id: "lexlay",
    name: "LEXLAY",
    role: "Tech House / House Music / Groovy Techno",
    location: "Barcelona, Spain",
    images: [
      "/images/lexlay/lexlay_1.png",
      "/images/lexlay/lexlay_2.png",
      "/images/lexlay/lexlay_3.png",
    ],
    videos: ["/videos/lexlay/lexlay_1.mp4"],
    links: {},
    bio: {
      de: {
        short:
          "LEXLAY ist ein spanischer DJ und Produzent aus Barcelona mit fast 20 Jahren Erfahrung, bekannt für energiegeladene Sets aus Tech House, House Music und Groovy Techno.",
        long: "LEXLAY ist ein spanischer DJ und Produzent aus Barcelona mit einer fast 20-jährigen Karriere. Er ist bekannt für seinen vielseitigen Sound zwischen Tech House, House Music und Groovy Techno sowie für seine positive Ausstrahlung und sein Motto \"VAMOS\".\n\n2012 gründete er sein Label Happy Techno Music, das sich mit mehr als 400 beteiligten Artists zu einem international wiedererkennbaren und stetig wachsenden Projekt entwickelt hat. Als Produzent veröffentlichte er auf großen Labels wie Hot Creations, Snatch! Records, Stereo Productions, Deeperfect, Flashmob Records, Moan, Bunny Tiger, Glasgow Underground und Material.\n\nIm Laufe seiner Karriere spielte LEXLAY in mehr als 55 Ländern in Europa, dem Mittleren Osten und Südamerika. Zu seinen Auftritten zählen renommierte Locations und Events wie Pacha, Space und Privilege auf Ibiza, ADE in Amsterdam, ElRow und City Hall in Barcelona, Sao Club und Penthouse in Dubai, das Sea You Festival in Deutschland sowie das Family Piknic Festival in Frankreich.\n\nMit klarem Fokus auf Groove, Dancefloor-Energie und positive Vibes repräsentiert LEXLAY Spanien weiterhin auf internationalen Bühnen und arbeitet gleichzeitig an neuer Musik und neuen Events für die kommenden Jahre.",
      },
      en: {
        short:
          "LEXLAY is a Spanish DJ and producer from Barcelona with almost 20 years of experience, known for energetic Tech House, House Music, and Groovy Techno sets.",
        long: "LEXLAY is a Spanish DJ and producer from Barcelona with an almost 20-year career. He is known for his versatile sound across Tech House, House Music, and Groovy Techno, as well as his joyful personality and signature \"VAMOS\" energy.\n\nIn 2012, he founded Happy Techno Music, a label that has become a globally recognized and constantly evolving project with more than 400 contributing artists. As a producer, he has released tracks on major labels such as Hot Creations, Snatch! Records, Stereo Productions, Deeperfect, Flashmob Records, Moan, Bunny Tiger, Glasgow Underground, and Material.\n\nThroughout his journey, LEXLAY has performed in more than 55 countries across Europe, the Middle East, and South America. He has played at renowned venues and events including Pacha, Space, and Privilege in Ibiza, ADE in Amsterdam, ElRow and City Hall in Barcelona, Sao Club and Penthouse in Dubai, Sea You Festival in Germany, and Family Piknic Festival in France.\n\nWith a strong focus on groove, dancefloor connection, and positive vibes, LEXLAY continues to represent Spain on international stages while preparing new music and events for the years ahead.",
      },
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
    location: "Amsterdam, Netherlands",
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
  osfur: {
    id: "osfur",
    name: "OSFUR",
    role: "Melodic House / Indie Dance",
    location: "International",
    images: [
      "/images/osfur/Mainpic.webp",
      "/images/osfur/OSFUR-132.webp",
      "/images/osfur/OSFUR-2.webp",
    ],
    videos: ["/videos/osfur/osfur_main.mp4"],
    links: {
      instagram: "https://www.instagram.com/osfurrr",
      soundcloud: "https://www.soundcloud.com/osfuuur/tracks"
    },
    bio: {
      en: {
        short:
          "OSFUR has quickly become a force in the global electronic scene, defined by a sound that is unmistakably his. His productions have earned the support of industry heavyweights like Adriatique, Mind Against, and Keinemusik.",
        long: "OSFUR has quickly become a force in the global electronic scene, defined by a sound that is unmistakably his. His productions have earned the support of industry heavyweights, and his journey now takes him to leading venues worldwide — from Soho Garden in Dubai to Volt Club in Milan — sharing stages with icons like AMÊ, Jimi Jules and Bedouin.\n\nIn 2025, OSFUR stepped fully into the international spotlight. Singles like \"Permission To Move,\" \"No Way Out,\" and \"AGAMA\" became essential DJ weapons, backed by names such as Adriatique, Mind Against, and Keinemusik. With the launch of The Scripture, his new collective created with Uvita, OSFUR is carving a bold new path — one that cements his rise as one of the most sought-after DJ/producers of today.",
      },
      de: {
        short:
          "OSFUR hat sich schnell zu einer festen Größe in der globalen elektronischen Szene entwickelt, geprägt von einem Sound, der unverkennbar seiner ist. Seine Produktionen werden von Branchengrößen wie Adriatique, Mind Against und Keinemusik unterstützt.",
        long: "OSFUR hat sich schnell zu einer festen Größe in der globalen elektronischen Szene entwickelt, geprägt von einem Sound, der unverkennbar seiner ist. Seine Produktionen haben die Unterstützung von Branchengrößen gewonnen, und seine Reise führt ihn nun zu führenden Venues weltweit — vom Soho Garden in Dubai bis zum Volt Club in Mailand — wo er die Bühne mit Ikonen wie AMÊ, Jimi Jules und Bedouin teilt.\n\nIm Jahr 2025 trat OSFUR vollständig ins internationale Rampenlicht. Singles wie \"Permission To Move\", \"No Way Out\" und \"AGAMA\" wurden zu unverzichtbaren DJ-Waffen, unterstützt von Namen wie Adriatique, Mind Against und Keinemusik. Mit der Gründung von The Scripture, seinem neuen Kollektiv mit Uvita, schlägt OSFUR einen mutigen neuen Weg ein — einen, der seinen Aufstieg zu einem der gefragtesten DJ/Produzenten der Gegenwart zementiert.",
      },
    },
  },
  uvita: {
    id: "uvita",
    name: "UVITA",
    role: "Melodic House / Indie Dance",
    location: "Ireland",
    images: [
      "/images/uvita/uvita_1.webp",
      "/images/uvita/uvita_2.webp",
      "/images/uvita/uvita_3.webp",
    ],
    videos: ["/videos/uvita/uvita_agama_volt_milan.mp4"],
    links: {
      instagram: "https://www.instagram.com/thisisuvita",
      soundcloud: "https://www.soundcloud.com/thisisuvita",
    },
    bio: {
      en: {
        short:
          "UVITA has captivated the global electronic scene with his unique productions and clear musical identity. The Irish-born artist has garnered major support from industry heavyweights.",
        long: "UVITA has captivated the global electronic scene with his unique productions and clear musical identity. The Irish-born artist has garnered major support from industry heavyweights and now brings his unique sound to top venues across the world, from Soho Garden, Dubai to Volt Club, Milan; sharing the stage with major names from AMÊ and Jimi Jules to Bedouin and Avangart Tabldot. Whilst only being 27, his productions reflect a diverse background, where his roots in classical music are ever audible. Paired with a mature taste and meticulous way of working, this gives UVITA his distinct edge. An artist who seeks to challenge and cross boundaries, defined by deep melodies, hypnotic rhythms and an analogue touch, he joins a new wave of artists committed to pushing electronic music forward.\n\n2025 saw UVITA announce himself onto the global stage, with standout singles \"Permission To Move\", \"Agama\" and \"No Way Out\" receiving support from fellow DJs across the board. Adriatique, Mind Against, Trikk and Keinemusik to name a few. 2026 has already started strong with his highly anticipated EP \"Traffik\" released in January on ICONYC. With the birth of \"The Scripture\", his new record label and collective together with Osfur, UVITA is set to become one of today's most sought-after DJ/producers.",
      },
      de: {
        short:
          "UVITA hat die globale elektronische Szene mit seinen einzigartigen Produktionen und seiner klaren musikalischen Identität begeistert. Der aus Irland stammende Künstler hat sich die Unterstützung von Branchengrößen gesichert.",
        long: "UVITA hat die globale elektronische Szene mit seinen einzigartigen Produktionen und seiner klaren musikalischen Identität begeistert. Der aus Irland stammende Künstler hat sich die Unterstützung von Branchengrößen gesichert und bringt seinen einzigartigen Sound nun in Top-Venues auf der ganzen Welt — vom Soho Garden in Dubai bis zum Volt Club in Mailand — wo er die Bühne mit großen Namen wie AMÊ, Jimi Jules, Bedouin und Avangart Tabldot teilt. Obwohl er erst 27 ist, spiegeln seine Produktionen einen vielfältigen Hintergrund wider, in dem seine Wurzeln in der klassischen Musik stets hörbar sind. Gepaart mit einem reifen Geschmack und einer akribischen Arbeitsweise verleiht ihm das seinen unverwechselbaren Vorsprung. Ein Künstler, der Grenzen herausfordert und überschreitet, geprägt von tiefen Melodien, hypnotischen Rhythmen und einem analogen Touch — er gehört zu einer neuen Welle von Künstlern, die sich der Weiterentwicklung elektronischer Musik verschrieben haben.\n\n2025 kündigte UVITA sich auf der Weltbühne an, mit herausragenden Singles wie \"Permission To Move\", \"Agama\" und \"No Way Out\", die Unterstützung von DJs quer durch die Szene erhielten — Adriatique, Mind Against, Trikk und Keinemusik, um nur einige zu nennen. 2026 hat bereits stark begonnen mit seiner lang erwarteten EP \"Traffik\", die im Januar auf ICONYC erschien. Mit der Gründung von \"The Scripture\", seinem neuen Plattenlabel und Kollektiv zusammen mit Osfur, ist UVITA auf dem besten Weg, einer der gefragtesten DJ/Produzenten der Gegenwart zu werden.",
      },
    },
  },
  radian: {
    id: "radian",
    name: "Radian",
    role: "Afro House / Afro Tech",
    location: "Berlin, Germany",
    images: [
      "/images/radian/radian_1.webp",
      "/images/radian/radian_2.webp",
      "/images/radian/radian_3.webp",
    ],
    videos: ["/videos/radian/radian_1.mp4"],
    links: {
      instagram: "https://www.instagram.com/radian.ofc/",
    },
    bio: {
      en: {
        short:
          "Radian is a 19-year-old DJ and producer based in Berlin, blending Afro House, Afro Tech, and organic rhythms. With Persian and Moroccan roots and originally from Marbella, he brings high-energy, soulful, and melodic sets to the Berlin scene.",
        long: "Radian (radian.ofc) is a 19-year-old DJ and producer now based in Berlin, emerging as a fresh voice in the city's electronic scene with a sound that blends Afro House, Afro Tech, and organic rhythms. With Persian and Moroccan roots and originally from Marbella, he is recognized for bringing high-energy, soulful, and melodic sets to the Berlin scene.",
      },
      de: {
        short:
          "Radian ist ein 19-jähriger DJ und Produzent mit Sitz in Berlin, der Afro House, Afro Tech und organische Rhythmen verbindet. Mit persischen und marokkanischen Wurzeln und ursprünglich aus Marbella bringt er energiegeladene, soulful und melodische Sets in die Berliner Szene.",
        long: "Radian (radian.ofc) ist ein 19-jähriger DJ und Produzent, der mittlerweile in Berlin lebt und sich als frische Stimme in der elektronischen Szene der Stadt etabliert. Sein Sound verbindet Afro House, Afro Tech und organische Rhythmen. Mit persischen und marokkanischen Wurzeln und ursprünglich aus Marbella stammend, ist er dafür bekannt, energiegeladene, soulful und melodische Sets in die Berliner Szene zu bringen.",
      },
    },
  },
  malive: {
    id: "malive",
    name: "Malive",
    role: "House / Techno",
    location: "São Paulo, Brazil",
    images: [
      "/images/malive/Malive_Presskit_01.webp",
      "/images/malive/Malive_Presskit_02.webp",
      "/images/malive/TomBarreto_1819.webp",
      "/images/malive/1F1E8C6F-F572-45DB-BA16-EB36DB074511.webp",
    ],
    videos: [
      getBunnyStreamUrl(VIDEO_IDS.malive.clip1),
      getBunnyStreamUrl(VIDEO_IDS.malive.clip2),
    ],
    links: {
      instagram: "https://www.instagram.com/maliveofficial/?hl=de",
      soundcloud: "https://soundcloud.com/maliveofficial",
      spotify: "https://open.spotify.com/intl-de/artist/5JsnFhU4OqgEtNXs7Sq1Vm",
    },
    bio: {
      en: {
        short:
          "Award-nominated Brazilian musician and artist, Malive deftly mines the cross-sections of waves, frequencies, and sophisticated vibes in his house and techno productions.",
        long: "A polymathic creative force, award-nominated Brazilian musician and artist, Malive deftly mines the cross-sections of waves, frequencies, and sophisticated vibes relationships in the formulation of his works. Navigating themes located in most iconic parts of the house and techno contemporary trends — Vinicius's distinctly multidisciplinary vision is present in every polishing touch of his music and productions unbound by the need for symmetry.\n\nThe young prodigy gained teenage notoriety through his award-nominated productions with the most renowned artists in the Brazilian Hip Hop scene, a partnership that yielded one of the national anthems in the fight against racism, the masterpiece by Djonga 'Olho de Tigre' which afforded millions of plays for the producer who always had a special passion for showtime.\n\nWith passages through festivals and clubs such as X by Adriatique, No Art Festival, Keinemusik Showcases, El Cielo by Pacha, Green Valley, Laroc among many other venues from the 4 corners of the globe. His millions of streams also accompanied him in this transition from hip hop to the electronic world and Malive scored releases on some of the most renowned record labels in the world: Diynamic, Moblack, Monaberry, Kompakt, Organic Tunes, Armada Music, Universal Music are part of his extensive list of releases.\n\nThe support of Solomun, Desiree, Rampa, &ME, Adam Port, Meduza, Carlita, Gorgon City, Adam Ten, Super Flu among others validates his value on the journey.",
      },
      de: {
        short:
          "Der preisgekrönte brasilianische Musiker und Künstler Malive verbindet gekonnt Wellen, Frequenzen und anspruchsvolle Vibes in seinen House- und Techno-Produktionen.",
        long: "Malive ist eine vielseitige kreative Kraft – ein preisgekrönter brasilianischer Musiker und Künstler, der die Schnittstellen von Wellen, Frequenzen und anspruchsvollen Vibes in seinen Werken meisterhaft verbindet. Vinicius' ausgeprägt multidisziplinäre Vision zeigt sich in jedem Detail seiner Musik und Produktionen, die sich nicht an Symmetrie gebunden fühlen.\n\nDas junge Wunderkind erlangte als Teenager Bekanntheit durch seine preisgekrönten Produktionen mit den renommiertesten Künstlern der brasilianischen Hip-Hop-Szene. Diese Zusammenarbeit brachte eine der nationalen Hymnen im Kampf gegen Rassismus hervor – Djongas Meisterwerk 'Olho de Tigre', das dem Produzenten Millionen von Streams einbrachte.\n\nMit Auftritten auf Festivals und in Clubs wie X by Adriatique, No Art Festival, Keinemusik Showcases, El Cielo by Pacha, Green Valley, Laroc und vielen weiteren Locations aus allen Ecken der Welt. Seine Millionen von Streams begleiteten ihn auch beim Übergang vom Hip Hop in die elektronische Welt, und Malive veröffentlichte auf einigen der renommiertesten Labels der Welt: Diynamic, Moblack, Monaberry, Kompakt, Organic Tunes, Armada Music, Universal Music gehören zu seiner umfangreichen Veröffentlichungsliste.\n\nDie Unterstützung von Solomun, Desiree, Rampa, &ME, Adam Port, Meduza, Carlita, Gorgon City, Adam Ten, Super Flu und anderen bestätigt seinen Wert auf dieser Reise.",
      },
    },
  },
  diegoSanDiego: {
    id: "diegoSanDiego",
    name: "Diego San Diego",
    role: "Tech House",
    location: "International",
    images: [
      "/images/diego_san_diego/diego_san_diego_1.webp",
      "/images/diego_san_diego/diego_san_diego_2.webp",
      "/images/diego_san_diego/diego_san_diego_3.webp",
      "/images/diego_san_diego/diego_san_diego_4.webp",
    ],
    links: {
      instagram: "https://www.instagram.com/diegosandiego_official/",
      spotify: "https://open.spotify.com/intl-de/artist/1lal1Zh8FBRbRwzd22s0oX",
      soundcloud: "https://soundcloud.com/diegosandiegomusic",
      tiktok: "https://www.tiktok.com/@diegosandiego_official",
    },
    bio: {
      en: {
        short:
          "Diego San Diego is bringing the heat — high energy Tech House built for the world's biggest dancefloors. His breakout single \"Tequila\" with Alec Monopoly went viral on TikTok with 40+ million views.",
        long: "Diego San Diego is bringing the heat — high energy Tech House built for the world's biggest dancefloors. His breakout single \"Tequila\" with Alec Monopoly went viral on TikTok with 40+ million views and was supported by Tiesto during his set at EDC Las Vegas. From Amnesia and Chinois Ibiza to Fabric and Koko London, Void Mykonos, and all the way to Asia, Australia and South America, Diego has ignited some of the most iconic venues around the globe captivating diverse crowds with his signature style.",
      },
      de: {
        short:
          "Diego San Diego bringt die Hitze — hochenergetischer Tech House, gebaut für die größten Dancefloors der Welt. Seine Durchbruch-Single \"Tequila\" mit Alec Monopoly ging auf TikTok mit über 40 Millionen Views viral.",
        long: "Diego San Diego bringt die Hitze — hochenergetischer Tech House, gebaut für die größten Dancefloors der Welt. Seine Durchbruch-Single \"Tequila\" mit Alec Monopoly ging auf TikTok mit über 40 Millionen Views viral und wurde von Tiesto während seines Sets auf der EDC Las Vegas unterstützt. Von Amnesia und Chinois Ibiza über Fabric und Koko London bis hin zu Void Mykonos und weiter nach Asien, Australien und Südamerika — Diego hat einige der ikonischsten Venues rund um den Globus entflammt und begeistert ein vielfältiges Publikum mit seinem unverwechselbaren Stil.",
      },
    },
  },
};

export const EVENTS: Event[] = [
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
    artists: [
      "anaPak",
      "inanBatman",
      "quincyKluivert",
      "lexlay",
      "claudiaLeon",
      "colle",
      "malive",
      "osfur",
      "uvita",
      "radian",
      "diegoSanDiego",
    ],
    ticketsUrl:
      "https://stagedates.com/events/pulse-of-the-pier-the-pier-20260718-FPjdR?embedded=true",
    stageDatesId: "stagedates-iframe-event-1",
  },
];
