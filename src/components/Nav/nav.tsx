import Link from "next/link";
import styles from "./nav.module.css";
import Login from "../Login/login";
import { useEffect } from "react";

const clientId =
  "316204802962-jjkqmkcq42dc785kt673kg6sp84cs8pd.apps.googleusercontent.com";

let gapiHook: { client: { init: (arg0: { client_d: string; scope: string; }) => void; }; load: (arg0: string, arg1: () => Promise<void>) => void; };

(async () => {
 const { gapi } = 
 await import('gapi-script');
 gapiHook = gapi;
})();


export default function Nav() {
  useEffect(() => {
    async function start() {
      gapiHook.client.init({
        client_d: clientId,
        scope: "profile",
      });
    }
    gapiHook.load("client:auth2", start);

  });

  return (
    <div className={styles.navBar}>
      <nav className={styles.nav}>
        <div className={styles.navBarHead}>
          <Link className={styles.menuItem} href="/">
            notes web app
          </Link>
        </div>
        <div className={styles.navBarLinks}>
          <ul className={styles.ul}>
            <li className={styles.menuItem}>
              <Login />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
