export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  rating: number;
  year: number;
  pages: number;
  blurb: string;
  description?: string;
  availableCopies?: number;
  waitlist?: number;
};

export const newArrivals: Book[] = [
  {
    id: "tomorrow-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "/covers/tomorrow-tomorrow.jpg",
    genre: "Fiction",
    rating: 4.7,
    year: 2023,
    pages: 416,
    blurb: "Two friends build worlds together in a dazzling story of creativity and love.",
    description:
      "Sadie and Sam are playtesters of each other's lives — paired at a hospital for children, reunited decades later in a Cambridge subway. Told across the games they design, this is a shimmering meditation on friendship, ambition, art, and the shared worlds that outlast us all.",
    availableCopies: 3,
    waitlist: 2,
  },
  {
    id: "piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    cover: "/covers/piranesi.jpg",
    genre: "Fantasy",
    rating: 4.6,
    year: 2022,
    pages: 272,
    blurb: "A labyrinthine house, an endless sea, and a man who records its wonders.",
    description:
      "Piranesi lives in the House — thirteen dead statues, forty halls, and tides that crash through the lower floors twice a day. He keeps meticulous journals of its kindness. Then a message appears in a folded notebook, and the beautiful, odd tranquillity of his world begins to crack.",
    availableCopies: 2,
    waitlist: 5,
  },
  {
    id: "klara-sun",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/covers/klara-sun.jpg",
    genre: "Sci-Fi",
    rating: 4.5,
    year: 2024,
    pages: 320,
    blurb: "An artificial friend observes the world with astonishing tenderness.",
    description:
      "Klara sits in the store window, learning the sun's patterns and hoping a customer will choose her. When she finally goes home with ailing Josie, she keeps trying to understand a love that outlasts even the machines. A quiet, luminous novel told entirely through an artificial heart.",
    availableCopies: 4,
    waitlist: 0,
  },
  {
    id: "circe",
    title: "Circe",
    author: "Madeline Miller",
    cover: "/covers/circe.jpg",
    genre: "Mythology",
    rating: 4.8,
    year: 2023,
    pages: 448,
    blurb: "The daughter of Helios forges her own myth among mortals and gods.",
    description:
      "Exiled to a whispered island, the daughter of Helios sharpens her craft in secret — taming wolves, spinning spells, and Nursing a stranger who staggers from the sea. When her family comes calling, Circe must choose between the immortality she was born to and the mortal hours she has come to love.",
    availableCopies: 3,
    waitlist: 1,
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/covers/project-hail-mary.jpg",
    genre: "Sci-Fi",
    rating: 4.7,
    year: 2023,
    pages: 482,
    blurb: "One astronaut races against the odds — and time — to save humanity.",
    description:
      "Ryland Grace wakes alone on a light-sprung ship with two dead crewmates, no memories, and the fate of the sun resting on his notebook of sketches. Then he hears a knock on the hull. A gleefully clever science thriller that turns astrophysics into a punchline and a prayer.",
    availableCopies: 5,
    waitlist: 0,
  },
  {
    id: "braiding-sweetgrass",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    cover: "/covers/braiding-sweetgrass.jpg",
    genre: "Nature",
    rating: 4.9,
    year: 2024,
    pages: 408,
    blurb: "Indigenous wisdom, plant science and a gift economy of gratitude.",
    description:
      "A botanist and member of the Citizen Potawatomi Nation brains lessons from the peonies, the mother trees and the sweetgrass harvest into essays that read like bedtime stories. Braiding Sweetgrass teaches the grammar of reciprocity: how to say thank you to a living earth, and to mean it.",
    availableCopies: 2,
    waitlist: 3,
  },
];

