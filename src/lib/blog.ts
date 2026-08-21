export interface BlogSection {
  heading?: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  coverImage: string;
  coverImageAlt: string;
  keywords: string[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-coorg-from-bangalore",
    title: "Best Time to Visit Coorg from Bangalore: A Season-by-Season Guide",
    excerpt:
      "Coorg looks completely different in July than it does in December. Here's when to go depending on whether you want waterfalls, clear viewpoints, or coffee-blossom season.",
    category: "Destination Guide",
    publishedDate: "2026-01-15",
    readingTime: "6 min read",
    coverImage: "/coorg.jpg",
    coverImageAlt: "Misty coffee estate hills in Coorg",
    keywords: [
      "best time to visit Coorg from Bangalore",
      "Coorg weather by month",
      "Coorg monsoon travel",
      "Bangalore to Coorg trip planning",
      "Coorg coffee blossom season",
    ],
    sections: [
      {
        body: [
          "Coorg (Kodagu) is a 5–6 hour drive from Bangalore, and unlike a lot of hill stations, it genuinely rewards visiting in more than one season — the landscape changes character depending on when you go. If you're planning a trip and only have one weekend to spend, here's how to pick the right month.",
        ],
      },
      {
        heading: "October to February: the classic window",
        body: [
          "This is peak season for a reason. The monsoon has cleared, the air is crisp, daytime temperatures sit comfortably between 15–25°C, and every viewpoint — Raja's Seat, Abbey Falls, Mandalpatti — is fully accessible with clear visibility. If this is your first Coorg trip, or you're travelling with family or older parents, this is the safest and most rewarding window.",
          "Expect it to be busier, especially around Christmas and New Year's week — book your stay and vehicle a few weeks ahead if you're travelling in that stretch.",
        ],
      },
      {
        heading: "March to May: quieter, warmer, better for coffee estates",
        body: [
          "Summer in Coorg is mild compared to the plains — daytime highs rarely cross 30°C thanks to the elevation. This is coffee-blossom season: after the first pre-monsoon showers in March/April, coffee plantations bloom in white flowers for a few days, and the whole estate smells like jasmine. It's a narrower, harder-to-time window, but worth it if you're specifically after estate photography.",
        ],
      },
      {
        heading: "June to September: monsoon — waterfalls at their best, but plan around it",
        body: [
          "Coorg gets serious rainfall in monsoon, and several ghat roads can get slippery or landslide-prone in the heaviest weeks (typically July). The upside: Abbey Falls, Iruppu Falls and the Western Ghats greenery are at their most dramatic. If you go in this window, favour early-mid June or September (rain tapering off) over peak July/August, and travel in a higher-clearance vehicle like an SUV rather than a sedan.",
        ],
      },
      {
        heading: "Getting there from Bangalore",
        body: [
          "The drive is around 260 km and takes roughly 6 hours by road, mostly via the NH275 through Mysuru and Hunsur. For a couple or small family, a sedan or SUV covers it comfortably; for a group of 6 or more, a tempo traveller is the more comfortable option given the winding final stretch into the hills.",
        ],
      },
    ],
  },
  {
    slug: "bangalore-to-mysuru-road-trip-guide",
    title: "Bangalore to Mysuru Road Trip: Route, Stops and Travel Tips",
    excerpt:
      "Mysuru is one of the easiest day trips from Bangalore — but a few well-timed stops turn a 3-hour drive into a proper day out. Here's the route, the worthwhile detours, and what to see once you arrive.",
    category: "Destination Guide",
    publishedDate: "2026-02-03",
    readingTime: "5 min read",
    coverImage: "/mysuru.jpg",
    coverImageAlt: "Mysuru Palace grounds",
    keywords: [
      "Bangalore to Mysuru road trip",
      "Bangalore Mysuru route",
      "Mysuru day trip from Bangalore",
      "Mysuru Palace visiting guide",
      "Bangalore to Mysuru distance",
    ],
    sections: [
      {
        body: [
          "At roughly 145 km, Mysuru is the most straightforward outstation trip from Bangalore — a comfortable half-day drive each way, which makes it one of the few destinations on this list you can genuinely do as a single-day round trip without feeling rushed.",
        ],
      },
      {
        heading: "The route",
        body: [
          "Most trips take the Bangalore–Mysuru Expressway (NH275), which cuts the drive to around 3–3.5 hours depending on traffic near the city limits. It's a well-maintained highway with clear signage, making it one of the least stressful outstation drives in South India.",
        ],
      },
      {
        heading: "Worthwhile stops along the way",
        body: [
          "Srirangapatna, about 20 minutes before Mysuru, is an easy detour — Tipu Sultan's summer palace and the Ranganathittu Bird Sanctuary are both right off the highway and pair well with an early start. If you're travelling with kids, Ranganathittu's boat ride (best in the early morning) is genuinely worth the 30-minute stop.",
        ],
      },
      {
        heading: "What to prioritise in Mysuru itself",
        body: [
          "Mysuru Palace is the obvious anchor — arrive either right at opening or in the last two hours before closing to avoid the mid-day crowd crush, and if your trip lands on a Sunday evening, the palace's illumination (lit up after dark) is worth staying for. Beyond the palace, Chamundi Hills, Devaraja Market for local produce and incense, and Brindavan Gardens (better at dusk, when the musical fountain runs) round out a full day comfortably.",
        ],
      },
      {
        heading: "Best vehicle for this trip",
        body: [
          "Given the short distance and good roads, a sedan is genuinely enough for a couple or small family, and it's the most cost-effective choice for this specific route. For a larger group wanting a single-vehicle day trip, an SUV or tempo traveller keeps everyone together for the Ranganathittu stop and palace visit.",
        ],
      },
    ],
  },
  {
    slug: "tirupati-pilgrimage-trip-from-bangalore-guide",
    title: "Planning a Tirupati Pilgrimage Trip from Bangalore: A Practical Guide",
    excerpt:
      "A same-day Tirupati darshan trip from Bangalore is doable, but the timing matters more than almost any other route on this list. Here's how to plan it so you're not standing in a queue at 2am.",
    category: "Pilgrimage",
    publishedDate: "2026-02-20",
    readingTime: "6 min read",
    coverImage: "/tirupati.jpg",
    coverImageAlt: "Temple hills of Tirupati",
    keywords: [
      "Tirupati trip from Bangalore",
      "same day Tirupati darshan from Bangalore",
      "Bangalore to Tirupati taxi",
      "Tirumala darshan booking tips",
      "Tirupati pilgrimage planning",
    ],
    sections: [
      {
        body: [
          "Tirupati is about 255 km from Bangalore — roughly 5.5 hours by road — which puts a same-day darshan trip within reach, but only if the timing is planned around darshan queues rather than just the drive.",
        ],
      },
      {
        heading: "Same-day darshan vs. an overnight trip",
        body: [
          "A same-day trip means leaving Bangalore between 1–2am to reach Tirumala hills by sunrise, join the queue early, and be back on the road by early afternoon. It's tiring but very doable with a chauffeur-driven vehicle, since the driver handles the overnight leg while you rest. An overnight trip — arriving the evening before, staying near Tirumala, and taking an early-morning darshan slot — is the more comfortable option if you're travelling with elderly parents or young children, and it also leaves room for a Sri Kalahasti visit on the way back.",
        ],
      },
      {
        heading: "Darshan slots and SEVA bookings",
        body: [
          "If you can plan more than a few days ahead, booking a Special Entry Darshan (SED) slot online through the TTD website removes almost all of the queue uncertainty. Without a slot, the general queue (Sarvadarshanam) time varies heavily by day and season — weekdays outside of festival periods are noticeably shorter than weekends.",
        ],
      },
      {
        heading: "The drive itself",
        body: [
          "The route runs via Chittoor and is well-maintained for most of the way, with the final climb up the Tirumala ghat road being the only slow, winding stretch — allow extra time for it rather than cutting things close to a booked darshan slot.",
        ],
      },
      {
        heading: "Choosing a vehicle for a group pilgrimage",
        body: [
          "For a family of 4–5, an SUV is comfortable for the overnight drive. For larger group pilgrimages — an extended family or a temple committee trip — a tempo traveller or coach keeps everyone together for the queue and darshan logistics, which matters more here than on a typical sightseeing trip.",
        ],
      },
    ],
  },
  {
    slug: "ooty-vs-coorg-which-hill-station",
    title: "Ooty vs Coorg: Which Hill Station Should You Choose from Bangalore?",
    excerpt:
      "Both are classic weekend hill-station trips from Bangalore, but they're not interchangeable. Here's how to decide based on what you actually want out of the trip.",
    category: "Travel Tips",
    publishedDate: "2026-03-05",
    readingTime: "5 min read",
    coverImage: "/ooty.jpg",
    coverImageAlt: "Tea gardens near Ooty",
    keywords: [
      "Ooty vs Coorg",
      "Ooty or Coorg from Bangalore",
      "which hill station to visit from Bangalore",
      "Coorg vs Ooty comparison",
      "best hill station near Bangalore",
    ],
    sections: [
      {
        body: [
          "Both are roughly the same distance from Bangalore — Coorg around 260 km, Ooty about 270 km — and both take 6–6.5 hours by road, so distance alone won't decide it for you. The real difference is what kind of trip you're after.",
        ],
      },
      {
        heading: "Choose Coorg if you want coffee estates and quieter pace",
        body: [
          "Coorg is more rural and slower-paced — long drives through coffee plantations, small home-stays, waterfalls you often have mostly to yourself outside peak season. It suits a couple's trip or a small family wanting to actually relax rather than sightsee non-stop. It also skips the Bandipur/Mudumalai forest-corridor night driving restriction that affects the Ooty route.",
        ],
      },
      {
        heading: "Choose Ooty if you want a fuller \"hill station\" experience",
        body: [
          "Ooty has more built-out tourist infrastructure — the Nilgiri toy train, Botanical Gardens, Ooty Lake boating, Doddabetta Peak — which makes it a better fit for families with kids or a group wanting a packed multi-day itinerary rather than pure relaxation. Coonoor, 20 minutes away, pairs naturally with an Ooty trip if you want a quieter add-on day.",
        ],
      },
      {
        heading: "One planning detail that catches people out",
        body: [
          "The Bangalore–Ooty route passes through the Bandipur and Mudumalai forest corridor, which enforces a night driving ban (roughly 9pm–6am) for through-traffic. Time your departure so you clear that stretch in daylight — this isn't an issue on the Coorg route.",
        ],
      },
      {
        heading: "Vehicle recommendation for either route",
        body: [
          "Both routes involve winding ghat sections in the final approach, so an SUV rides more comfortably than a sedan for most travellers, and a tempo traveller is the better call for either destination once your group is past 5–6 people.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Newest first — every post has a real publishedDate, so this is a plain
 * chronological sort rather than array source order. */
export function sortBlogPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}
