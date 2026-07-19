import { Router } from "express";
import { db, trailsTable } from "@workspace/db";
import { eq, and, lte, gte } from "drizzle-orm";
import { SubmitTrailBody } from "@workspace/api-zod";

const router = Router();

// GET /trails — list curated trails with optional filters
router.get("/", async (req, res) => {
  try {
    const difficulty = req.query["difficulty"] as string | undefined;
    const min_duration = req.query["min_duration_hours"] ? Number(req.query["min_duration_hours"]) : undefined;
    const max_duration = req.query["max_duration_hours"] ? Number(req.query["max_duration_hours"]) : undefined;
    const terrain_type = req.query["terrain_type"] as string | undefined;

    const conditions = [eq(trailsTable.source, "curated")];

    if (difficulty) {
      conditions.push(eq(trailsTable.difficulty, difficulty));
    }
    if (min_duration !== undefined && !isNaN(min_duration)) {
      conditions.push(gte(trailsTable.duration_hours, min_duration));
    }
    if (max_duration !== undefined && !isNaN(max_duration)) {
      conditions.push(lte(trailsTable.duration_hours, max_duration));
    }
    if (terrain_type) {
      conditions.push(eq(trailsTable.terrain_type, terrain_type));
    }

    const trails = await db
      .select()
      .from(trailsTable)
      .where(and(...conditions))
      .orderBy(trailsTable.duration_hours);

    res.json(trails);
  } catch (err) {
    req.log.error({ err }, "Failed to list trails");
    res.status(500).json({ error: "Failed to list trails" });
  }
});

// GET /trails/community — list community-submitted trails
router.get("/community", async (req, res) => {
  try {
    const trails = await db
      .select()
      .from(trailsTable)
      .where(eq(trailsTable.source, "community"))
      .orderBy(trailsTable.created_at);

    res.json(trails);
  } catch (err) {
    req.log.error({ err }, "Failed to list community trails");
    res.status(500).json({ error: "Failed to list community trails" });
  }
});

// POST /trails/community — submit a community trail
router.post("/community", async (req, res) => {
  const parsed = SubmitTrailBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid trail data" });
    return;
  }

  try {
    const [trail] = await db
      .insert(trailsTable)
      .values({ ...parsed.data, source: "community" })
      .returning();

    res.status(201).json(trail);
  } catch (err) {
    req.log.error({ err }, "Failed to submit trail");
    res.status(500).json({ error: "Failed to submit trail" });
  }
});

// GET /trails/stats — summary stats
router.get("/stats", async (req, res) => {
  try {
    const all = await db.select().from(trailsTable);
    const total_trails = all.length;
    const curated_count = all.filter((t) => t.source === "curated").length;
    const community_count = all.filter((t) => t.source === "community").length;

    const difficultyMap: Record<string, number> = {};
    for (const trail of all) {
      difficultyMap[trail.difficulty] = (difficultyMap[trail.difficulty] ?? 0) + 1;
    }
    const by_difficulty = Object.entries(difficultyMap).map(([difficulty, count]) => ({
      difficulty,
      count,
    }));

    res.json({ total_trails, curated_count, community_count, by_difficulty });
  } catch (err) {
    req.log.error({ err }, "Failed to get trail stats");
    res.status(500).json({ error: "Failed to get stats" });
  }
});

export default router;
