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

const fallbackImages = [places1, places2, places3];

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

export function getBlogImage(category: string, slug: string): string {
  const images = categoryImages[category] || fallbackImages;
  const hash = slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return images[hash % images.length];
}