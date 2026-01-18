import { useState, useEffect } from "react";
import axios from "axios";
import "./MyMemories.css";

import Note from "../../components/notes/Note";
import NavBar from "../../components/navigation/NavBar";
import Create from "../../components/create/Create";
import Memoroid from "../../components/memoroids/Memoroid";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MyMemories = () => {
  const [polas, setPolas] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPola, setEditPola] = useState(null);
  const [edittedTitle, setEdittedTitle] = useState("");
  const [edittedDescription, setEdittedDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolas = () => {
      axios
        .get("http://localhost:3000/pola/my", { withCredentials: true })
        .then((res) => setPolas(res.data))
        .catch((err) => setError(err.response.data));
    };
    fetchPolas();
  }, []);

  const handleEdit = (id, editData) => {
    axios
      .put(
        `http://localhost:3000/pola/${id}`,
        editData, // send as plain object, not {editData}
        { withCredentials: true }
      )
      .then(() => {
        polas.map((pola) => {
          if (pola._id === id) {
            pola.title = editData.title;
            pola.description = editData.description;
          }
        });
        setIsEditOpen(false);
        setEditPola(null);
      })
      .catch((err) => setError(err.response?.data || err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/pola/${id}`, { withCredentials: true })
      .then(() => {
        setPolas((prev) => {
          prev.filter((pola) => pola._id !== id)
        });
      })
      .catch((err) => setError(err.response?.data || err));
  };

  return (
    <>
      <NavBar onAddClick={setIsCreateOpen} isCreateOpen={isCreateOpen} />

      {isCreateOpen && <Create setIsCreateOpen={setIsCreateOpen} />}

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

                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => {
                    setIsEditOpen(true);
                    setEditPola(pola);
                    setEdittedTitle(pola.title);
                    setEdittedDescription(pola.description);
                  }}
                />
                {isEditOpen && editPola && editPola._id === pola._id && (
                  <div className="editContent">
                    <input
                      type="text"
                      value={edittedTitle}
                      onChange={e => setEdittedTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      value={edittedDescription}
                      onChange={e => setEdittedDescription(e.target.value)}
                    />
                    <button onClick={() => handleEdit(pola._id, { title: edittedTitle, description: edittedDescription })}>save</button>
                    <button onClick={() => setIsEditOpen(false)}>cancel</button>
                  </div>
                )}

                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(pola._id)} />
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>

      <div className="errorMessage">{error && error.msg}</div>
    </>
  );
};

export default MyMemories;
