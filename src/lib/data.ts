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
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Popular", href: "/popular" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Reviews", href: "/reviews" },
];

export const allBooks: Book[] = [...newArrivals, ...popularBooks];

export function getBookById(id: string): Book | undefined {
  return allBooks.find((book) => book.id === id);
}
