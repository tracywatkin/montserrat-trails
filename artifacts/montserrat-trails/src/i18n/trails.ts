import type { Language } from "./translations";
import { trailRoutes, type LatLng } from "@/data/trailRoutes";

// Canonical difficulty keys used for filtering logic (language-independent).
export type DifficultyKey = "easy" | "easy_moderate" | "moderate" | "moderate_hard" | "hard";

export const DIFFICULTY_KEYS: DifficultyKey[] = [
  "easy",
  "easy_moderate",
  "moderate",
  "moderate_hard",
  "hard",
];

export const difficultyLabels: Record<Language, Record<DifficultyKey, string>> = {
  en: {
    easy: "Easy",
    easy_moderate: "Easy-Moderate",
    moderate: "Moderate",
    moderate_hard: "Moderate-Hard",
    hard: "Hard",
  },
  es: {
    easy: "Fácil",
    easy_moderate: "Fácil-Moderada",
    moderate: "Moderada",
    moderate_hard: "Moderada-Difícil",
    hard: "Difícil",
  },
  ca: {
    easy: "Fàcil",
    easy_moderate: "Fàcil-Moderada",
    moderate: "Moderada",
    moderate_hard: "Moderada-Difícil",
    hard: "Difícil",
  },
};

interface TrailBase {
  id: string;
  name: string; // Proper place name — kept the same across languages
  distance_km: number;
  elevation_gain_m: number;
  difficulty: DifficultyKey;
  duration_hours: number;
  start_lat: number;
  start_lng: number;
}

interface TrailLocalizedFields {
  best_season: string;
  terrain_type: string;
  description: string;
}

const TRAILS_BASE: TrailBase[] = [
  {
    id: "1",
    name: "La Torrota",
    distance_km: 4,
    elevation_gain_m: 104,
    difficulty: "easy",
    duration_hours: 1.2,
    start_lat: 41.603429,
    start_lng: 1.923095,
  },
  {
    id: "2",
    name: "Ermita de Sant Antolí",
    distance_km: 5,
    elevation_gain_m: 150,
    difficulty: "easy_moderate",
    duration_hours: 1.5,
    start_lat: 41.608523,
    start_lng: 1.864435,
  },
  {
    id: "3",
    name: "Coll de les Bruixes",
    distance_km: 7,
    elevation_gain_m: 350,
    difficulty: "moderate",
    duration_hours: 2.5,
    start_lat: 41.605548,
    start_lng: 1.870494,
  },
  {
    id: "4",
    name: "Turó de la Socarrada",
    distance_km: 8,
    elevation_gain_m: 450,
    difficulty: "moderate_hard",
    duration_hours: 3,
    start_lat: 41.604551,
    start_lng: 1.871394,
  },
  {
    id: "5",
    name: "Pla de les Bruixes",
    distance_km: 7,
    elevation_gain_m: 300,
    difficulty: "moderate",
    duration_hours: 2.5,
    start_lat: 41.609149,
    start_lng: 1.865451,
  },
  {
    id: "7",
    name: "Sant Salvador de les Espases",
    distance_km: 16.5,
    elevation_gain_m: 800,
    difficulty: "hard",
    duration_hours: 5.5,
    start_lat: 41.611051,
    start_lng: 1.84489,
  },
  {
    id: "8",
    name: "Monistrol – Monestir de Montserrat",
    distance_km: 13.6,
    elevation_gain_m: 600,
    difficulty: "hard",
    duration_hours: 3.5,
    start_lat: 41.61032,
    start_lng: 1.848958,
  },
];

