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
  ArrowUpRight,
  Filter,
  Search,
  Activity,
  Navigation,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocalizedTrails, DIFFICULTY_KEYS, difficultyLabels, type DifficultyKey } from "@/i18n/trails";
import TrailMap from "@/components/TrailMap";

// Helper to determine badge color based on difficulty
const getDifficultyVariant = (difficulty: DifficultyKey) => {
  if (difficulty === "easy") return "easy";
  if (difficulty === "hard") return "hard";
  if (difficulty.includes("moderate")) return "moderate";
  return "default";
};

type DurationFilterKey = "any" | "short" | "half" | "full";

export default function TrailFinder() {
  const { t, language } = useLanguage();
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyKey | "any">("any");
  const [durationFilter, setDurationFilter] = useState<DurationFilterKey>("any");
  const [terrainFilter, setTerrainFilter] = useState<string>("");

  const allTrails = useMemo(() => getLocalizedTrails(language), [language]);

  const durationOptions: { key: DurationFilterKey; label: string }[] = [
    { key: "any", label: t.trailFinder.any },
    { key: "short", label: t.trailFinder.durationShort },
    { key: "half", label: t.trailFinder.durationHalf },
    { key: "full", label: t.trailFinder.durationFull },
  ];

  const durationParams = useMemo(() => {
    switch (durationFilter) {
      case "short":
        return { min: 0, max: 2 };
      case "half":
        return { min: 2, max: 4 };
      case "full":
        return { min: 4, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  }, [durationFilter]);

  const trails = useMemo(() => {
    return allTrails.filter((trail) => {
      if (difficultyFilter !== "any" && trail.difficulty !== difficultyFilter) return false;
      if (trail.duration_hours < durationParams.min || trail.duration_hours > durationParams.max)
        return false;
      if (
        terrainFilter &&
        !trail.terrain_type.toLowerCase().includes(terrainFilter.toLowerCase())
      )
        return false;
      return true;
    });
  }, [allTrails, difficultyFilter, durationParams, terrainFilter]);

  const hasActiveFilters = difficultyFilter !== "any" || durationFilter !== "any" || terrainFilter !== "";
  const clearAllFilters = () => {
    setDifficultyFilter("any");
    setDurationFilter("any");
    setTerrainFilter("");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">{t.trailFinder.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t.trailFinder.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-xl font-semibold">{t.trailFinder.filters}</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  {t.trailFinder.difficulty}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(["any", ...DIFFICULTY_KEYS] as const).map((diff) => (
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
                      {diff === "any" ? t.trailFinder.any : difficultyLabels[language][diff]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {t.trailFinder.duration}
                </Label>
                <div className="flex flex-col gap-2">
                  {durationOptions.map((dur) => (
                    <Button
                      key={dur.key}
                      variant={durationFilter === dur.key ? "secondary" : "ghost"}
                      size="sm"
                      className={`justify-start font-medium ${
                        durationFilter === dur.key ? "bg-secondary/70" : "text-muted-foreground"
                      }`}
                      onClick={() => setDurationFilter(dur.key)}
                    >
                      {dur.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {t.trailFinder.terrainType}
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t.trailFinder.terrainPlaceholder}
                    className="pl-9 bg-background/50 border-border/60"
                    value={terrainFilter}
                    onChange={(e) => setTerrainFilter(e.target.value)}
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  className="w-full mt-6 text-muted-foreground hover:text-foreground"
                  onClick={clearAllFilters}
                >
                  {t.trailFinder.clearFilters}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {trails.length === 0 ? (
            <div className="text-center py-24 bg-card border border-border border-dashed rounded-xl flex flex-col items-center">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{t.trailFinder.noTrailsTitle}</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                {t.trailFinder.noTrailsDesc}
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                {t.trailFinder.clearFiltersBtn}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {trails.map((trail) => (
                <Card key={trail.id} className="group overflow-hidden flex flex-col h-full border-border/60">
                  <CardHeader className="pb-4 items-start gap-2 border-b border-border/30 bg-secondary/20">
                    <div className="flex justify-between items-start w-full">
                      <Badge variant={getDifficultyVariant(trail.difficulty) as any} className="mb-2 uppercase tracking-wider text-[10px] font-bold">
                        {trail.difficultyLabel}
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
                        <span className="font-semibold text-foreground min-w-16">{t.trailFinder.terrain}</span>
                        <span className="text-muted-foreground">{trail.terrain_type}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-semibold text-foreground min-w-16">{t.trailFinder.bestIn}</span>
                        <span className="text-muted-foreground">{trail.best_season}</span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg overflow-hidden border border-border/60 h-40">
                      <TrailMap
                        lat={trail.start_lat}
                        lng={trail.start_lng}
                        name={trail.name}
                        route={trail.route}
                        className="h-full w-full"
                      />
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                    >
                      <a
                        href={
                          "https://www.google.com/maps/dir/?api=1&destination=" +
                          trail.start_lat +
                          "," +
                          trail.start_lng +
                          "&travelmode=walking"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-3.5 h-3.5 mr-2" />
                        {t.trailFinder.getDirections}
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
