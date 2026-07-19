import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Clock,
  Mountain as MountainIcon,
  ArrowUpRight,
  Filter,
  Search,
  Activity,
  Navigation,
} from "lucide-react";
import { Label } from "@/components/ui/label";

// Helper to determine badge color based on difficulty
const getDifficultyVariant = (difficulty: string) => {
  const diff = difficulty.toLowerCase();
  if (diff.includes("easy")) return "easy";
  if (diff.includes("hard")) return "hard";
  if (diff.includes("moderate")) return "moderate";
  return "default";
};

const HOME_LAT = 41.6081596;
const HOME_LNG = 1.8643679;

const TRAILS = [
  {
    id: "1",
    name: "La Torrota",
    distance_km: 4,
    elevation_gain_m: 104,
    difficulty: "Easy",
    duration_hours: 1.2,
    best_season: "Year-round",
    terrain_type: "Path, gentle climb",
    description:
      "Short, family-friendly climb to an 11th-century Romanesque watchtower with sweeping views of the Montserrat massif. The easiest hike on the list.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
  {
    id: "2",
    name: "Ermita de Sant Antolí",
    distance_km: 5,
    elevation_gain_m: 150,
    difficulty: "Easy-Moderate",
    duration_hours: 1.5,
    best_season: "Spring, Autumn",
    terrain_type: "Vineyard paths",
    description:
      "A gentle path through vineyards to a 14th-century hermitage. More about the scenery and history than the climb.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
  {
    id: "3",
    name: "Coll de les Bruixes",
    distance_km: 7,
    elevation_gain_m: 350,
    difficulty: "Moderate",
    duration_hours: 2.5,
    best_season: "Spring, Autumn",
    terrain_type: "Ridge trail",
    description:
      "A key crossroads on the Serra del Cul de la Portadora ridge, with a hidden spring nearby and connections toward Turó de la Socarrada.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
  {
    id: "4",
    name: "Turó de la Socarrada",
    distance_km: 8,
    elevation_gain_m: 450,
    difficulty: "Moderate-Hard",
    duration_hours: 3,
    best_season: "Spring, Autumn",
    terrain_type: "Rocky ridge",
    description:
      "Highest point of the Serra de l'Hospici at 519m, reached via a short detour off the main ridge path. Strong panoramic reward for the climb.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
  {
    id: "5",
    name: "Pla de les Bruixes",
    distance_km: 7,
    elevation_gain_m: 300,
    difficulty: "Moderate",
    duration_hours: 2.5,
    best_season: "Year-round, especially at sunset",
    terrain_type: "Forest, summit",
    description:
      "A 396m summit on the Vacarisses/Esparreguera border. The 'Era de les Bruixes' spot has a slightly eerie, magical feel — worth timing for golden hour.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
  {
    id: "6",
    name: "The riverbed of Monistrol de Montserrat",
    distance_km: 6,
    elevation_gain_m: 100,
    difficulty: "Easy",
    duration_hours: 2,
    best_season: "Year-round (check water levels after rain)",
    terrain_type: "Riverbed, flat",
    description: "A local riverbed walk near Monistrol — flat, shaded, and a nice low-effort option.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
  {
    id: "7",
    name: "Sant Salvador de les Espases",
    distance_km: 16.5,
    elevation_gain_m: 800,
    difficulty: "Hard",
    duration_hours: 5.5,
    best_season: "Spring, Autumn",
    terrain_type: "Mountain, steep",
    description:
      "A demanding full-day route to a historic hermitage, passing through Coll de les Bruixes and the Serra de l'Hospici. Not suitable for kids or casual hikers.",
    start_lat: HOME_LAT,
    start_lng: HOME_LNG,
  },
];

export default function TrailFinder() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("Any");
  const [durationFilter, setDurationFilter] = useState<string>("Any");
  const [terrainFilter, setTerrainFilter] = useState<string>("");

  const durationParams = useMemo(() => {
    switch (durationFilter) {
      case "Short (0-2h)":
        return { min: 0, max: 2 };
      case "Half Day (2-4h)":
        return { min: 2, max: 4 };
      case "Full Day (4h+)":
        return { min: 4, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  }, [durationFilter]);

  const trails = useMemo(() => {
    return TRAILS.filter((trail) => {
      if (difficultyFilter !== "Any" && trail.difficulty !== difficultyFilter) return false;
      if (trail.duration_hours < durationParams.min || trail.duration_hours > durationParams.max)
        return false;
      if (
        terrainFilter &&
        !trail.terrain_type.toLowerCase().includes(terrainFilter.toLowerCase())
      )
        return false;
      return true;
    });
  }, [difficultyFilter, durationParams, terrainFilter]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Trail Finder</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover curated routes across Montserrat. Filter by difficulty, time, or terrain to find your perfect path.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-xl font-semibold">Filters</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  Difficulty
                </Label>
                <div className="flex flex-wrap gap-2">
                  {["Any", "Easy", "Easy-Moderate", "Moderate", "Moderate-Hard", "Hard"].map((diff) => (
                    <Badge
                      key={diff}
                      variant={difficultyFilter === diff ? "default" : "outline"}
                      className={`cursor-pointer transition-colors px-3 py-1.5 ${
                        difficultyFilter === diff
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-accent/10 border-border/60"
                      }`}
                      onClick={() => setDifficultyFilter(diff)}
                    >
                      {diff}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Duration
                </Label>
                <div className="flex flex-col gap-2">
                  {["Any", "Short (0-2h)", "Half Day (2-4h)", "Full Day (4h+)"].map((dur) => (
                    <Button
                      key={dur}
                      variant={durationFilter === dur ? "secondary" : "ghost"}
                      size="sm"
                      className={`justify-start font-medium ${
                        durationFilter === dur ? "bg-secondary/70" : "text-muted-foreground"
                      }`}
                      onClick={() => setDurationFilter(dur)}
                    >
                      {dur}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Terrain Type
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g. ridge, riverbed..."
                    className="pl-9 bg-background/50 border-border/60"
                    value={terrainFilter}
                    onChange={(e) => setTerrainFilter(e.target.value)}
                  />
                </div>
              </div>

              {(difficultyFilter !== "Any" || durationFilter !== "Any" || terrainFilter !== "") && (
                <Button
                  variant="ghost"
                  className="w-full mt-6 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setDifficultyFilter("Any");
                    setDurationFilter("Any");
                    setTerrainFilter("");
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {trails.length === 0 ? (
            <div className="text-center py-24 bg-card border border-border border-dashed rounded-xl flex flex-col items-center">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">No trails found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                We couldn't find any paths matching those filters. Try broadening your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setDifficultyFilter("Any");
                  setDurationFilter("Any");
                  setTerrainFilter("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {trails.map((trail) => (
                <Card key={trail.id} className="group overflow-hidden flex flex-col h-full border-border/60">
                  <CardHeader className="pb-4 items-start gap-2 border-b border-border/30 bg-secondary/20">
                    <div className="flex justify-between items-start w-full">
                      <Badge variant={getDifficultyVariant(trail.difficulty) as any} className="mb-2 uppercase tracking-wider text-[10px] font-bold">
                        {trail.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium bg-background px-2 py-1 rounded-md border border-border/50">
                        <Clock className="w-3 h-3" />
                        {trail.duration_hours}h
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {trail.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-3 text-sm font-medium">
                      <span className="flex items-center gap-1 text-foreground/80">
                        <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                        {trail.elevation_gain_m}m
                      </span>
                      <span className="text-border">•</span>
                      <span className="flex items-center gap-1 text-foreground/80">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {trail.distance_km}km
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-5 flex-grow flex flex-col">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {trail.description}
                    </p>

                    <div className="mt-5 space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-semibold text-foreground min-w-16">Terrain:</span>
                        <span className="text-muted-foreground">{trail.terrain_type}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-semibold text-foreground min-w-16">Best in:</span>
                        <span className="text-muted-foreground">{trail.best_season}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-5 w-full"
                    >
                      
                        <a
                          href={"https://www.google.com/maps/dir/?api=1&destination=" + trail.start_lat + "," + trail.start_lng}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-3.5 h-3.5 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
