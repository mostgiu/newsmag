import { useState } from "react";

const CATEGORIES = [
  "general",
  "business",
  "technology",
  "science",
  "health",
  "sports",
  "entertainment",
];

function NavBar({ category, setCategory, setQuery }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const selectCategory = (c) => {
    setCategory(c);
    setSearch("");
    setQuery("");
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search.trim());
    setOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
      <div className="container">
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            selectCategory("general");
          }}
        >
          <span className="badge bg-light text-dark fs-4">NewsMag</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {CATEGORIES.map((c) => (
              <li className="nav-item" key={c}>
                <a
                  href="#"
                  className={`nav-link text-capitalize ${c === category ? "active" : ""}`}
                  aria-current={c === category ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCategory(c);
                  }}
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news"
              aria-label="Search news"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
