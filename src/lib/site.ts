export const site = {
  name: "Renuka Tours & Travels",
  shortName: "Renuka Travels",
  tagline: "Journeys, Chauffeured to Perfection",
  description:
    "Premium chauffeur-driven car rentals, tempo travellers and coaches for outstation trips, airport transfers, weddings, corporate travel and pilgrimage tours.",
  phone: "+91 95133 30099",
  phoneRaw: "+919513330099",
  whatsapp: "+919513330099",
  email: "renukatourstravels01@gmail.com",
  address: {
    line1: "97/3, First Floor, Veerappa Compound, 14 E Acres, Nagavarapalya, CV Raman Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560093",
    country: "India",
  },
  hours: "Available 24 × 7",
  // Social links are still placeholders — swap in real profile URLs when available.
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  founded: 2011,
} as const;

export const whatsappHref = (message = "Hi, I'd like to enquire about a booking.") =>
  `https://wa.me/${site.whatsapp.replace("+", "")}?text=${encodeURIComponent(message)}`;

export const telHref = `tel:${site.phoneRaw}`;
