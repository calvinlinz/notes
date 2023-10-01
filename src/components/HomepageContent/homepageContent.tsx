import { selectEmail } from "@/loginSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./homepageContent.module.css";

export default function HomepageContent() {
  const [data, setData] = useState<any[]>([""]);
  const email = useSelector(selectEmail);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const API_URL = process.env.API_URL || "";

  async function getNotes() {
    await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        note,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  const newNote = async (title: string, note: string) => {
    fetch(`${API_URL}/api/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        note,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTitle("");
        setNote("");
      });
  };

  const deleteNote = async (id: string) => {
    await fetch(`${API_URL}/api/notes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    async function callGetNotes() {
      await getNotes();
    }
    callGetNotes();
  }, [email]);

  return (
    <div className={styles.gridContainer}>
      {data?.map((note) => (
        <div key={note.id}>
          <div className={styles.gridBox}>
            <div className={styles.gridBoxContent}>
              <div className={styles.gridBoxHeader}>
                <h2>{note.title}</h2>
              </div>
              <div className={styles.gridBoxDescription}>
                <p>{note.note}</p>
              </div>
              <div className={styles.gridBoxButton}>
                <button onClick={() => deleteNote(note.id)}>-</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.gridBox}>
        <div className={styles.gridBoxContent}>
          <div className={styles.gridBoxHeader}>
            <textarea
              className={styles.titleInput}
              placeholder="New Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></textarea>
          </div>
          <div className={styles.gridBoxDescription}>
            <textarea
              className={styles.noteInput}
              placeholder="New Note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            ></textarea>
          </div>
          <div className={styles.gridBoxButton}>
            <button onClick={() => newNote(title, note)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
