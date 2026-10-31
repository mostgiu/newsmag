import { useState } from "react";

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

const NewsItem = ({ title, description, src, url, source, publishedAt }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = src && !imgFailed;

  return (
    <div className="card news-card h-100">
      {showImage ? (
        <img
          src={src}
          className="card-img-top"
          alt={title}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="card-img-top news-placeholder d-flex align-items-center justify-content-center text-center p-3">
          <span className="fs-4 fw-bold">{source || "NewsMag"}</span>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between small text-secondary mb-2">
          <span className="text-truncate me-2">{source}</span>
          <span className="text-nowrap">{formatDate(publishedAt)}</span>
        </div>
        <h5 className="card-title clamp-2">{title}</h5>
        <p className="card-text clamp-3 text-body-secondary">
          {description || "No description available."}
        </p>
        <a
          href={url}
          className="btn btn-primary mt-auto align-self-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
