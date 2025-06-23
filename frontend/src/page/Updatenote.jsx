import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "./useNotes"
import { useEffect } from "react";
import { GridLoader } from "react-spinners";


function Updatenote() {
  const {
    userData,
    setUserData,
    fetchNote,
    fetchNotes,
    editNote,
    resetUserData,
    deteleNotes,
    loading
  } = useNotes();


  const navigate = useNavigate();
  const {id} = useParams();

  
    useEffect(() => {
      fetchNote(id);
    }, [fetchNote,id]);

  
  if (loading) {
    return (
      <div className="loading">
        <GridLoader color="#0881ff" />
      </div>
    );
  }
  

  return (
    <div className="edit-page">
      <button
        className="back-btn cursor-pointer hover:text-green-600"
        onClick={() => {
          resetUserData();
          navigate("/");
        }}
      >
        &#8592; Back to notes
      </button>
      <div>
        <div className="edit-content">
          <h3 className="text-2xl text-center m-6">Edit Note</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="updateform">
              <input
                className="form-input border border-amber-50 p-2 w-125 sm:w-150 rounded-2xl p-3 "
                name="title"
                value={userData.title}
                onChange={(e) =>
                  setUserData({ ...userData, title: e.target.value })
                }
                type="text"
                placeholder="Title"
              ></input>

              <textarea
                className="form-text border border-amber-50 mt-10 h-35 sm:h-50 rounded-2xl p-3  "
                name="notes"
                value={userData.notes}
                onChange={(e) =>
                  setUserData({ ...userData, notes: e.target.value })
                }
              ></textarea>
              <div className="form-btn mt-15 ">
                <button
                  className="mx-5 cursor-pointer hover:bg-blue-600 w-18 rounded-2xl "
                  onClick={async () => {
                    await editNote(id);
                    resetUserData();
                    fetchNotes();
                    navigate("/");
                  }}
                >
                  Update
                </button>

                <button
                  className="mx-5 cursor-pointer hover:bg-red-600 w-17 rounded-2xl"
                  onClick={async () => {
                    await deteleNotes(id);
                    resetUserData();
                    fetchNotes();
                    navigate("/");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updatenote