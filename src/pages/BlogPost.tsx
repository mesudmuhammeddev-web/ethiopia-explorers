import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Share2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogs";

// Category hero images (3 per category, rotated by slug hash)
import places1 from "@/assets/blog/places-1.jpg";
import places2 from "@/assets/blog/places-2.jpg";
import places3 from "@/assets/blog/places-3.jpg";
import culture1 from "@/assets/blog/culture-1.jpg";
import culture2 from "@/assets/blog/culture-2.jpg";
import culture3 from "@/assets/blog/culture-3.jpg";
import adventure1 from "@/assets/blog/adventure-1.jpg";
import adventure2 from "@/assets/blog/adventure-2.jpg";
import adventure3 from "@/assets/blog/adventure-3.jpg";
import historical1 from "@/assets/blog/historical-1.jpg";
import historical2 from "@/assets/blog/historical-2.jpg";
import historical3 from "@/assets/blog/historical-3.jpg";
import wildlife1 from "@/assets/blog/wildlife-1.jpg";
import wildlife2 from "@/assets/blog/wildlife-2.jpg";
import wildlife3 from "@/assets/blog/wildlife-3.jpg";
import food1 from "@/assets/blog/food-1.jpg";
import food2 from "@/assets/blog/food-2.jpg";
import food3 from "@/assets/blog/food-3.jpg";
import tips1 from "@/assets/blog/tips-1.jpg";
import tips2 from "@/assets/blog/tips-2.jpg";
import tips3 from "@/assets/blog/tips-3.jpg";
import festivals1 from "@/assets/blog/festivals-1.jpg";
import festivals2 from "@/assets/blog/festivals-2.jpg";
import festivals3 from "@/assets/blog/festivals-3.jpg";
import hidden1 from "@/assets/blog/hidden-1.jpg";
import hidden2 from "@/assets/blog/hidden-2.jpg";
import hidden3 from "@/assets/blog/hidden-3.jpg";
import itinerary1 from "@/assets/blog/itinerary-1.jpg";
import itinerary2 from "@/assets/blog/itinerary-2.jpg";
import itinerary3 from "@/assets/blog/itinerary-3.jpg";

const categoryImages: Record<string, string[]> = {
  "Best Places to Visit": [places1, places2, places3],
  "Cultural Experiences": [culture1, culture2, culture3],
  "Adventure & Trekking": [adventure1, adventure2, adventure3],
  "Historical Sites": [historical1, historical2, historical3],
  "Wildlife & Nature": [wildlife1, wildlife2, wildlife3],
  "Food & Coffee": [food1, food2, food3],
  "Travel Tips & Planning": [tips1, tips2, tips3],
  "Festivals & Events": [festivals1, festivals2, festivals3],
  "Hidden Gems": [hidden1, hidden2, hidden3],
  "Itineraries & Guides": [itinerary1, itinerary2, itinerary3],
};

function getBlogImage(category: string, slug: string): string {
  const images = categoryImages[category] || [places1, places2, places3];
  const hash = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return images[hash % 3];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Ethiopia Travel Explorer" },
    publisher: { "@type": "Organization", name: "Ethiopia Travel Explorer" },
    url: `https://ethiopia-explorers.lovable.app/blog/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <>
      <SEOHead
        title={`${post.title} — Ethiopia Travel Blog`}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 max-w-3xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline">
              <Tag className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime} min read
            </span>
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.metaDescription}</p>
        </header>

        {/* Hero Image */}
        <div className="container mx-auto px-4 max-w-3xl mb-10">
          <img
            src={getBlogImage(post.category, post.slug)}
            alt={post.title}
            className="w-full h-64 md:h-80 rounded-2xl object-cover"
            width={1280}
            height={720}
          />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-li:text-muted-foreground
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </article>

        {/* Share & Back */}
        <div className="container mx-auto px-4 max-w-3xl mt-10 flex items-center justify-between border-t pt-6">
          <Link to="/blog" className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <button
            onClick={() => navigator.share?.({ title: post.title, url: window.location.href }).catch(() => {})}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="container mx-auto px-4 max-w-5xl py-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(r => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <img
                    src={getBlogImage(r.category, r.slug)}
                    alt={r.title}
                    className="h-32 w-full object-cover"
                    loading="lazy"
                    width={400}
                    height={128}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                      {r.title}
                    </h3>
                    <span className="text-xs text-muted-foreground mt-1">{r.readTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return match;
    });
}

export default BlogPost;
