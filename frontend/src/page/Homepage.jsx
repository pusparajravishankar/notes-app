import { useEffect } from "react";
import Inputtext from "./Inputtext"
import { useNotes } from "./useNotes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {Link, Links} from "react-router-dom"
import { GridLoader } from "react-spinners";


function Homepage() {
  const { initNotes, loading, fetchNotes, deteleNotes } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) {
    return (
      <div className="loading">
        <GridLoader color="#0881ff" />
      </div>
    );
  }

  return (
    <div className="notes-container">
      <div className="input-card">
        <Inputtext />
      </div>
      <div className="card-tab card">
        {/* The notesdb denotes directly imported from notedb.js file This doesn't use the useState hook. Now we use hooks to import from notesdb to noteList and used below */}
        {initNotes.map((note) => (
          <div key={note.id}>
            <div className="notes-tab notes">
              {/* used simplified anonymous function */}
              <h3 className="text-2xl">{note.title}</h3>
              <p className="h-max max-h-90 line-clamp-14">{note.notes}</p>
              
              <div className="flex justify-around m-0 mt-3">
                <Link to={`/note/${note.id}`}>
                  <EditIcon className="editbtn cursor-pointer hover:text-blue-600" />
                </Link>
                <DeleteIcon
                  className="deletebtn cursor-pointer hover:text-red-600"
                  onClick={() => {
                    deteleNotes(note.id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;



