# BookNook

BookNook is a small online library where readers can add a book, borrow a book and return a book.

**Live site:** https://booknook-library-nine.vercel.app

## Features

- Secure authentication with email and password using BetterAuth and the MongoDB adapter, with password validation
- Browse every book in a responsive grid and open a detailed page for each one
- Add your own books with image upload through imgbb, and edit or delete them from My Books with a confirm modal
- Borrow and return books with live copy counts, and a block on borrowing the same book twice
- Private routes protected on the client and a JWT-protected Express API
- Toast messages for every success and error, loading spinners and a custom 404 page

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS, BetterAuth, Express, MongoDB, JWT, Swiper.js

## Run locally

1. Clone the repository and run `npm install`
2. Create a `.env.local` file with `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_IMGBB_KEY`
3. Run `npm run dev`