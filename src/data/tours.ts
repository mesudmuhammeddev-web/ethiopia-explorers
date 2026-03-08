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
import ertaAle from "@/assets/erta-ale.jpg";
import kaffa from "@/assets/kaffa.jpg";
import turmi from "@/assets/turmi.jpg";

export interface TourPricing {
  solo: number;
  small: number;
  group: number;
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

export interface TourReview {
  name: string;
  country: string;
  rating: number;
  text: string;
}

export interface Tour {
  id: number;
  name: string;
  slug: string;
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
  included: string[];
  notIncluded: string[];
  reviews: TourReview[];
  relatedTourIds: number[];
  availability: TourAvailability[];
}

// Seeded pseudo-random number generator for stable availability
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateAvailability(totalSpots: number, tourId: number): TourAvailability[] {
  const avail: TourAvailability[] = [];
  const today = new Date();
  const rand = seededRandom(tourId * 1000 + 42);
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const spotsLeft = rand() > 0.15 ? Math.floor(rand() * totalSpots) + 1 : 0;
    avail.push({ date: d.toISOString().split("T")[0], spotsLeft, totalSpots });
  }
  return avail;
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const tours: Tour[] = [
  {
    id: 1, name: "Lake Tana Boat Tour", slug: slugify("Lake Tana Boat Tour"), destination: "Lake Tana", duration: "5 hours",
    pricing: { solo: 60.00, small: 42.50, group: 35.00 }, groupSize: "1–12", category: "Adventure", rating: 4.9, image: lakeTana,
    galleryImages: [lakeTana, monastery, sunsetCruise],
    description: "Cruise across Ethiopia's largest lake, visiting ancient island monasteries hidden among papyrus-lined shores.",
    longDescription: "Embark on a captivating journey across Lake Tana, the source of the Blue Nile and Ethiopia's largest lake. Your expert guide will navigate you through papyrus-lined channels to visit ancient island monasteries dating back to the 14th century. Marvel at vivid religious murals, meet local monks, and spot hippos and pelicans along the way. The trip includes a traditional Ethiopian lunch on the water.",
    highlights: ["Visit 3 ancient island monasteries", "Spot hippos & pelicans", "Traditional lunch on the boat", "Expert local guide included", "Scenic papyrus channels"],
    itinerary: [
      { time: "8:00 AM", title: "Hotel Pickup", description: "Comfortable transfer from your hotel to the Lake Tana pier." },
      { time: "8:30 AM", title: "Depart by Boat", description: "Board your private boat and cruise towards the first monastery island." },
      { time: "9:30 AM", title: "Ura Kidane Mehret Monastery", description: "Explore this 14th-century monastery with stunning biblical murals." },
      { time: "11:00 AM", title: "Azwa Maryam Monastery", description: "Visit this peaceful island monastery and meet resident monks." },
      { time: "12:00 PM", title: "Lunch on the Boat", description: "Enjoy a traditional Ethiopian meal while cruising scenic channels." },
      { time: "1:00 PM", title: "Return to Pier", description: "Scenic cruise back with optional bird-watching stops." },
    ],
    included: ["Hotel pickup & drop-off", "Private boat with captain", "English-speaking guide", "Traditional lunch", "Monastery entrance fees", "Bottled water"],
    notIncluded: ["Personal expenses", "Tips for guide & captain", "Travel insurance"],
    reviews: [
      { name: "Emma L.", country: "Australia", rating: 5, text: "The monasteries were incredible — the murals took my breath away. Our guide knew every detail!" },
      { name: "Thomas K.", country: "Germany", rating: 5, text: "Perfect half-day trip. The boat ride itself was beautiful and the lunch was delicious." },
      { name: "Aisha B.", country: "USA", rating: 4, text: "Great experience overall. We even saw hippos! Just bring sunscreen." },
    ],
    relatedTourIds: [3, 4, 16], availability: generateAvailability(12, 1),
  },
  {
    id: 2, name: "Blue Nile Falls Adventure", slug: slugify("Blue Nile Falls Adventure"), destination: "Blue Nile Falls", duration: "4 hours",
    pricing: { solo: 52.00, small: 37.00, group: 30.00 }, groupSize: "1–10", category: "Adventure", rating: 4.8, image: heroFalls,
    galleryImages: [heroFalls, lakeTana, simienMountains],
    description: "Trek through lush landscapes to witness the thundering 'Smoke of Fire' — one of Africa's most spectacular waterfalls.",
    longDescription: "Journey to Tis Abay — the 'Smoke of Fire' — where the Blue Nile plunges 45 metres into a misty gorge. This moderate trek takes you through green farmland, across a historic Portuguese bridge, and along rainforest paths to multiple viewpoints. Feel the spray on your face and watch rainbows form in the eternal mist.",
    highlights: ["45-metre waterfall viewpoints", "Cross the historic Portuguese bridge", "Lush rainforest trail", "Rainbow in the mist", "Local village stops"],
    itinerary: [
      { time: "9:00 AM", title: "Hotel Pickup", description: "Drive 30 minutes from Bahir Dar to the trailhead." },
      { time: "9:45 AM", title: "Begin Trek", description: "Walk through green farmland and cross the Blue Nile on the old bridge." },
      { time: "10:30 AM", title: "Falls Viewpoint 1", description: "Reach the first panoramic viewpoint of the falls." },
      { time: "11:00 AM", title: "Close-Up Trail", description: "Descend to the base for a close-up experience with the spray." },
      { time: "12:00 PM", title: "Village Visit", description: "Stop by a local village and enjoy fresh coffee." },
      { time: "1:00 PM", title: "Return Transfer", description: "Drive back to your hotel in Bahir Dar." },
    ],
    included: ["Hotel pickup & drop-off", "English-speaking guide", "Entrance fees", "Coffee at local village", "Bottled water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Liam O.", country: "Ireland", rating: 5, text: "The power of the falls is mesmerizing. Walking through the mist felt magical!" },
      { name: "Chen W.", country: "China", rating: 5, text: "A must-do when in Bahir Dar. The rainbow over the falls was unforgettable." },
      { name: "Sofia P.", country: "Spain", rating: 4, text: "Beautiful trek through the countryside. Wear waterproof shoes — you will get sprayed!" },
    ],
    relatedTourIds: [1, 17, 4], availability: generateAvailability(10, 2),
  },
  {
    id: 3, name: "Monastery Island Hopping", slug: slugify("Monastery Island Hopping"), destination: "Lake Tana", duration: "6 hours",
    pricing: { solo: 68.00, small: 48.75, group: 40.00 }, groupSize: "1–8", category: "Culture", rating: 5.0, image: monastery,
    galleryImages: [monastery, lakeTana, sunsetCruise],
    description: "Step inside centuries-old monasteries adorned with vivid murals depicting Ethiopian Orthodox heritage.",
    longDescription: "A deep-dive cultural journey visiting five island monasteries scattered across Lake Tana. Each monastery houses unique centuries-old murals depicting biblical scenes in vibrant Ethiopian Orthodox style. Your specialist guide will share the hidden stories behind each painting and the monks' daily rituals.",
    highlights: ["Visit 5 island monasteries", "UNESCO heritage murals", "Meet Ethiopian Orthodox monks", "Specialist art history guide", "Full-day cultural immersion"],
    itinerary: [
      { time: "7:30 AM", title: "Early Departure", description: "Set off by boat to reach the more remote islands first." },
      { time: "8:30 AM", title: "Daga Estifanos", description: "Visit the island where Ethiopian emperors are buried." },
      { time: "10:00 AM", title: "Narga Selassie", description: "Explore the 18th-century monastery with ornate paintings." },
      { time: "11:30 AM", title: "Lunch Break", description: "Traditional fish lunch on the lakeside." },
      { time: "12:30 PM", title: "Ura Kidane Mehret & Azwa Maryam", description: "The most famous monasteries with the finest murals." },
      { time: "1:30 PM", title: "Return Journey", description: "Cruise back with time for photography." },
    ],
    included: ["Private boat", "Specialist guide", "All entrance fees", "Traditional lunch", "Water & snacks", "Hotel transfers"],
    notIncluded: ["Personal shopping", "Tips", "Travel insurance"],
    reviews: [
      { name: "Katherine J.", country: "Canada", rating: 5, text: "As an art historian, this was a dream. The murals at Ura Kidane Mehret are world-class." },
      { name: "Olaf S.", country: "Norway", rating: 5, text: "Our guide's knowledge of the monasteries was exceptional. Felt like a private museum tour." },
      { name: "Priya D.", country: "India", rating: 5, text: "Peaceful, spiritual, and deeply moving. The monks were so welcoming." },
    ],
    relatedTourIds: [1, 16, 4], availability: generateAvailability(8, 3),
  },
  {
    id: 4, name: "Sunset Lake Cruise", slug: slugify("Sunset Lake Cruise"), destination: "Lake Tana", duration: "3 hours",
    pricing: { solo: 42.00, small: 29.99, group: 24.00 }, groupSize: "1–20", category: "Relaxation", rating: 4.7, image: sunsetCruise,
    galleryImages: [sunsetCruise, lakeTana, monastery],
    description: "Drift across golden waters as the sun sets behind the Ethiopian highlands — pure serenity.",
    longDescription: "The most romantic way to experience Lake Tana. As the afternoon light turns golden, board a comfortable cruise boat and drift across calm waters while sipping Ethiopian wine. Watch the sky transform into a canvas of orange and crimson as the sun dips behind the highland mountains.",
    highlights: ["Golden hour photography", "Ethiopian wine tasting", "Calm sunset waters", "Highland mountain backdrop", "Perfect for couples"],
    itinerary: [
      { time: "4:00 PM", title: "Board at Pier", description: "Welcome drink and orientation on the boat." },
      { time: "4:30 PM", title: "Scenic Cruise", description: "Cruise along the scenic southern shore of Lake Tana." },
      { time: "5:30 PM", title: "Sunset Viewing", description: "Anchor at the perfect spot for the sunset." },
      { time: "6:30 PM", title: "Return", description: "Cruise back under the stars." },
    ],
    included: ["Welcome drink", "Ethiopian wine", "Light snacks", "Professional photographer", "Pier transfers"],
    notIncluded: ["Full dinner", "Tips", "Travel insurance"],
    reviews: [
      { name: "Marie-Claire F.", country: "France", rating: 5, text: "The most romantic evening of our trip. The wine and sunset were perfection." },
      { name: "David & Lisa H.", country: "USA", rating: 5, text: "We celebrated our anniversary on this cruise. Couldn't have been more special." },
      { name: "Kenji M.", country: "Japan", rating: 4, text: "Beautiful and peaceful. The photographer captured amazing shots for us." },
    ],
    relatedTourIds: [1, 3, 16], availability: generateAvailability(20, 4),
  },
  {
    id: 5, name: "Gondar Royal Castles Tour", slug: slugify("Gondar Royal Castles Tour"), destination: "Gondar", duration: "5 hours",
    pricing: { solo: 55.00, small: 39.00, group: 32.00 }, groupSize: "1–15", category: "Culture", rating: 4.9, image: gondar,
    galleryImages: [gondar, lalibela, axum],
    description: "Explore the stunning medieval castles of Ethiopia's 'Camelot', a UNESCO World Heritage Site.",
    longDescription: "Walk through the Royal Enclosure of Gondar, known as Africa's Camelot. This UNESCO World Heritage Site features six castles built by Ethiopian emperors between the 17th and 18th centuries. Your guide brings to life the royal intrigues, battles, and ceremonies that shaped Ethiopian history.",
    highlights: ["UNESCO World Heritage Site", "6 royal castles", "Fasil Ghebbi compound", "Royal bath of Fasilides", "Expert historian guide"],
    itinerary: [
      { time: "8:30 AM", title: "Hotel Pickup", description: "Transfer to the Royal Enclosure entrance." },
      { time: "9:00 AM", title: "Fasil Ghebbi", description: "Explore the main castle compound with your guide." },
      { time: "10:30 AM", title: "Fasilides Bath", description: "Visit the famous bathing pool used for Timkat celebrations." },
      { time: "11:30 AM", title: "Debre Birhan Selassie", description: "See the famous ceiling of painted angels." },
      { time: "12:30 PM", title: "Local Lunch", description: "Traditional injera lunch at a local restaurant." },
      { time: "1:30 PM", title: "Return", description: "Transfer back to your hotel." },
    ],
    included: ["Hotel transfers", "Entrance fees", "Expert guide", "Traditional lunch", "Bottled water"],
    notIncluded: ["Personal expenses", "Tips", "Travel insurance"],
    reviews: [
      { name: "Richard B.", country: "UK", rating: 5, text: "I've visited castles all over Europe, but Gondar's are truly unique. Africa's Camelot indeed!" },
      { name: "Anna G.", country: "Sweden", rating: 5, text: "Fasil Ghebbi was breathtaking. Our guide brought the history alive with incredible stories." },
      { name: "Carlos M.", country: "Brazil", rating: 4, text: "A wonderful cultural experience. The Fasilides Bath is especially impressive during Timkat." },
    ],
    relatedTourIds: [18, 6, 11], availability: generateAvailability(15, 5),
  },
  {
    id: 6, name: "Lalibela Rock Churches Trek", slug: slugify("Lalibela Rock Churches Trek"), destination: "Lalibela", duration: "8 hours",
    pricing: { solo: 82.00, small: 58.50, group: 48.00 }, groupSize: "1–10", category: "Adventure", rating: 5.0, image: lalibela,
    galleryImages: [lalibela, gondar, axum],
    description: "Discover the extraordinary rock-hewn churches carved from solid stone in the 12th century.",
    longDescription: "Lalibela's eleven rock-hewn churches are one of the greatest architectural achievements in human history. Carved from single blocks of volcanic rock in the 12th century, these churches are still active places of worship. This full-day tour covers both the Northern and Southern clusters, including the iconic Bete Giyorgis (Church of St. George).",
    highlights: ["11 UNESCO rock-hewn churches", "Bete Giyorgis cross-shaped church", "Active religious ceremonies", "Underground tunnels & passageways", "Full-day immersion"],
    itinerary: [
      { time: "7:00 AM", title: "Early Start", description: "Begin at the Northern Cluster before the crowds arrive." },
      { time: "7:30 AM", title: "Bete Medhane Alem", description: "The largest monolithic church in the world." },
      { time: "9:00 AM", title: "Northern Group", description: "Explore interconnected churches through tunnels." },
      { time: "10:30 AM", title: "Coffee Break", description: "Ethiopian coffee ceremony near the churches." },
      { time: "11:00 AM", title: "Southern Cluster", description: "Visit the atmospheric southern churches." },
      { time: "12:30 PM", title: "Bete Giyorgis", description: "The iconic cross-shaped church — the most photographed." },
      { time: "1:30 PM", title: "Lunch & Return", description: "Traditional lunch and transfer back." },
    ],
    included: ["All entrance fees", "Expert guide", "Coffee ceremony", "Traditional lunch", "Hotel transfers", "Water"],
    notIncluded: ["Camera fees (if applicable)", "Tips", "Travel insurance"],
    reviews: [
      { name: "James W.", country: "USA", rating: 5, text: "Lalibela is the 8th wonder of the world. Standing inside Bete Giyorgis was overwhelming." },
      { name: "Helena V.", country: "Czech Republic", rating: 5, text: "Absolutely astounding engineering. The tunnels between churches are thrilling to explore." },
      { name: "Ahmed K.", country: "Egypt", rating: 5, text: "As someone who's seen ancient sites worldwide, Lalibela stands apart. Truly humbling." },
    ],
    relatedTourIds: [5, 11, 3], availability: generateAvailability(10, 6),
  },
  {
    id: 7, name: "Simien Mountains Day Hike", slug: slugify("Simien Mountains Day Hike"), destination: "Simien Mountains", duration: "10 hours",
    pricing: { solo: 105.00, small: 75.00, group: 62.00 }, groupSize: "1–8", category: "Adventure", rating: 4.9, image: simienMountains,
    galleryImages: [simienMountains, baleMountains, heroFalls],
    description: "Hike dramatic cliff edges among Gelada baboons with panoramic views above the clouds.",
    longDescription: "Trek through the 'Roof of Africa' in the Simien Mountains National Park. Walk along dramatic escarpments with 1,500-metre drops, encounter troops of endemic Gelada baboons, and enjoy panoramic views that stretch to the horizon. This challenging day hike rewards you with some of the most dramatic scenery in all of Africa.",
    highlights: ["Dramatic cliff-edge trails", "Gelada baboon encounters", "1,500m escarpment views", "UNESCO National Park", "Endemic wildlife spotting"],
    itinerary: [
      { time: "6:00 AM", title: "Early Departure", description: "Drive from Gondar to Simien Mountains park gate." },
      { time: "8:00 AM", title: "Park Entrance", description: "Register and meet your armed scout." },
      { time: "8:30 AM", title: "Sankaber Trail", description: "Begin the hike along the escarpment edge." },
      { time: "10:30 AM", title: "Gelada Viewpoint", description: "Watch Gelada baboon troops on the cliff edge." },
      { time: "12:00 PM", title: "Packed Lunch", description: "Lunch with a panoramic mountain backdrop." },
      { time: "1:00 PM", title: "Jinbar Waterfall", description: "Hike to the 500-metre waterfall viewpoint." },
      { time: "3:00 PM", title: "Return Hike", description: "Trek back to the park gate." },
      { time: "4:00 PM", title: "Drive Back", description: "Return transfer to Gondar." },
    ],
    included: ["4WD transport", "Park fees", "Armed scout", "Expert guide", "Packed lunch", "Water"],
    notIncluded: ["Hiking boots rental", "Tips", "Travel insurance", "Personal gear"],
    reviews: [
      { name: "Patrick O.", country: "New Zealand", rating: 5, text: "The Gelada baboons were incredible — hundreds of them just metres away. Surreal experience." },
      { name: "Ingrid L.", country: "Netherlands", rating: 5, text: "The escarpment views are among the best I've seen anywhere. Bring a good camera!" },
      { name: "Roberto C.", country: "Argentina", rating: 4, text: "Challenging but rewarding. The Jinbar Waterfall viewpoint alone is worth the trek." },
    ],
    relatedTourIds: [8, 15, 9], availability: generateAvailability(8, 7),
  },
  {
    id: 8, name: "Simien 3-Day Trek", slug: slugify("Simien 3-Day Trek"), destination: "Simien Mountains", duration: "3 days",
    pricing: { solo: 395.00, small: 285.00, group: 235.00 }, groupSize: "1–6", category: "Adventure", rating: 5.0, image: simienMountains,
    galleryImages: [simienMountains, baleMountains, lakeTana],
    description: "An immersive multi-day trek through Africa's most dramatic mountain landscape.",
    longDescription: "The ultimate Simien Mountains experience. Over three days, trek from Sankaber to Chenek, camping under starlit skies and waking to misty mountain vistas. Encounter Gelada baboons, Walia ibex, and lammergeyer vultures. This trek reaches altitudes over 4,000 metres and offers unmatched African highland scenery.",
    highlights: ["3-day camping trek", "Altitude over 4,000m", "Walia ibex sightings", "Starlit mountain camping", "Full porter & cook support"],
    itinerary: [
      { time: "Day 1", title: "Sankaber to Geech", description: "Drive to park, begin trek through escarpment to Geech camp (6 hrs hiking)." },
      { time: "Day 2", title: "Geech to Chenek", description: "Trek past Imet Gogo viewpoint and along the ridge to Chenek camp (7 hrs)." },
      { time: "Day 3", title: "Chenek & Return", description: "Morning wildlife walk, then descend and drive back to Gondar (4 hrs hiking)." },
    ],
    included: ["All transport", "Park & camping fees", "Armed scout", "Guide & cook", "All meals", "Camping gear", "Porter support"],
    notIncluded: ["Sleeping bag rental", "Tips", "Travel insurance", "Personal gear", "Alcoholic drinks"],
    reviews: [
      { name: "Michael & Sarah T.", country: "UK", rating: 5, text: "The best 3 days of our Africa trip. Waking up above the clouds was pure magic." },
      { name: "Lars E.", country: "Denmark", rating: 5, text: "We spotted a Walia ibex on day 2! The cook prepared incredible meals at camp." },
      { name: "Fatima A.", country: "UAE", rating: 5, text: "Challenging altitude but our guide made sure we acclimatized properly. Unforgettable." },
    ],
    relatedTourIds: [7, 9, 15], availability: generateAvailability(6, 8),
  },
  {
    id: 9, name: "Danakil Depression Expedition", slug: slugify("Danakil Depression Expedition"), destination: "Danakil Depression", duration: "3 days",
    pricing: { solo: 550.00, small: 395.00, group: 325.00 }, groupSize: "1–12", category: "Adventure", rating: 4.8, image: danakil,
    galleryImages: [danakil, ertaAle, simienMountains],
    description: "Journey to Earth's hottest inhabited place — sulfur springs, salt flats & Erta Ale lava lake.",
    longDescription: "Descend into the Danakil Depression, one of the most extreme and alien landscapes on Earth. Temperatures exceed 50°C as you explore neon-coloured sulfur springs at Dallol, vast salt flats where Afar miners work, and camp beside the Erta Ale lava lake — one of only six permanent lava lakes on Earth.",
    highlights: ["Dallol sulfur springs", "Erta Ale active lava lake", "Salt flat camel caravans", "Afar people encounters", "Otherworldly landscapes"],
    itinerary: [
      { time: "Day 1", title: "Mekelle to Dallol", description: "Drive to the Danakil lowlands, visit Dallol sulfur springs and salt lake." },
      { time: "Day 2", title: "Salt Flats to Erta Ale", description: "Watch Afar salt miners, drive to Erta Ale base, night hike to the lava lake." },
      { time: "Day 3", title: "Sunrise & Return", description: "Sunrise at the crater, descend and drive back to Mekelle." },
    ],
    included: ["4WD transport", "Armed guards", "Guide & cook", "All meals", "Camping gear", "Water supply", "Park fees"],
    notIncluded: ["Sleeping mat comfort upgrade", "Tips", "Travel insurance", "Personal items"],
    reviews: [
      { name: "Jack R.", country: "Australia", rating: 5, text: "Like visiting another planet. Dallol's colours are beyond anything I've ever seen." },
      { name: "Marta Z.", country: "Poland", rating: 5, text: "The lava lake at night was the most awe-inspiring natural sight of my life." },
      { name: "Yusuf H.", country: "Turkey", rating: 4, text: "Extreme but worth every drop of sweat. The Afar guides are incredible navigators." },
    ],
    relatedTourIds: [10, 7, 8], availability: generateAvailability(12, 9),
  },
  {
    id: 10, name: "Erta Ale Volcano Night Trek", slug: slugify("Erta Ale Volcano Night Trek"), destination: "Danakil Depression", duration: "2 days",
    pricing: { solo: 385.00, small: 275.00, group: 225.00 }, groupSize: "1–10", category: "Adventure", rating: 4.9, image: ertaAle,
    galleryImages: [ertaAle, danakil, simienMountains],
    description: "Camp beside an active lava lake under a canopy of stars in the Afar Triangle.",
    longDescription: "A focused expedition to one of Earth's most extraordinary natural phenomena — the permanent lava lake of Erta Ale. Trek by moonlight across volcanic rock to reach the crater rim, where you'll camp and watch the mesmerizing lava glow against the night sky. An unforgettable bucket-list experience.",
    highlights: ["Night trek to active volcano", "Permanent lava lake", "Crater rim camping", "Stargazing in the desert", "Moonlit volcanic landscape"],
    itinerary: [
      { time: "Day 1", title: "Drive & Night Hike", description: "Drive from Mekelle, evening camel-assisted hike to the crater (3-4 hrs)." },
      { time: "Day 2", title: "Sunrise & Return", description: "Watch sunrise over the lava lake, descend and return to Mekelle." },
    ],
    included: ["4WD transport", "Armed escorts", "Guide", "All meals", "Camping gear", "Camel support"],
    notIncluded: ["Sleeping bag", "Tips", "Travel insurance", "Headlamp batteries"],
    reviews: [
      { name: "Nikolai V.", country: "Russia", rating: 5, text: "Watching molten lava glow under a blanket of stars — no photo can capture this." },
      { name: "Jessica T.", country: "Canada", rating: 5, text: "The moonlit trek across the volcanic desert was surreal. A once-in-a-lifetime experience." },
      { name: "Hans W.", country: "Austria", rating: 4, text: "Physically demanding but the reward at the crater rim is beyond words." },
    ],
    relatedTourIds: [9, 7, 8], availability: generateAvailability(10, 10),
  },
  {
    id: 11, name: "Axum Historical Tour", slug: slugify("Axum Historical Tour"), destination: "Axum", duration: "6 hours",
    pricing: { solo: 62.00, small: 44.00, group: 36.00 }, groupSize: "1–15", category: "Culture", rating: 4.8, image: axum,
    galleryImages: [axum, lalibela, gondar],
    description: "Explore the ancient Kingdom of Axum — obelisks, the Ark of the Covenant chapel & royal tombs.",
    longDescription: "Step back 3,000 years in the ancient city of Axum, once the capital of one of the world's great civilizations. Visit towering stelae fields, underground royal tombs, the Chapel of the Tablet (believed to house the Ark of the Covenant), and the ruins of the Queen of Sheba's palace.",
    highlights: ["Giant granite obelisks", "Ark of the Covenant chapel", "Queen of Sheba's palace ruins", "Underground royal tombs", "3,000 years of history"],
    itinerary: [
      { time: "8:00 AM", title: "Hotel Pickup", description: "Transfer to the Stelae Field." },
      { time: "8:30 AM", title: "Stelae Field", description: "Marvel at the giant carved obelisks." },
      { time: "10:00 AM", title: "Chapel of the Tablet", description: "View the chapel said to house the Ark of the Covenant." },
      { time: "11:00 AM", title: "Royal Tombs", description: "Descend into underground burial chambers." },
      { time: "12:00 PM", title: "Queen of Sheba's Palace", description: "Explore the palace ruins and bath." },
      { time: "1:00 PM", title: "Lunch & Return", description: "Traditional lunch and hotel transfer." },
    ],
    included: ["All entrance fees", "Expert guide", "Hotel transfers", "Traditional lunch", "Water"],
    notIncluded: ["Personal expenses", "Tips", "Travel insurance"],
    reviews: [
      { name: "Dr. Peter N.", country: "Germany", rating: 5, text: "As an archaeologist, Axum exceeded my expectations. The stelae are engineering marvels." },
      { name: "Amara S.", country: "Ethiopia", rating: 5, text: "Proud to show my foreign friends this incredible part of our history. Best guide in town!" },
      { name: "Rachel K.", country: "Israel", rating: 4, text: "The Ark of the Covenant connection makes this deeply meaningful. A spiritual experience." },
    ],
    relatedTourIds: [5, 6, 12], availability: generateAvailability(15, 11),
  },
  {
    id: 12, name: "Harar Old City Walking Tour", slug: slugify("Harar Old City Walking Tour"), destination: "Harar", duration: "4 hours",
    pricing: { solo: 45.00, small: 32.50, group: 26.00 }, groupSize: "1–12", category: "Culture", rating: 4.7, image: harar,
    galleryImages: [harar, omoValley, axum],
    description: "Wander the colourful walled city of Harar — a UNESCO gem with 82 mosques & vibrant markets.",
    longDescription: "Discover Harar Jugol, the ancient walled city considered Islam's fourth-holiest city. With 82 mosques, 102 shrines, and a labyrinth of colourful alleyways, Harar is unlike anywhere else in Ethiopia. Explore the bustling spice markets, visit the Rimbaud Museum, and taste the city's famous coffee.",
    highlights: ["UNESCO walled city", "82 mosques", "Vibrant spice markets", "Rimbaud Museum", "Famous Harari coffee"],
    itinerary: [
      { time: "9:00 AM", title: "Shoa Gate Entrance", description: "Enter the walled city through the historic main gate." },
      { time: "9:30 AM", title: "Market Walk", description: "Explore the colourful spice and chat markets." },
      { time: "10:30 AM", title: "Mosque & Shrine Tour", description: "Visit key mosques and the Harari Cultural Museum." },
      { time: "11:30 AM", title: "Rimbaud Museum", description: "See where the French poet Arthur Rimbaud lived." },
      { time: "12:30 PM", title: "Coffee Tasting", description: "Taste famous Harari coffee and snacks." },
    ],
    included: ["Walking guide", "All entrance fees", "Coffee tasting", "Hotel pickup"],
    notIncluded: ["Lunch", "Tips", "Personal shopping", "Travel insurance"],
    reviews: [
      { name: "Isabelle M.", country: "France", rating: 5, text: "Walking through Harar's alleys feels like stepping into a living museum. The Rimbaud connection is fascinating." },
      { name: "Omar A.", country: "Morocco", rating: 5, text: "As a Muslim traveler, visiting Harar's historic mosques was deeply moving. Beautiful city." },
      { name: "Jenny C.", country: "USA", rating: 4, text: "The spice market is incredible — so many aromas and colours. The coffee was the best I've ever had." },
    ],
    relatedTourIds: [13, 11, 5], availability: generateAvailability(12, 12),
  },
  {
    id: 13, name: "Hyena Man Night Experience", slug: slugify("Hyena Man Night Experience"), destination: "Harar", duration: "2 hours",
    pricing: { solo: 35.00, small: 25.00, group: 20.00 }, groupSize: "1–20", category: "Adventure", rating: 4.9, image: turmi,
    galleryImages: [turmi, harar, heroFalls],
    description: "Watch Harar's legendary hyena men hand-feed wild hyenas at dusk — a jaw-dropping spectacle.",
    longDescription: "One of Ethiopia's most extraordinary traditions. For centuries, the people of Harar have lived alongside wild hyenas, and the 'Hyena Men' feed them by hand each evening at dusk. Watch in amazement as massive spotted hyenas gently take meat from the handler's mouth and hands — and if you're brave enough, try it yourself!",
    highlights: ["Hand-feeding wild hyenas", "Centuries-old tradition", "Try feeding them yourself", "Dusk atmosphere", "Unforgettable photo opportunities"],
    itinerary: [
      { time: "6:00 PM", title: "Hotel Pickup", description: "Transfer to the feeding site outside the old city walls." },
      { time: "6:30 PM", title: "Meet the Hyena Man", description: "Learn about this unique tradition and the hyena clans." },
      { time: "7:00 PM", title: "Feeding Begins", description: "Watch as hyenas emerge from the darkness to feed." },
      { time: "7:30 PM", title: "Your Turn", description: "Brave visitors can try hand-feeding the hyenas." },
      { time: "8:00 PM", title: "Return", description: "Transfer back to your hotel." },
    ],
    included: ["Hotel transfers", "Local guide", "Hyena man experience fee", "Flashlight"],
    notIncluded: ["Dinner", "Tips", "Travel insurance"],
    reviews: [
      { name: "Steve R.", country: "South Africa", rating: 5, text: "I actually fed a hyena from a stick in my mouth! Heart-pounding and unforgettable." },
      { name: "Yoko S.", country: "Japan", rating: 5, text: "The most unique wildlife experience I've ever had. The hyenas are surprisingly gentle." },
      { name: "Ben & Claire L.", country: "UK", rating: 4, text: "Absolutely jaw-dropping. We were nervous but the Hyena Man has total control." },
    ],
    relatedTourIds: [12, 2, 10], availability: generateAvailability(20, 13),
  },
  {
    id: 14, name: "Omo Valley Tribal Encounter", slug: slugify("Omo Valley Tribal Encounter"), destination: "Omo Valley", duration: "3 days",
    pricing: { solo: 450.00, small: 320.00, group: 265.00 }, groupSize: "1–8", category: "Culture", rating: 5.0, image: omoValley,
    galleryImages: [omoValley, turmi, baleMountains],
    description: "Meet indigenous tribes preserving ancient traditions, body art & ceremonial rituals.",
    longDescription: "A deeply immersive journey into the Omo Valley, home to some of the world's most unique indigenous tribes. Over three days, visit the Mursi (famous for lip plates), Hamer (bull-jumping ceremonies), Karo (body painting masters), and Dorze (weaving artisans). This respectful cultural exchange offers a window into traditions unchanged for millennia.",
    highlights: ["Mursi lip plate tribe", "Hamer bull-jumping ceremony", "Karo body painting", "Dorze weaving village", "3-day cultural immersion"],
    itinerary: [
      { time: "Day 1", title: "Jinka & Mursi Village", description: "Fly to Jinka, drive to Mago National Park to visit the Mursi tribe." },
      { time: "Day 2", title: "Hamer & Karo Villages", description: "Visit the Hamer market town and Karo village on the Omo River." },
      { time: "Day 3", title: "Dorze Village & Return", description: "Visit Dorze weavers near Arba Minch, then fly back." },
    ],
    included: ["Domestic flights", "4WD transport", "Guide & translator", "All meals", "Lodge accommodation", "Village fees"],
    notIncluded: ["Photo fees at villages", "Tips", "Travel insurance", "Personal items"],
    reviews: [
      { name: "Dr. Maria G.", country: "Italy", rating: 5, text: "As an anthropologist, this was the highlight of my career. The Mursi people are extraordinary." },
      { name: "Samuel O.", country: "Nigeria", rating: 5, text: "A humbling reminder of Africa's incredible cultural diversity. The Hamer ceremonies are powerful." },
      { name: "Laura & Mark P.", country: "Australia", rating: 5, text: "Life-changing. The Karo body painting is pure art. Our translator made real connections possible." },
    ],
    relatedTourIds: [9, 15, 6], availability: generateAvailability(8, 14),
  },
  {
    id: 15, name: "Bale Mountains Wildlife Safari", slug: slugify("Bale Mountains Wildlife Safari"), destination: "Bale Mountains", duration: "2 days",
    pricing: { solo: 275.00, small: 195.00, group: 160.00 }, groupSize: "1–8", category: "Adventure", rating: 4.8, image: baleMountains,
    galleryImages: [baleMountains, simienMountains, omoValley],
    description: "Track Ethiopian wolves, mountain nyala & endemic birds in Afro-alpine wilderness.",
    longDescription: "The Bale Mountains are Ethiopia's premier wildlife destination. Over two days, explore the Sanetti Plateau (Africa's largest Afro-alpine habitat) to track the endangered Ethiopian wolf, spot mountain nyala in the Harenna Forest, and identify dozens of endemic bird species. This is a wildlife photographer's paradise.",
    highlights: ["Ethiopian wolf tracking", "Mountain nyala sightings", "Sanetti Plateau at 4,000m", "Harenna Cloud Forest", "Endemic bird species"],
    itinerary: [
      { time: "Day 1", title: "Sanetti Plateau", description: "Drive to the plateau, track Ethiopian wolves, spot giant molerats." },
      { time: "Day 2", title: "Harenna Forest & Return", description: "Descend through the cloud forest, spot nyala and colobus monkeys, drive back." },
    ],
    included: ["4WD transport", "Park fees", "Expert naturalist guide", "All meals", "Lodge accommodation", "Binoculars"],
    notIncluded: ["Camera gear rental", "Tips", "Travel insurance", "Personal items"],
    reviews: [
      { name: "David A.", country: "Kenya", rating: 5, text: "Seeing an Ethiopian wolf hunt on the Sanetti Plateau was a wildlife photographer's dream." },
      { name: "Christine B.", country: "Switzerland", rating: 5, text: "The Harenna Forest is magical — we spotted 3 mountain nyala within an hour." },
      { name: "Tom H.", country: "USA", rating: 4, text: "Incredible biodiversity. Our naturalist guide identified over 20 endemic bird species." },
    ],
    relatedTourIds: [7, 8, 14], availability: generateAvailability(8, 15),
  },
  {
    id: 16, name: "Ethiopian Coffee Ceremony", slug: slugify("Ethiopian Coffee Ceremony"), destination: "Kaffa", duration: "2 hours",
    pricing: { solo: 25.00, small: 18.50, group: 15.00 }, groupSize: "1–10", category: "Culture", rating: 4.9, image: kaffa,
    galleryImages: [kaffa, lakeTana, harar],
    description: "Experience the traditional Ethiopian coffee ceremony — roasting, grinding & brewing the birthplace bean.",
    longDescription: "Ethiopia is the birthplace of coffee, and the traditional coffee ceremony is a cornerstone of Ethiopian culture. Join a local family to experience the full ritual: roasting green beans over charcoal, grinding by hand with a mortar, and brewing in a traditional jebena clay pot. Served with popcorn and incense — three rounds as tradition demands.",
    highlights: ["Birthplace of coffee", "Traditional jebena brewing", "Learn roasting & grinding", "Three ceremonial rounds", "Local family experience"],
    itinerary: [
      { time: "3:00 PM", title: "Arrive at Host Home", description: "Welcome by your host family with incense and flowers." },
      { time: "3:15 PM", title: "Roasting & Grinding", description: "Watch and participate in roasting green beans." },
      { time: "3:45 PM", title: "Brewing", description: "Learn the jebena brewing technique." },
      { time: "4:00 PM", title: "Three Rounds", description: "Enjoy Abol, Tona, and Baraka — the three traditional rounds." },
      { time: "5:00 PM", title: "Return", description: "Transfer back to your hotel." },
    ],
    included: ["Host family visit", "Full coffee ceremony", "Snacks & popcorn", "Hotel transfers"],
    notIncluded: ["Tips for host family", "Travel insurance"],
    reviews: [
      { name: "Alexandra N.", country: "Greece", rating: 5, text: "The most authentic cultural experience of our trip. The host family was so warm and welcoming." },
      { name: "Pierre D.", country: "Belgium", rating: 5, text: "As a coffee lover, this was a pilgrimage. The aroma of freshly roasted beans in the jebena — incredible." },
      { name: "Meg W.", country: "New Zealand", rating: 4, text: "Three rounds of the best coffee I've ever tasted. A beautiful window into Ethiopian family life." },
    ],
    relatedTourIds: [1, 3, 17], availability: generateAvailability(10, 16),
  },
  {
    id: 17, name: "Bahir Dar City & Market Tour", slug: slugify("Bahir Dar City & Market Tour"), destination: "Lake Tana", duration: "3 hours",
    pricing: { solo: 30.00, small: 22.00, group: 18.00 }, groupSize: "1–12", category: "Culture", rating: 4.6, image: lakeTana,
    galleryImages: [lakeTana, sunsetCruise, monastery],
    description: "Explore Bahir Dar's lively open-air market, lakeside promenade & local restaurants.",
    longDescription: "Discover the vibrant city of Bahir Dar, the gateway to Lake Tana. Stroll along the palm-lined lakeside promenade, dive into the bustling open-air market filled with spices, textiles and crafts, and taste local specialties at hidden restaurants only locals know about.",
    highlights: ["Bustling open-air market", "Palm-lined promenade", "Local food tasting", "Hidden local restaurants", "Craft shopping"],
    itinerary: [
      { time: "9:00 AM", title: "Lakeside Walk", description: "Stroll the famous palm-lined promenade." },
      { time: "9:30 AM", title: "Market Exploration", description: "Dive into the colourful open-air market." },
      { time: "10:30 AM", title: "Craft Area", description: "Watch local artisans weaving and crafting." },
      { time: "11:00 AM", title: "Food Tasting", description: "Sample local dishes at a hidden restaurant." },
      { time: "12:00 PM", title: "Return", description: "Walk back or transfer to hotel." },
    ],
    included: ["Walking guide", "Food tasting (3 dishes)", "Market orientation", "Hotel pickup"],
    notIncluded: ["Shopping", "Full lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Nina F.", country: "Germany", rating: 5, text: "Our guide took us to places we'd never have found on our own. The food tasting was a highlight!" },
      { name: "John & Sue M.", country: "Australia", rating: 4, text: "Great introduction to Bahir Dar. The market is vibrant and the artisans are talented." },
      { name: "Ayumi K.", country: "Japan", rating: 4, text: "Loved the spice market — bought frankincense and local honey. The lakeside promenade is lovely." },
    ],
    relatedTourIds: [1, 16, 2], availability: generateAvailability(12, 17),
  },
  {
    id: 18, name: "Debre Birhan Selassie Church", slug: slugify("Debre Birhan Selassie Church"), destination: "Gondar", duration: "3 hours",
    pricing: { solo: 38.00, small: 28.00, group: 22.00 }, groupSize: "1–15", category: "Culture", rating: 4.8, image: gondar,
    galleryImages: [gondar, lalibela, axum],
    description: "Visit the iconic ceiling of angels at Ethiopia's most beautifully decorated church.",
    longDescription: "Debre Birhan Selassie ('Light of the Trinity') is Ethiopia's most visually stunning church. Famous worldwide for its ceiling covered with 135 angelic faces, the church also features walls entirely painted with vivid biblical scenes. Your guide will decode the symbolism and share the miraculous story of how the church survived destruction.",
    highlights: ["135 angel-face ceiling", "Biblical wall paintings", "Miraculous survival story", "Active worship site", "Art history insights"],
    itinerary: [
      { time: "9:00 AM", title: "Hotel Pickup", description: "Short transfer to the church." },
      { time: "9:30 AM", title: "Church Tour", description: "Guided tour of the famous interior paintings." },
      { time: "10:30 AM", title: "Gardens & Grounds", description: "Explore the compound and chat with monks." },
      { time: "11:00 AM", title: "Art Discussion", description: "In-depth discussion of Ethiopian Orthodox art tradition." },
      { time: "12:00 PM", title: "Return", description: "Transfer back to your hotel." },
    ],
    included: ["Entrance fee", "Expert art guide", "Hotel transfers", "Bottled water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance", "Camera fee"],
    reviews: [
      { name: "Sophia R.", country: "Italy", rating: 5, text: "The ceiling of angels is one of the most beautiful things I've ever seen. Pure artistry." },
      { name: "William T.", country: "UK", rating: 5, text: "Our guide's explanation of the symbolism in every painting was fascinating. Don't miss this." },
      { name: "Eleni P.", country: "Greece", rating: 4, text: "A deeply spiritual and artistic experience. The church's survival story is remarkable." },
    ],
    relatedTourIds: [5, 6, 11], availability: generateAvailability(15, 18),
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

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
