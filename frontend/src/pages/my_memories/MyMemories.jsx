import { useState, useEffect } from "react";
import axios from "axios";

import Note from "../../components/notes/Note";
import NavBar from "../../components/navigation/NavBar";
import Create from "../../components/create/Create";
import Memoroid from "../../components/memoroids/Memoroid";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MyMemories = () => {
  const [polas, setPolas] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
    const fetchPolas = () => {
      axios
        .get("http://localhost:3000/pola/my", { withCredentials: true })
        .then((res) => setPolas(res.data))
        .catch((err) => setError(err));
    };
    fetchPolas();
  // }, []);

  return (
    <>
      <NavBar onAddClick={setIsCreateOpen} isCreateOpen={isCreateOpen} />
      
      {isCreateOpen && (
        <Create setIsCreateOpen={setIsCreateOpen} />
      )}

      <ResponsiveMasonry
        columnsCountBreakPoints={{
          900: 4,
          1200: 5,
        }}
      >
        <Masonry>
          {polas.map((pola, i) => {
            return (
              <div key={i} className="masonry-item">
                {pola.image_url ? (
                  <Memoroid
                    title={pola.title}
                    description={pola.description}
                    image_url={pola.image_url}
                    createdAt={pola.createdAt}
                    style={pola.style}
                  />
                ) : (
                  <Note
                    title={pola.title}
                    description={pola.description}
                    createdAt={pola.createdAt}
                    style={pola.style}
                  />
                )}
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      
      <div className="errorMessage">{error && error.message}</div>
      
    </>
  );
};

export default MyMemories;
