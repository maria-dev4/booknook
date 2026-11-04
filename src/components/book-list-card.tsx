import Link from "next/link";
import { Book3DCard } from "@/components/book-3d-card";
import type { Book } from "@/lib/types";

export function BookListCard({ book }: { book: Book }) {
  const href = `/books/${book._id}`;

  return (
    <Book3DCard
      href={href}
      title={book.title}
      author={book.author}
      category={book.category}
      cover={book.image}
      actions={
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
        >
          View Details
        </Link>
      }
    />
  );
}
