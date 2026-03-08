import lakeTana from "@/assets/lake-tana.jpg";
import heroFalls from "@/assets/hero-falls.jpg";
import monastery from "@/assets/monastery.jpg";
import sunsetCruise from "@/assets/sunset-cruise.jpg";
import simienMountains from "@/assets/simien-mountains.jpg";
import danakil from "@/assets/danakil.jpg";
import harar from "@/assets/harar.jpg";
import omoValley from "@/assets/omo-valley.jpg";
import gondar from "@/assets/gondar.jpg";
import lalibela from "@/assets/lalibela.jpg";
import axum from "@/assets/axum.jpg";
import baleMountains from "@/assets/bale-mountains.jpg";

export interface TourPricing {
  solo: number;
  small: number; // 2-3 people
  group: number; // 4+ people
}

export interface TourAvailability {
  date: string;
  spotsLeft: number;
  totalSpots: number;
}

export interface ItineraryStep {
  time: string;
  title: string;
  description: string;
}

export interface TourInclusion {
  included: string[];
  notIncluded: string[];
}

export interface TourReview {
  name: string;
  country: string;
  rating: number;
  text: string;
  date: string;
}

export interface Tour {
  id: number;
  name: string;
  destination: string;
  duration: string;
  pricing: TourPricing;
  groupSize: string;
  category: "Adventure" | "Culture" | "Relaxation";
  rating: number;
  image: string;
  galleryImages: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  itinerary: ItineraryStep[];
  inclusions: TourInclusion;
  reviews: TourReview[];
  relatedTourIds: number[];
  availability: TourAvailability[];
}

// Generate availability for next 14 days
function generateAvailability(totalSpots: number): TourAvailability[] {
  const avail: TourAvailability[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const spotsLeft = Math.random() > 0.15
      ? Math.floor(Math.random() * totalSpots) + 1
      : 0; // 15% chance sold out
    avail.push({
      date: d.toISOString().split("T")[0],
      spotsLeft,
      totalSpots,
    });
  }
  return avail;
}

