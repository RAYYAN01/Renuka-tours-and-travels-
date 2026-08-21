interface FAQItem {
  question: string;
  answer: string;
}

// Written as direct question/answer pairs on purpose — this is the content
// search engines lift into featured snippets and AI answer engines (ChatGPT,
// Perplexity, Google AI Overviews) quote directly when asked about us.
export const faqs: FAQItem[] = [
  {
    question: "How is pricing calculated for outstation trips?",
    answer:
      "Outstation trips are billed per kilometre, starting from ₹11/km for a sedan. Tolls, driver allowance and any interstate permit charges are shown upfront before you confirm — there's no surge pricing, ever.",
  },
  {
    question: "Do your vehicles come with a driver?",
    answer:
      "Yes, every vehicle in the fleet is chauffeur-driven by a verified, background-checked driver — we don't offer self-drive/unchauffeured rentals.",
  },
  {
    question: "What types of vehicles do you have?",
    answer:
      "The fleet spans five categories: sedans (4-seater), SUVs (7-seater), tempo travellers (12–17 seater), luxury vans (12–17 seater) and mini coaches (26–35 seater) — so there's a fit whether it's a solo airport run or a 35-person pilgrimage group.",
  },
  {
    question: "How do I book a ride?",
    answer:
      "Use the search bar on the homepage or the booking form to share your pickup, destination, date and passenger count. Our team confirms the vehicle, price and pickup time by phone or WhatsApp, usually within the hour.",
  },
  {
    question: "Which cities and routes do you cover?",
    answer:
      "We're based in Bengaluru and cover local city travel plus outstation trips across South India, including popular routes to Mysuru, Coorg, Ooty, Hampi, Tirupati, Goa, Wayanad, Kodaikanal and Munnar.",
  },
  {
    question: "Is airport pickup tracked against my flight?",
    answer:
      "Yes. Airport transfers include live flight tracking and free waiting time if your flight is delayed, so a late landing never means a missed ride.",
  },
  {
    question: "Are your vehicles insured and drivers verified?",
    answer:
      "Every vehicle carries valid insurance covering passengers and third parties, and every driver goes through background checks, licence validation and an in-person interview before joining the fleet.",
  },
  {
    question: "Can I book for a corporate account or a wedding?",
    answer:
      "Yes — corporate travel is available with monthly billing and a dedicated account manager, and wedding transport includes fleet decoration on request plus multi-vehicle coordination for multi-day functions.",
  },
  {
    question: "Which areas within Bengaluru do you pick up from?",
    answer:
      "All of Bengaluru — Whitefield, Electronic City, Koramangala, Indiranagar, HSR Layout, Marathahalli, Sarjapur Road, JP Nagar, Hebbal, Yelahanka, CV Raman Nagar and Kempegowda International Airport included. If it's within city limits, we can pick you up.",
  },
  {
    question: "Do you serve towns near Bengaluru like Hosur, Tumkur or Ramanagara?",
    answer:
      "Yes — beyond city limits, we regularly cover nearby towns including Hosur, Tumkur, Ramanagara, Kolar, Nelamangala and Channapatna, in addition to every outstation route across South India.",
  },
];
