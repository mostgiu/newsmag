// Vercel serverless function: proxies NewsAPI so the API key stays on the server.
// NewsAPI's free plan blocks browser requests from non-localhost origins.
const ALLOWED_PARAMS = ["country", "category", "q", "pageSize"];

export default async function handler(req, res) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ status: "error", message: "Server is missing NEWS_API_KEY." });
  }

  const params = new URLSearchParams();
  for (const name of ALLOWED_PARAMS) {
    if (req.query[name]) params.set(name, req.query[name]);
  }
  params.set("apiKey", apiKey);

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?${params}`, {
      headers: { "User-Agent": "NewsMag" },
    });
    const data = await response.json();
    // Cache at the edge for 10 minutes to stay within NewsAPI's daily request limit
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=300");
    return res.status(response.status).json(data);
  } catch {
    return res.status(502).json({ status: "error", message: "Could not reach NewsAPI." });
  }
}
