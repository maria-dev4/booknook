"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateRoute } from "@/components/private-route";
import { Spinner } from "@/components/spinner";
import { apiFetch } from "@/lib/api";
import type { Borrow } from "@/lib/types";

function MyBorrows() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");

  const loadBorrows = useCallback(async () => {
    try {
      const data = await apiFetch("/borrows");
      setBorrows(data);
    } catch {
      toast.error("Could not load your borrowed books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "BookNook | My Borrows";
    loadBorrows();
  }, [loadBorrows]);

  const handleReturn = async (id: string) => {
    setReturningId(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" });
      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return the book");
    } finally {
      setReturningId("");
    }
  };

  if (loading) return <Spinner />;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-forest">My Borrows</h1>
      <p className="mt-2 text-ink-muted">Books you have borrowed from the Nook.</p>

      {borrows.length === 0 ? (
        <p className="mt-10 text-ink-muted">You have not borrowed any books yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-forest/10 bg-white shadow-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-forest/5 text-forest">
              <tr>
                <th className="px-5 py-4 font-semibold">Image</th>
                <th className="px-5 py-4 font-semibold">Title</th>
                <th className="px-5 py-4 font-semibold">Borrow Date</th>
                <th className="px-5 py-4 font-semibold">Return Date</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id} className="border-t border-forest/10">
                  <td className="px-5 py-3">
                    <img
                      src={b.bookImage}
                      alt={b.bookTitle}
                      className="h-16 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-5 py-3 font-medium text-forest">{b.bookTitle}</td>
                  <td className="px-5 py-3 text-ink-muted">
                    {new Date(b.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-ink-muted">
                    {new Date(b.returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      disabled={returningId === b._id}
                      onClick={() => handleReturn(b._id)}
                      className="rounded-full bg-forest px-4 py-2 text-xs font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:opacity-60"
                    >
                      {returningId === b._id ? "Returning..." : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function MyBorrowsPage() {
  return (
    <PrivateRoute>
      <MyBorrows />
    </PrivateRoute>
  );
}