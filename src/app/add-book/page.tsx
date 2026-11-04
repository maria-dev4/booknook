"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PrivateRoute } from "@/components/private-route";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const inputClass =
  "w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold";
const readOnlyClass = `${inputClass} bg-forest/5 text-ink-muted`;

const uploadImage = async (file: File) => {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body }
  );
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.url as string;
};

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("image") as File;

    if (!file || file.size === 0) {
      toast.error("Please choose a book image");
      return;
    }

    setLoading(true);
    try {
      const image = await uploadImage(file);
      await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title: String(data.get("title")),
          author: String(data.get("author")),
          category: String(data.get("category")),
          description: String(data.get("description")),
          copies: Number(data.get("copies")),
          addedByName: session?.user.name,
          image,
        }),
      });
      toast.success("Book added successfully");
      form.reset();
      router.push("/books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <main className="mx-auto w-full max-w-2xl px-5 py-12">
        <div className="rounded-3xl border border-forest/10 bg-white p-8 shadow-soft">
          <h1 className="font-display text-3xl text-forest">Add a new book</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Share a book with the BookNook community.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input name="title" required placeholder="Book title" className={inputClass} />
            <input name="author" required placeholder="Author name" className={inputClass} />
            <select name="category" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              name="copies"
              type="number"
              min={1}
              required
              placeholder="Total copies"
              className={inputClass}
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-forest file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-ivory`}
            />
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Short description"
              className={inputClass}
            />
            <input
              readOnly
              value={session?.user.name ?? ""}
              placeholder="Your name"
              className={readOnlyClass}
            />
            <input
              readOnly
              value={session?.user.email ?? ""}
              placeholder="Your email"
              className={readOnlyClass}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:opacity-60"
            >
              {loading ? "Adding book..." : "Add Book"}
            </button>
          </form>
        </div>
      </main>
    </PrivateRoute>
  );
}