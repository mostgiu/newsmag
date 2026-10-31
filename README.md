# NewsMag

A React + Vite news app built with Bootstrap 5, powered by [NewsAPI](https://newsapi.org).

## Features

- Top US headlines by category (general, business, technology, science, health, sports, entertainment)
- Keyword search
- Responsive card grid with loading, error, and empty states

## Setup

1. Get a free API key at https://newsapi.org/register
2. Copy `.env.example` to `.env` in the project root and add your key:
   ```
   NEWS_API_KEY=your_newsapi_key_here
   ```
3. Install and run:
   ```
   npm install
   npm run dev
   ```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview the build        |
| `npm run lint`    | Run ESLint               |

## How the API key is handled

The browser never calls NewsAPI directly. It requests `/api/news`, which is:

- in development: a Vite proxy (see `vite.config.js`) that adds the key from `.env`
- in production: a Vercel serverless function (`api/news.js`) that reads `NEWS_API_KEY` from the environment

This keeps the key out of the client bundle and works around NewsAPI's free plan blocking browser requests from non-localhost origins.

## Deploying to Vercel

1. Import the GitHub repo in Vercel (framework preset: Vite).
2. Add the environment variable `NEWS_API_KEY` in Project Settings → Environment Variables.
3. Deploy.
