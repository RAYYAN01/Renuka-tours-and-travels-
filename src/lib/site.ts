// Placeholder business details — replace with real details before launch.
export const site = {
  name: "Renuka Tours & Travels",
  shortName: "Renuka Travels",
  tagline: "Journeys, Chauffeured to Perfection",
  description:
    "Premium self-drive and chauffeur-driven car rentals, tempo travellers and coaches for outstation trips, airport transfers, weddings, corporate travel and pilgrimage tours.",
  phone: "+91 95133 30099",
  phoneRaw: "+919513330099",
  whatsapp: "+919513330099",
  email: "bookings@renukatravels.example",
  address: {
    line1: "12, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560001",
    country: "India",
  },
  hours: "Available 24 × 7",
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
