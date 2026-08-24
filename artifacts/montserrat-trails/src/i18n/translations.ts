export type Language = "en" | "es" | "ca";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
];

export const translations = {
  en: {
    nav: {
      brand: "Montserrat Trails",
      trailFinder: "Trail Finder",
      community: "Community",
      stats: "Stats",
    },
    footer: {
      tagline: "A trusted guide to the serrated mountain.",
      leaveNoTrace: "Respect the trails. Leave no trace.",
    },
    home: {
      badge: "A guide to trails around Montserrat (Vacarisses)",
      titlePrefix: "Discover the magic of",
      titleSuffix: ".",
      subtitle:
        "Find the perfect path through ancient conglomerate rock, hidden hermitages, and sweeping views of Catalonia. Curated by locals, explored by you.",
      ctaFindTrail: "Find a Trail",
      ctaCommunityRoutes: "Community Routes",
      featuresCuratedTitle: "Curated Paths",
      featuresCuratedDesc:
        "From the accessible Sant Jeroni summit to the hidden paths of Agulles, find trails graded for every level.",
      featuresLocalTitle: "Local Knowledge",
      featuresLocalDesc:
        "Discover routes submitted by the hiking community. Share your own variations and secret spots.",
      featuresFieldGuideTitle: "Field Guide Feel",
      featuresFieldGuideDesc:
        "Clean, readable trail data without the clutter. Designed to be your companion on the mountain.",
      ctaReady: "Ready to lace up?",
      ctaReadySubtitle: "Whether you have two hours or a full day, the mountain is waiting.",
      ctaStartExploring: "Start Exploring",
    },
    trailFinder: {
      title: "Trail Finder",
      subtitle:
        "Discover curated routes across Montserrat. Filter by difficulty, time, or terrain to find your perfect path.",
      filters: "Filters",
      difficulty: "Difficulty",
      duration: "Duration",
      terrainType: "Terrain Type",
      terrainPlaceholder: "e.g. ridge, riverbed...",
      clearFilters: "Clear all filters",
      clearFiltersBtn: "Clear Filters",
      any: "Any",
      durationShort: "Short (0-2h)",
      durationHalf: "Half Day (2-4h)",
      durationFull: "Full Day (4h+)",
      noTrailsTitle: "No trails found",
      noTrailsDesc:
        "We couldn't find any paths matching those filters. Try broadening your search criteria.",
      terrain: "Terrain:",
      bestIn: "Best in:",
      getDirections: "Walking Directions",
      mapUnavailable: "Map unavailable",
    },
    community: {
      badge: "Community Routes",
      title: "Hiker Submissions",
      subtitle: "Know a secret path around Montserrat? Share it with fellow hikers below.",
      submitTrail: "Submit a Trail",
      shareRoute: "Share a Route",
      shareRouteDesc:
        "Fill out our quick form with the trail name, distance, elevation, difficulty, and any tips for fellow hikers. We review every submission and add the best routes to the guide.",
      trailDetails: "Trail details",
      takesTwoMinutes: "Takes 2 minutes",
      opensNewTab: "Opens in a new tab",
    },
    stats: {
      title: "Database Statistics",
      subtitle: "An overview of the trails currently cataloged in the Montserrat Trails database.",
      totalTrails: "Total Trails",
      curatedGuide: "Curated Guide",
      community: "Community",
      trailsByDifficulty: "Trails by Difficulty",
      trailsUnit: "trails",
      noDifficultyData: "No difficulty data available.",
    },
    notFound: {
      title: "404 Page Not Found",
      desc: "Did you forget to add the page to the router?",
    },
  },
  es: {
    nav: {
      brand: "Montserrat Trails",
      trailFinder: "Buscador de Rutas",
      community: "Comunidad",
      stats: "Estadísticas",
    },
    footer: {
      tagline: "Una guía de confianza para la montaña serrada.",
      leaveNoTrace: "Respeta los senderos. No dejes rastro.",
    },
    home: {
      badge: "Una guía de rutas por Montserrat (Vacarisses)",
      titlePrefix: "Descubre la magia de",
      titleSuffix: ".",
      subtitle:
        "Encuentra el camino perfecto entre roca conglomerada milenaria, ermitas escondidas y amplias vistas de Cataluña. Rutas seleccionadas por locales, exploradas por ti.",
      ctaFindTrail: "Buscar una Ruta",
      ctaCommunityRoutes: "Rutas de la Comunidad",
      featuresCuratedTitle: "Rutas Seleccionadas",
      featuresCuratedDesc:
        "Desde la accesible cima de Sant Jeroni hasta los senderos escondidos de Agulles, encuentra rutas clasificadas para todos los niveles.",
      featuresLocalTitle: "Conocimiento Local",
      featuresLocalDesc:
        "Descubre rutas enviadas por la comunidad senderista. Comparte tus propias variantes y rincones secretos.",
      featuresFieldGuideTitle: "Estilo Guía de Campo",
      featuresFieldGuideDesc:
        "Datos de rutas claros y legibles, sin distracciones. Pensado para ser tu compañero en la montaña.",
      ctaReady: "¿Listo para calzarte las botas?",
      ctaReadySubtitle: "Ya sea que tengas dos horas o un día entero, la montaña te espera.",
      ctaStartExploring: "Empieza a Explorar",
    },
    trailFinder: {
      title: "Buscador de Rutas",
      subtitle:
        "Descubre rutas seleccionadas por todo Montserrat. Filtra por dificultad, tiempo o terreno para encontrar tu camino perfecto.",
      filters: "Filtros",
      difficulty: "Dificultad",
      duration: "Duración",
      terrainType: "Tipo de Terreno",
      terrainPlaceholder: "ej. cresta, cauce...",
      clearFilters: "Borrar todos los filtros",
      clearFiltersBtn: "Borrar Filtros",
      any: "Cualquiera",
      durationShort: "Corta (0-2h)",
      durationHalf: "Medio Día (2-4h)",
      durationFull: "Día Completo (4h+)",
      noTrailsTitle: "No se encontraron rutas",
      noTrailsDesc:
        "No encontramos ninguna ruta que coincida con esos filtros. Prueba a ampliar tus criterios de búsqueda.",
      terrain: "Terreno:",
      bestIn: "Mejor época:",
      getDirections: "Cómo llegar a pie",
      mapUnavailable: "Mapa no disponible",
    },
    community: {
      badge: "Rutas de la Comunidad",
      title: "Rutas de Senderistas",
      subtitle: "¿Conoces un camino secreto por Montserrat? Compártelo con otros senderistas aquí abajo.",
      submitTrail: "Enviar una Ruta",
      shareRoute: "Comparte una Ruta",
      shareRouteDesc:
        "Rellena nuestro breve formulario con el nombre de la ruta, la distancia, el desnivel, la dificultad y cualquier consejo para otros senderistas. Revisamos cada envío y añadimos las mejores rutas a la guía.",
      trailDetails: "Detalles de la ruta",
      takesTwoMinutes: "Tarda 2 minutos",
      opensNewTab: "Se abre en una pestaña nueva",
    },
    stats: {
      title: "Estadísticas de la Base de Datos",
      subtitle: "Un resumen de las rutas catalogadas actualmente en la base de datos de Montserrat Trails.",
      totalTrails: "Rutas Totales",
      curatedGuide: "Guía Seleccionada",
      community: "Comunidad",
      trailsByDifficulty: "Rutas por Dificultad",
      trailsUnit: "rutas",
      noDifficultyData: "No hay datos de dificultad disponibles.",
    },
    notFound: {
      title: "404 Página No Encontrada",
      desc: "¿Olvidaste añadir la página al enrutador?",
    },
  },
  ca: {
    nav: {
      brand: "Montserrat Trails",
      trailFinder: "Cercador de Rutes",
      community: "Comunitat",
      stats: "Estadístiques",
    },
    footer: {
      tagline: "Una guia de confiança per a la muntanya serrada.",
      leaveNoTrace: "Respecta els senders. No deixis rastre.",
    },
    home: {
      badge: "Una guia de rutes per Montserrat (Vacarisses)",
      titlePrefix: "Descobreix la màgia de",
      titleSuffix: ".",
      subtitle:
        "Troba el camí perfecte entre roca conglomerada mil·lenària, ermites amagades i àmplies vistes de Catalunya. Rutes seleccionades per gent local, explorades per tu.",
      ctaFindTrail: "Cerca una Ruta",
      ctaCommunityRoutes: "Rutes de la Comunitat",
      featuresCuratedTitle: "Rutes Seleccionades",
      featuresCuratedDesc:
        "Des del cim accessible de Sant Jeroni fins als senders amagats d'Agulles, troba rutes classificades per a tots els nivells.",
      featuresLocalTitle: "Coneixement Local",
      featuresLocalDesc:
        "Descobreix rutes enviades per la comunitat excursionista. Comparteix les teves pròpies variants i racons secrets.",
      featuresFieldGuideTitle: "Estil Guia de Camp",
      featuresFieldGuideDesc:
        "Dades de rutes clares i llegibles, sense distraccions. Pensat per ser el teu company a la muntanya.",
      ctaReady: "Llest per calçar-te les botes?",
      ctaReadySubtitle: "Tant si tens dues hores com un dia sencer, la muntanya t'espera.",
      ctaStartExploring: "Comença a Explorar",
    },
    trailFinder: {
      title: "Cercador de Rutes",
      subtitle:
        "Descobreix rutes seleccionades per tot Montserrat. Filtra per dificultat, temps o terreny per trobar el teu camí perfecte.",
      filters: "Filtres",
      difficulty: "Dificultat",
      duration: "Durada",
      terrainType: "Tipus de Terreny",
      terrainPlaceholder: "p. ex. carena, llera...",
      clearFilters: "Esborra tots els filtres",
      clearFiltersBtn: "Esborra Filtres",
      any: "Qualsevol",
      durationShort: "Curta (0-2h)",
      durationHalf: "Mig Dia (2-4h)",
      durationFull: "Dia Complet (4h+)",
      noTrailsTitle: "No s'han trobat rutes",
      noTrailsDesc:
        "No hem trobat cap ruta que coincideixi amb aquests filtres. Prova d'ampliar els criteris de cerca.",
      terrain: "Terreny:",
      bestIn: "Millor època:",
      getDirections: "Com arribar-hi a peu",
      mapUnavailable: "Mapa no disponible",
    },
    community: {
      badge: "Rutes de la Comunitat",
      title: "Rutes d'Excursionistes",
      subtitle: "Coneixes un camí secret per Montserrat? Comparteix-lo amb altres excursionistes aquí sota.",
      submitTrail: "Envia una Ruta",
      shareRoute: "Comparteix una Ruta",
      shareRouteDesc:
        "Omple el nostre breu formulari amb el nom de la ruta, la distància, el desnivell, la dificultat i qualsevol consell per a altres excursionistes. Revisem cada enviament i afegim les millors rutes a la guia.",
      trailDetails: "Detalls de la ruta",
      takesTwoMinutes: "Triga 2 minuts",
      opensNewTab: "S'obre en una pestanya nova",
    },
    stats: {
      title: "Estadístiques de la Base de Dades",
      subtitle: "Un resum de les rutes catalogades actualment a la base de dades de Montserrat Trails.",
      totalTrails: "Rutes Totals",
      curatedGuide: "Guia Seleccionada",
      community: "Comunitat",
      trailsByDifficulty: "Rutes per Dificultat",
      trailsUnit: "rutes",
      noDifficultyData: "No hi ha dades de dificultat disponibles.",
    },
    notFound: {
      title: "404 Pàgina No Trobada",
      desc: "Has oblidat afegir la pàgina a l'enrutador?",
    },
  },
} as const;
