import React, { useEffect, useState } from "react";
import Character from "./Character";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setLoading(false);
        const data = await response.json();
        setCharacters(data.results);
    }
    fetchData();
  }, [page]);
  if (loading) {
    <div>loading</div>
  }

  function NavPage() {
    return (
      <header className="d-flex justify-content-between align-items-center">
        <h3 className="fw-lighter">Page: {page}</h3>
        <button onClick={()=>{setPage(page+1)}} className="btn btn-primary fw-bold">Page {page+1}</button>
      </header>
    );
  }

  return (
    <div className="container">
      <NavPage />
      {loading ? (
        <h1 className="bg-black vw-100 vh-100">Loading</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div key={character.id} className="col-md-4">
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage/>
    </div>
  );
}

export default CharacterList;
