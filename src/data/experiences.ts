// Generic experience/tour data for all categories except northern-heritage
// (which has its own dedicated file). Hub + detail pages read from here.

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  overnight?: string;
}

export interface ExperienceTour {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  transport: string;
  groupSize: string;
  priceFrom: number;
  heroImage: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included?: string[];
  excluded?: string[];
  route: string[];
  category: "Express" | "Classic" | "Extended" | "Grand";
}

export interface ExperienceCategory {
  slug: string;
  label: string;
  region: string;
  heroImage: string;
  tagline: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  tours: ExperienceTour[];
}

export const includedDefault = [
  "All accommodation in handpicked hotels and lodges",
  "Private 4WD vehicle with experienced driver",
  "Licensed English-speaking tour guide",
  "All entrance fees to sites listed in itinerary",
  "Daily breakfast; meals as specified in itinerary",
  "Bottled water throughout the tour",
  "Airport transfers in Addis Ababa",
  "All government taxes and service charges",
];

export const excludedDefault = [
  "International flights to/from Ethiopia",
  "Domestic flights (we arrange and quote separately)",
  "Ethiopia entry visa fee",
  "Travel and medical insurance",
  "Lunches and dinners not specified",
  "Alcoholic and soft drinks",
  "Personal expenses and laundry",
  "Tips for guides and drivers",
];

const cat = (
  n: number,
): "Express" | "Classic" | "Extended" | "Grand" =>
  n <= 4 ? "Express" : n <= 8 ? "Classic" : n <= 15 ? "Extended" : "Grand";

