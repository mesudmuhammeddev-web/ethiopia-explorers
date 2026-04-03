export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  content: string;
  readTime: number;
  date: string;
}

export const blogCategories = [
  "Best Places to Visit",
  "Cultural Experiences",
  "Adventure & Trekking",
  "Historical Sites",
  "Wildlife & Nature",
  "Food & Coffee",
  "Travel Tips & Planning",
  "Festivals & Events",
  "Hidden Gems",
  "Itineraries & Guides",
];

// This will be populated with AI-generated content
// Placeholder content for now - will be replaced with full articles
export const blogPosts: BlogPost[] = [];

// Will be populated after AI generation completes