const TRAILS_LOCALIZED: Record<Language, Record<string, TrailLocalizedFields>> = {
  en: {
    "1": {
      best_season: "Year-round",
      terrain_type: "Path, gentle climb",
      description:
        "Short, family-friendly climb to an 11th-century Romanesque watchtower with sweeping views of the Montserrat massif. The easiest hike on the list.",
    },
    "2": {
      best_season: "Spring, Autumn",
      terrain_type: "Vineyard paths",
      description:
        "A gentle path through vineyards to an old Gothic-style hermitage. More about the scenery and history than the climb.",
    },
    "3": {
      best_season: "Spring, Autumn",
      terrain_type: "Ridge trail",
      description:
        "A key crossroads on the Serra del Cul de la Portadora ridge, with a hidden spring nearby and connections toward Turó de la Socarrada.",
    },
    "4": {
      best_season: "Spring, Autumn",
      terrain_type: "Rocky ridge",
      description:
        "Highest point of the Serra de l'Hospici at 519m, reached via a short detour off the main ridge path. Strong panoramic reward for the climb.",
    },
    "5": {
      best_season: "Year-round, especially at sunset",
      terrain_type: "Forest, summit",
      description:
        "A 396m summit on the Vacarisses/Esparreguera border. The 'Era de les Bruixes' spot has a slightly eerie, magical feel — worth timing for golden hour.",
    },
    "7": {
      best_season: "Spring, Autumn",
      terrain_type: "Mountain, steep",
      description:
        "A demanding full-day route to a historic hermitage, passing through Coll de les Bruixes and the Serra de l'Hospici. The chapel's roof partially collapsed in 2024 and restoration is still underway — it's badly damaged and you can't go inside, but the approach and viewpoint remain open and worth the climb. Not suitable for kids or casual hikers.",
    },
    "8": {
      best_season: "Year-round",
      terrain_type: "Stone path, many steps near the top",
      description:
        "The classic pilgrimage route from the valley town of Monistrol de Montserrat up to the monastery, following the Camí de les Aigües and the steeper Drecera dels Tres Quarts. A there-and-back climb through pine forest with the monastery bells as your reward.",
    },
  },
  es: {
    "1": {
      best_season: "Todo el año",
      terrain_type: "Camino, subida suave",
      description:
        "Ascensión corta y apta para familias hasta una torre de vigía románica del siglo XI, con amplias vistas del macizo de Montserrat. La ruta más fácil de la lista.",
    },
    "2": {
      best_season: "Primavera, Otoño",
      terrain_type: "Caminos entre viñedos",
      description:
        "Un camino suave entre viñedos hasta una antigua ermita de estilo gótico. Más centrado en el paisaje y la historia que en el desnivel.",
    },
    "3": {
      best_season: "Primavera, Otoño",
      terrain_type: "Sendero de cresta",
      description:
        "Un cruce clave en la cresta de la Serra del Cul de la Portadora, con una fuente escondida cerca y conexiones hacia el Turó de la Socarrada.",
    },
    "4": {
      best_season: "Primavera, Otoño",
      terrain_type: "Cresta rocosa",
      description:
        "Punto más alto de la Serra de l'Hospici, a 519 m, al que se llega con un breve desvío del sendero principal de cresta. Una recompensa panorámica excelente para el esfuerzo.",
    },
    "5": {
      best_season: "Todo el año, especialmente al atardecer",
      terrain_type: "Bosque, cima",
      description:
        "Una cima de 396 m en el límite entre Vacarisses y Esparreguera. El lugar conocido como 'Era de les Bruixes' tiene un ambiente algo misterioso y mágico: vale la pena ir a la hora dorada.",
    },
    "7": {
      best_season: "Primavera, Otoño",
      terrain_type: "Montaña, pendiente pronunciada",
      description:
        "Una ruta exigente de día completo hasta una ermita histórica, pasando por el Coll de les Bruixes y la Serra de l'Hospici. El tejado de la capilla se hundió parcialmente en 2024 y la restauración sigue en marcha: está muy dañada y no se puede entrar, pero el camino de acceso y el mirador siguen abiertos y merecen la subida. No recomendada para niños ni para senderistas ocasionales.",
    },
    "8": {
      best_season: "Todo el año",
      terrain_type: "Camino de piedra, muchos escalones cerca de la cima",
      description:
        "La ruta clásica de peregrinación desde el pueblo de Monistrol de Montserrat hasta el monasterio, siguiendo el Camí de les Aigües y la más empinada Drecera dels Tres Quarts. Una subida de ida y vuelta entre pinares, con las campanas del monasterio como recompensa.",
    },
  },
  ca: {
    "1": {
      best_season: "Tot l'any",
      terrain_type: "Camí, pujada suau",
      description:
        "Pujada curta i apta per a famílies fins a una torre de guaita romànica del segle XI, amb àmplies vistes del massís de Montserrat. La ruta més fàcil de la llista.",
    },
    "2": {
      best_season: "Primavera, Tardor",
      terrain_type: "Camins entre vinyes",
      description:
        "Un camí suau entre vinyes fins a una antiga ermita d'estil gòtic. Més centrat en el paisatge i la història que no pas en el desnivell.",
    },
    "3": {
      best_season: "Primavera, Tardor",
      terrain_type: "Sender de carena",
      description:
        "Un encreuament clau a la carena de la Serra del Cul de la Portadora, amb una font amagada a prop i connexions cap al Turó de la Socarrada.",
    },
    "4": {
      best_season: "Primavera, Tardor",
      terrain_type: "Carena rocosa",
      description:
        "Punt més alt de la Serra de l'Hospici, a 519 m, al qual s'arriba amb una petita desviació del sender principal de carena. Una recompensa panoràmica excel·lent per a l'esforç.",
    },
    "5": {
      best_season: "Tot l'any, especialment a la posta de sol",
      terrain_type: "Bosc, cim",
      description:
        "Un cim de 396 m al límit entre Vacarisses i Esparreguera. L'indret conegut com l''Era de les Bruixes' té un ambient una mica misteriós i màgic: val la pena anar-hi a l'hora daurada.",
    },
    "7": {
      best_season: "Primavera, Tardor",
      terrain_type: "Muntanya, pendent pronunciat",
      description:
        "Una ruta exigent de dia complet fins a una ermita històrica, passant pel Coll de les Bruixes i la Serra de l'Hospici. La teulada de la capella es va enfonsar parcialment el 2024 i la restauració encara està en marxa: està molt malmesa i no s'hi pot entrar, però el camí d'accés i el mirador continuen oberts i valen la pujada. No recomanada per a infants ni per a excursionistes ocasionals.",
    },
    "8": {
      best_season: "Tot l'any",
      terrain_type: "Camí de pedra, molts esglaons a prop del cim",
      description:
        "La ruta clàssica de pelegrinatge des del poble de Monistrol de Montserrat fins al monestir, seguint el Camí de les Aigües i la més empinada Drecera dels Tres Quarts. Una pujada d'anada i tornada entre pinedes, amb les campanes del monestir com a recompensa.",
    },
  },
};

export interface LocalizedTrail extends TrailBase, TrailLocalizedFields {
  difficultyLabel: string;
  /** Real recorded GPS route, when available (see src/data/trailRoutes.ts). */
  route?: LatLng[];
}

export function getLocalizedTrails(language: Language): LocalizedTrail[] {
  return TRAILS_BASE.map((trail) => ({
    ...trail,
    ...TRAILS_LOCALIZED[language][trail.id],
    difficultyLabel: difficultyLabels[language][trail.difficulty],
    route: trailRoutes[trail.id],
  }));
}
