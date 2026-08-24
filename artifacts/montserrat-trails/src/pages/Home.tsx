import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Compass, Users, Map, ArrowRight, Mountain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative py-24 md:py-32 lg:py-40 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10"></div>
          {/* A large abstract shape representing the serrated mountain */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full opacity-20 pointer-events-none">
             <svg viewBox="0 0 1000 400" className="w-full h-full text-primary fill-current" preserveAspectRatio="none">
               <path d="M0,400 L0,200 L50,150 L100,250 L200,80 L250,180 L350,50 L450,190 L550,20 L650,170 L750,90 L850,220 L950,110 L1000,160 L1000,400 Z" />
             </svg>
          </div>
        </div>
        
        <div className="container relative z-20 px-4 md:px-6 text-center max-w-4xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Mountain className="mr-2 h-4 w-4" />
            <span>{t.home.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground mb-6 leading-tight">
            {t.home.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.home.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link href="/trails">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 shadow-md group">
                {t.home.ctaFindTrail}
                <Compass className="ml-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 border-primary/20 hover:bg-primary/5">
                {t.home.ctaCommunityRoutes}
                <Users className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-card border-y border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl bg-background border border-border/50 shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold">{t.home.featuresCuratedTitle}</h3>
              <p className="text-muted-foreground text-sm">
                {t.home.featuresCuratedDesc}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl bg-background border border-border/50 shadow-sm">
              <div className="p-3 bg-accent/10 rounded-full text-accent">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold">{t.home.featuresLocalTitle}</h3>
              <p className="text-muted-foreground text-sm">
                {t.home.featuresLocalDesc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl bg-background border border-border/50 shadow-sm">
              <div className="p-3 bg-secondary-foreground/10 rounded-full text-secondary-foreground">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold">{t.home.featuresFieldGuideTitle}</h3>
              <p className="text-muted-foreground text-sm">
                {t.home.featuresFieldGuideDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.home.ctaReady}</h2>
          <p className="text-muted-foreground">
            {t.home.ctaReadySubtitle}
          </p>
          <Link href="/trails">
            <Button size="lg" variant="secondary" className="mt-4 font-medium group">
              {t.home.ctaStartExploring}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
