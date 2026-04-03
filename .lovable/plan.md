## Plan: 100 Ethiopia Travel Blogs for SEO Domination

### Phase 1: Blog Infrastructure
- Create blog data types and 100 topic definitions across 10 categories
- Build `BlogPage.tsx` (listing with category filters) and `BlogPost.tsx` (article detail)
- Add routes `/blog` and `/blog/:slug` to App.tsx
- Add blog link to Navbar
- Update sitemap.xml with all 100 blog URLs

### Phase 2: AI Content Generation
- Use AI gateway script to batch-generate 100 full articles (800-1200 words each)
- Each article gets: title, slug, category, meta description, full content, related posts
- Generate in batches of 10 to avoid rate limits

### Phase 3: SEO Optimization
- Unique H1, meta title, meta description per blog
- JSON-LD Article schema on each post
- Internal linking between related posts
- Category-based organization for crawlability

### 10 Categories (10 blogs each):
1. **Best Places to Visit** — Top destinations, hidden spots, regional guides
2. **Cultural Experiences** — Tribes, traditions, ceremonies, music
3. **Adventure & Trekking** — Hiking, climbing, extreme sports
4. **Historical Sites** — Churches, castles, ancient ruins
5. **Wildlife & Nature** — National parks, endemic species, birdwatching
6. **Food & Coffee** — Ethiopian cuisine, coffee culture, food tours
7. **Travel Tips & Planning** — Visa, safety, packing, budgeting
8. **Festivals & Events** — Timkat, Meskel, tribal ceremonies
9. **Hidden Gems** — Off-the-beaten-path destinations
10. **Itineraries & Guides** — Multi-day trip plans, route guides