export const popularBooks: Book[] = [
  {
    id: "song-achilles",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    cover: "/covers/song-achilles.jpg",
    genre: "Fiction",
    rating: 4.8,
    year: 2021,
    pages: 416,
    blurb: "A luminous retelling of Troy through devotion, pride and fate.",
    description:
      "A forgotten prince is tossed a companion he does not deserve, and grows up gentle, careful, and hopelessly in love. From the classroom to the cave of Chiron to the sand-bruised ranks beneath Troy's walls, Madeline Miller retells the Iliad as a romance of devotion — and of fate's terrible arithmetic.",
    availableCopies: 4,
    waitlist: 2,
  },
  {
    id: "evelyn-hugo",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "/covers/evelyn-hugo.jpg",
    genre: "Fiction",
    rating: 4.6,
    year: 2022,
    pages: 400,
    blurb: "A film icon finally tells the truth about her scandalous life.",
    description:
      "Monique Grant lands the interview every journalist on earth wants: movie legend Evelyn Hugo, ready to explain her seven marriages at last. What unspools is a history of Old Hollywood stitched together with ambition, grief and one love too dangerous to print — until now.",
    availableCopies: 6,
    waitlist: 0,
  },
  {
    id: "pachinko",
    title: "Pachinko",
    author: "Min Jin Lee",
    cover: "/covers/pachinko.jpg",
    genre: "Historical",
    rating: 4.9,
    year: 2023,
    pages: 528,
    blurb: "Four generations of a Korean family strive across a century in Japan.",
    description:
      "In 1910s Busan, a fisherman's daughter marries to save her family and follows a new husband to Osaka, where Koreans live in many crowded wards in a country that will never call them home. Pachinko follows Sunja's descendants through war, wealth and pachinko parlours — quiet, devastating, impossible to put down.",
    availableCopies: 2,
    waitlist: 4,
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    cover: "/covers/dune.jpg",
    genre: "Sci-Fi",
    rating: 4.7,
    year: 2024,
    pages: 624,
    blurb: "Desert power, prophecy and politics on the spice planet of Arrakis.",
    description:
      "The Emperor gives House Atreides the desert planet Arrakis — the only source of spice, the most precious substance in the empire — and it is exactly the trap it looks like. Dune layers ecology, religion and politics into the story of a boy who walks the desert and comes back something else entirely.",
    availableCopies: 3,
    waitlist: 1,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/covers/atomic-habits.jpg",
    genre: "Self-Mastery",
    rating: 4.8,
    year: 2024,
    pages: 320,
    blurb: "Tiny changes, remarkable results — a system for better habits.",
    description:
      "Forget goals; systems win. James Clear turns behavioural science into a practical toolkit — habit stacking, environment design, the two-minute rule — for building good habits one small, repeatable cue at a time. The rare self-help shelf member that survives the return slot: dog-eared, annotated, and borrowed again.",
    availableCopies: 5,
    waitlist: 0,
  },
  {
    id: "midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/covers/midnight-library.jpg",
    genre: "Fiction",
    rating: 4.5,
    year: 2024,
    pages: 304,
    blurb: "Between life and death, a library of every life you might have lived.",
    description:
      "Nora Seed, twenty-four hours past her final regret, wakes in a library where every book is a doorway to a version of her life with a different choice made. The rules are simple: make a life worth keeping, or let the book go. Haig builds the whole thing out of kindness — and still lands the gut-punch.",
    availableCopies: 4,
    waitlist: 1,
  },
];

export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  ctaHref: string;
  background: string;
  theme: "forest" | "ivory" | "gold";
  book: Book;
};

export const heroSlides: Slide[] = [
  {
    id: "editorial-picks",
    eyebrow: "Freshly Curated · This Month",
    title: "Find your next unforgettable read",
    highlight: "unforgettable read",
    description:
      "Wander 3,000+ hand-picked titles on shelves that refresh every week — from midnight mysteries to sunlit classics, reserved in a single tap.",
    cta: "Explore the collection",
    ctaHref: "/new-arrivals",
    background: "/hero/hero-open-book.jpg",
    theme: "forest",
    book: newArrivals.find((b) => b.id === "circe")!,
  },
  {
    id: "reader-loved",
    eyebrow: "Most Loved by Readers",
    title: "Books our members simply cannot put down",
    highlight: "cannot put down",
    description:
      "From mythic retellings to page-turning thrillers, discover the titles our community keeps borrowing again and again.",
    cta: "See popular books",
    ctaHref: "/popular",
    background: "",
    theme: "ivory",
    book: popularBooks.find((b) => b.id === "song-achilles")!,
  },
  {
    id: "fresh-shelves",
    eyebrow: "Freshly Shelved",
    title: "New arrivals, shelved every single week",
    highlight: "every single week",
    description:
      "Our shelves never stand still. Be the first to reserve the newest releases before the waiting lists do.",
    cta: "Browse new arrivals",
    ctaHref: "/new-arrivals",
    background: "",
    theme: "gold",
    book: newArrivals.find((b) => b.id === "project-hail-mary")!,
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const borrowingSteps: Step[] = [
  {
    number: "01",
    title: "Browse the collection",
    description:
      "Wander our nearly 3,000 titles — from new fiction to rare literary finds — and add favourites to your reading shelf.",
  },
  {
    number: "02",
    title: "Reserve a copy",
    description:
      "Hit borrow to place a reservation. We hold the book for exactly 48 hours under your membership card.",
  },
  {
    number: "03",
    title: "Pick up your book",
    description:
      "Collect it from the Nook counter or our 24-hour pickup locker, wrapped with a hand-written reading note.",
  },
  {
    number: "04",
    title: "Read, return, repeat",
    description:
      "Linger up to 21 days, renew once online, then slide it into any returns slot when you're done.",
  },
];

export type Review = {
  name: string;
  role: string;
  initials: string;
  rating: number;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "Amara Chen",
    role: "Member since 2023 · Literature",
    initials: "AC",
    rating: 5,
    quote:
      "BookNook feels like the neighbourhood library every book lover dreams of. The curation is impeccable — I've discovered three of my all-time favourites through their shelves.",
  },
  {
    name: "Mateo Díaz",
    role: "Member since 2024 · Fiction & Poetry",
    initials: "MD",
    rating: 5,
    quote:
      "The borrowing flow is effortless. I reserve on my commute, pick up on the way home, and every book arrives with the most thoughtful reading note tucked inside.",
  },
  {
    name: "Aisha Rahman",
    role: "Member since 2022 · Fantasy & Sci-Fi",
    initials: "AR",
    rating: 4,
    quote:
      "Beautiful space, beautiful app, beautiful people. I've recommended BookNook to every reader I know — the fantasy collection alone is worth the membership.",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Popular", href: "/popular" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Reviews", href: "/reviews" },
];

export const allBooks: Book[] = [...newArrivals, ...popularBooks];

export function getBookById(id: string): Book | undefined {
  return allBooks.find((book) => book.id === id);
}