export const tours: Tour[] = [
  {
    id: 1, name: "Lake Tana Boat Tour", destination: "Lake Tana", duration: "5 hours",
    pricing: { solo: 60.00, small: 42.50, group: 35.00 },
    groupSize: "1–12", category: "Adventure", rating: 4.9, image: lakeTana,
    description: "Cruise across Ethiopia's largest lake, visiting ancient island monasteries hidden among papyrus-lined shores.",
    relatedTourIds: [3, 4, 16],
    availability: generateAvailability(12),
  },
  {
    id: 2, name: "Blue Nile Falls Adventure", destination: "Blue Nile Falls", duration: "4 hours",
    pricing: { solo: 52.00, small: 37.00, group: 30.00 },
    groupSize: "1–10", category: "Adventure", rating: 4.8, image: heroFalls,
    description: "Trek through lush landscapes to witness the thundering 'Smoke of Fire' — one of Africa's most spectacular waterfalls.",
    relatedTourIds: [1, 17, 4],
    availability: generateAvailability(10),
  },
  {
    id: 3, name: "Monastery Island Hopping", destination: "Lake Tana", duration: "6 hours",
    pricing: { solo: 68.00, small: 48.75, group: 40.00 },
    groupSize: "1–8", category: "Culture", rating: 5.0, image: monastery,
    description: "Step inside centuries-old monasteries adorned with vivid murals depicting Ethiopian Orthodox heritage.",
    relatedTourIds: [1, 16, 4],
    availability: generateAvailability(8),
  },
  {
    id: 4, name: "Sunset Lake Cruise", destination: "Lake Tana", duration: "3 hours",
    pricing: { solo: 42.00, small: 29.99, group: 24.00 },
    groupSize: "1–20", category: "Relaxation", rating: 4.7, image: sunsetCruise,
    description: "Drift across golden waters as the sun sets behind the Ethiopian highlands — pure serenity.",
    relatedTourIds: [1, 3, 16],
    availability: generateAvailability(20),
  },
  {
    id: 5, name: "Gondar Royal Castles Tour", destination: "Gondar", duration: "5 hours",
    pricing: { solo: 55.00, small: 39.00, group: 32.00 },
    groupSize: "1–15", category: "Culture", rating: 4.9, image: gondar,
    description: "Explore the stunning medieval castles of Ethiopia's 'Camelot', a UNESCO World Heritage Site.",
    relatedTourIds: [18, 6, 11],
    availability: generateAvailability(15),
  },
  {
    id: 6, name: "Lalibela Rock Churches Trek", destination: "Lalibela", duration: "8 hours",
    pricing: { solo: 82.00, small: 58.50, group: 48.00 },
    groupSize: "1–10", category: "Adventure", rating: 5.0, image: lalibela,
    description: "Discover the extraordinary rock-hewn churches carved from solid stone in the 12th century.",
    relatedTourIds: [5, 11, 3],
    availability: generateAvailability(10),
  },
  {
    id: 7, name: "Simien Mountains Day Hike", destination: "Simien Mountains", duration: "10 hours",
    pricing: { solo: 105.00, small: 75.00, group: 62.00 },
    groupSize: "1–8", category: "Adventure", rating: 4.9, image: simienMountains,
    description: "Hike dramatic cliff edges among Gelada baboons with panoramic views above the clouds.",
    relatedTourIds: [8, 15, 9],
    availability: generateAvailability(8),
  },
  {
    id: 8, name: "Simien 3-Day Trek", destination: "Simien Mountains", duration: "3 days",
    pricing: { solo: 395.00, small: 285.00, group: 235.00 },
    groupSize: "1–6", category: "Adventure", rating: 5.0, image: simienMountains,
    description: "An immersive multi-day trek through Africa's most dramatic mountain landscape.",
    relatedTourIds: [7, 9, 15],
    availability: generateAvailability(6),
  },
  {
    id: 9, name: "Danakil Depression Expedition", destination: "Danakil Depression", duration: "3 days",
    pricing: { solo: 550.00, small: 395.00, group: 325.00 },
    groupSize: "1–12", category: "Adventure", rating: 4.8, image: danakil,
    description: "Journey to Earth's hottest inhabited place — sulfur springs, salt flats & Erta Ale lava lake.",
    relatedTourIds: [10, 7, 8],
    availability: generateAvailability(12),
  },
  {
    id: 10, name: "Erta Ale Volcano Night Trek", destination: "Danakil Depression", duration: "2 days",
    pricing: { solo: 385.00, small: 275.00, group: 225.00 },
    groupSize: "1–10", category: "Adventure", rating: 4.9, image: danakil,
    description: "Camp beside an active lava lake under a canopy of stars in the Afar Triangle.",
    relatedTourIds: [9, 7, 8],
    availability: generateAvailability(10),
  },
  {
    id: 11, name: "Axum Historical Tour", destination: "Axum", duration: "6 hours",
    pricing: { solo: 62.00, small: 44.00, group: 36.00 },
    groupSize: "1–15", category: "Culture", rating: 4.8, image: axum,
    description: "Explore the ancient Kingdom of Axum — obelisks, the Ark of the Covenant chapel & royal tombs.",
    relatedTourIds: [5, 6, 12],
    availability: generateAvailability(15),
  },
  {
    id: 12, name: "Harar Old City Walking Tour", destination: "Harar", duration: "4 hours",
    pricing: { solo: 45.00, small: 32.50, group: 26.00 },
    groupSize: "1–12", category: "Culture", rating: 4.7, image: harar,
    description: "Wander the colourful walled city of Harar — a UNESCO gem with 82 mosques & vibrant markets.",
    relatedTourIds: [13, 11, 5],
    availability: generateAvailability(12),
  },
  {
    id: 13, name: "Hyena Man Night Experience", destination: "Harar", duration: "2 hours",
    pricing: { solo: 35.00, small: 25.00, group: 20.00 },
    groupSize: "1–20", category: "Adventure", rating: 4.9, image: harar,
    description: "Watch Harar's legendary hyena men hand-feed wild hyenas at dusk — a jaw-dropping spectacle.",
    relatedTourIds: [12, 2, 10],
    availability: generateAvailability(20),
  },
  {
    id: 14, name: "Omo Valley Tribal Encounter", destination: "Omo Valley", duration: "3 days",
    pricing: { solo: 450.00, small: 320.00, group: 265.00 },
    groupSize: "1–8", category: "Culture", rating: 5.0, image: omoValley,
    description: "Meet indigenous tribes preserving ancient traditions, body art & ceremonial rituals.",
    relatedTourIds: [9, 15, 6],
    availability: generateAvailability(8),
  },
  {
    id: 15, name: "Bale Mountains Wildlife Safari", destination: "Bale Mountains", duration: "2 days",
    pricing: { solo: 275.00, small: 195.00, group: 160.00 },
    groupSize: "1–8", category: "Adventure", rating: 4.8, image: baleMountains,
    description: "Track Ethiopian wolves, mountain nyala & endemic birds in Afro-alpine wilderness.",
    relatedTourIds: [7, 8, 14],
    availability: generateAvailability(8),
  },
  {
    id: 16, name: "Ethiopian Coffee Ceremony", destination: "Lake Tana", duration: "2 hours",
    pricing: { solo: 25.00, small: 18.50, group: 15.00 },
    groupSize: "1–10", category: "Culture", rating: 4.9, image: lakeTana,
    description: "Experience the traditional Ethiopian coffee ceremony — roasting, grinding & brewing the birthplace bean.",
    relatedTourIds: [1, 3, 17],
    availability: generateAvailability(10),
  },
  {
    id: 17, name: "Bahir Dar City & Market Tour", destination: "Lake Tana", duration: "3 hours",
    pricing: { solo: 30.00, small: 22.00, group: 18.00 },
    groupSize: "1–12", category: "Culture", rating: 4.6, image: lakeTana,
    description: "Explore Bahir Dar's lively open-air market, lakeside promenade & local restaurants.",
    relatedTourIds: [1, 16, 2],
    availability: generateAvailability(12),
  },
  {
    id: 18, name: "Debre Birhan Selassie Church", destination: "Gondar", duration: "3 hours",
    pricing: { solo: 38.00, small: 28.00, group: 22.00 },
    groupSize: "1–15", category: "Culture", rating: 4.8, image: gondar,
    description: "Visit the iconic ceiling of angels at Ethiopia's most beautifully decorated church.",
    relatedTourIds: [5, 6, 11],
    availability: generateAvailability(15),
  },
];

export const destinationList = ["All", "Lake Tana", "Blue Nile Falls", "Gondar", "Lalibela", "Simien Mountains", "Danakil Depression", "Axum", "Harar", "Omo Valley", "Bale Mountains"];
export const categories = ["All", "Adventure", "Culture", "Relaxation"];

export function getPriceForGroup(pricing: TourPricing, travelers: number): number {
  if (travelers >= 4) return pricing.group;
  if (travelers >= 2) return pricing.small;
  return pricing.solo;
}

export function getPricingLabel(travelers: number): string {
  if (travelers >= 4) return "Group rate (4+)";
  if (travelers >= 2) return "Small group (2–3)";
  return "Solo traveler";
}
