"use client";
import React, { useEffect, useState } from "react";

const NotesHistory = ({ userId }) => {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch(`/api/notes?userId=${userId}`);
      const json = await res.json();
      setNotes(json.notes);
    }
    if (userId) fetchNotes();
  }, [userId]);
  
  return (
    <div>
      <h2>Your Notes History</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <p>{note.content}</p>
          <small>{new Date(note.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotesHistory;
