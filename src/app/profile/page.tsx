"use client";

import { useEffect } from "react";
import { PrivateRoute } from "@/components/private-route";
import { authClient } from "@/lib/auth-client";

function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    document.title = "BookNook | My Profile";
  }, []);

  return (
    <main className="mx-auto w-full max-w-md px-5 py-16">
      <div className="rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-gold">
          <img
            src={user?.image || "/logo.png"}
            alt={user?.name ?? "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mt-5 font-display text-3xl text-forest">{user?.name}</h1>
        <p className="mt-2 text-sm text-ink-muted">{user?.email}</p>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}
