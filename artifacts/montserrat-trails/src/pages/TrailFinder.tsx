import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useListTrails, getListTrailsQueryKey } from "@workspace/api-client-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
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
  Activity
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

export default function TrailFinder() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("Any");
  const [durationFilter, setDurationFilter] = useState<string>("Any");
  const [terrainFilter, setTerrainFilter] = useState<string>("");

  // Map UI duration filter to min/max hours
  const durationParams = useMemo(() => {
    switch (durationFilter) {
      case "Short (0-2h)": return { min_duration_hours: 0, max_duration_hours: 2 };
      case "Half Day (2-4h)": return { min_duration_hours: 2, max_duration_hours: 4 };
      case "Full Day (4h+)": return { min_duration_hours: 4, max_duration_hours: undefined };
      default: return {};
    }
  }, [durationFilter]);

  const queryParams = {
    ...(difficultyFilter !== "Any" && { difficulty: difficultyFilter }),
    ...(terrainFilter && { terrain_type: terrainFilter }),
    ...durationParams
  };

  const { data: trails = [], isLoading, error } = useListTrails(queryParams, {
    query: {
      enabled: true,
      queryKey: getListTrailsQueryKey(queryParams)
    }
  });

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
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-xl font-semibold">Filters</h2>
            </div>
            
            <div className="space-y-6">
              {/* Difficulty Filter */}
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

              {/* Duration Filter */}
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

              {/* Terrain Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Terrain Type
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="e.g. limestone, forest..." 
                    className="pl-9 bg-background/50 border-border/60"
                    value={terrainFilter}
                    onChange={(e) => setTerrainFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Clear filters button */}
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

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted/50 rounded-t-xl" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="space-y-2 pt-4">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-destructive/5 rounded-xl border border-destructive/20">
              <MountainIcon className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-destructive font-semibold mb-2">Could not load trails</h3>
              <p className="text-muted-foreground">There was an error connecting to the trail database.</p>
            </div>
          ) : trails.length === 0 ? (
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
                  
                  <CardContent className="pt-5 flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {trail.description}
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      {trail.terrain_type && (
                        <div className="flex items-start gap-2 text-xs">
                          <span className="font-semibold text-foreground min-w-16">Terrain:</span>
                          <span className="text-muted-foreground">{trail.terrain_type}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-semibold text-foreground min-w-16">Best in:</span>
                        <span className="text-muted-foreground">{trail.best_season}</span>
                      </div>
                    </div>
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
