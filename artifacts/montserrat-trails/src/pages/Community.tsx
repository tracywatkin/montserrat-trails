import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListCommunityTrails, 
  useSubmitTrail,
  getListCommunityTrailsQueryKey,
  TrailInput
} from "@workspace/api-client-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Plus, 
  MapPin,
  Clock,
  ArrowUpRight,
  Send,
  Leaf
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper to determine badge color based on difficulty
const getDifficultyVariant = (difficulty: string) => {
  const diff = difficulty.toLowerCase();
  if (diff.includes("easy")) return "easy";
  if (diff.includes("hard")) return "hard";
  if (diff.includes("moderate")) return "moderate";
  return "default";
};

const formSchema = z.object({
  name: z.string().min(3, "Trail name must be at least 3 characters").max(100),
  distance_km: z.coerce.number().min(0.1, "Distance must be greater than 0"),
  elevation_gain_m: z.coerce.number().min(0, "Elevation cannot be negative"),
  difficulty: z.string().min(1, "Please select a difficulty"),
  duration_hours: z.coerce.number().min(0.1, "Duration must be greater than 0"),
  best_season: z.string().min(2, "Please provide the best season (e.g. Spring, Fall)"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  terrain_type: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Community() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: trails = [], isLoading, error } = useListCommunityTrails({
    query: {
      queryKey: getListCommunityTrailsQueryKey()
    }
  });

  const submitTrailMutation = useSubmitTrail();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      distance_km: 0,
      elevation_gain_m: 0,
      difficulty: "",
      duration_hours: 0,
      best_season: "",
      description: "",
      terrain_type: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // API schema type TrailInput requires certain fields
    const payload: TrailInput = {
      name: data.name,
      distance_km: data.distance_km,
      elevation_gain_m: data.elevation_gain_m,
      difficulty: data.difficulty,
      duration_hours: data.duration_hours,
      best_season: data.best_season,
      description: data.description,
      terrain_type: data.terrain_type || undefined,
    };

    submitTrailMutation.mutate({ data: payload }, {
      onSuccess: () => {
        toast({
          title: "Trail submitted!",
          description: "Thank you for sharing with the community.",
        });
        queryClient.invalidateQueries({ queryKey: getListCommunityTrailsQueryKey() });
        form.reset();
        setIsFormOpen(false);
      },
      onError: (err) => {
        toast({
          title: "Submission failed",
          description: "There was an error saving your trail. Please try again.",
          variant: "destructive",
        });
        console.error(err);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-4">
            <Users className="mr-2 h-4 w-4" />
            <span>Community Routes</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Hiker Submissions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore paths discovered and shared by other hikers, or add your own secret route to the guide.
          </p>
        </div>
        
        {!isFormOpen && (
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Submit a Trail
          </Button>
        )}
      </div>

      {isFormOpen && (
        <div className="mb-16 bg-card border border-border shadow-md rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-secondary/30 p-6 border-b border-border flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Share a Route
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Help others experience the mountain by sharing your knowledge.
              </p>
            </div>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
          </div>
          
          <div className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trail Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Secret Path to Sant Jeroni" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="distance_km"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Distance (km)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" placeholder="5.2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="elevation_gain_m"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Elevation (m)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="450" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Easy-Moderate">Easy-Moderate</SelectItem>
                                <SelectItem value="Moderate">Moderate</SelectItem>
                                <SelectItem value="Moderate-Hard">Moderate-Hard</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="duration_hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (hours)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.5" placeholder="3.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="best_season"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Best Season</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Spring or Fall (Avoid summer noon)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="terrain_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Terrain Type (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Forest dirt, some scrambling" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the route, landmarks, parking, and any tips for fellow hikers..." 
                              className="min-h-[120px] resize-y"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-border pt-6">
                  <Button 
                    type="submit" 
                    disabled={submitTrailMutation.isPending}
                    className="min-w-[150px]"
                  >
                    {submitTrailMutation.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Trail
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}

      {/* Trails List */}
      <div>
        <h3 className="text-xl font-serif font-semibold mb-6 flex items-center gap-2 border-b border-border pb-2">
          Latest Submissions
        </h3>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse h-[300px] bg-muted/30" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">Failed to load community trails.</div>
        ) : trails.length === 0 ? (
          <div className="text-center py-20 bg-secondary/20 rounded-xl border border-border border-dashed">
            <Leaf className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <h4 className="font-serif text-lg font-medium text-foreground mb-1">No community trails yet</h4>
            <p className="text-muted-foreground text-sm">Be the first to share a route with the community.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trails.map((trail) => (
              <Card key={trail.id} className="group flex flex-col h-full bg-card hover:border-primary/40 transition-colors border-border/60">
                <CardHeader className="pb-4 items-start gap-1">
                  <div className="flex justify-between w-full mb-1">
                    <Badge variant={getDifficultyVariant(trail.difficulty) as any} className="text-[10px] uppercase font-bold px-2 py-0.5">
                      {trail.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {trail.duration_hours}h
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight">
                    {trail.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-3 text-xs font-medium mt-1">
                    <span className="flex items-center gap-1 text-foreground/70">
                      <ArrowUpRight className="w-3 h-3 text-accent" />
                      {trail.elevation_gain_m}m
                    </span>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1 text-foreground/70">
                      <MapPin className="w-3 h-3 text-primary" />
                      {trail.distance_km}km
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-2 flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed bg-background/50 p-3 rounded-lg border border-border/40">
                    "{trail.description}"
                  </p>
                </CardContent>
                
                <div className="px-6 pb-6 pt-0 mt-auto text-xs text-muted-foreground flex justify-between items-center border-t border-border/30 pt-4">
                  <span className="font-medium bg-secondary/50 px-2 py-1 rounded">
                    Season: {trail.best_season}
                  </span>
                  <span>
                    {new Date(trail.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
