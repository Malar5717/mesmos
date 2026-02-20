import { useState, useEffect } from "react";
import axios from "axios";
import "./MyMemories.css";
import API_URL from "../../config/api";

import Note from "../../components/notes/Note";
import NavBar from "../../components/navigation/NavBar";
import Create from "../../components/create/Create";
import Memoroid from "../../components/memoroids/Memoroid";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const MyMemories = () => {
  const [polas, setPolas] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPola, setEditPola] = useState(null);
  const [edittedTitle, setEdittedTitle] = useState("");
  const [edittedDescription, setEdittedDescription] = useState("");
  const [deletePolaId, setDeletePolaId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolas = () => {
      axios
        .get(`${API_URL}/pola/my`, { withCredentials: true })
        .then((res) => setPolas(res.data))
        .catch((err) => setError(err.response.data));
    };
    fetchPolas();
  }, []);

  const handleEdit = (id, editData) => {
    axios
      .put(`${API_URL}/pola/${id}`, 
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
      .delete(`${API_URL}/pola/${id}`, { withCredentials: true })
      .then(() => {
        setPolas((prev) => prev.filter((pola) => pola._id !== id));
      })
      .catch((err) => setError(err.response?.data || err));
  };

  const handlePrivacy = (id) => {
    const pola = polas.find((p) => p._id === id);
    axios
      .put(
        `${API_URL}/pola/${id}`,
        { isPrivate: !pola.isPrivate },
        { withCredentials: true }
      )
      .then(() => {
        const polas_copy = [...polas];
        const index = polas_copy.findIndex((p) => p._id === id);
        polas_copy[index].isPrivate = !polas_copy[index].isPrivate;
        setPolas(polas_copy);
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
            const isEditing =
              isEditOpen && editPola && editPola._id === pola._id;
            return (
              <div key={pola._id} className="masonry-item">
                <>
                  {pola.image_url ? (
                    <Memoroid
                      // title={ isEditing ? (e) => setEdittedTitle(e.target.value) : pola.title }
                      title={isEditing ? edittedTitle : pola.title}
                      description={
                        isEditing ? edittedDescription : pola.description
                      }
                      image_url={pola.image_url}
                      createdAt={pola.createdAt}
                      style={pola.style}
                      isPrivate={pola.isPrivate}
                      isEditing={isEditing}
                      onTitleChange={setEdittedTitle}
                      onDescChange={setEdittedDescription}
                    />
                  ) : (
                    <Note
                      title={isEditing ? edittedTitle : pola.title}
                      description={
                        isEditing ? edittedDescription : pola.description
                      }
                      createdAt={pola.createdAt}
                      style={pola.style}
                      isPrivate={pola.isPrivate}
                      isEditing={isEditing}
                      onTitleChange={setEdittedTitle}
                      onDescChange={setEdittedDescription}
                    />
                  )}
                  {isEditing && (
                    <button
                      className="controls"
                      onClick={() =>
                        handleEdit(pola._id, {
                          title: edittedTitle,
                          description: edittedDescription,
                        })
                      }
                    >
                      save
                    </button>
                  )}
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

                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => setDeletePolaId(pola._id)}
                  />

                  <FontAwesomeIcon
                    icon={pola.isPrivate ? faEyeSlash : faEye}
                    onClick={() => handlePrivacy(pola._id)}
                  />

                </div>

                {deletePolaId === pola._id && (
                  <div className="delete-confirm" onClick={() => setDeletePolaId(null)}>
                    <div
                      className="delete-confirm-box"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="corner corner-tl"></span>
                      <span className="corner corner-tr"></span>
                      <span className="corner corner-bl"></span>
                      <span className="corner corner-br"></span>
                      
                      <p>Are you sure?</p>
                      <div className="delete-confirm-actions">
                        <button
                          type="button"
                          className="onYes"
                          onClick={() => {
                            handleDelete(deletePolaId);
                            setDeletePolaId(null);
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="onNo"
                          onClick={() => setDeletePolaId(null)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
