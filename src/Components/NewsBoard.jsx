import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, query }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({ country: "us", pageSize: "30" });
      if (query) {
        params.set("q", query);
      } else {
        params.set("category", category);
      }

      try {
        const response = await fetch(`/api/news?${params}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        if (data.status !== "ok") {
          throw new Error(data.message || "Failed to load news.");
        }
        // NewsAPI marks deleted articles with the title "[Removed]"
        const valid = data.articles.filter((a) => a.title && a.title !== "[Removed]");
        // Show articles with images first; Array.sort is stable so order is otherwise kept
        setArticles(valid.sort((a, b) => Boolean(b.urlToImage) - Boolean(a.urlToImage)));
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setArticles([]);
      }
      setLoading(false);
    };

    fetchNews();
    return () => controller.abort();
  }, [category, query, reload]);

  return (
    <main className="container py-4">
      <h2 className="text-center mb-4">
        {query ? (
          <>
            Results for <span className="badge bg-danger">{query}</span>
          </>
        ) : (
          <>
            Latest <span className="badge bg-danger text-capitalize">{category}</span> News
          </>
        )}
      </h2>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>{error}</span>
          <button className="btn btn-sm btn-outline-light" onClick={() => setReload((r) => r + 1)}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-secondary my-5">No articles found.</p>
      )}

      {!loading && !error && (
        <div className="row g-4">
          {articles.map((news) => (
            <div className="col-12 col-sm-6 col-lg-4" key={news.url}>
              <NewsItem
                title={news.title}
                description={news.description}
                url={news.url}
                src={news.urlToImage}
                source={news.source?.name}
                publishedAt={news.publishedAt}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default NewsBoard;
