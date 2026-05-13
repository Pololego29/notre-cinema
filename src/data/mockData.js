// ─── Données mockées ───────────────────────────────────────────────────────────
// Remplace ces données par vos vrais souvenirs !
// Pour les thumbnails : remplace les URLs par tes propres photos
// Pour les vidéos    : remplace null par le chemin de ta vidéo (ex: '/videos/souvenir.mp4')

export const featured = {
  id: 'featured-1',
  title: 'Notre premier voyage ensemble',
  subtitle: "L'été où tout a commencé...",
  date: '14 août 2023',
  location: 'Côte d\'Azur, France',
  description:
    'Ces moments où le soleil se couchait sur la mer, où les vagues venaient lécher nos pieds, et où on a su que ce voyage n\'aurait pas de fin. Chaque photo raconte une histoire, chaque rire résonne encore.',
  thumbnail: 'https://picsum.photos/seed/cote-azur/1920/1080',
  video: null,
  duration: '3:24',
  tags: ['Voyage', 'Été', 'Mer', 'Inoubliable'],
}

export const categories = [
  {
    id: 'meilleurs-moments',
    title: 'Nos meilleurs moments',
    emoji: '✨',
    memories: [
      {
        id: 'mm-1',
        title: 'Notre premier baiser',
        date: '14 février 2022',
        location: 'Paris, France',
        description:
          'Une nuit de février, dans le froid de Paris, quelque chose de magique s\'est passé. Ce moment suspendu dans le temps, figé pour toujours dans notre mémoire.',
        thumbnail: 'https://picsum.photos/seed/paris-nuit/400/225',
        video: null,
        duration: '0:45',
        tags: ['Amour', 'Paris', 'Saint-Valentin'],
      },
      {
        id: 'mm-2',
        title: 'Notre anniversaire de couple',
        date: '14 février 2023',
        location: 'Restaurant Le Cinq, Paris',
        description:
          'Un an déjà. Champagne, bougies et ton sourire qui illumine tout. La soirée parfaite pour célébrer nous deux.',
        thumbnail: 'https://picsum.photos/seed/diner-romantique/400/225',
        video: null,
        duration: '1:12',
        tags: ['Anniversaire', 'Dîner', 'Amour'],
      },
      {
        id: 'mm-3',
        title: 'La demande officielle',
        date: '21 mars 2022',
        location: 'Jardin du Luxembourg, Paris',
        description:
          'Le jour où tu m\'as demandé d\'être ta petite amie, sous les cerisiers en fleurs. Une des plus belles journées de ma vie.',
        thumbnail: 'https://picsum.photos/seed/jardin-printemps/400/225',
        video: null,
        duration: '2:05',
        tags: ['Officiel', 'Printemps', 'Jardin'],
      },
      {
        id: 'mm-4',
        title: 'Notre premier Noël ensemble',
        date: '25 décembre 2022',
        location: 'Alsace, France',
        description:
          'Marché de Noël, vin chaud et neige. Notre premier hiver ensemble comme dans un conte de fées.',
        thumbnail: 'https://picsum.photos/seed/noel-neige/400/225',
        video: null,
        duration: '4:30',
        tags: ['Noël', 'Hiver', 'Magie'],
      },
      {
        id: 'mm-5',
        title: 'Notre appartement',
        date: '1er septembre 2023',
        location: 'Lyon, France',
        description:
          'Le jour où on a ouvert la porte de notre premier chez-nous. Cartons, chaos et bonheur total.',
        thumbnail: 'https://picsum.photos/seed/appartement-nouveau/400/225',
        video: null,
        duration: '5:18',
        tags: ['Emménagement', 'Nouveau départ', 'Maison'],
      },
      {
        id: 'mm-6',
        title: 'Concert sous les étoiles',
        date: '12 juillet 2023',
        location: 'Arènes de Nîmes',
        description:
          'La musique résonnait dans les arènes romaines, toi dans mes bras, les étoiles au-dessus de nous.',
        thumbnail: 'https://picsum.photos/seed/concert-arenes/400/225',
        video: null,
        duration: '1:47',
        tags: ['Musique', 'Concert', 'Été'],
      },
    ],
  },
  {
    id: 'voyages',
    title: 'Nos voyages',
    emoji: '✈️',
    memories: [
      {
        id: 'v-1',
        title: 'Côte d\'Azur',
        date: 'Août 2023',
        location: 'Nice & Antibes, France',
        description:
          'Notre premier grand voyage. Plages de galets, mimosas le matin et couchers de soleil à couper le souffle.',
        thumbnail: 'https://picsum.photos/seed/cote-azur-plage/400/225',
        video: null,
        duration: '7:22',
        tags: ['France', 'Mer', 'Été', 'Gastronomie'],
      },
      {
        id: 'v-2',
        title: 'Week-end à Amsterdam',
        date: 'Avril 2023',
        location: 'Amsterdam, Pays-Bas',
        description:
          'Vélos, tulipes et canaux. Amsterdam au printemps, c\'est le paradis. Et toi à côté, c\'est le bonheur absolu.',
        thumbnail: 'https://picsum.photos/seed/amsterdam-canaux/400/225',
        video: null,
        duration: '3:55',
        tags: ['Pays-Bas', 'Printemps', 'Vélo', 'Fleurs'],
      },
      {
        id: 'v-3',
        title: 'Escapade en Italie',
        date: 'Juin 2023',
        location: 'Rome & Florence, Italie',
        description:
          'Fontaine de Trevi, pasta à toute heure et toi qui ris quand je commande en mauvais italien.',
        thumbnail: 'https://picsum.photos/seed/rome-italie/400/225',
        video: null,
        duration: '9:14',
        tags: ['Italie', 'Culture', 'Gastronomie', 'Histoire'],
      },
      {
        id: 'v-4',
        title: 'Montagne en hiver',
        date: 'Janvier 2023',
        location: 'Chamonix, France',
        description:
          'Ski, chalet et fondue. Ton premier slalom (mémorable) et notre soirée au coin du feu.',
        thumbnail: 'https://picsum.photos/seed/chamonix-ski/400/225',
        video: null,
        duration: '6:40',
        tags: ['Montagne', 'Ski', 'Hiver', 'Chalet'],
      },
      {
        id: 'v-5',
        title: 'Bretagne sauvage',
        date: 'Octobre 2022',
        location: 'Finistère, Bretagne',
        description:
          'Falaises battues par les vents, crêpes au beurre salé et notre première vraie escapade ensemble.',
        thumbnail: 'https://picsum.photos/seed/bretagne-falaises/400/225',
        video: null,
        duration: '4:08',
        tags: ['Bretagne', 'Nature', 'Automne', 'Mer'],
      },
    ],
  },
  {
    id: 'dates',
    title: 'Nos dates',
    emoji: '🌹',
    memories: [
      {
        id: 'd-1',
        title: 'Pique-nique au Champ-de-Mars',
        date: '15 mai 2022',
        location: 'Paris, France',
        description:
          'Fromages, fraises et champagne devant la Tour Eiffel. Notre date la plus romantique, sans conteste.',
        thumbnail: 'https://picsum.photos/seed/pique-nique-paris/400/225',
        video: null,
        duration: '2:30',
        tags: ['Paris', 'Pique-nique', 'Tour Eiffel'],
      },
      {
        id: 'd-2',
        title: 'Cinéma en plein air',
        date: '3 août 2022',
        location: 'Paris Plages, Paris',
        description:
          'Un film sous les étoiles, une couverture partagée et du pop-corn qui se renverse. Parfait.',
        thumbnail: 'https://picsum.photos/seed/cinema-plein-air/400/225',
        video: null,
        duration: '1:15',
        tags: ['Cinéma', 'Été', 'Nuit', 'Films'],
      },
      {
        id: 'd-3',
        title: 'Cours de cuisine italienne',
        date: '18 novembre 2022',
        location: 'Lyon, France',
        description:
          'On a appris à faire des pâtes fraîches. Les tiennes étaient... créatives. Les miennes aussi, avouons-le.',
        thumbnail: 'https://picsum.photos/seed/cours-cuisine/400/225',
        video: null,
        duration: '3:42',
        tags: ['Cuisine', 'Italien', 'Apprentissage', 'Rires'],
      },
      {
        id: 'd-4',
        title: 'Musée d\'Orsay',
        date: '7 mars 2023',
        location: 'Paris, France',
        description:
          'Impressionnistes, Monet, et toi qui regardes les tableaux avec plus d\'intensité que moi.',
        thumbnail: 'https://picsum.photos/seed/musee-art/400/225',
        video: null,
        duration: '0:58',
        tags: ['Art', 'Culture', 'Musée', 'Paris'],
      },
      {
        id: 'd-5',
        title: 'Soirée jeux de société',
        date: '30 janvier 2023',
        location: 'Notre salon',
        description:
          'Trivial Pursuit, disputes affectueuses et éclats de rire. Tu triches au Scrabble, j\'ai des preuves.',
        thumbnail: 'https://picsum.photos/seed/jeux-soiree/400/225',
        video: null,
        duration: '1:55',
        tags: ['Maison', 'Jeux', 'Rires', 'Cosy'],
      },
    ],
  },
  {
    id: 'classiques',
    title: 'Nos classiques',
    emoji: '🎬',
    memories: [
      {
        id: 'c-1',
        title: 'Notre première soirée film',
        date: 'Février 2022',
        location: 'Chez toi',
        description:
          'On a regardé "Before Sunrise" et on n\'a pas dormi de la nuit à parler. C\'est là que tout a vraiment commencé.',
        thumbnail: 'https://picsum.photos/seed/soiree-film/400/225',
        video: null,
        duration: '1:30',
        tags: ['Films', 'Discussion', 'Nuit blanche'],
      },
      {
        id: 'c-2',
        title: 'La randonnée du Dimanche',
        date: 'Mars 2022',
        location: 'Forêt de Fontainebleau',
        description:
          'Notre rituel du dimanche matin. Café thermos, bottes de marche et des heures de conversation.',
        thumbnail: 'https://picsum.photos/seed/randonnee-foret/400/225',
        video: null,
        duration: '5:00',
        tags: ['Randonnée', 'Nature', 'Rituel', 'Dimanche'],
      },
      {
        id: 'c-3',
        title: 'Brunch du samedi',
        date: 'Rituel hebdomadaire',
        location: 'Notre cuisine',
        description:
          'Pancakes, café fort et toi encore à moitié endormi(e). Notre moment préféré de la semaine.',
        thumbnail: 'https://picsum.photos/seed/brunch-maison/400/225',
        video: null,
        duration: '2:20',
        tags: ['Brunch', 'Maison', 'Matin', 'Rituel'],
      },
      {
        id: 'c-4',
        title: 'La playlist de l\'été',
        date: 'Été 2022',
        location: 'Partout avec nous',
        description:
          'Chaque chanson raconte un moment. On l\'écoute encore maintenant, et chaque note est une madeleine de Proust.',
        thumbnail: 'https://picsum.photos/seed/musique-ete/400/225',
        video: null,
        duration: '0:32',
        tags: ['Musique', 'Playlist', 'Souvenirs', 'Été'],
      },
    ],
  },
]
