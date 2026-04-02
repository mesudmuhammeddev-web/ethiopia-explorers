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
  {
    id: 19, name: "Tigray Rock Churches Hike", slug: slugify("Tigray Rock Churches Hike"), destination: "Tigray", duration: "8 hours",
    pricing: { solo: 78.00, small: 56.00, group: 45.00 }, groupSize: "1–10", category: "Adventure", rating: 4.9, image: lalibela,
    galleryImages: [lalibela, axum, gondar],
    description: "Scale cliff faces to reach ancient churches perched high in Tigray's sandstone mountains.",
    longDescription: "The Tigray rock churches are among Ethiopia's best-kept secrets. Unlike Lalibela's underground churches, these are carved into sheer cliff faces, requiring thrilling climbs to reach. Over 120 churches dot the region, each with unique frescoes and breathtaking views over the Gheralta Mountains.",
    highlights: ["Cliff-face church access", "Ancient frescoes", "Gheralta Mountain views", "120+ hidden churches", "Thrilling rock climbing"],
    itinerary: [
      { time: "6:30 AM", title: "Hotel Pickup", description: "Drive to the Gheralta cluster." },
      { time: "8:00 AM", title: "Abuna Yemata Guh", description: "The famous cliff church requiring a dramatic climb." },
      { time: "10:30 AM", title: "Maryam Korkor", description: "Visit this large church with stunning frescoes." },
      { time: "12:00 PM", title: "Lunch", description: "Traditional lunch with mountain views." },
      { time: "1:00 PM", title: "Daniel Korkor", description: "Small chapel with the best panoramic views." },
      { time: "3:00 PM", title: "Return", description: "Drive back to hotel." },
    ],
    included: ["4WD transport", "Expert guide", "Climbing assistance", "Entrance fees", "Lunch", "Water"],
    notIncluded: ["Tips", "Travel insurance", "Personal gear"],
    reviews: [
      { name: "Marco V.", country: "Italy", rating: 5, text: "Climbing to Abuna Yemata Guh was the most exhilarating experience of my life." },
      { name: "Sarah K.", country: "UK", rating: 5, text: "The views from Daniel Korkor are indescribable. Better than Lalibela in many ways." },
      { name: "Hiroshi T.", country: "Japan", rating: 4, text: "Not for the faint-hearted but absolutely worth the climb." },
    ],
    relatedTourIds: [6, 11, 5], availability: generateAvailability(10, 19),
  },
  {
    id: 20, name: "Addis Ababa City Tour", slug: slugify("Addis Ababa City Tour"), destination: "Addis Ababa", duration: "6 hours",
    pricing: { solo: 45.00, small: 32.00, group: 26.00 }, groupSize: "1–15", category: "Culture", rating: 4.6, image: kaffa,
    galleryImages: [kaffa, harar, gondar],
    description: "Discover Ethiopia's vibrant capital — museums, markets, churches & the best Ethiopian cuisine.",
    longDescription: "Explore Addis Ababa, the diplomatic capital of Africa. Visit the National Museum (home of Lucy, the 3.2 million-year-old hominid), Holy Trinity Cathedral, the massive Merkato market, and taste the city's best injera at a traditional restaurant. End with panoramic views from Entoto Mountain.",
    highlights: ["See Lucy at the National Museum", "Merkato — Africa's largest market", "Holy Trinity Cathedral", "Entoto Mountain views", "Traditional cuisine tasting"],
    itinerary: [
      { time: "8:30 AM", title: "Hotel Pickup", description: "Start at the National Museum." },
      { time: "9:00 AM", title: "National Museum", description: "See Lucy and Ethiopian art collections." },
      { time: "10:30 AM", title: "Holy Trinity Cathedral", description: "Visit the ornate cathedral with royal tombs." },
      { time: "11:30 AM", title: "Merkato", description: "Explore Africa's largest open-air market." },
      { time: "1:00 PM", title: "Traditional Lunch", description: "Authentic injera with various wots." },
      { time: "2:00 PM", title: "Entoto Mountain", description: "Panoramic views and eucalyptus forests." },
    ],
    included: ["Private vehicle", "Expert guide", "All entrance fees", "Traditional lunch", "Water"],
    notIncluded: ["Shopping", "Tips", "Travel insurance"],
    reviews: [
      { name: "Paul H.", country: "USA", rating: 5, text: "Seeing Lucy in person was a bucket-list moment. The Merkato is overwhelming in the best way." },
      { name: "Claudia R.", country: "Germany", rating: 4, text: "Great introduction to Addis. The food tasting was the highlight for me." },
      { name: "Raj P.", country: "India", rating: 4, text: "Well-organized city tour. Entoto Mountain offers stunning views of the whole city." },
    ],
    relatedTourIds: [16, 17, 12], availability: generateAvailability(15, 20),
  },
  {
    id: 21, name: "Awash National Park Safari", slug: slugify("Awash National Park Safari"), destination: "Awash", duration: "2 days",
    pricing: { solo: 195.00, small: 140.00, group: 115.00 }, groupSize: "1–10", category: "Adventure", rating: 4.7, image: baleMountains,
    galleryImages: [baleMountains, simienMountains, omoValley],
    description: "Spot oryx, kudu & baboons in Ethiopia's most accessible national park with volcanic hot springs.",
    longDescription: "Awash National Park offers Ethiopia's most accessible safari experience, just 200km east of Addis Ababa. Explore savannah landscapes dominated by the dormant Fantale volcano, soak in natural hot springs, and spot Beisa oryx, greater kudu, Soemmerring's gazelle, and over 450 bird species.",
    highlights: ["Fantale Volcano crater", "Natural hot springs", "Beisa oryx herds", "450+ bird species", "Awash River gorge"],
    itinerary: [
      { time: "Day 1", title: "Drive & Afternoon Safari", description: "Drive from Addis, afternoon game drive around Fantale volcano." },
      { time: "Day 2", title: "Morning Safari & Hot Springs", description: "Early game drive, visit Filwoha hot springs, return to Addis." },
    ],
    included: ["4WD transport", "Park fees", "Guide", "Lodge accommodation", "All meals", "Water"],
    notIncluded: ["Drinks", "Tips", "Travel insurance"],
    reviews: [
      { name: "Lena M.", country: "Sweden", rating: 5, text: "The hot springs were divine after a morning safari. Saw a huge herd of oryx!" },
      { name: "George K.", country: "Greece", rating: 4, text: "Great birding destination. Our guide spotted over 80 species in two days." },
      { name: "Amy C.", country: "Canada", rating: 4, text: "Perfect short safari from Addis. The Fantale crater hike was a bonus highlight." },
    ],
    relatedTourIds: [15, 9, 7], availability: generateAvailability(10, 21),
  },
  {
    id: 22, name: "Lalibela Sunrise Ceremony", slug: slugify("Lalibela Sunrise Ceremony"), destination: "Lalibela", duration: "3 hours",
    pricing: { solo: 40.00, small: 28.00, group: 22.00 }, groupSize: "1–15", category: "Culture", rating: 5.0, image: lalibela,
    galleryImages: [lalibela, gondar, axum],
    description: "Witness a dawn prayer service inside Lalibela's rock churches — a deeply spiritual experience.",
    longDescription: "Join Ethiopian Orthodox worshippers for a pre-dawn prayer ceremony inside one of Lalibela's ancient rock-hewn churches. As chanting echoes through the stone chambers and incense fills the air, watch the first rays of sunlight illuminate centuries-old murals. A profoundly moving spiritual experience.",
    highlights: ["Pre-dawn prayer ceremony", "Ancient chanting traditions", "Sunrise illumination", "Incense-filled chambers", "Meet local worshippers"],
    itinerary: [
      { time: "4:30 AM", title: "Early Pickup", description: "Transfer to the church in darkness." },
      { time: "5:00 AM", title: "Prayer Service", description: "Join the dawn prayer service with local worshippers." },
      { time: "6:30 AM", title: "Sunrise Viewing", description: "Watch sunrise illuminate the rock churches." },
      { time: "7:30 AM", title: "Return & Breakfast", description: "Transfer back for breakfast." },
    ],
    included: ["Hotel transfers", "Guide", "Entrance fee", "Shawl/scarf provided"],
    notIncluded: ["Breakfast", "Tips", "Travel insurance"],
    reviews: [
      { name: "Angela F.", country: "Ireland", rating: 5, text: "The most spiritual experience of my life. The chanting reverberating through stone was transcendent." },
      { name: "Peter S.", country: "Netherlands", rating: 5, text: "Worth every minute of the early wake-up. Watching sunrise hit the churches was magical." },
      { name: "Diana L.", country: "Romania", rating: 5, text: "I'm not religious but this moved me to tears. The devotion of the worshippers is beautiful." },
    ],
    relatedTourIds: [6, 5, 11], availability: generateAvailability(15, 22),
  },
  {
    id: 23, name: "Sof Omar Cave Exploration", slug: slugify("Sof Omar Cave Exploration"), destination: "Bale Mountains", duration: "1 day",
    pricing: { solo: 85.00, small: 60.00, group: 48.00 }, groupSize: "1–8", category: "Adventure", rating: 4.8, image: baleMountains,
    galleryImages: [baleMountains, simienMountains, danakil],
    description: "Explore Africa's longest cave system with underground rivers and cathedral-sized chambers.",
    longDescription: "Sof Omar Cave is one of Africa's most spectacular natural wonders — a vast limestone cave system stretching over 15 kilometres. The Web River flows through massive underground chambers adorned with pillars, arches and natural sculptures. Sacred to both Muslims and the indigenous Oromo people, the cave holds deep spiritual significance.",
    highlights: ["Africa's longest cave system", "Underground river", "Cathedral-sized chambers", "Sacred pilgrimage site", "Natural limestone pillars"],
    itinerary: [
      { time: "6:00 AM", title: "Departure", description: "Drive from Bale Mountains lodge to Sof Omar." },
      { time: "9:00 AM", title: "Cave Entrance", description: "Enter the cave system with torches and guide." },
      { time: "10:30 AM", title: "Chamber of Columns", description: "Explore the famous column hall and underground river." },
      { time: "12:00 PM", title: "Lunch", description: "Lunch near the cave entrance." },
      { time: "1:00 PM", title: "Return", description: "Drive back to the lodge." },
    ],
    included: ["4WD transport", "Cave guide", "Torches/flashlights", "Lunch", "Entrance fees"],
    notIncluded: ["Waterproof clothing", "Tips", "Travel insurance"],
    reviews: [
      { name: "Kevin R.", country: "Australia", rating: 5, text: "Like entering another world. The underground river and massive chambers are awe-inspiring." },
      { name: "Miriam S.", country: "Israel", rating: 5, text: "The scale of Sof Omar is hard to comprehend until you're inside. Truly spectacular." },
      { name: "Bruno C.", country: "Brazil", rating: 4, text: "An adventure highlight. The natural pillars look like they were sculpted by artists." },
    ],
    relatedTourIds: [15, 7, 9], availability: generateAvailability(8, 23),
  },
  {
    id: 24, name: "Afar Salt Caravan Trek", slug: slugify("Afar Salt Caravan Trek"), destination: "Danakil Depression", duration: "2 days",
    pricing: { solo: 320.00, small: 230.00, group: 185.00 }, groupSize: "1–10", category: "Adventure", rating: 4.8, image: danakil,
    galleryImages: [danakil, ertaAle, omoValley],
    description: "Join the ancient Afar salt trade route — camel caravans crossing white salt flats at dawn.",
    longDescription: "For centuries, the Afar people have harvested salt blocks from the vast white flats of the Danakil Depression and transported them by camel caravan to highland markets. Join this ancient trade route, watch salt miners cut blocks by hand, and trek alongside camel caravans across one of the most photogenic landscapes on Earth.",
    highlights: ["Ancient salt mining tradition", "Camel caravan trek", "Blinding white salt flats", "Afar cultural immersion", "Sunrise over salt lakes"],
    itinerary: [
      { time: "Day 1", title: "Salt Flats", description: "Drive to the salt flats, watch miners at work, join a camel caravan." },
      { time: "Day 2", title: "Caravan Trek & Return", description: "Walk with the caravan at dawn, then return to Mekelle." },
    ],
    included: ["4WD transport", "Armed escort", "Guide", "Camping gear", "All meals", "Water"],
    notIncluded: ["Sleeping bag", "Tips", "Travel insurance"],
    reviews: [
      { name: "Oscar W.", country: "Denmark", rating: 5, text: "Walking with the camel caravan at sunrise was like stepping back in time 1,000 years." },
      { name: "Naomi J.", country: "UK", rating: 5, text: "The salt flats are absolutely otherworldly. The Afar people are incredibly resilient." },
      { name: "Lucas P.", country: "France", rating: 4, text: "Hot but unforgettable. Watching the salt miners work is humbling." },
    ],
    relatedTourIds: [9, 10, 7], availability: generateAvailability(10, 24),
  },
  {
    id: 25, name: "Lake Langano Beach Retreat", slug: slugify("Lake Langano Beach Retreat"), destination: "Rift Valley", duration: "2 days",
    pricing: { solo: 150.00, small: 108.00, group: 88.00 }, groupSize: "1–12", category: "Relaxation", rating: 4.5, image: lakeTana,
    galleryImages: [lakeTana, sunsetCruise, baleMountains],
    description: "Relax on the shores of bilharzia-free Lake Langano — swimming, kayaking & sunset views.",
    longDescription: "Lake Langano is Ethiopia's favourite beach getaway and the only bilharzia-free lake in the Rift Valley. Enjoy swimming in warm golden-brown waters, kayaking along the shoreline, and watching spectacular sunsets over the Arsi Mountains. Perfect for a relaxing break between adventures.",
    highlights: ["Safe swimming lake", "Kayaking & water sports", "Stunning sunsets", "Arsi Mountain backdrop", "Resort facilities"],
    itinerary: [
      { time: "Day 1", title: "Arrive & Relax", description: "Drive from Addis, afternoon swimming and kayaking." },
      { time: "Day 2", title: "Activities & Return", description: "Morning bird walk, brunch, return to Addis." },
    ],
    included: ["Transport", "Lodge accommodation", "All meals", "Kayak rental", "Bird walk guide"],
    notIncluded: ["Drinks", "Tips", "Travel insurance", "Water sports extras"],
    reviews: [
      { name: "Julia S.", country: "Austria", rating: 5, text: "Perfect escape from the city. The sunset over the mountains was breathtaking." },
      { name: "Mohammed A.", country: "Saudi Arabia", rating: 4, text: "Great relaxation spot. The water is warm and the scenery is beautiful." },
      { name: "Linda C.", country: "USA", rating: 4, text: "Lovely lake retreat. The bird walk revealed stunning endemic species." },
    ],
    relatedTourIds: [4, 26, 16], availability: generateAvailability(12, 25),
  },
  {
    id: 26, name: "Rift Valley Lakes Bird Tour", slug: slugify("Rift Valley Lakes Bird Tour"), destination: "Rift Valley", duration: "3 days",
    pricing: { solo: 285.00, small: 205.00, group: 168.00 }, groupSize: "1–8", category: "Adventure", rating: 4.9, image: baleMountains,
    galleryImages: [baleMountains, lakeTana, simienMountains],
    description: "A birder's paradise — flamingos, pelicans & 500+ species across Ethiopia's Rift Valley lakes.",
    longDescription: "Ethiopia's Rift Valley is a birding paradise with over 500 species. This three-day tour visits Lakes Ziway, Langano, Abijatta, Shalla, and Hawassa, each with unique birdlife. See massive flocks of flamingos, pelicans, fish eagles, and dozens of endemic species in one of Africa's greatest birding corridors.",
    highlights: ["500+ bird species", "Flamingo flocks", "5 Rift Valley lakes", "Endemic species", "Expert ornithologist guide"],
    itinerary: [
      { time: "Day 1", title: "Lake Ziway & Langano", description: "Birding at Lake Ziway, afternoon at Lake Langano." },
      { time: "Day 2", title: "Abijatta-Shalla NP", description: "Full day in the national park, flamingo viewing." },
      { time: "Day 3", title: "Lake Hawassa & Return", description: "Morning fish market birding, afternoon return." },
    ],
    included: ["4WD transport", "Ornithologist guide", "Park fees", "Lodge accommodation", "All meals", "Birding checklist"],
    notIncluded: ["Binoculars rental", "Tips", "Travel insurance"],
    reviews: [
      { name: "Dr. Alan B.", country: "UK", rating: 5, text: "Logged 230 species in 3 days including 12 endemics. A birder's dream itinerary." },
      { name: "Christine V.", country: "Belgium", rating: 5, text: "The flamingo flocks at Abijatta were spectacular. Our guide was exceptional." },
      { name: "Takeshi N.", country: "Japan", rating: 4, text: "Well-planned birding route. Lake Hawassa fish market was an unexpected highlight." },
    ],
    relatedTourIds: [15, 25, 21], availability: generateAvailability(8, 26),
  },
  {
    id: 27, name: "Arba Minch Crocodile Market", slug: slugify("Arba Minch Crocodile Market"), destination: "Arba Minch", duration: "4 hours",
    pricing: { solo: 38.00, small: 28.00, group: 22.00 }, groupSize: "1–12", category: "Adventure", rating: 4.6, image: omoValley,
    galleryImages: [omoValley, turmi, baleMountains],
    description: "Boat to the crocodile market on Lake Chamo and spot massive Nile crocodiles basking on shore.",
    longDescription: "Take a boat trip on Lake Chamo to the famous 'Crocodile Market' — a sandy shore where massive Nile crocodiles (some over 6 metres long) bask in the sun. Also spot hippos, pelicans, and fish eagles. The surrounding Nechisar National Park offers stunning views of the 'Bridge of God' between Lakes Abaya and Chamo.",
    highlights: ["Giant Nile crocodiles", "Hippo sightings", "Lake Chamo boat trip", "Fish eagle photography", "Bridge of God viewpoint"],
    itinerary: [
      { time: "8:00 AM", title: "Hotel Pickup", description: "Drive to the Lake Chamo boat dock." },
      { time: "8:30 AM", title: "Boat Departure", description: "Cruise towards the crocodile market." },
      { time: "9:30 AM", title: "Crocodile Market", description: "Observe giant crocodiles from the boat." },
      { time: "10:30 AM", title: "Hippo Bay", description: "Spot hippos and pelicans." },
      { time: "11:30 AM", title: "Return", description: "Cruise back and transfer to hotel." },
    ],
    included: ["Boat trip", "Guide", "Park fees", "Hotel transfers", "Water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Chris D.", country: "South Africa", rating: 5, text: "The crocodiles are enormous! Got within 20 metres of a 5-metre beast." },
      { name: "Emma W.", country: "Australia", rating: 4, text: "Fun boat trip with incredible wildlife. The pelicans are surprisingly huge too." },
      { name: "Sven L.", country: "Norway", rating: 4, text: "Good value for money. The Bridge of God view is stunning." },
    ],
    relatedTourIds: [14, 28, 15], availability: generateAvailability(12, 27),
  },
  {
    id: 28, name: "Dorze Village Cultural Visit", slug: slugify("Dorze Village Cultural Visit"), destination: "Arba Minch", duration: "4 hours",
    pricing: { solo: 35.00, small: 25.00, group: 20.00 }, groupSize: "1–12", category: "Culture", rating: 4.8, image: omoValley,
    galleryImages: [omoValley, kaffa, turmi],
    description: "Visit the Dorze people's elephant-shaped bamboo huts and watch master weavers at work.",
    longDescription: "High in the hills above Arba Minch, the Dorze people are famous for their extraordinary bamboo huts shaped like elephants, standing up to 12 metres tall. Visit a traditional compound to learn about their unique architecture, watch master cotton weavers at their looms, and taste kocho (false banana bread) with spicy kitfo.",
    highlights: ["Elephant-shaped bamboo huts", "Master cotton weaving", "Kocho bread tasting", "Traditional dance", "Highland village views"],
    itinerary: [
      { time: "9:00 AM", title: "Drive to Dorze", description: "Scenic drive up to the highland village." },
      { time: "10:00 AM", title: "Village Tour", description: "Visit traditional huts and learn about the architecture." },
      { time: "11:00 AM", title: "Weaving Demonstration", description: "Watch master weavers at work." },
      { time: "11:30 AM", title: "Food Tasting", description: "Taste kocho bread and local honey wine." },
      { time: "12:30 PM", title: "Return", description: "Drive back to Arba Minch." },
    ],
    included: ["Transport", "Village guide", "Food tasting", "Village entrance fee"],
    notIncluded: ["Shopping", "Tips", "Travel insurance"],
    reviews: [
      { name: "Margot D.", country: "France", rating: 5, text: "The bamboo huts are engineering marvels. The weaving skill is extraordinary." },
      { name: "Brian T.", country: "Ireland", rating: 5, text: "Kocho tasting was surprisingly delicious. Great cultural experience." },
      { name: "Yuki H.", country: "Japan", rating: 4, text: "Fascinating architecture. The Dorze people are very welcoming." },
    ],
    relatedTourIds: [14, 27, 16], availability: generateAvailability(12, 28),
  },
  {
    id: 29, name: "Gondar Timkat Festival Tour", slug: slugify("Gondar Timkat Festival Tour"), destination: "Gondar", duration: "3 days",
    pricing: { solo: 350.00, small: 250.00, group: 205.00 }, groupSize: "1–12", category: "Culture", rating: 5.0, image: gondar,
    galleryImages: [gondar, lalibela, axum],
    description: "Experience Ethiopia's most spectacular religious festival — Epiphany celebrations at Fasilides Bath.",
    longDescription: "Timkat (Ethiopian Epiphany) is one of the world's most spectacular religious festivals, and Gondar is the best place to experience it. Watch as thousands of white-robed worshippers process through the streets carrying the Tabot replicas, then celebrate the baptism re-enactment at the historic Fasilides Bath filled with water for the occasion.",
    highlights: ["UNESCO Intangible Heritage", "Fasilides Bath ceremony", "Thousands of worshippers", "Colourful processions", "3-day celebration"],
    itinerary: [
      { time: "Day 1", title: "Ketera Procession", description: "Evening procession of Tabots through the streets." },
      { time: "Day 2", title: "Main Timkat Day", description: "Dawn ceremony at Fasilides Bath, baptism re-enactment." },
      { time: "Day 3", title: "Final Celebrations", description: "Return procession and feasting." },
    ],
    included: ["Accommodation", "Expert cultural guide", "All entrance fees", "Meals", "Transport"],
    notIncluded: ["Personal expenses", "Tips", "Travel insurance"],
    reviews: [
      { name: "Francesca B.", country: "Italy", rating: 5, text: "The most incredible festival I've ever witnessed. The devotion and colour are overwhelming." },
      { name: "Robert J.", country: "USA", rating: 5, text: "Gondar during Timkat is electric. The Fasilides Bath ceremony is unforgettable." },
      { name: "Lina K.", country: "Lebanon", rating: 5, text: "A once-in-a-lifetime experience. The processions are deeply moving." },
    ],
    relatedTourIds: [5, 18, 6], availability: generateAvailability(12, 29),
  },
  {
    id: 30, name: "Harar Jugol Night Walk", slug: slugify("Harar Jugol Night Walk"), destination: "Harar", duration: "3 hours",
    pricing: { solo: 30.00, small: 22.00, group: 18.00 }, groupSize: "1–15", category: "Culture", rating: 4.7, image: harar,
    galleryImages: [harar, turmi, omoValley],
    description: "Explore Harar's mysterious walled city after dark — hidden alleys, night markets & local life.",
    longDescription: "Harar transforms after dark. Walk the 368 narrow alleyways of the walled city as night markets come alive, families gather in courtyards, and the call to prayer echoes from 82 mosques. Your local guide reveals hidden shrines, traditional Harari houses, and the vibrant nightlife that tourists rarely see.",
    highlights: ["368 alleyways by night", "Night market atmosphere", "Hidden shrines", "Traditional Harari houses", "Local nightlife"],
    itinerary: [
      { time: "6:30 PM", title: "Shoa Gate Meeting", description: "Meet your guide at the historic main gate." },
      { time: "7:00 PM", title: "Night Market", description: "Explore the bustling evening market stalls." },
      { time: "7:45 PM", title: "Hidden Alleys", description: "Navigate the labyrinth of residential alleyways." },
      { time: "8:30 PM", title: "Tea House", description: "Traditional Harari tea and snacks." },
      { time: "9:00 PM", title: "Return", description: "Walk back to the gate." },
    ],
    included: ["Local guide", "Tea house visit", "Flashlight"],
    notIncluded: ["Dinner", "Tips", "Travel insurance"],
    reviews: [
      { name: "Antoine L.", country: "France", rating: 5, text: "Harar by night is magical. The atmosphere in the alleyways is completely different from daytime." },
      { name: "Rachel S.", country: "USA", rating: 4, text: "Our guide knew every hidden corner. The tea house was a lovely finish." },
      { name: "Takao M.", country: "Japan", rating: 4, text: "Atmospheric and authentic. Great photography opportunities with the dim lighting." },
    ],
    relatedTourIds: [12, 13, 20], availability: generateAvailability(15, 30),
  },
  {
    id: 31, name: "Simien Mountains Gelada Trek", slug: slugify("Simien Mountains Gelada Trek"), destination: "Simien Mountains", duration: "1 day",
    pricing: { solo: 85.00, small: 62.00, group: 50.00 }, groupSize: "1–10", category: "Adventure", rating: 4.9, image: simienMountains,
    galleryImages: [simienMountains, baleMountains, heroFalls],
    description: "A focused wildlife trek to find and observe troops of endemic Gelada baboons up close.",
    longDescription: "This specialized trek focuses entirely on the incredible Gelada baboons — the world's only grass-eating primates, found only in the Ethiopian highlands. Trek to known gathering areas where troops of 200+ Geladas graze on cliff edges. Sit quietly among them as they groom, play, and display their impressive chest patches.",
    highlights: ["Guaranteed Gelada sightings", "Troops of 200+ baboons", "Close-up observation", "Endemic species focus", "Expert wildlife guide"],
    itinerary: [
      { time: "6:30 AM", title: "Early Start", description: "Drive from Gondar and enter the park." },
      { time: "8:30 AM", title: "Gelada Search", description: "Trek to known Gelada gathering areas." },
      { time: "10:00 AM", title: "Observation Time", description: "Spend extended time with the troop." },
      { time: "12:00 PM", title: "Lunch & Photography", description: "Packed lunch with continued observation." },
      { time: "2:00 PM", title: "Return", description: "Trek back and drive to Gondar." },
    ],
    included: ["4WD transport", "Park fees", "Armed scout", "Wildlife guide", "Packed lunch", "Binoculars"],
    notIncluded: ["Camera gear", "Tips", "Travel insurance"],
    reviews: [
      { name: "Wildlife Weekly", country: "UK", rating: 5, text: "We counted over 300 Geladas in one troop. An extraordinary wildlife spectacle." },
      { name: "Greta M.", country: "Germany", rating: 5, text: "Sitting among the Geladas as they groomed around us was surreal and peaceful." },
      { name: "Jason K.", country: "USA", rating: 5, text: "Best wildlife encounter outside of the Galápagos. The chest-beating displays are incredible." },
    ],
    relatedTourIds: [7, 8, 15], availability: generateAvailability(10, 31),
  },
  {
    id: 32, name: "Axum Ark of the Covenant Tour", slug: slugify("Axum Ark of the Covenant Tour"), destination: "Axum", duration: "4 hours",
    pricing: { solo: 48.00, small: 35.00, group: 28.00 }, groupSize: "1–15", category: "Culture", rating: 4.7, image: axum,
    galleryImages: [axum, lalibela, gondar],
    description: "Explore the Chapel of the Tablet and uncover the mystery of the Ark of the Covenant in Axum.",
    longDescription: "For centuries, Ethiopian Christians have believed the Ark of the Covenant rests in a small chapel in Axum. This focused tour explores the evidence, the legends, and the guardian monk tradition surrounding this extraordinary claim. Visit the Old and New Churches of St. Mary of Zion and the chapel grounds.",
    highlights: ["Ark of the Covenant mystery", "Chapel of the Tablet", "Guardian monk tradition", "Old & New St. Mary of Zion", "3,000-year-old history"],
    itinerary: [
      { time: "9:00 AM", title: "Hotel Pickup", description: "Transfer to the church compound." },
      { time: "9:30 AM", title: "Old Church of Zion", description: "Visit the original 4th-century church." },
      { time: "10:30 AM", title: "Chapel of the Tablet", description: "View the chapel exterior and learn the Ark's history." },
      { time: "11:30 AM", title: "New Church & Museum", description: "Visit the new church and its treasury." },
      { time: "12:30 PM", title: "Return", description: "Transfer back to hotel." },
    ],
    included: ["Entrance fees", "Expert guide", "Hotel transfers", "Water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Daniel R.", country: "Israel", rating: 5, text: "Fascinating exploration of the Ark tradition. The conviction of the Ethiopians is compelling." },
      { name: "Margaret W.", country: "UK", rating: 4, text: "Our guide presented the evidence brilliantly. The old church is a hidden gem." },
      { name: "Felipe S.", country: "Spain", rating: 4, text: "Whether you believe or not, the history and traditions are captivating." },
    ],
    relatedTourIds: [11, 5, 19], availability: generateAvailability(15, 32),
  },
  {
    id: 33, name: "Ethiopian Highlands Horse Trek", slug: slugify("Ethiopian Highlands Horse Trek"), destination: "Simien Mountains", duration: "3 days",
    pricing: { solo: 420.00, small: 300.00, group: 245.00 }, groupSize: "1–6", category: "Adventure", rating: 4.8, image: simienMountains,
    galleryImages: [simienMountains, baleMountains, heroFalls],
    description: "Explore the Ethiopian highlands on horseback — a unique way to experience the Roof of Africa.",
    longDescription: "Experience the Simien Mountains like the highland Ethiopians do — on horseback. This three-day horse trek follows ancient trails through remote villages, across flower-filled meadows, and along dramatic escarpments. Ethiopian horses are sure-footed on mountain trails, making this accessible even for intermediate riders.",
    highlights: ["3-day horseback trek", "Remote highland villages", "Flower-filled meadows", "Escarpment trails", "Cultural village stays"],
    itinerary: [
      { time: "Day 1", title: "Debark to Sankaber", description: "Meet your horse, ride through farmland to Sankaber." },
      { time: "Day 2", title: "Sankaber to Geech", description: "Ride along the escarpment with spectacular views." },
      { time: "Day 3", title: "Geech & Return", description: "Morning ride to viewpoints, then ride back to Debark." },
    ],
    included: ["Horse & saddle", "Guide & horse handler", "All meals", "Camping gear", "Park fees"],
    notIncluded: ["Sleeping bag", "Tips", "Travel insurance", "Riding helmet"],
    reviews: [
      { name: "Sophie A.", country: "France", rating: 5, text: "Riding through the Simiens was a dream. The horses know the trails perfectly." },
      { name: "Mark R.", country: "New Zealand", rating: 5, text: "Unique perspective on the mountains. The village stays were heartwarming." },
      { name: "Eva L.", country: "Sweden", rating: 4, text: "Even as an intermediate rider, I felt safe on the Ethiopian horses. Stunning scenery." },
    ],
    relatedTourIds: [7, 8, 31], availability: generateAvailability(6, 33),
  },
  {
    id: 34, name: "Wenchi Crater Lake Tour", slug: slugify("Wenchi Crater Lake Tour"), destination: "Ambo", duration: "1 day",
    pricing: { solo: 65.00, small: 46.00, group: 38.00 }, groupSize: "1–12", category: "Relaxation", rating: 4.7, image: lakeTana,
    galleryImages: [lakeTana, baleMountains, simienMountains],
    description: "Hike down into a volcanic crater to discover a hidden emerald lake, hot springs & island monastery.",
    longDescription: "Wenchi Crater Lake is one of Ethiopia's hidden gems — a stunning emerald lake nestled inside a volcanic crater west of Addis Ababa. Hike or ride horseback down the crater walls to reach the lake, visit the island monastery by boat, and soak in natural hot springs on the crater floor.",
    highlights: ["Volcanic crater lake", "Island monastery", "Natural hot springs", "Horse or hiking descent", "Emerald green waters"],
    itinerary: [
      { time: "7:00 AM", title: "Depart Addis", description: "Drive west to Wenchi village." },
      { time: "9:30 AM", title: "Crater Descent", description: "Hike or ride down into the crater." },
      { time: "11:00 AM", title: "Boat to Monastery", description: "Cross the lake to the island monastery." },
      { time: "12:00 PM", title: "Hot Springs & Lunch", description: "Relax in hot springs, enjoy packed lunch." },
      { time: "2:00 PM", title: "Ascend & Return", description: "Climb out of the crater and drive back." },
    ],
    included: ["Transport", "Guide", "Boat trip", "Packed lunch", "Horse option"],
    notIncluded: ["Hot spring towels", "Tips", "Travel insurance"],
    reviews: [
      { name: "Anna P.", country: "Poland", rating: 5, text: "A hidden paradise! The emerald water is surreal and the hot springs were perfect." },
      { name: "James T.", country: "USA", rating: 4, text: "Great day trip from Addis. The crater descent by horse was fun." },
      { name: "Mika S.", country: "Finland", rating: 4, text: "Peaceful and beautiful. The monastery on the island was a lovely surprise." },
    ],
    relatedTourIds: [20, 25, 4], availability: generateAvailability(12, 34),
  },
  {
    id: 35, name: "Gambella River Safari", slug: slugify("Gambella River Safari"), destination: "Gambella", duration: "3 days",
    pricing: { solo: 380.00, small: 275.00, group: 225.00 }, groupSize: "1–6", category: "Adventure", rating: 4.6, image: omoValley,
    galleryImages: [omoValley, baleMountains, simienMountains],
    description: "Explore Ethiopia's wild west — river safaris, Nile perch fishing & Anuak village visits.",
    longDescription: "Gambella is Ethiopia's frontier wilderness, where the Baro River flows through tropical lowlands towards South Sudan. This off-the-beaten-path adventure includes river safaris spotting crocodiles and hippos, world-class Nile perch fishing, and visits to Anuak and Nuer villages. Very few tourists ever reach this remote region.",
    highlights: ["Baro River safari", "Nile perch fishing", "Anuak village visits", "Remote wilderness", "Tropical lowland forests"],
    itinerary: [
      { time: "Day 1", title: "Fly to Gambella", description: "Domestic flight, afternoon river cruise." },
      { time: "Day 2", title: "Full Safari Day", description: "River safari, fishing, village visit." },
      { time: "Day 3", title: "Morning Fish & Return", description: "Dawn fishing session, fly back to Addis." },
    ],
    included: ["Domestic flights", "River boat", "Fishing gear", "Guide", "Lodge", "All meals"],
    notIncluded: ["Fishing license upgrade", "Tips", "Travel insurance"],
    reviews: [
      { name: "Greg M.", country: "Australia", rating: 5, text: "Gambella is raw, wild Africa at its best. Caught a 15kg Nile perch!" },
      { name: "Hans B.", country: "Germany", rating: 4, text: "The river safari was incredible. Barely saw another tourist the entire trip." },
      { name: "Diana F.", country: "Canada", rating: 4, text: "Off the beaten path in the best way. The Anuak people were very hospitable." },
    ],
    relatedTourIds: [14, 21, 27], availability: generateAvailability(6, 35),
  },
  {
    id: 36, name: "Meskel Festival Experience", slug: slugify("Meskel Festival Experience"), destination: "Addis Ababa", duration: "2 days",
    pricing: { solo: 120.00, small: 85.00, group: 68.00 }, groupSize: "1–20", category: "Culture", rating: 4.9, image: gondar,
    galleryImages: [gondar, lalibela, kaffa],
    description: "Join a million Ethiopians celebrating the Finding of the True Cross — Meskel Square's giant bonfire.",
    longDescription: "Meskel is Ethiopia's most spectacular public festival, celebrating the finding of the True Cross. Join over a million people in Addis Ababa's Meskel Square as a giant 'Demera' bonfire is lit, priests chant in colourful vestments, and the entire city erupts in celebration. A truly unforgettable experience of Ethiopian culture.",
    highlights: ["Meskel Square ceremony", "Giant Demera bonfire", "Million-strong crowd", "Colourful processions", "UNESCO heritage event"],
    itinerary: [
      { time: "Day 1", title: "Demera Eve", description: "Watch the building of the bonfire, evening procession." },
      { time: "Day 2", title: "Meskel Day", description: "Main ceremony, bonfire lighting, celebrations." },
    ],
    included: ["VIP viewing area", "Cultural guide", "Transport", "Meals"],
    notIncluded: ["Personal expenses", "Tips", "Travel insurance"],
    reviews: [
      { name: "Patrick O.", country: "Ireland", rating: 5, text: "Nothing prepares you for the scale. A million people, one bonfire, pure joy." },
      { name: "Carmen R.", country: "Spain", rating: 5, text: "The most spectacular festival I've witnessed anywhere in the world." },
      { name: "Mike L.", country: "USA", rating: 5, text: "The Demera bonfire lighting is an incredible moment. The energy of the crowd is electric." },
    ],
    relatedTourIds: [20, 29, 16], availability: generateAvailability(20, 36),
  },
  {
    id: 37, name: "Tiya Stelae & Adadi Mariam", slug: slugify("Tiya Stelae & Adadi Mariam"), destination: "Southern Ethiopia", duration: "1 day",
    pricing: { solo: 55.00, small: 40.00, group: 32.00 }, groupSize: "1–12", category: "Culture", rating: 4.5, image: axum,
    galleryImages: [axum, lalibela, gondar],
    description: "Visit the mysterious UNESCO stelae field at Tiya and the southernmost rock-hewn church.",
    longDescription: "A fascinating day trip south of Addis Ababa to two remarkable sites. The Tiya Stelae Field is a UNESCO World Heritage Site of mysterious carved standing stones whose purpose remains debated. Nearby, Adadi Mariam is a Lalibela-style rock-hewn church — the southernmost of its kind — still actively used for worship.",
    highlights: ["UNESCO Tiya stelae", "Mysterious carved stones", "Adadi Mariam rock church", "Southernmost rock church", "Day trip from Addis"],
    itinerary: [
      { time: "8:00 AM", title: "Depart Addis", description: "Drive south on the main highway." },
      { time: "10:00 AM", title: "Tiya Stelae", description: "Explore the UNESCO stelae field with guide." },
      { time: "11:30 AM", title: "Adadi Mariam", description: "Visit the rock-hewn church." },
      { time: "12:30 PM", title: "Lunch", description: "Traditional lunch at a local restaurant." },
      { time: "2:00 PM", title: "Return", description: "Drive back to Addis Ababa." },
    ],
    included: ["Transport", "Guide", "Entrance fees", "Lunch", "Water"],
    notIncluded: ["Tips", "Travel insurance"],
    reviews: [
      { name: "Eleanor G.", country: "UK", rating: 4, text: "The Tiya stones are genuinely mysterious. Adadi Mariam is a mini-Lalibela." },
      { name: "Pablo R.", country: "Argentina", rating: 4, text: "Good day trip from Addis. The stelae are fascinating and the church is peaceful." },
      { name: "Ingrid N.", country: "Norway", rating: 4, text: "Worth the drive. Our guide shared interesting theories about the stelae's purpose." },
    ],
    relatedTourIds: [20, 11, 6], availability: generateAvailability(12, 37),
  },
  {
    id: 38, name: "Entoto Mountain Hike", slug: slugify("Entoto Mountain Hike"), destination: "Addis Ababa", duration: "4 hours",
    pricing: { solo: 32.00, small: 24.00, group: 19.00 }, groupSize: "1–15", category: "Adventure", rating: 4.5, image: simienMountains,
    galleryImages: [simienMountains, baleMountains, kaffa],
    description: "Hike through eucalyptus forests to Addis Ababa's highest point for panoramic city views.",
    longDescription: "Mount Entoto rises to 3,200 metres above Addis Ababa, offering stunning panoramic views over the capital. Hike through fragrant eucalyptus forests, visit the historic Entoto Maryam Church (where Emperor Menelik II was crowned), and explore the small museum showcasing royal artifacts.",
    highlights: ["3,200m summit views", "Eucalyptus forests", "Entoto Maryam Church", "Emperor Menelik's coronation site", "Royal museum"],
    itinerary: [
      { time: "8:00 AM", title: "Hotel Pickup", description: "Drive to the trailhead." },
      { time: "8:30 AM", title: "Forest Hike", description: "Walk through eucalyptus forests." },
      { time: "9:30 AM", title: "Summit & Views", description: "Reach the top for city panoramas." },
      { time: "10:30 AM", title: "Church & Museum", description: "Visit Entoto Maryam and the royal museum." },
      { time: "11:30 AM", title: "Return", description: "Hike down and transfer to hotel." },
    ],
    included: ["Transport", "Guide", "Church entrance fee", "Water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Linda M.", country: "USA", rating: 4, text: "Beautiful morning hike. The views of Addis from the top are spectacular." },
      { name: "Markus F.", country: "Germany", rating: 4, text: "The eucalyptus forests smell amazing. Great escape from the city." },
      { name: "Akiko T.", country: "Japan", rating: 4, text: "The church history is fascinating. Emperor Menelik's story is compelling." },
    ],
    relatedTourIds: [20, 34, 37], availability: generateAvailability(15, 38),
  },
  {
    id: 39, name: "Dire Dawa Railway Heritage", slug: slugify("Dire Dawa Railway Heritage"), destination: "Dire Dawa", duration: "5 hours",
    pricing: { solo: 40.00, small: 30.00, group: 24.00 }, groupSize: "1–12", category: "Culture", rating: 4.4, image: harar,
    galleryImages: [harar, kaffa, omoValley],
    description: "Explore Ethiopia's French-colonial railway town — art deco buildings, markets & cafe culture.",
    longDescription: "Dire Dawa was built around the Addis Ababa–Djibouti railway and retains a unique Franco-Ethiopian character. Explore the art deco Kezira quarter, the bustling Kefira market, and the historic railway station. The town's cafe culture and tree-lined boulevards give it a distinctly different feel from the rest of Ethiopia.",
    highlights: ["Art deco architecture", "Historic railway station", "Kefira market", "French-colonial quarter", "Unique cafe culture"],
    itinerary: [
      { time: "9:00 AM", title: "Railway Station", description: "Start at the historic Franco-Ethiopian railway station." },
      { time: "9:45 AM", title: "Kezira Quarter", description: "Walk through the art deco colonial quarter." },
      { time: "10:30 AM", title: "Kefira Market", description: "Explore the vibrant local market." },
      { time: "11:30 AM", title: "Cafe Stop", description: "Enjoy coffee at a classic Dire Dawa cafe." },
      { time: "12:30 PM", title: "Return", description: "Transfer back or continue to Harar." },
    ],
    included: ["Walking guide", "Coffee stop", "Market orientation"],
    notIncluded: ["Transport to/from city", "Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Philippe L.", country: "France", rating: 4, text: "The French colonial architecture is surprising. A unique side of Ethiopia." },
      { name: "Sarah B.", country: "UK", rating: 4, text: "The Kefira market is wonderfully chaotic. Great coffee at the local cafes." },
      { name: "Antonio G.", country: "Italy", rating: 4, text: "Interesting railway history. Good stop between Addis and Harar." },
    ],
    relatedTourIds: [12, 30, 13], availability: generateAvailability(12, 39),
  },
  {
    id: 40, name: "Omo Valley Bull Jumping Ceremony", slug: slugify("Omo Valley Bull Jumping Ceremony"), destination: "Omo Valley", duration: "2 days",
    pricing: { solo: 320.00, small: 230.00, group: 188.00 }, groupSize: "1–8", category: "Culture", rating: 5.0, image: turmi,
    galleryImages: [turmi, omoValley, baleMountains],
    description: "Witness the Hamer tribe's legendary bull jumping ceremony — a rite of passage into manhood.",
    longDescription: "The Hamer tribe's bull jumping ceremony is one of the most powerful cultural experiences in Africa. Watch as a young man runs naked across the backs of 15-30 bulls to prove his readiness for manhood. The ceremony includes days of singing, dancing, and ritual — a rare window into ancient traditions still practiced today.",
    highlights: ["Bull jumping ritual", "Hamer tribe ceremony", "Traditional singing & dancing", "Ancient coming-of-age rite", "Cultural photography"],
    itinerary: [
      { time: "Day 1", title: "Travel to Turmi", description: "Drive to Turmi, meet the Hamer community." },
      { time: "Day 2", title: "Ceremony Day", description: "Attend the bull jumping ceremony, afternoon return." },
    ],
    included: ["4WD transport", "Guide & translator", "Ceremony fees", "Lodge", "All meals"],
    notIncluded: ["Photo fees", "Tips", "Travel insurance"],
    reviews: [
      { name: "Erik N.", country: "Sweden", rating: 5, text: "The most raw, powerful cultural event I've ever witnessed. Life-changing." },
      { name: "Michelle K.", country: "Australia", rating: 5, text: "The singing and dancing before the ceremony is deeply moving. Unforgettable." },
      { name: "Carlos V.", country: "Mexico", rating: 5, text: "Nothing in any travel book prepares you for this. Absolutely incredible." },
    ],
    relatedTourIds: [14, 27, 28], availability: generateAvailability(8, 40),
  },
  {
    id: 41, name: "Kaffa Coffee Forest Trek", slug: slugify("Kaffa Coffee Forest Trek"), destination: "Kaffa", duration: "2 days",
    pricing: { solo: 185.00, small: 135.00, group: 110.00 }, groupSize: "1–8", category: "Adventure", rating: 4.8, image: kaffa,
    galleryImages: [kaffa, baleMountains, lakeTana],
    description: "Trek through the wild coffee forests of Kaffa — the birthplace of arabica coffee.",
    longDescription: "The Kaffa region is where arabica coffee originated, and wild coffee plants still grow in the ancient cloud forests. This two-day trek takes you deep into the UNESCO Biosphere Reserve to see wild coffee trees, exotic birds, and colobus monkeys. Learn about coffee's origin story from local experts and taste beans straight from the forest.",
    highlights: ["Birthplace of arabica coffee", "Wild coffee forest", "UNESCO Biosphere Reserve", "Colobus monkey sightings", "Forest-to-cup tasting"],
    itinerary: [
      { time: "Day 1", title: "Forest Trek", description: "Trek into the cloud forest, wild coffee plant identification." },
      { time: "Day 2", title: "Deep Forest & Return", description: "Continue deeper, roast wild beans, return to Bonga." },
    ],
    included: ["Guide", "All meals", "Lodge", "Coffee tasting", "Transport"],
    notIncluded: ["Camping gear", "Tips", "Travel insurance"],
    reviews: [
      { name: "Jean-Pierre M.", country: "France", rating: 5, text: "Tasting wild coffee in the forest where it originated is a coffee lover's ultimate pilgrimage." },
      { name: "Lisa H.", country: "Netherlands", rating: 5, text: "The cloud forest is magical. We saw troops of colobus monkeys in the canopy." },
      { name: "Roberto M.", country: "Brazil", rating: 4, text: "As a Brazilian coffee farmer, visiting coffee's birthplace was deeply meaningful." },
    ],
    relatedTourIds: [16, 15, 25], availability: generateAvailability(8, 41),
  },
  {
    id: 42, name: "Lake Abaya Boat Safari", slug: slugify("Lake Abaya Boat Safari"), destination: "Arba Minch", duration: "4 hours",
    pricing: { solo: 42.00, small: 30.00, group: 24.00 }, groupSize: "1–10", category: "Adventure", rating: 4.5, image: omoValley,
    galleryImages: [omoValley, lakeTana, baleMountains],
    description: "Cruise the red waters of Lake Abaya spotting hippos, crocodiles & fish eagles.",
    longDescription: "Lake Abaya's distinctive red-brown waters provide a dramatic backdrop for this wildlife boat safari. Spot pods of hippos, massive Nile crocodiles, African fish eagles, and pelicans. The lake lies below the Nechisar National Park, with the Forty Springs at the southern end providing crystal-clear water against the murky lake.",
    highlights: ["Red-water lake cruise", "Hippo pods", "Fish eagle photography", "Forty Springs visit", "Nechisar park views"],
    itinerary: [
      { time: "7:30 AM", title: "Hotel Pickup", description: "Drive to the Lake Abaya boat dock." },
      { time: "8:00 AM", title: "Boat Departure", description: "Cruise the northern shore for wildlife." },
      { time: "9:30 AM", title: "Hippo Bay", description: "Observe hippo pods in their habitat." },
      { time: "10:30 AM", title: "Forty Springs", description: "Visit the clear-water springs at lake's edge." },
      { time: "11:30 AM", title: "Return", description: "Cruise back and transfer to hotel." },
    ],
    included: ["Boat trip", "Guide", "Hotel transfers", "Water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "John W.", country: "USA", rating: 5, text: "The red water makes for incredible photos. We counted 20+ hippos!" },
      { name: "Birgit K.", country: "Austria", rating: 4, text: "Beautiful lake safari. The Forty Springs contrast with the red lake is stunning." },
      { name: "Tomoko A.", country: "Japan", rating: 4, text: "Peaceful morning on the lake. The fish eagles swooping for catches were amazing." },
    ],
    relatedTourIds: [27, 28, 25], availability: generateAvailability(10, 42),
  },
  {
    id: 43, name: "Lalibela to Yemrehanna Kristos", slug: slugify("Lalibela to Yemrehanna Kristos"), destination: "Lalibela", duration: "5 hours",
    pricing: { solo: 55.00, small: 40.00, group: 32.00 }, groupSize: "1–10", category: "Culture", rating: 4.8, image: lalibela,
    galleryImages: [lalibela, gondar, axum],
    description: "Visit the stunning cave church of Yemrehanna Kristos — built inside a mountain grotto.",
    longDescription: "While most visitors focus on Lalibela's rock-hewn churches, Yemrehanna Kristos is an equally extraordinary church built inside a natural cave 42km northeast of Lalibela. Dating to the 11th century, this Axumite-style church features alternating layers of wood and stone, with the remains of pilgrims who came to die here piled behind it.",
    highlights: ["Church inside a cave", "11th-century Axumite style", "Wood and stone layers", "Pilgrim ossuary", "Scenic mountain drive"],
    itinerary: [
      { time: "8:00 AM", title: "Depart Lalibela", description: "Scenic drive through the highlands." },
      { time: "9:30 AM", title: "Forest Walk", description: "Walk through juniper forest to the cave." },
      { time: "10:00 AM", title: "Church Tour", description: "Explore the cave church with your guide." },
      { time: "11:30 AM", title: "Ossuary", description: "View the remarkable pilgrim remains." },
      { time: "12:30 PM", title: "Return", description: "Drive back to Lalibela for lunch." },
    ],
    included: ["4WD transport", "Guide", "Entrance fees", "Water"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Victoria R.", country: "UK", rating: 5, text: "More intimate than Lalibela's churches. The cave setting is absolutely extraordinary." },
      { name: "Pierre D.", country: "France", rating: 5, text: "The craftsmanship of alternating wood and stone is remarkable. A hidden gem." },
      { name: "Chen L.", country: "China", rating: 4, text: "The ossuary behind the church is both eerie and fascinating. Don't miss this." },
    ],
    relatedTourIds: [6, 22, 19], availability: generateAvailability(10, 43),
  },
  {
    id: 44, name: "Debre Damo Cliff Monastery", slug: slugify("Debre Damo Cliff Monastery"), destination: "Tigray", duration: "6 hours",
    pricing: { solo: 72.00, small: 52.00, group: 42.00 }, groupSize: "1–8", category: "Adventure", rating: 4.7, image: lalibela,
    galleryImages: [lalibela, axum, gondar],
    description: "Climb a sheer cliff by leather rope to reach one of Ethiopia's most inaccessible monasteries.",
    longDescription: "Debre Damo is one of Ethiopia's most extraordinary monasteries — perched atop a flat-topped mountain accessible only by climbing a 15-metre cliff using a leather rope. Founded in the 6th century, it houses ancient manuscripts, paintings, and a community of monks who have maintained this tradition for 1,500 years. Note: only men are permitted to ascend.",
    highlights: ["15-metre rope climb", "6th-century monastery", "Ancient manuscripts", "Cliff-top monastery", "1,500 years of tradition"],
    itinerary: [
      { time: "7:00 AM", title: "Hotel Pickup", description: "Drive from Axum or Adigrat to Debre Damo." },
      { time: "9:00 AM", title: "Cliff Ascent", description: "Climb the cliff using the traditional leather rope." },
      { time: "9:30 AM", title: "Monastery Tour", description: "Explore the ancient church and manuscript library." },
      { time: "11:00 AM", title: "Monk Interaction", description: "Meet the monks and learn about their daily life." },
      { time: "12:00 PM", title: "Descent & Return", description: "Climb down and drive back." },
    ],
    included: ["4WD transport", "Guide", "Entrance fees", "Water", "Lunch"],
    notIncluded: ["Tips", "Travel insurance"],
    reviews: [
      { name: "Andrew P.", country: "UK", rating: 5, text: "The rope climb is thrilling and the monastery at the top is breathtaking. Bucket-list stuff." },
      { name: "Stefan K.", country: "Germany", rating: 5, text: "The ancient manuscripts are priceless. The monks' dedication is inspiring." },
      { name: "Ahmed R.", country: "Egypt", rating: 4, text: "The climb is challenging but safe. The views from the top are spectacular." },
    ],
    relatedTourIds: [19, 11, 32], availability: generateAvailability(8, 44),
  },
  {
    id: 45, name: "Nechisar National Park Safari", slug: slugify("Nechisar National Park Safari"), destination: "Arba Minch", duration: "1 day",
    pricing: { solo: 68.00, small: 48.00, group: 39.00 }, groupSize: "1–10", category: "Adventure", rating: 4.6, image: baleMountains,
    galleryImages: [baleMountains, omoValley, simienMountains],
    description: "Drive through golden grass plains spotting zebra, gazelle & Burchell's zebra between twin lakes.",
    longDescription: "Nechisar ('white grass') National Park sits between the twin lakes of Abaya and Chamo. The golden grasslands are home to Swayne's hartebeest, Burchell's zebra, Grant's gazelle, and over 350 bird species. The park's iconic 'Bridge of God' land bridge between the two lakes offers one of Ethiopia's most photographic viewpoints.",
    highlights: ["Bridge of God viewpoint", "Swayne's hartebeest", "Burchell's zebra herds", "Twin lake views", "350+ bird species"],
    itinerary: [
      { time: "7:00 AM", title: "Park Entrance", description: "Enter the park from Arba Minch." },
      { time: "8:00 AM", title: "Grassland Drive", description: "Game drive through the golden grass plains." },
      { time: "10:00 AM", title: "Bridge of God", description: "Visit the iconic viewpoint between the lakes." },
      { time: "11:30 AM", title: "Forest Drive", description: "Drive through the groundwater forest." },
      { time: "1:00 PM", title: "Return", description: "Exit the park and return to Arba Minch." },
    ],
    included: ["4WD vehicle", "Park fees", "Guide", "Packed lunch", "Water"],
    notIncluded: ["Binoculars", "Tips", "Travel insurance"],
    reviews: [
      { name: "Tom S.", country: "Australia", rating: 5, text: "The Bridge of God view is jaw-dropping. We saw herds of zebra on the plains." },
      { name: "Claudia F.", country: "Germany", rating: 4, text: "Great game drive experience. The birdlife in the groundwater forest is excellent." },
      { name: "Kenji O.", country: "Japan", rating: 4, text: "Beautiful park with diverse landscapes. The twin lakes are stunning from above." },
    ],
    relatedTourIds: [27, 42, 28], availability: generateAvailability(10, 45),
  },
  {
    id: 46, name: "Harar Traditional Houses Tour", slug: slugify("Harar Traditional Houses Tour"), destination: "Harar", duration: "3 hours",
    pricing: { solo: 28.00, small: 20.00, group: 16.00 }, groupSize: "1–12", category: "Culture", rating: 4.6, image: harar,
    galleryImages: [harar, omoValley, kaffa],
    description: "Step inside beautifully decorated traditional Harari homes with their famous colourful interiors.",
    longDescription: "Harari homes are famous for their vibrant interior decorations — walls covered with colourful baskets, plates, and textiles arranged in intricate patterns. Visit several traditional homes, learn about the unique Harari architectural style, and understand the significance of each decorative element in Harari culture.",
    highlights: ["Colourful interior decorations", "Traditional basket walls", "Harari architectural style", "Family hospitality", "Cultural significance"],
    itinerary: [
      { time: "9:00 AM", title: "Walking Start", description: "Begin in the Jugol old city." },
      { time: "9:30 AM", title: "First Home", description: "Visit a traditional Harari home and learn about decorations." },
      { time: "10:15 AM", title: "Second Home", description: "See a different decorative style and meet the family." },
      { time: "11:00 AM", title: "Third Home & Coffee", description: "Visit a third home and enjoy Harari coffee." },
      { time: "12:00 PM", title: "Return", description: "Walk back through the market." },
    ],
    included: ["Walking guide", "Home entrance fees", "Coffee", "Snacks"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Marie C.", country: "Belgium", rating: 5, text: "The interior decorations are stunning — every wall is a work of art." },
      { name: "Ruth A.", country: "Ethiopia", rating: 4, text: "Proud to see visitors appreciate our Harari traditions. Beautiful homes." },
      { name: "Simon W.", country: "UK", rating: 4, text: "Fascinating glimpse into private family life. The hospitality was genuine." },
    ],
    relatedTourIds: [12, 30, 13], availability: generateAvailability(12, 46),
  },
  {
    id: 47, name: "Ras Dashen Summit Expedition", slug: slugify("Ras Dashen Summit Expedition"), destination: "Simien Mountains", duration: "5 days",
    pricing: { solo: 750.00, small: 540.00, group: 445.00 }, groupSize: "1–6", category: "Adventure", rating: 5.0, image: simienMountains,
    galleryImages: [simienMountains, baleMountains, heroFalls],
    description: "Summit Ethiopia's highest peak at 4,550m — the ultimate Simien Mountains challenge.",
    longDescription: "Ras Dashen (4,550m) is Ethiopia's highest peak and the fourth-highest in Africa. This five-day expedition traverses the full length of the Simien Mountains, from Sankaber through Chenek to the summit. Encounter Gelada baboons, Walia ibex, and dramatic escarpments before the final push to the windswept summit.",
    highlights: ["4,550m summit", "Ethiopia's highest peak", "5-day expedition", "Walia ibex territory", "Ultimate mountain challenge"],
    itinerary: [
      { time: "Day 1", title: "Debark to Sankaber", description: "Enter the park, trek to Sankaber camp." },
      { time: "Day 2", title: "Sankaber to Geech", description: "Trek along escarpments to Geech camp." },
      { time: "Day 3", title: "Geech to Chenek", description: "Ridge walk to Chenek, acclimatization." },
      { time: "Day 4", title: "Summit Day", description: "Pre-dawn start for the summit push." },
      { time: "Day 5", title: "Descent & Return", description: "Descend and drive back to Gondar." },
    ],
    included: ["All transport", "Park fees", "Full support team", "All meals", "Camping gear", "Emergency supplies"],
    notIncluded: ["Sleeping bag", "Personal gear", "Tips", "Travel insurance", "Summit certificate"],
    reviews: [
      { name: "Alex K.", country: "New Zealand", rating: 5, text: "Standing on the roof of Ethiopia — what an achievement. The trek is spectacular." },
      { name: "Hannah B.", country: "Germany", rating: 5, text: "Challenging but our guide ensured proper acclimatization. Summit sunrise was magical." },
      { name: "Ibrahim M.", country: "Egypt", rating: 5, text: "The best 5 days of trekking I've ever done. The support team was exceptional." },
    ],
    relatedTourIds: [8, 7, 33], availability: generateAvailability(6, 47),
  },
  {
    id: 48, name: "Addis Ababa Food & Injera Tour", slug: slugify("Addis Ababa Food & Injera Tour"), destination: "Addis Ababa", duration: "4 hours",
    pricing: { solo: 38.00, small: 28.00, group: 22.00 }, groupSize: "1–10", category: "Culture", rating: 4.8, image: kaffa,
    galleryImages: [kaffa, harar, gondar],
    description: "Taste your way through Addis — injera, kitfo, tibs & traditional tej honey wine.",
    longDescription: "Discover why Ethiopian cuisine is one of Africa's greatest culinary traditions on this food tour through Addis Ababa. Visit hidden local restaurants, taste injera with a variety of wots (stews), try raw kitfo (beef tartare), sizzling tibs, and wash it down with traditional tej (honey wine). Learn to eat with your hands the Ethiopian way.",
    highlights: ["Injera & wot varieties", "Raw kitfo tasting", "Tej honey wine", "Hidden local restaurants", "Learn Ethiopian dining etiquette"],
    itinerary: [
      { time: "11:00 AM", title: "First Stop", description: "Traditional injera house for classic wots." },
      { time: "12:00 PM", title: "Kitfo Specialist", description: "Famous kitfo restaurant for raw and cooked versions." },
      { time: "1:00 PM", title: "Tej Bet", description: "Traditional honey wine bar experience." },
      { time: "2:00 PM", title: "Dessert & Coffee", description: "Sweet treats and a mini coffee ceremony." },
    ],
    included: ["All food tastings", "Drinks included", "Walking guide", "Hotel pickup"],
    notIncluded: ["Extra food orders", "Tips", "Travel insurance"],
    reviews: [
      { name: "Julia K.", country: "USA", rating: 5, text: "The kitfo was incredible — I was nervous about raw beef but it was the best thing I ate in Ethiopia!" },
      { name: "Marco B.", country: "Italy", rating: 5, text: "As an Italian, I appreciate great food culture. Ethiopian cuisine is extraordinary." },
      { name: "Priya S.", country: "India", rating: 4, text: "Fascinating parallels with Indian cuisine. The spice blends are unique and delicious." },
    ],
    relatedTourIds: [20, 16, 38], availability: generateAvailability(10, 48),
  },
  {
    id: 49, name: "Mursi Tribe Lip Plate Visit", slug: slugify("Mursi Tribe Lip Plate Visit"), destination: "Omo Valley", duration: "1 day",
    pricing: { solo: 185.00, small: 135.00, group: 110.00 }, groupSize: "1–8", category: "Culture", rating: 4.7, image: turmi,
    galleryImages: [turmi, omoValley, baleMountains],
    description: "Visit the famous Mursi tribe in Mago National Park — known worldwide for their lip plates.",
    longDescription: "The Mursi are one of the last tribes in Africa where women still wear traditional clay lip plates. Deep in Mago National Park near Jinka, visit a Mursi village to learn about this extraordinary tradition, their pastoral lifestyle, and their body scarification art. A respectful cultural encounter guided by experienced translators.",
    highlights: ["Mursi lip plate tradition", "Mago National Park", "Body scarification art", "Pastoral lifestyle", "Respectful cultural exchange"],
    itinerary: [
      { time: "6:00 AM", title: "Early Start", description: "Drive from Jinka into Mago National Park." },
      { time: "8:30 AM", title: "Mursi Village", description: "Arrive at the village and meet the community." },
      { time: "10:00 AM", title: "Cultural Exchange", description: "Learn about Mursi traditions and daily life." },
      { time: "11:30 AM", title: "Return Drive", description: "Drive back to Jinka." },
      { time: "1:00 PM", title: "Lunch", description: "Lunch in Jinka town." },
    ],
    included: ["4WD transport", "Guide & translator", "Village fees", "Park fees", "Lunch"],
    notIncluded: ["Photo fees", "Tips", "Travel insurance"],
    reviews: [
      { name: "Catherine L.", country: "France", rating: 5, text: "A humbling encounter. The Mursi women are proud and dignified." },
      { name: "James P.", country: "Australia", rating: 4, text: "Incredible cultural experience. Our translator helped us have genuine conversations." },
      { name: "Elena R.", country: "Romania", rating: 4, text: "Important to approach with respect. The guide ensured a positive exchange for both sides." },
    ],
    relatedTourIds: [14, 40, 28], availability: generateAvailability(8, 49),
  },
  {
    id: 50, name: "Bahir Dar Bike & Blue Nile Tour", slug: slugify("Bahir Dar Bike & Blue Nile Tour"), destination: "Lake Tana", duration: "5 hours",
    pricing: { solo: 42.00, small: 30.00, group: 24.00 }, groupSize: "1–10", category: "Adventure", rating: 4.6, image: lakeTana,
    galleryImages: [lakeTana, heroFalls, sunsetCruise],
    description: "Cycle through Bahir Dar's palm-lined streets and along the Blue Nile to the river's source.",
    longDescription: "Explore Bahir Dar by bicycle on this leisurely cycling tour. Pedal along the palm-lined lakeside promenade, through local neighborhoods, and along the Blue Nile River to the point where it exits Lake Tana — the legendary source of the Blue Nile. Stop at local cafes and viewpoints along the way.",
    highlights: ["Blue Nile source visit", "Lakeside cycling", "Palm-lined promenade", "Local neighborhood rides", "Café stops"],
    itinerary: [
      { time: "7:30 AM", title: "Bike Setup", description: "Fit your bike and receive safety briefing." },
      { time: "8:00 AM", title: "Lakeside Ride", description: "Cycle along the famous promenade." },
      { time: "9:30 AM", title: "Blue Nile Source", description: "Ride to the Blue Nile outlet from Lake Tana." },
      { time: "10:30 AM", title: "Village Cycling", description: "Ride through local farming villages." },
      { time: "12:00 PM", title: "Return", description: "Cycle back with a café stop." },
    ],
    included: ["Bicycle & helmet", "Guide", "Water", "Café stop drink"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Martin S.", country: "Netherlands", rating: 5, text: "Perfect way to see Bahir Dar. The Blue Nile source was a highlight." },
      { name: "Kelly O.", country: "USA", rating: 4, text: "Fun morning ride. The palm-lined promenade is beautiful by bike." },
      { name: "Daisuke N.", country: "Japan", rating: 4, text: "Peaceful cycling through villages. The locals were friendly and curious." },
    ],
    relatedTourIds: [1, 2, 17], availability: generateAvailability(10, 50),
  },
  {
    id: 51, name: "Konso Cultural Landscape Tour", slug: slugify("Konso Cultural Landscape Tour"), destination: "Southern Ethiopia", duration: "1 day",
    pricing: { solo: 58.00, small: 42.00, group: 34.00 }, groupSize: "1–10", category: "Culture", rating: 4.7, image: omoValley,
    galleryImages: [omoValley, turmi, baleMountains],
    description: "Explore the UNESCO-listed terraced hillsides and waga totems of the Konso people.",
    longDescription: "The Konso Cultural Landscape is a UNESCO World Heritage Site featuring extraordinary stone-walled terraces built over 400 years. Visit fortified hilltop villages, see the famous waga wooden totems commemorating heroes, and learn about the Konso people's remarkable agricultural engineering and social structure.",
    highlights: ["UNESCO Cultural Landscape", "Stone-walled terraces", "Waga wooden totems", "Fortified hilltop villages", "400 years of agriculture"],
    itinerary: [
      { time: "8:00 AM", title: "Drive to Konso", description: "Scenic drive through southern landscapes." },
      { time: "10:00 AM", title: "Terraced Village", description: "Walk through the stunning terraced hillsides." },
      { time: "11:30 AM", title: "Waga Totems", description: "Visit the sacred totem field." },
      { time: "12:30 PM", title: "Lunch", description: "Traditional meal in a Konso village." },
      { time: "2:00 PM", title: "Return", description: "Drive back to base." },
    ],
    included: ["Transport", "Guide", "Village fees", "Lunch", "Water"],
    notIncluded: ["Tips", "Travel insurance"],
    reviews: [
      { name: "Isabelle V.", country: "France", rating: 5, text: "The terracing is stunning engineering. The waga totems are uniquely beautiful." },
      { name: "Peter G.", country: "UK", rating: 4, text: "Fascinating insight into sustainable agriculture. The Konso villages are impressive." },
      { name: "Maria S.", country: "Spain", rating: 4, text: "A UNESCO site that deserves more visitors. The cultural depth is remarkable." },
    ],
    relatedTourIds: [14, 40, 27], availability: generateAvailability(10, 51),
  },
  {
    id: 52, name: "Dallol Sulfur Springs Tour", slug: slugify("Dallol Sulfur Springs Tour"), destination: "Danakil Depression", duration: "1 day",
    pricing: { solo: 165.00, small: 120.00, group: 95.00 }, groupSize: "1–12", category: "Adventure", rating: 4.9, image: danakil,
    galleryImages: [danakil, ertaAle, simienMountains],
    description: "Visit the neon-coloured sulfur springs of Dallol — Earth's most alien landscape.",
    longDescription: "Dallol is the most visually extraordinary place on Earth. At 125 metres below sea level, this volcanic hydrothermal field produces neon yellow, green, and orange formations of sulfur and mineral deposits. The landscape looks more like another planet than anywhere on Earth. Visit the salt canyons and acid lakes nearby.",
    highlights: ["Neon-coloured formations", "Below sea level exploration", "Sulfur & mineral deposits", "Salt canyons", "Acid lakes"],
    itinerary: [
      { time: "5:00 AM", title: "Early Start", description: "Drive from camp to Dallol before the heat." },
      { time: "7:00 AM", title: "Dallol Springs", description: "Explore the neon sulfur formations." },
      { time: "9:00 AM", title: "Salt Canyons", description: "Walk through carved salt formations." },
      { time: "10:30 AM", title: "Acid Lake", description: "View the vivid green acid lake." },
      { time: "12:00 PM", title: "Return", description: "Drive back to Mekelle." },
    ],
    included: ["4WD transport", "Armed escort", "Guide", "Water", "Breakfast"],
    notIncluded: ["Lunch", "Tips", "Travel insurance"],
    reviews: [
      { name: "Olga P.", country: "Russia", rating: 5, text: "Like walking on Mars. The neon colours are beyond anything I've ever seen." },
      { name: "Thomas M.", country: "Germany", rating: 5, text: "The most photographable place on Earth. Every angle is a masterpiece." },
      { name: "Sara J.", country: "Sweden", rating: 5, text: "Despite the heat, Dallol is worth every drop of sweat. Utterly alien and beautiful." },
    ],
    relatedTourIds: [9, 10, 24], availability: generateAvailability(12, 52),
  },
  {
    id: 53, name: "Mekelle to Lalibela Overland", slug: slugify("Mekelle to Lalibela Overland"), destination: "Lalibela", duration: "2 days",
    pricing: { solo: 220.00, small: 158.00, group: 128.00 }, groupSize: "1–8", category: "Adventure", rating: 4.7, image: lalibela,
    galleryImages: [lalibela, axum, gondar],
    description: "Epic overland journey through Ethiopia's dramatic highlands from Mekelle to Lalibela.",
    longDescription: "This two-day overland adventure connects Mekelle to Lalibela through some of Ethiopia's most spectacular highland scenery. Pass through terraced mountains, remote villages, deep gorges, and ancient monasteries. The journey itself is the destination, with overnight stops in highland towns and stunning viewpoints throughout.",
    highlights: ["Dramatic highland scenery", "Remote village encounters", "Mountain pass crossings", "Deep gorge views", "Authentic rural Ethiopia"],
    itinerary: [
      { time: "Day 1", title: "Mekelle to Sekota", description: "Drive through dramatic mountain landscapes to Sekota." },
      { time: "Day 2", title: "Sekota to Lalibela", description: "Continue through gorges and highlands to Lalibela." },
    ],
    included: ["4WD transport", "Driver-guide", "Guesthouse accommodation", "All meals", "Water"],
    notIncluded: ["Snacks", "Tips", "Travel insurance"],
    reviews: [
      { name: "Richard H.", country: "UK", rating: 5, text: "The scenery between Mekelle and Lalibela is some of the most dramatic I've ever seen." },
      { name: "Astrid L.", country: "Denmark", rating: 4, text: "A real adventure. The remote villages en route are highlights in themselves." },
      { name: "Pedro R.", country: "Portugal", rating: 4, text: "The mountain passes are breathtaking. Our driver navigated expertly." },
    ],
    relatedTourIds: [6, 19, 22], availability: generateAvailability(8, 53),
  },
  {
    id: 54, name: "Langano Hot Springs Retreat", slug: slugify("Langano Hot Springs Retreat"), destination: "Rift Valley", duration: "1 day",
    pricing: { solo: 55.00, small: 40.00, group: 32.00 }, groupSize: "1–15", category: "Relaxation", rating: 4.6, image: lakeTana,
    galleryImages: [lakeTana, sunsetCruise, baleMountains],
    description: "Soak in natural volcanic hot springs surrounded by Rift Valley scenery — pure relaxation.",
    longDescription: "Escape the city to natural volcanic hot springs in the Rift Valley near Lake Langano. The mineral-rich waters are believed to have healing properties, and the setting among acacia trees with mountain views makes this the ultimate relaxation experience. Combine with swimming in Lake Langano and a traditional lunch.",
    highlights: ["Natural hot springs", "Mineral-rich waters", "Rift Valley views", "Lake Langano swimming", "Traditional spa lunch"],
    itinerary: [
      { time: "8:00 AM", title: "Depart Addis", description: "Scenic drive to the Rift Valley." },
      { time: "10:30 AM", title: "Hot Springs", description: "Soak in the natural volcanic hot springs." },
      { time: "12:00 PM", title: "Lunch", description: "Fresh fish lunch at a lakeside restaurant." },
      { time: "1:30 PM", title: "Lake Swimming", description: "Swim in Lake Langano's warm waters." },
      { time: "3:00 PM", title: "Return", description: "Drive back to Addis Ababa." },
    ],
    included: ["Transport", "Hot springs entrance", "Fish lunch", "Water"],
    notIncluded: ["Towels", "Tips", "Travel insurance"],
    reviews: [
      { name: "Martha K.", country: "Germany", rating: 5, text: "The hot springs were heavenly after days of trekking. Perfect recovery day." },
      { name: "David C.", country: "USA", rating: 4, text: "Beautiful setting. The fish lunch by the lake was delicious." },
      { name: "Ling W.", country: "China", rating: 4, text: "Relaxing day trip from Addis. The mineral waters felt rejuvenating." },
    ],
    relatedTourIds: [25, 4, 34], availability: generateAvailability(15, 54),
  },
  {
    id: 55, name: "Historic Route Grand Tour", slug: slugify("Historic Route Grand Tour"), destination: "Multiple", duration: "12 days",
    pricing: { solo: 2200.00, small: 1580.00, group: 1295.00 }, groupSize: "1–8", category: "Culture", rating: 5.0, image: gondar,
    galleryImages: [gondar, lalibela, axum, danakil],
    description: "The ultimate Ethiopia itinerary — Addis, Bahir Dar, Gondar, Simien, Axum, Lalibela in 12 days.",
    longDescription: "This comprehensive 12-day tour covers Ethiopia's entire Historic Route, the most complete way to experience the country's incredible heritage. From the capital Addis Ababa, travel north to Bahir Dar's island monasteries, Gondar's castles, the Simien Mountains, Axum's ancient obelisks, and Lalibela's rock-hewn churches. Every major highlight included.",
    highlights: ["12-day comprehensive tour", "All major historic sites", "Simien Mountains trek", "Expert historian guide", "Domestic flights included"],
    itinerary: [
      { time: "Days 1-2", title: "Addis Ababa", description: "National Museum, Merkato, Entoto Mountain." },
      { time: "Days 3-4", title: "Bahir Dar & Lake Tana", description: "Monasteries, Blue Nile Falls." },
      { time: "Days 5-6", title: "Gondar", description: "Royal Enclosure, Debre Birhan Selassie." },
      { time: "Days 7-8", title: "Simien Mountains", description: "2-day trek with Gelada encounters." },
      { time: "Days 9-10", title: "Axum", description: "Stelae, Ark chapel, Queen of Sheba." },
      { time: "Days 11-12", title: "Lalibela", description: "All 11 rock churches, sunrise ceremony." },
    ],
    included: ["All domestic flights", "4WD transport", "Expert guides", "All accommodation", "All meals", "All entrance fees", "Trek support"],
    notIncluded: ["International flights", "Visa", "Tips", "Travel insurance", "Personal expenses"],
    reviews: [
      { name: "Dr. Sarah M.", country: "USA", rating: 5, text: "The perfect Ethiopia itinerary. Every day was extraordinary. Our guide was world-class." },
      { name: "Henrik & Lena J.", country: "Sweden", rating: 5, text: "12 days of pure wonder. Ethiopia exceeded every expectation." },
      { name: "Amir K.", country: "Iran", rating: 5, text: "The most complete cultural journey I've ever taken. Ethiopia is a revelation." },
    ],
    relatedTourIds: [5, 6, 11], availability: generateAvailability(8, 55),
  },
];

export const destinationList = ["All", "Lake Tana", "Blue Nile Falls", "Gondar", "Lalibela", "Simien Mountains", "Danakil Depression", "Axum", "Harar", "Omo Valley", "Bale Mountains", "Kaffa", "Addis Ababa", "Rift Valley", "Arba Minch", "Tigray", "Awash", "Ambo", "Dire Dawa", "Gambella", "Southern Ethiopia", "Multiple"];
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