// -------------------- SOUTHERN OMO VALLEY --------------------
const omoTours: ExperienceTour[] = [
  {
    slug: "4-days-omo-valley-express",
    title: "4 Days Omo Valley Express",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    transport: "Private 4WD",
    groupSize: "1–8 people",
    priceFrom: 690,
    heroImage: "/photos/omo-hamer.jpg",
    shortDescription:
      "A short immersion into the lower Omo Valley — meet the Hamer, Karo and Dassanech peoples without a long road trip.",
    overview:
      "This compact safari is built for travellers short on time but eager to witness the cultural mosaic of the lower Omo. Fly south to Arba Minch, drive deep into Hamer country, attend a village market and visit Karo families perched above the Omo River.",
    highlights: [
      "Hamer village visit and possible Evangadi night dance",
      "Karo body-painting traditions overlooking the Omo bend",
      "Dassanech crossing by traditional dugout canoe",
      "Turmi or Dimeka weekly market (day-dependent)",
      "Nechisar National Park's rift valley views",
    ],
    itinerary: [
      { day: 1, title: "Addis Ababa → Arba Minch", description: "Fly south to Arba Minch. Afternoon boat ride on Lake Chamo to see Nile crocodiles and hippos at the 'Crocodile Market'.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 2, title: "Arba Minch → Turmi (Hamer country)", description: "Long drive south through Konso terraced highlands into the lowland savanna of South Omo. Evening visit to a Hamer village.", meals: "Breakfast", overnight: "Turmi" },
      { day: 3, title: "Karo & Dassanech communities", description: "Morning drive to Korcho village to meet the Karo people. Afternoon to Omorate for a Dassanech crossing of the Omo River by dugout canoe.", meals: "Breakfast", overnight: "Turmi" },
      { day: 4, title: "Turmi → Arba Minch → Addis Ababa", description: "Early drive back to Arba Minch, market stop in Key Afer if market day, evening flight to Addis Ababa.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Arba Minch", "Konso", "Turmi", "Korcho", "Omorate", "Addis Ababa"],
    category: cat(4),
  },
  {
    slug: "7-days-omo-valley-tribes-classic",
    title: "7 Days Omo Valley Tribes Classic",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    transport: "Private 4WD",
    groupSize: "1–8 people",
    priceFrom: 1180,
    heroImage: "/photos/omo-mursi.jpg",
    shortDescription:
      "The signature Omo Valley loop — Dorze, Konso, Hamer, Mursi, Karo and Dassanech in one carefully paced journey.",
    overview:
      "Seven days is the sweet spot for South Omo. You'll move between highland and lowland ecosystems, meet at least six culturally distinct peoples, attend two or three village markets and have time to actually listen — not just photograph.",
    highlights: [
      "Dorze weavers and false-banana cuisine in the Guge highlands",
      "Konso UNESCO terraces and waga grave markers",
      "Mursi lip-plate and stick-fighting culture in Mago NP",
      "Hamer bull-jumping ceremony (if season permits)",
      "Two weekly markets — Dimeka, Key Afer or Jinka",
    ],
    itinerary: [
      { day: 1, title: "Addis → Arba Minch", description: "Scenic drive or flight to Arba Minch via the Rift Valley lakes.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 2, title: "Dorze village & Lake Chamo", description: "Morning visit to Dorze beehive huts and weavers. Afternoon boat safari on Lake Chamo.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 3, title: "Arba Minch → Jinka via Konso", description: "Drive south through Konso cultural landscape (UNESCO) into Jinka, gateway to the Mursi.", meals: "Breakfast", overnight: "Jinka" },
      { day: 4, title: "Mursi excursion → Turmi", description: "Early 4WD into Mago National Park to meet a Mursi community, then continue to Turmi in Hamer territory.", meals: "Breakfast", overnight: "Turmi" },
      { day: 5, title: "Karo & Dassanech", description: "Morning Karo visit at Korcho or Dus, afternoon Dassanech canoe crossing at Omorate.", meals: "Breakfast", overnight: "Turmi" },
      { day: 6, title: "Hamer market & return to Arba Minch", description: "Dimeka or Turmi market depending on the day, then long drive back to Arba Minch.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 7, title: "Arba Minch → Addis Ababa", description: "Flight or drive back to Addis, with a stop at the Rift Valley lakes if driving.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Arba Minch", "Dorze", "Konso", "Jinka", "Mursi (Mago)", "Turmi", "Korcho", "Omorate", "Addis Ababa"],
    category: cat(7),
  },
  {
    slug: "10-days-omo-valley-deep-immersion",
    title: "10 Days Omo Valley Deep Immersion",
    duration: "10 Days / 9 Nights",
    durationDays: 10,
    transport: "Private 4WD",
    groupSize: "1–8 people",
    priceFrom: 1690,
    heroImage: "/photos/omo-karo.jpg",
    shortDescription:
      "A longer, slower Omo Valley itinerary that adds Nyangatom, Bana and overnight bush camping for true depth.",
    overview:
      "When seven days isn't enough. This itinerary builds in extra time with the Hamer, adds the Nyangatom and Bana peoples, includes a night of bush camping near the Omo River and gives photographers the time to genuinely build rapport rather than rushing through.",
    highlights: [
      "Extended Hamer immersion (3 nights in Turmi)",
      "Nyangatom community visit across the Omo",
      "Bana and Tsemay people in Key Afer area",
      "Optional bull-jumping ceremony attendance",
      "Bush camp night under the Omo Valley stars",
    ],
    itinerary: [
      { day: 1, title: "Addis → Arba Minch", description: "Travel south to Arba Minch.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 2, title: "Dorze + Chencha", description: "Highland Dorze culture and weaving.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 3, title: "Konso → Jinka", description: "Konso UNESCO terraces and South Omo museum.", meals: "Breakfast", overnight: "Jinka" },
      { day: 4, title: "Mursi → Turmi", description: "Mago NP and onward to Hamer country.", meals: "Breakfast", overnight: "Turmi" },
      { day: 5, title: "Hamer immersion day", description: "Full day with Hamer families; possible Evangadi dance.", meals: "Breakfast", overnight: "Turmi" },
      { day: 6, title: "Karo + Nyangatom", description: "Korcho Karo and crossing to Nyangatom side of the Omo.", meals: "Breakfast", overnight: "Turmi" },
      { day: 7, title: "Dassanech + Omorate", description: "Dassanech canoe crossing and border-region villages.", meals: "Breakfast", overnight: "Turmi" },
      { day: 8, title: "Bana + Tsemay around Key Afer", description: "Less-visited highland peoples and weekly market.", meals: "Breakfast", overnight: "Key Afer / Jinka" },
      { day: 9, title: "Return to Arba Minch", description: "Long scenic drive back through Konso.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 10, title: "Arba Minch → Addis", description: "Flight or drive back to Addis Ababa.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Arba Minch", "Konso", "Jinka", "Mursi", "Turmi", "Karo", "Nyangatom", "Dassanech", "Key Afer", "Addis Ababa"],
    category: cat(10),
  },
  {
    slug: "12-days-rift-valley-omo-valley",
    title: "12 Days Rift Valley + Omo Valley Combined",
    duration: "12 Days / 11 Nights",
    durationDays: 12,
    transport: "Private 4WD",
    groupSize: "1–8 people",
    priceFrom: 1990,
    heroImage: "/photos/rift-valley-lakes.jpg",
    shortDescription:
      "Pairs the Ethiopian Rift Valley lakes and Bale Mountains preface with a full Omo Valley tribal circuit.",
    overview:
      "Add geological and birding interest to a cultural Omo trip. Begin in the Rift Valley lakes for birding and hippo viewing, dip into the edge of the Bale Highlands, then dive south for the full Omo loop.",
    highlights: [
      "Lake Ziway, Langano and Awasa birding",
      "Wondo Genet hot springs",
      "Edge of Bale Mountains National Park",
      "Full Omo cultural circuit",
      "Crocodile Market on Lake Chamo",
    ],
    itinerary: [
      { day: 1, title: "Addis → Lake Ziway", description: "Rift Valley descent and lakeside birding.", meals: "Breakfast", overnight: "Ziway" },
      { day: 2, title: "Ziway → Awasa", description: "Stop at Langano, fish market at Awasa at dawn.", meals: "Breakfast", overnight: "Awasa" },
      { day: 3, title: "Awasa → Wondo Genet → Bale edge", description: "Hot springs and forest birding.", meals: "Breakfast", overnight: "Goba" },
      { day: 4, title: "Bale → Arba Minch", description: "Long highland-to-lowland drive.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 5, title: "Dorze + Chamo boat", description: "Dorze culture; afternoon hippo and croc safari.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 6, title: "Arba Minch → Jinka", description: "Konso UNESCO terraces en route.", meals: "Breakfast", overnight: "Jinka" },
      { day: 7, title: "Mursi → Turmi", description: "Mago NP and Hamer country.", meals: "Breakfast", overnight: "Turmi" },
      { day: 8, title: "Hamer + Evangadi", description: "Full day with Hamer.", meals: "Breakfast", overnight: "Turmi" },
      { day: 9, title: "Karo + Dassanech", description: "Korcho and Omorate.", meals: "Breakfast", overnight: "Turmi" },
      { day: 10, title: "Turmi → Key Afer market → Arba Minch", description: "Bana and Tsemay at market.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 11, title: "Arba Minch → Awasa", description: "Drive back up the Rift.", meals: "Breakfast", overnight: "Awasa" },
      { day: 12, title: "Awasa → Addis Ababa", description: "Return through Debre Zeit crater lakes.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Ziway", "Awasa", "Bale edge", "Arba Minch", "Konso", "Jinka", "Mursi", "Turmi", "Omorate", "Addis Ababa"],
    category: cat(12),
  },
  {
    slug: "21-days-omo-valley-grand-tribes",
    title: "21 Days Omo Valley Grand Tribes",
    duration: "21 Days / 20 Nights",
    durationDays: 21,
    transport: "Private 4WD",
    groupSize: "1–6 people",
    priceFrom: 3590,
    heroImage: "/photos/omo-dassanech.jpg",
    shortDescription:
      "The most thorough Omo Valley exploration available — every accessible tribe, every major market, multiple bush camps.",
    overview:
      "A three-week journey designed for documentary photographers, anthropologists, and travellers who want to truly know the lower Omo. Spend nights with Hamer, Mursi, Karo and Nyangatom families, attend every weekly market in the region and travel deep into rarely-visited corners around Lake Turkana's northern shore.",
    highlights: [
      "Multi-night village stays (where permitted)",
      "Every accessible South Omo people",
      "Six or more village markets",
      "Lake Turkana northern shore",
      "Bush camping under Omo Valley stars",
    ],
    itinerary: [
      { day: 1, title: "Addis Ababa arrival", description: "City orientation and welcome briefing.", meals: "—", overnight: "Addis Ababa" },
      { day: 2, title: "Addis → Arba Minch", description: "Travel south.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 3, title: "Dorze + Chamo", description: "Highland culture and Crocodile Market.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 4, title: "Arba Minch → Jinka", description: "Konso terraces.", meals: "Breakfast", overnight: "Jinka" },
      { day: 5, title: "Mursi day", description: "Full day with Mursi.", meals: "Breakfast", overnight: "Jinka" },
      { day: 6, title: "Jinka → Turmi", description: "Settle into Hamer base.", meals: "Breakfast", overnight: "Turmi" },
      { day: 7, title: "Hamer day 1", description: "Family visit and Evangadi.", meals: "Breakfast", overnight: "Turmi" },
      { day: 8, title: "Hamer day 2", description: "Bull-jumping if scheduled.", meals: "Breakfast", overnight: "Turmi" },
      { day: 9, title: "Karo extended", description: "Two Karo villages.", meals: "Breakfast", overnight: "Turmi" },
      { day: 10, title: "Nyangatom crossing", description: "Cross the Omo to Nyangatom side.", meals: "Breakfast", overnight: "Kangaten" },
      { day: 11, title: "Bush camp on the Omo", description: "Stars and silence.", meals: "Full board", overnight: "Bush camp" },
      { day: 12, title: "Dassanech + Omorate", description: "Canoe crossing and border villages.", meals: "Breakfast", overnight: "Turmi" },
      { day: 13, title: "Dimeka market", description: "Largest Hamer market.", meals: "Breakfast", overnight: "Turmi" },
      { day: 14, title: "Turmi → Konso", description: "Konso UNESCO villages in depth.", meals: "Breakfast", overnight: "Konso" },
      { day: 15, title: "Konso → Key Afer", description: "Bana and Tsemay.", meals: "Breakfast", overnight: "Jinka" },
      { day: 16, title: "Ari highlands", description: "Coffee, honey and ensete farming.", meals: "Breakfast", overnight: "Jinka" },
      { day: 17, title: "Jinka → Arba Minch", description: "Return drive.", meals: "Breakfast", overnight: "Arba Minch" },
      { day: 18, title: "Arba Minch → Awasa", description: "Rift Valley lakes.", meals: "Breakfast", overnight: "Awasa" },
      { day: 19, title: "Awasa fish market + Debre Zeit", description: "Dawn market and crater lakes.", meals: "Breakfast", overnight: "Debre Zeit" },
      { day: 20, title: "Debre Zeit → Addis", description: "Return to the capital.", meals: "Breakfast", overnight: "Addis Ababa" },
      { day: 21, title: "Departure", description: "Transfer to airport.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Arba Minch", "Jinka", "Mursi", "Turmi", "Karo", "Nyangatom", "Dassanech", "Konso", "Key Afer", "Awasa", "Addis Ababa"],
    category: cat(21),
  },
];

// -------------------- DANAKIL DEPRESSION --------------------
const danakilTours: ExperienceTour[] = [
  {
    slug: "3-days-danakil-erta-ale-express",
    title: "3 Days Danakil Erta Ale Express",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    transport: "Private 4WD Convoy",
    groupSize: "4–10 people",
    priceFrom: 590,
    heroImage: "/photos/danakil-erta-ale.jpg",
    shortDescription:
      "A focused expedition to the lava lake of Erta Ale — one of only a handful of permanent lava lakes on Earth.",
    overview:
      "Three days dedicated to the volcano. Drive from Mekele into the Afar Depression, climb Erta Ale at sunset, sleep on the crater rim and witness molten lava under starlight. This is a serious expedition: heat, altitude and basic conditions in exchange for one of geology's most extraordinary spectacles.",
    highlights: [
      "Overnight on the rim of an active lava lake",
      "Afar caravan and salt-mining encounter",
      "Otherworldly basalt landscapes of the Erta Ale range",
      "Sunset and sunrise viewing of the lava",
      "Local Afar military escort (mandatory for safety)",
    ],
    itinerary: [
      { day: 1, title: "Mekele → Dodom (Erta Ale base)", description: "Drive into the depression. Camel caravan carries gear up the volcano. Sunset hike to the rim and overnight observation of the lava lake.", meals: "Lunch, Dinner", overnight: "Crater rim (basic camp)" },
      { day: 2, title: "Erta Ale → Hamadela", description: "Sunrise at the lava lake, descent to base camp, drive to Hamadela near the salt flats.", meals: "Breakfast, Lunch, Dinner", overnight: "Hamadela (basic camp)" },
      { day: 3, title: "Dallol, Lake Asale → Mekele", description: "Visit the surreal Dallol sulphur fields and the white salt flats of Lake Asale, witness Afar salt miners at work, then return to Mekele.", meals: "Breakfast, Lunch", overnight: "—" },
    ],
    route: ["Mekele", "Dodom", "Erta Ale", "Hamadela", "Dallol", "Lake Asale", "Mekele"],
    category: cat(3),
  },
  {
    slug: "4-days-danakil-erta-ale-dallol",
    title: "4 Days Danakil — Erta Ale + Dallol Complete",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    transport: "Private 4WD Convoy",
    groupSize: "4–10 people",
    priceFrom: 790,
    heroImage: "/photos/danakil-dallol.jpg",
    shortDescription:
      "The most popular Danakil itinerary: the lava lake plus a full day at Dallol's psychedelic geothermal fields.",
    overview:
      "Four days lets you do Danakil right — without rushing Dallol and without skipping the lava lake. You'll have time to genuinely sit with the volcano, photograph the salt caravans crossing Lake Asale, and explore the alien colours of Dallol at the best light.",
    highlights: [
      "Erta Ale lava lake with overnight on the rim",
      "Dallol sulphur springs, salt towers and acidic pools",
      "Lake Asale salt flats and camel caravans",
      "Black Mountain and Ragad salt-mining village",
      "Wukro & Mekele return through Tigray",
    ],
    itinerary: [
      { day: 1, title: "Mekele → Erta Ale base camp → crater rim", description: "Long drive in, camel-supported ascent and overnight on the rim.", meals: "Lunch, Dinner", overnight: "Crater rim" },
      { day: 2, title: "Descent → Hamadela", description: "Sunrise lava viewing, descent and crossing to Hamadela.", meals: "Breakfast, Lunch, Dinner", overnight: "Hamadela" },
      { day: 3, title: "Dallol full day", description: "Sunrise at Dallol's geothermal field, salt caravans on Lake Asale, Black Mountain and Ragad.", meals: "Breakfast, Lunch, Dinner", overnight: "Hamadela" },
      { day: 4, title: "Hamadela → Mekele", description: "Return drive via Berhale.", meals: "Breakfast, Lunch", overnight: "—" },
    ],
    route: ["Mekele", "Erta Ale", "Hamadela", "Dallol", "Lake Asale", "Black Mountain", "Mekele"],
    category: cat(4),
  },
  {
    slug: "6-days-danakil-tigray-rock-churches",
    title: "6 Days Danakil + Tigray Rock Churches",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    transport: "Private 4WD",
    groupSize: "2–8 people",
    priceFrom: 1290,
    heroImage: "/photos/tigray-abuna-yemata.jpg",
    shortDescription:
      "Combine the otherworldly Danakil with the cliff-top rock churches of Tigray — Abuna Yemata, Wukro and Gheralta.",
    overview:
      "Pair the lowest place in Africa with some of the highest — the rock-hewn churches carved into the Gheralta sandstone cliffs. After the heat of Danakil, this trip cools off in the Tigray highlands with hikes to ancient monastic churches reachable only by handhold climbs.",
    highlights: [
      "Full Danakil 4-day program",
      "Abuna Yemata Guh cliff church hike",
      "Wukro Cherkos rock-hewn church",
      "Gheralta Mountains scenery",
      "Mekele's salt market origins",
    ],
    itinerary: [
      { day: 1, title: "Mekele → Erta Ale", description: "Drive and ascent to the rim.", meals: "Lunch, Dinner", overnight: "Crater rim" },
      { day: 2, title: "Erta Ale → Hamadela", description: "Lava lake at dawn, cross the depression.", meals: "Breakfast, Lunch, Dinner", overnight: "Hamadela" },
      { day: 3, title: "Dallol + Lake Asale", description: "Geothermal field and salt caravans.", meals: "Breakfast, Lunch, Dinner", overnight: "Hamadela" },
      { day: 4, title: "Hamadela → Mekele → Gheralta", description: "Return to the highlands.", meals: "Breakfast", overnight: "Gheralta" },
      { day: 5, title: "Abuna Yemata Guh + Maryam Korkor", description: "Cliff church hikes.", meals: "Breakfast", overnight: "Gheralta" },
      { day: 6, title: "Wukro Cherkos → Mekele departure", description: "One last rock church and onward flight.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Mekele", "Erta Ale", "Hamadela", "Dallol", "Gheralta", "Abuna Yemata", "Wukro", "Mekele"],
    category: cat(6),
  },
];

// -------------------- SIMIEN MOUNTAINS TREKKING --------------------
const simienTours: ExperienceTour[] = [
  {
    slug: "2-days-simien-day-trek",
    title: "2 Days Simien Mountains Day Trek",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    transport: "4WD + Trekking",
    groupSize: "1–10 people",
    priceFrom: 290,
    heroImage: "/photos/simien-geladas.jpg",
    shortDescription:
      "A taste of the Simien Mountains in two days — Sankaber escarpment, gelada baboons and the Jinbar waterfall view.",
    overview:
      "For travellers based in Gondar with limited time. Drive into the park, trek along the escarpment for spectacular views of the Simien massif, sit with troops of gelada baboons (only found in Ethiopia) and visit the view over Jinbar Waterfall before returning.",
    highlights: [
      "Gelada baboon troops at close range",
      "Sankaber escarpment views",
      "Jinbar Waterfall viewpoint",
      "Park ranger and scout",
      "Lodge overnight inside the park",
    ],
    itinerary: [
      { day: 1, title: "Gondar → Debark → Sankaber trek", description: "Drive to Debark, register at park HQ, trek along the escarpment to Sankaber.", meals: "Breakfast, Lunch, Dinner", overnight: "Simien Lodge / Sankaber camp" },
      { day: 2, title: "Sankaber → Jinbar viewpoint → Gondar", description: "Morning trek to Jinbar viewpoint with gelada encounters, return to Debark and back to Gondar.", meals: "Breakfast, Lunch", overnight: "—" },
    ],
    route: ["Gondar", "Debark", "Sankaber", "Jinbar", "Gondar"],
    category: cat(2),
  },
  {
    slug: "4-days-simien-classic-trek",
    title: "4 Days Simien Classic Trek (Sankaber → Geech → Chenek)",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    transport: "4WD + Trekking",
    groupSize: "1–10 people",
    priceFrom: 590,
    heroImage: "/photos/simien-imet-gogo.jpg",
    shortDescription:
      "The signature Simien traverse — Sankaber, Geech, Imet Gogo viewpoint and Chenek, all in four manageable days.",
    overview:
      "The most popular Simien trek for good reason: in four days you cross the heart of the high Simien, sleep at three different camps, summit Imet Gogo for one of Africa's great views and have good chances of seeing both gelada baboons and the endemic Walia ibex.",
    highlights: [
      "Imet Gogo viewpoint (3,925 m)",
      "Geech Abyss & Jinbar Waterfall",
      "Walia ibex at Chenek",
      "Three different camping/lodge nights",
      "Pack mules carry your gear",
    ],
    itinerary: [
      { day: 1, title: "Gondar → Debark → Sankaber", description: "Drive to park HQ, trek to Sankaber camp (3,250m).", meals: "Breakfast, Lunch, Dinner", overnight: "Sankaber" },
      { day: 2, title: "Sankaber → Geech (Imet Gogo)", description: "Trek to Geech via Jinbar Waterfall, side trip up Imet Gogo at 3,925m.", meals: "Breakfast, Lunch, Dinner", overnight: "Geech" },
      { day: 3, title: "Geech → Chenek", description: "Trek along escarpment to Chenek (3,620m), prime Walia ibex country.", meals: "Breakfast, Lunch, Dinner", overnight: "Chenek" },
      { day: 4, title: "Chenek → Bwahit shoulder → Gondar", description: "Optional morning hike to the Bwahit shoulder, then 4WD back to Gondar.", meals: "Breakfast, Lunch", overnight: "—" },
    ],
    route: ["Gondar", "Debark", "Sankaber", "Geech", "Imet Gogo", "Chenek", "Gondar"],
    category: cat(4),
  },
  {
    slug: "8-days-simien-ras-dashen-summit",
    title: "8 Days Simien with Ras Dashen Summit",
    duration: "8 Days / 7 Nights",
    durationDays: 8,
    transport: "4WD + Trekking",
    groupSize: "1–8 people",
    priceFrom: 1290,
    heroImage: "/photos/simien-ras-dashen.jpg",
    shortDescription:
      "Trek the full Simien traverse and summit Ras Dashen (4,550m), Ethiopia's highest peak and Africa's 10th highest.",
    overview:
      "An eight-day expedition for fit trekkers. You'll cross the entire Simien plateau west-to-east, descend into the Mesheha valley and ascend Ras Dashen at sunrise. Acclimatisation is built in; pack mules handle gear; cook and scout join the team.",
    highlights: [
      "Summit Ras Dashen at 4,550m",
      "Imet Gogo, Inyatye and Bwahit en route",
      "Walia ibex, gelada and Ethiopian wolf possible",
      "Mesheha valley village contact",
      "Full pack-mule support",
    ],
    itinerary: [
      { day: 1, title: "Gondar → Sankaber", description: "Acclimatisation trek.", meals: "Breakfast, Lunch, Dinner", overnight: "Sankaber" },
      { day: 2, title: "Sankaber → Geech via Imet Gogo", description: "First major viewpoint.", meals: "B/L/D", overnight: "Geech" },
      { day: 3, title: "Geech → Chenek via Inyatye", description: "High plateau day.", meals: "B/L/D", overnight: "Chenek" },
      { day: 4, title: "Chenek → Ambiko via Bwahit pass", description: "Cross Bwahit pass (4,200m) and descend to Mesheha valley.", meals: "B/L/D", overnight: "Ambiko" },
      { day: 5, title: "Ras Dashen summit & return to Ambiko", description: "Pre-dawn start for the summit (4,550m).", meals: "B/L/D", overnight: "Ambiko" },
      { day: 6, title: "Ambiko → Chenek", description: "Re-cross the pass.", meals: "B/L/D", overnight: "Chenek" },
      { day: 7, title: "Chenek → Sankaber", description: "Reverse trek with new viewpoints.", meals: "B/L/D", overnight: "Sankaber" },
      { day: 8, title: "Sankaber → Debark → Gondar", description: "Trek out and drive back.", meals: "Breakfast, Lunch", overnight: "—" },
    ],
    route: ["Gondar", "Sankaber", "Geech", "Chenek", "Ambiko", "Ras Dashen", "Chenek", "Sankaber", "Gondar"],
    category: cat(8),
  },
];

// -------------------- BALE & SOUTH HIGHLANDS --------------------
const baleTours: ExperienceTour[] = [
  {
    slug: "3-days-bale-mountains-wolves",
    title: "3 Days Bale Mountains & Ethiopian Wolves",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    transport: "Private 4WD",
    groupSize: "1–6 people",
    priceFrom: 590,
    heroImage: "/photos/bale-wolf.jpg",
    shortDescription:
      "Track the rarest canid on Earth across the Sanetti Plateau and explore the mossy Harenna forest.",
    overview:
      "Bale Mountains National Park hosts the largest population of the endangered Ethiopian wolf. This compact trip drives across the Sanetti Plateau (over 4,000m) for prime wolf spotting, descends through the cloud forest of Harenna and returns via the gorgeous Bale Highlands.",
    highlights: [
      "Ethiopian wolf tracking on Sanetti Plateau",
      "Harenna cloud forest descent",
      "Endemic Mountain Nyala and Menelik's bushbuck",
      "Tullu Dimtu — Africa's 2nd highest road pass",
      "Dinsho park HQ wildlife walk",
    ],
    itinerary: [
      { day: 1, title: "Addis → Bale (Goba/Dinsho)", description: "Long drive south to Bale through Awasa.", meals: "Breakfast", overnight: "Goba" },
      { day: 2, title: "Sanetti Plateau + Harenna Forest", description: "Full day in the park: wolves, plateau and forest descent.", meals: "Breakfast", overnight: "Goba" },
      { day: 3, title: "Goba → Addis Ababa", description: "Return drive with optional Sof Omar cave detour.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Awasa", "Goba", "Sanetti", "Harenna", "Goba", "Addis Ababa"],
    category: cat(3),
  },
  {
    slug: "5-days-bale-and-rift-valley",
    title: "5 Days Bale Mountains + Rift Valley Lakes",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    transport: "Private 4WD",
    groupSize: "1–6 people",
    priceFrom: 890,
    heroImage: "/photos/bale-sanetti.jpg",
    shortDescription:
      "Wolf-tracking in Bale plus the birds of the Rift Valley lakes and the hot springs of Wondo Genet.",
    overview:
      "A relaxed five-day loop south of Addis. After Bale's wolves and forests, descend back to the Rift to bird-watch at Lake Ziway, Awasa and Abijatta-Shalla, and soak in Wondo Genet's hot springs.",
    highlights: [
      "Ethiopian wolf and Mountain Nyala",
      "Wondo Genet hot springs",
      "Awasa fish market at dawn",
      "Abijatta-Shalla birding",
      "Crater lakes around Debre Zeit",
    ],
    itinerary: [
      { day: 1, title: "Addis → Lake Langano", description: "Rift Valley drive.", meals: "Breakfast", overnight: "Langano" },
      { day: 2, title: "Langano → Goba", description: "Awasa fish market, onward to Bale.", meals: "Breakfast", overnight: "Goba" },
      { day: 3, title: "Sanetti + Harenna", description: "Full park day.", meals: "Breakfast", overnight: "Goba" },
      { day: 4, title: "Goba → Wondo Genet", description: "Hot springs and forest birds.", meals: "Breakfast", overnight: "Wondo Genet" },
      { day: 5, title: "Wondo Genet → Addis", description: "Return via Debre Zeit crater lakes.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Langano", "Goba", "Sanetti", "Wondo Genet", "Debre Zeit", "Addis Ababa"],
    category: cat(5),
  },
];

// -------------------- HARAR & EAST --------------------
const hararTours: ExperienceTour[] = [
  {
    slug: "2-days-harar-walled-city",
    title: "2 Days Harar Walled City & Hyena Feeding",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    transport: "Flight + Local Walking",
    groupSize: "1–8 people",
    priceFrom: 390,
    heroImage: "/photos/harar-walls.jpg",
    shortDescription:
      "Ethiopia's 4th holy city of Islam — narrow alleys, 82 mosques and the famous hyena man at night.",
    overview:
      "Fly east to the millennium-old walled city of Harar (UNESCO). Walk its five gates and labyrinthine alleys with a local guide, visit Rimbaud's house, eat injera with a Harari family and finish the night watching the legendary Hyena Men feed wild hyenas by hand outside the city walls.",
    highlights: [
      "UNESCO walled old city of Jugol",
      "Five historic gates and 82 mosques",
      "Rimbaud's house museum",
      "Hyena Man feeding ceremony at night",
      "Traditional Harari home visit",
    ],
    itinerary: [
      { day: 1, title: "Addis → Dire Dawa → Harar", description: "Morning flight to Dire Dawa, transfer to Harar, walking tour of Jugol.", meals: "Breakfast", overnight: "Harar" },
      { day: 2, title: "Harar markets + Hyena feeding → Addis", description: "Morning markets and museums, sunset hyena feeding, evening flight back.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Dire Dawa", "Harar", "Addis Ababa"],
    category: cat(2),
  },
  {
    slug: "4-days-harar-awash-eastern-loop",
    title: "4 Days Harar + Awash National Park Eastern Loop",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    transport: "Private 4WD",
    groupSize: "1–8 people",
    priceFrom: 790,
    heroImage: "/photos/awash-falls.jpg",
    shortDescription:
      "Combine the cultural fortress of Harar with the volcanic landscapes and wildlife of Awash National Park.",
    overview:
      "A four-day eastern loop. Drive (or fly + drive) east via Awash National Park, where the Awash River plunges into a basalt gorge and Oryx, Soemmerring's gazelle and baboons share the savanna. Continue to Harar for its old city and hyena feeding, then return via the colourful chat (qat) markets of Aweday.",
    highlights: [
      "Awash Falls and basalt gorge",
      "Hot springs at Filwoha (seasonal)",
      "Beisa Oryx and Soemmerring's gazelle",
      "Harar's UNESCO old city",
      "Hyena Man at night",
    ],
    itinerary: [
      { day: 1, title: "Addis → Awash NP", description: "Drive east; afternoon Awash Falls and gorge.", meals: "Breakfast", overnight: "Awash" },
      { day: 2, title: "Awash → Harar", description: "Morning game drive, continue to Harar.", meals: "Breakfast", overnight: "Harar" },
      { day: 3, title: "Harar full day + Hyena Men", description: "Walled city, markets, sunset hyena feeding.", meals: "Breakfast", overnight: "Harar" },
      { day: 4, title: "Harar → Dire Dawa → Addis", description: "Return via Aweday chat market.", meals: "Breakfast", overnight: "—" },
    ],
    route: ["Addis Ababa", "Awash NP", "Harar", "Dire Dawa", "Addis Ababa"],
    category: cat(4),
  },
];

// -------------------- COMBINED GRAND TOURS --------------------
const grandTours: ExperienceTour[] = [
  {
    slug: "14-days-historic-north-omo-combined",
    title: "14 Days Historic North + Omo Valley Combined",
    duration: "14 Days / 13 Nights",
    durationDays: 14,
    transport: "Flight + Private 4WD",
    groupSize: "2–8 people",
    priceFrom: 2490,
    heroImage: "/photos/lalibela-bete-giyorgis.jpg",
    shortDescription:
      "Ethiopia's two great journeys in one trip — the Christian historic route and the cultural mosaic of the lower Omo.",
    overview:
      "Most travellers wish they could do both the famous north and the Omo Valley. Two weeks makes it possible. Fly the historic route — Bahir Dar, Gondar, Lalibela, Axum — then drive south for the core Omo tribal circuit.",
    highlights: [
      "Lake Tana monasteries and Blue Nile Falls",
      "Gondar's Royal Enclosure",
      "Lalibela's rock-hewn churches",
      "Axum stelae and Queen of Sheba",
      "Hamer, Mursi, Karo and Dassanech",
    ],
    itinerary: [
      { day: 1, title: "Addis Ababa arrival", description: "City tour and welcome.", meals: "—", overnight: "Addis" },
      { day: 2, title: "Addis → Bahir Dar", description: "Fly; Lake Tana boat to Ura Kidane Mehret.", meals: "B", overnight: "Bahir Dar" },
      { day: 3, title: "Blue Nile Falls → Gondar", description: "Falls and drive.", meals: "B", overnight: "Gondar" },
      { day: 4, title: "Gondar city → Lalibela", description: "Royal Enclosure, Debre Berhan Selassie, flight.", meals: "B", overnight: "Lalibela" },
      { day: 5, title: "Lalibela churches day 1", description: "Northern cluster.", meals: "B", overnight: "Lalibela" },
      { day: 6, title: "Lalibela churches day 2 + Axum", description: "Southeastern cluster, Bete Giyorgis, flight to Axum.", meals: "B", overnight: "Axum" },
      { day: 7, title: "Axum → Addis", description: "Stelae, tombs, Queen of Sheba bath; afternoon flight.", meals: "B", overnight: "Addis" },
      { day: 8, title: "Addis → Arba Minch", description: "Fly south.", meals: "B", overnight: "Arba Minch" },
      { day: 9, title: "Dorze + Chamo", description: "Highland weavers and Crocodile Market.", meals: "B", overnight: "Arba Minch" },
      { day: 10, title: "Arba Minch → Jinka", description: "Konso UNESCO terraces.", meals: "B", overnight: "Jinka" },
      { day: 11, title: "Mursi → Turmi", description: "Mago NP, onward to Hamer country.", meals: "B", overnight: "Turmi" },
      { day: 12, title: "Karo + Dassanech", description: "Korcho and Omorate.", meals: "B", overnight: "Turmi" },
      { day: 13, title: "Hamer market → Arba Minch", description: "Dimeka/Turmi and return.", meals: "B", overnight: "Arba Minch" },
      { day: 14, title: "Arba Minch → Addis → departure", description: "Flight back and onward.", meals: "B", overnight: "—" },
    ],
    route: ["Addis", "Bahir Dar", "Gondar", "Lalibela", "Axum", "Arba Minch", "Jinka", "Turmi", "Addis"],
    category: cat(14),
  },
  {
    slug: "18-days-historic-north-omo-danakil",
    title: "18 Days Historic North + Omo + Danakil",
    duration: "18 Days / 17 Nights",
    durationDays: 18,
    transport: "Flight + Private 4WD",
    groupSize: "2–6 people",
    priceFrom: 3290,
    heroImage: "/photos/danakil-erta-ale.jpg",
    shortDescription:
      "The full Ethiopian triple-header — northern Christian heritage, Omo Valley tribes and the Danakil Depression.",
    overview:
      "Three weeks minus a few days for travellers who want it all. This trip combines the historic north, the Omo, and a Danakil expedition into one logistically tight but breathtaking itinerary.",
    highlights: [
      "Full historic route (Bahir Dar, Gondar, Lalibela, Axum)",
      "Erta Ale lava lake + Dallol",
      "Core Omo Valley peoples",
      "Multiple internal flights to save days",
      "All transfers, guides and permits included",
    ],
    itinerary: [
      { day: 1, title: "Addis arrival", description: "Welcome.", meals: "—", overnight: "Addis" },
      { day: 2, title: "Addis → Bahir Dar", description: "Tana boat.", meals: "B", overnight: "Bahir Dar" },
      { day: 3, title: "Blue Nile Falls → Gondar", description: "Drive.", meals: "B", overnight: "Gondar" },
      { day: 4, title: "Gondar → Simien day", description: "Sankaber escarpment.", meals: "B", overnight: "Gondar" },
      { day: 5, title: "Gondar → Lalibela", description: "Flight.", meals: "B", overnight: "Lalibela" },
      { day: 6, title: "Lalibela churches full day", description: "Both clusters.", meals: "B", overnight: "Lalibela" },
      { day: 7, title: "Lalibela → Axum", description: "Stelae and tombs.", meals: "B", overnight: "Axum" },
      { day: 8, title: "Axum → Mekele", description: "Flight south to Danakil gateway.", meals: "B", overnight: "Mekele" },
      { day: 9, title: "Mekele → Erta Ale", description: "Lava lake ascent.", meals: "L,D", overnight: "Crater rim" },
      { day: 10, title: "Erta Ale → Hamadela", description: "Cross depression.", meals: "B,L,D", overnight: "Hamadela" },
      { day: 11, title: "Dallol + Lake Asale → Mekele → Addis", description: "Geothermal field, return flight.", meals: "B,L", overnight: "Addis" },
      { day: 12, title: "Addis → Arba Minch", description: "Fly south.", meals: "B", overnight: "Arba Minch" },
      { day: 13, title: "Dorze + Chamo", description: "Highland and lake.", meals: "B", overnight: "Arba Minch" },
      { day: 14, title: "Arba Minch → Jinka", description: "Konso.", meals: "B", overnight: "Jinka" },
      { day: 15, title: "Mursi → Turmi", description: "Mago NP.", meals: "B", overnight: "Turmi" },
      { day: 16, title: "Karo + Dassanech", description: "Omorate.", meals: "B", overnight: "Turmi" },
      { day: 17, title: "Turmi → Arba Minch", description: "Market en route.", meals: "B", overnight: "Arba Minch" },
      { day: 18, title: "Arba Minch → Addis → departure", description: "Return.", meals: "B", overnight: "—" },
    ],
    route: ["Addis", "Bahir Dar", "Gondar", "Lalibela", "Axum", "Mekele", "Danakil", "Arba Minch", "Omo", "Addis"],
    category: cat(18),
  },
  {
    slug: "25-days-ultimate-ethiopia",
    title: "25 Days Ultimate Ethiopia",
    duration: "25 Days / 24 Nights",
    durationDays: 25,
    transport: "Flight + Private 4WD",
    groupSize: "2–6 people",
    priceFrom: 4490,
    heroImage: "/photos/ethiopia-grand.jpg",
    shortDescription:
      "Our most complete program — North, South, East and Danakil with no rush, no skipped highlights.",
    overview:
      "Twenty-five days of Ethiopia at the right pace. Includes everything in the 18-day combo plus Harar in the east, the Bale Mountains in the south, and additional days in the Simien and Omo for genuine immersion. Designed for travellers with the time to do Ethiopia properly.",
    highlights: [
      "Historic route at unhurried pace",
      "Simien 3-day trek",
      "Full 4-day Danakil expedition",
      "Bale Mountains + Ethiopian wolves",
      "Harar walled city + hyena men",
      "Extended Omo Valley circuit",
    ],
    itinerary: Array.from({ length: 25 }, (_, i) => ({
      day: i + 1,
      title: [
        "Addis Ababa arrival & city tour",
        "Addis → Bahir Dar (Lake Tana)",
        "Blue Nile Falls → Gondar",
        "Gondar Royal Enclosure",
        "Simien Mountains day 1 (Sankaber)",
        "Simien day 2 (Geech + Imet Gogo)",
        "Simien day 3 + return Gondar",
        "Gondar → Lalibela",
        "Lalibela churches day 1",
        "Lalibela churches day 2",
        "Lalibela → Axum",
        "Axum → Mekele",
        "Mekele → Erta Ale ascent",
        "Erta Ale → Hamadela",
        "Dallol + Lake Asale",
        "Hamadela → Mekele → Addis",
        "Addis → Harar (fly)",
        "Harar walled city + Hyena Men",
        "Harar → Addis → Bale (Goba)",
        "Sanetti Plateau + Harenna Forest",
        "Goba → Arba Minch",
        "Dorze + Chamo",
        "Arba Minch → Jinka → Mursi",
        "Mursi → Turmi (Hamer)",
        "Karo + Dassanech → Arba Minch → Addis departure",
      ][i],
      description:
        "Detailed program shared on booking. Day paced for genuine experience, not just transit.",
      meals: "Breakfast",
      overnight: "Per program",
    })),
    route: ["Addis", "Bahir Dar", "Gondar", "Simien", "Lalibela", "Axum", "Mekele", "Danakil", "Harar", "Bale", "Omo", "Addis"],
    category: cat(25),
  },
];

export const experienceCategories: Record<string, ExperienceCategory> = {
  "omo-valley": {
    slug: "omo-valley",
    label: "Southern Omo Valley",
    region: "South Omo",
    heroImage: "/photos/omo-hamer.jpg",
    tagline: "Hamer, Mursi, Karo, Dassanech — Africa's most culturally dense region",
    intro:
      "South Omo is home to more than a dozen culturally distinct peoples living in close proximity along the Omo River. Our Omo Valley tours move at a respectful pace — meeting families, attending weekly markets and travelling with guides who speak the local languages.",
    seoTitle: "Omo Valley Tours — Hamer, Mursi, Karo, Dassanech | Ethiopia Travel Explorer",
    seoDescription:
      "Cultural tours of the lower Omo Valley. Visit Hamer, Mursi, Karo, Dassanech and Nyangatom peoples. 4 to 21-day expert-led tribal tours.",
    tours: omoTours,
  },
  "danakil-depression": {
    slug: "danakil-depression",
    label: "Danakil Depression",
    region: "Afar",
    heroImage: "/photos/danakil-erta-ale.jpg",
    tagline: "Lava lake of Erta Ale, sulphur fields of Dallol, salt caravans of Lake Asale",
    intro:
      "The Danakil is one of the most geologically extreme places on Earth — and one of the most visually arresting. Expedition-style tours with mandatory Afar military escort, basic camping and unforgettable rewards.",
    seoTitle: "Danakil Depression Tours — Erta Ale Lava Lake & Dallol | Ethiopia Travel Explorer",
    seoDescription:
      "Expedition tours to the Danakil Depression. Overnight on the Erta Ale lava lake, explore the geothermal fields of Dallol and salt caravans of Lake Asale.",
    tours: danakilTours,
  },
  "simien-trekking": {
    slug: "simien-trekking",
    label: "Simien Mountains Trekking",
    region: "Amhara",
    heroImage: "/photos/simien-imet-gogo.jpg",
    tagline: "The 'Roof of Africa' — gelada baboons, Walia ibex and Ras Dashen at 4,550m",
    intro:
      "From two-day tasters to eight-day Ras Dashen summits, our Simien treks are fully supported by pack mules, cooks and licensed scouts. UNESCO World Heritage and one of Africa's great trekking destinations.",
    seoTitle: "Simien Mountains Trekking Tours — Ras Dashen & Imet Gogo | Ethiopia Travel Explorer",
    seoDescription:
      "Guided Simien Mountains treks from 2 to 8 days. Imet Gogo viewpoint, Ras Dashen summit, gelada baboons and Walia ibex. Full mule and scout support.",
    tours: simienTours,
  },
  "bale-highlands": {
    slug: "bale-highlands",
    label: "Bale Mountains & Highlands",
    region: "Oromia",
    heroImage: "/photos/bale-sanetti.jpg",
    tagline: "Ethiopian wolves on the Sanetti Plateau, cloud forest of Harenna",
    intro:
      "Bale Mountains National Park is the best place on Earth to see the endangered Ethiopian wolf, the rarest canid alive. Add Mountain Nyala, cloud forest and Africa's second-highest road pass.",
    seoTitle: "Bale Mountains Tours — Ethiopian Wolf & Sanetti Plateau | Ethiopia Travel Explorer",
    seoDescription:
      "Bale Mountains tours focused on the endangered Ethiopian wolf, Sanetti Plateau and Harenna cloud forest. 3 to 5-day itineraries from Addis Ababa.",
    tours: baleTours,
  },
  "harar-eastern": {
    slug: "harar-eastern",
    label: "Harar & Eastern Ethiopia",
    region: "Eastern Ethiopia",
    heroImage: "/photos/harar-walls.jpg",
    tagline: "UNESCO walled city, 82 mosques, and the legendary hyena men",
    intro:
      "Harar is Islam's fourth holiest city, a labyrinth of pastel-coloured alleys inside a thousand-year-old wall. Pair it with Awash National Park or Dire Dawa for a complete eastern circuit.",
    seoTitle: "Harar Tours — Walled City & Hyena Feeding | Ethiopia Travel Explorer",
    seoDescription:
      "Tours to the UNESCO-listed walled city of Harar, including the famous hyena feeding ceremony and Awash National Park combinations.",
    tours: hararTours,
  },
  "grand-combined": {
    slug: "grand-combined",
    label: "Grand Combined Tours",
    region: "All Ethiopia",
    heroImage: "/photos/ethiopia-grand.jpg",
    tagline: "North + South + East — Ethiopia's greatest hits in one journey",
    intro:
      "When one region isn't enough. These multi-week journeys combine the historic north, Omo Valley, Danakil and beyond — all in one carefully sequenced itinerary with internal flights to minimise overland fatigue.",
    seoTitle: "Combined Ethiopia Grand Tours — North + Omo + Danakil | Ethiopia Travel Explorer",
    seoDescription:
      "Multi-week combined Ethiopia tours: historic north, Omo Valley tribes, Danakil Depression and more in one expertly planned itinerary.",
    tours: grandTours,
  },
};

export const getCategory = (slug: string): ExperienceCategory | undefined =>
  experienceCategories[slug];

export const getCategoryTour = (
  catSlug: string,
  tourSlug: string,
): ExperienceTour | undefined =>
  experienceCategories[catSlug]?.tours.find((t) => t.slug === tourSlug);

export const allCategorySlugs = Object.keys(experienceCategories);
