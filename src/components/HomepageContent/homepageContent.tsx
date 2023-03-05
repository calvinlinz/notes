import { selectEmail } from "@/loginSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./homepageContent.module.css";
import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

export default function HomepageContent() {
  const [data, setData] = useState<any[]>([""]);
  const email = useSelector(selectEmail);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

 async function getNotes() {
    const res = await fetch(
      `http://localhost:3000/api/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
        }
      );

    const placeHolderData = await res.json();
    setData(placeHolderData);
  }

  const newNote = async (title: string, note: string) => {
    let id : Number = data.length;

    await fetch(
      `http://localhost:3000/api/notes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          email,
          title,
          note,
        }),
      }
    );
    setTitle("");
    setNote("");
    getNotes();
  };

  const deleteNote = async (id: string) => {
    await fetch(
      `http://localhost:3000/api/notes`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          email,
        }),
      }
    );
    getNotes();
  };

  useEffect(() => {
    getNotes();
  },[email]);

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
