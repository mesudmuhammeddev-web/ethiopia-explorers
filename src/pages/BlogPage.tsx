import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogPosts, blogCategories, type BlogPost } from "@/data/blogs";

const POSTS_PER_PAGE = 12;

const BlogPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let posts = blogPosts;
    if (selectedCategory) posts = posts.filter(p => p.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.metaDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [search, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const displayed = filtered.slice(0, page * POSTS_PER_PAGE);

  return (
    <>
      <SEOHead
        title="Ethiopia Travel Blog — Tips, Guides & Inspiration"
        description="Explore 100+ articles about Ethiopian travel, culture, food, trekking, and hidden gems. Your ultimate resource for planning an Ethiopia trip."
        canonicalPath="/blog"
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              100+ Travel Articles
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Ethiopia Travel Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Expert guides, travel tips, and inspiration for your Ethiopian adventure
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b bg-background sticky top-16 z-30">
          <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => { setSelectedCategory(null); setPage(1); }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              All ({blogPosts.length})
            </button>
            {blogCategories.map(cat => {
              const count = blogPosts.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid */}
        <section className="container mx-auto px-4 py-12">
          <p className="text-muted-foreground mb-6">{filtered.length} articles found</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-4xl">{getCategoryEmoji(post.category)}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime} min
                      </span>
                    </div>
                    <h2 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.metaDescription}
                    </p>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {page < totalPages && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Load More Articles
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    "Best Places to Visit": "🗺️",
    "Cultural Experiences": "🎭",
    "Adventure & Trekking": "🥾",
    "Historical Sites": "🏛️",
    "Wildlife & Nature": "🦁",
    "Food & Coffee": "☕",
    "Travel Tips & Planning": "✈️",
    "Festivals & Events": "🎉",
    "Hidden Gems": "💎",
    "Itineraries & Guides": "📋",
  };
  return map[category] || "📝";
}

export default BlogPage;
