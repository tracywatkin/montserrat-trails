import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Map,
  Users,
  Mountain,
  Activity,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { DIFFICULTY_KEYS, difficultyLabels, type DifficultyKey } from "@/i18n/trails";

const stats: {
  total_trails: number;
  curated_count: number;
  community_count: number;
  by_difficulty: { difficulty: DifficultyKey; count: number }[];
} = {
  total_trails: 7,
  curated_count: 7,
  community_count: 0,
  by_difficulty: [
    { difficulty: "easy", count: 2 },
    { difficulty: "easy_moderate", count: 1 },
    { difficulty: "moderate", count: 2 },
    { difficulty: "moderate_hard", count: 1 },
    { difficulty: "hard", count: 1 },
  ],
};

export default function Stats() {
  const { t, language } = useLanguage();

  const sortedDifficultyStats = [...stats.by_difficulty].sort((a, b) => {
    const idxA = DIFFICULTY_KEYS.indexOf(a.difficulty);
    const idxB = DIFFICULTY_KEYS.indexOf(b.difficulty);
    if (idxA === -1 && idxB === -1) return 0;
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          {t.stats.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t.stats.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-full text-primary">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t.stats.totalTrails}</p>
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {stats.total_trails}
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20 border-secondary-foreground/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-secondary-foreground/10 p-4 rounded-full text-secondary-foreground">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t.stats.curatedGuide}</p>
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {stats.curated_count}
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-accent/10 p-4 rounded-full text-accent">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t.stats.community}</p>
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {stats.community_count}
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader className="border-b border-border/50 bg-card">
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            {t.stats.trailsByDifficulty}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            {sortedDifficultyStats.map((item) => {
              const percentage = Math.max(
                (item.count / stats.total_trails) * 100,
                0
              );

              let barColorClass = "bg-primary/60";
              if (item.difficulty === "easy") barColorClass = "bg-emerald-500/70";
              else if (item.difficulty === "hard") barColorClass = "bg-rose-500/70";
              else if (item.difficulty.includes("moderate")) barColorClass = "bg-amber-500/70";

              return (
                <div key={item.difficulty} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-foreground">{difficultyLabels[language][item.difficulty]}</span>
                    <span className="text-muted-foreground">
                      {item.count} {t.stats.trailsUnit} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${barColorClass}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {sortedDifficultyStats.length === 0 && (
              <p className="text-center text-muted-foreground py-4">{t.stats.noDifficultyData}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
