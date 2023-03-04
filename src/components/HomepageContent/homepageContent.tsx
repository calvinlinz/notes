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
      `http://127.0.0.1:8090/api/collections/notes/records?filter=(email='${email}')`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await res.json();
    setData(data?.items);
  }

  const newNote = async (title: string, note: string) => {
    await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records?page=1%perPage=30`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          note,
          email,
        }),
      }
    );
    setTitle("");
    setNote("");
    getNotes();
  };

  const deleteNote = async (id: string) => {
    await pb.collection("notes").delete(id);
    getNotes();
  };

  useEffect(() => {
    getNotes();
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
