"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrivateRoute } from "@/components/private-route";
import { Spinner } from "@/components/spinner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/upload";
import type { Book } from "@/lib/types";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];
const inputClass =
  "w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold";

function MyBooks() {
  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);

  const loadBooks = useCallback(async () => {
    if (!email) return;
    try {
      const data = await apiFetch(`/books?email=${encodeURIComponent(email)}`);
      setBooks(data);
    } catch {
      toast.error("Could not load your books");
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    document.title = "BookNook | My Books";
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const data = new FormData(e.currentTarget);
    const file = data.get("image") as File;

    setBusy(true);
    try {
      const image =
        file && file.size > 0 ? await uploadImage(file) : editing.image;
      await apiFetch(`/books/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: String(data.get("title")),
          author: String(data.get("author")),
          category: String(data.get("category")),
          description: String(data.get("description")),
          copies: Number(data.get("copies")),
          image,
        }),
      });
      toast.success("Book updated successfully");
      setEditing(null);
      await loadBooks();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update the book",
      );
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
      toast.success("Book deleted successfully");
      setDeleting(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not delete the book",
      );
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-forest">My Books</h1>
      <p className="mt-2 text-ink-muted">Books you have added to the Nook.</p>

      {books.length === 0 ? (
        <p className="mt-10 text-ink-muted">
          You have not added any books yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-forest/10 bg-white shadow-soft">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-forest/5 text-forest">
              <tr>
                <th className="px-5 py-4 font-semibold">Image</th>
                <th className="px-5 py-4 font-semibold">Title</th>
                <th className="px-5 py-4 font-semibold">Author</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Copies</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id} className="border-t border-forest/10">
                  <td className="px-5 py-3">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="h-16 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-5 py-3 font-medium text-forest">
                    {b.title}
                  </td>
                  <td className="px-5 py-3 text-ink-muted">{b.author}</td>
                  <td className="px-5 py-3 text-ink-muted">{b.category}</td>
                  <td className="px-5 py-3 text-ink-muted">{b.copies}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditing(b)}
                        className="rounded-full bg-forest px-4 py-2 text-xs font-semibold text-ivory hover:bg-forest-deep"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(b)}
                        className="rounded-full border border-red-300 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-5 py-8">
          <form
            onSubmit={handleUpdate}
            className="w-full max-w-lg space-y-4 rounded-3xl bg-ivory p-8 shadow-lift"
          >
            <h2 className="font-display text-2xl text-forest">Edit book</h2>
            <input
              name="title"
              required
              defaultValue={editing.title}
              className={inputClass}
            />
            <input
              name="author"
              required
              defaultValue={editing.author}
              className={inputClass}
            />
            <select
              name="category"
              required
              defaultValue={editing.category}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              name="copies"
              type="number"
              min={0}
              required
              defaultValue={editing.copies}
              className={inputClass}
            />
            <div className="flex items-center gap-3">
              <img
                src={editing.image}
                alt={editing.title}
                className="h-16 w-12 rounded-md object-cover"
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full text-sm text-ink-muted file:mr-4 file:rounded-full file:border-0 file:bg-forest file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-ivory"
              />
            </div>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={editing.description}
              className={inputClass}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 rounded-full border border-forest/20 px-5 py-3 text-sm font-semibold text-forest"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="flex-1 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory disabled:opacity-60"
              >
                {busy ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-ivory p-8 text-center shadow-lift">
            <h2 className="font-display text-2xl text-forest">
              Delete this book?
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              "{deleting.title}" will be removed permanently. This cannot be
              undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                className="flex-1 rounded-full border border-forest/20 px-5 py-3 text-sm font-semibold text-forest"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleDelete}
                className="flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busy ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function MyBooksPage() {
  return (
    <PrivateRoute>
      <MyBooks />
    </PrivateRoute>
  );
}
