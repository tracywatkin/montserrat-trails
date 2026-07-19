import { Route, Switch, Router as WouterRouter } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import TrailFinder from "@/pages/TrailFinder";
import Community from "@/pages/Community";
import Stats from "@/pages/Stats";
import { Mountain } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-4">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <Mountain className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-4xl font-serif font-bold mb-4">Lost on the mountain?</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        The path you're looking for seems to have disappeared. Let's get you back to the main trail.
      </p>
      <Link href="/">
        <Button size="lg" className="font-medium">
          Return to Base
        </Button>
      </Link>
    </div>
  );
}

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/trails" component={TrailFinder} />
        <Route path="/community" component={Community} />
        <Route path="/stats" component={Stats} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

export default Router;
