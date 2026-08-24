import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Clock, ArrowUpRight, Send, Leaf } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeg4cJiuFejjcg36MGEaPGMcRqFxXZbPl0jaAc2mjo1mpwSNQ/viewform";

export default function Community() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-4">
            <Users className="mr-2 h-4 w-4" />
            <span>{t.community.badge}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">{t.community.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t.community.subtitle}
          </p>
        </div>

        <Button asChild className="shrink-0 shadow-sm">
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
            <Send className="w-4 h-4 mr-2" />
            {t.community.submitTrail}
          </a>
        </Button>
      </div>

      <Card className="bg-secondary/20 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-serif">
            <Leaf className="w-5 h-5 text-primary" />
            {t.community.shareRoute}
          </CardTitle>
          <CardDescription>
            {t.community.shareRouteDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary" /> {t.community.trailDetails}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" /> {t.community.takesTwoMinutes}
            </span>
            <span className="flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-accent" /> {t.community.opensNewTab}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
