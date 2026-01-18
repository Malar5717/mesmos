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
        editData,
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
        setPolas((prev) => prev.filter((pola) => pola._id !== id));
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
          {polas.map((pola) => {
            const isEditing = isEditOpen && editPola && editPola._id === pola._id;
            return (
              <div key={pola._id} className="masonry-item">
                <>
                  {pola.image_url ? (
                    <Memoroid
                    // title={ isEditing ? (e) => setEdittedTitle(e.target.value) : pola.title }
                      title={isEditing ? edittedTitle : pola.title}
                      description={isEditing ? edittedDescription : pola.description}
                      image_url={pola.image_url}
                      createdAt={pola.createdAt}
                      style={pola.style}
                      isEditing={isEditing}
                      onTitleChange={setEdittedTitle}
                      onDescChange={setEdittedDescription}
                    />
                  ) : (
                    <Note
                      title={isEditing ? edittedTitle : pola.title}
                      description={isEditing ? edittedDescription : pola.description}
                      createdAt={pola.createdAt}
                      style={pola.style}
                      isEditing={isEditing}
                      onTitleChange={setEdittedTitle}
                      onDescChange={setEdittedDescription}
                    />
                  )}
                  {isEditing && <button className="controls" onClick={() => handleEdit(pola._id, { title: edittedTitle, description: edittedDescription })}>save</button>}
                </>
                <div className="controls">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => {
                      setIsEditOpen(true);
                      setEditPola(pola);
                      setEdittedTitle(pola.title);
                      setEdittedDescription(pola.description);
                    }}
                  />
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(pola._id)} />
                </div>
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
