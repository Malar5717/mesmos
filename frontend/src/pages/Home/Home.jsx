import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import API_URL from "../../config/api";

import Note from "../../components/notes/Note";
import NavBar from "../../components/navigation/NavBar";
import Create from "../../components/create/Create";
import Memoroid from "../../components/memoroids/Memoroid";
import "./Home.css";

const HomeContent = () => {
  const [polas, setPolas] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPolas = () => {
    axios
      .get(`${API_URL}/pola/all`)
      .then((res) => {
        setPolas(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPolas();

    const pollInterval = setInterval(fetchPolas, 5000);
    // once its unmounted 
    return () => {
      clearInterval(pollInterval);
    };

  }, []);

  return (
    <>
      <NavBar onAddClick={setIsCreateOpen} isCreateOpen={isCreateOpen} />
      {loading ? (
        <span className="material-symbols-outlined spinner">progress_activity</span>
      ) : (
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
      )}

      {isCreateOpen && <Create setIsCreateOpen={setIsCreateOpen} setPolas={setPolas} />}
    </>
  );
};

export default HomeContent;
