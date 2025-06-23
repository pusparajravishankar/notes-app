import { sql } from "../config/db.js";


export const getNotes = async (req, res) => {
    try {
        const notes = await sql`
        SELECT * FROM notebook
        ORDER BY created_at DESC
        `;  
        res.status(200).json(notes)
        
    } catch (error) {
        console.log(`Error in getting notes= ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getNote = async (req, res) => {
    const { id } = req.params;
  try {
    const notes = await sql`
        SELECT * FROM notebook
        WHERE ID=${id}
        `;
    res.status(200).json(notes[0]);
  } catch (error) {
    console.log(`Error in getting notes= ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
    const {title,notes,created_by} = req.body

    if (!title || !created_by) {
        res.status(400)
    }
    try {
      const newNote = await sql`
        INSERT INTO notebook (title,notes,created_by) 
        VALUES (${title},${notes},${created_by}) RETURNING *
        `;
        res.status(201).json(newNote[0]);
        
    } catch (error) {
      console.log(`Error in creating note= ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateNote = async (req, res) => {
    const {id} = req.params;
    const {title, notes, created_by} = req.body;
    try {
       const updateNote = await sql`
       UPDATE notebook SET 
       title=${title},
       notes=${notes},
       created_by=${created_by},
       updated_at=CURRENT_TIMESTAMP
       WHERE id=${id}
       RETURNING *
       `;
       res.status(200).json(updateNote[0]);
       
    } catch (error) {
        console.log(`Error in updating note= ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    const {id} = req.params;

    try {
        const deleteNote = await sql`
        DELETE FROM notebook WHERE id=${id}
        RETURNING *
        `
        //Check the deleted or not
        // if (deleteNote.length===0) {
        //     return res.status(404).json("Note not found")
        // }
        res.status(200).json(deleteNote[0]);
    } catch (error) {
        console.log(`Error in deleting note= ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};