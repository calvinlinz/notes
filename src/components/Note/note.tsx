import { FC } from "react"
import styles from "./note.module.css"
import getNotes from '../HomepageContent/homepageContent'
import PocketBase from 'pocketbase'

export type NoteSource = {
    title:string
    note:string
    id:string
}

const pb = new PocketBase("http://127.0.0.1:8090");

const deleteNote = async (id: string) => {
    await pb.collection("notes").delete(id);
    getNotes();
};

const Note : FC<NoteSource> = ({ title, note,id}) => {
    return (
        <div key = {id}>
          <div className={styles.gridBox}>
            <div className={styles.gridBoxContent}>
              <div className={styles.gridBoxHeader}>
                <h2>{title}</h2>
              </div>
              <div className={styles.gridBoxDescription}>
                <p>{note}</p>
              </div>
              <div className={styles.gridBoxButton}>
                <button onClick={() => deleteNote(id)}>-</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Note