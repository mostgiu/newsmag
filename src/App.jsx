import { useState } from "react";
import NavBar from "./Components/NavBar";
import NewsBoard from "./Components/NewsBoard";

function App() {
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");

  return (
    <>
      <NavBar
        category={category}
        setCategory={setCategory}
        setQuery={setQuery}
      />
      <NewsBoard category={category} query={query} />
    </>
  );
}

export default App;
