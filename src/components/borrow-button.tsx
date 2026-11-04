"use client";

import { useState } from "react";
import { BookmarkIcon } from "@/components/icons";

export function BorrowButton() {
  const [reserved, setReserved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setReserved((v) => !v)}
      aria-pressed={reserved}
      className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold shadow-soft transition-all duration-300 hover:shadow-lift ${
        reserved ? "bg-gold text-forest-deep hover:bg-gold-soft" : "bg-forest text-ivory hover:bg-forest-deep"
      }`}
    >
      <BookmarkIcon className="h-4 w-4" />
      {reserved ? "Reserved for 48 hrs - Cancel" : "Borrow this book"}
    </button>
  );
}
