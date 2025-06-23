import { useState } from "react";
import { useNotes } from "./useNotes";
import { GridLoader } from "react-spinners";

function Inputtext() {

    const { userData, setUserData, addNotes, loading } = useNotes();      
    
    const [isVisible, setIsVisible] = useState(false);

    function handleClick() {
      setIsVisible(true);
    }

    if (loading) {
      return (
        <div className="loading">
          <GridLoader color="#0881ff" />
        </div>
      );
    }

    return (
      <div>
        <form className="text-input input-card">
          <input
            name="title"
            value={userData.title}
            className={`heading  ${isVisible ? "show" : "hide"}`}
            onChange={(e) =>
              setUserData({ ...userData, title: e.target.value })
            }
            type="text"
            placeholder="Title"
          ></input>

          <textarea
            name="notes"
            value={userData.notes}
            className={`inputnotes  ${isVisible ? "show" : "hide"}`}
            onChange={(e) =>
              setUserData({ ...userData, notes: e.target.value })
            }
            onClick={handleClick}
            placeholder="Take a note..."
          ></textarea>
          <button
            onClick={addNotes}
            disabled={!((userData?.title ?? '').trim())}
            className={`overlay-addbtn  ${isVisible ? "show" : "hide"}`}
          >
            <span>Add </span>
          </button>
        </form>
      </div>
    );
}

export default Inputtext;