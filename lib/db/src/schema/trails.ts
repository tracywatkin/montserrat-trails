import { pgTable, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const trailsTable = pgTable("trails", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  distance_km: real("distance_km").notNull(),
  elevation_gain_m: integer("elevation_gain_m").notNull(),
  difficulty: text("difficulty").notNull(),
  duration_hours: real("duration_hours").notNull(),
  best_season: text("best_season").notNull(),
  description: text("description").notNull(),
  terrain_type: text("terrain_type"),
  source: text("source").notNull().default("community"), // 'curated' | 'community'
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertTrailSchema = createInsertSchema(trailsTable).omit({ id: true, created_at: true });
export type InsertTrail = z.infer<typeof insertTrailSchema>;
export type Trail = typeof trailsTable.$inferSelect;
