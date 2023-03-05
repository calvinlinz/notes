import { GoogleLogin, GoogleLogout } from "react-google-login";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectValue } from "@/loginSlice";
import { useEffect } from "react";

const clientId =
  "316204802962-jjkqmkcq42dc785kt673kg6sp84cs8pd.apps.googleusercontent.com";

const createUser = async (name: string, email: string) => {
  await fetch(
    "http://127.0.0.1:8090/api/collections/users/records?page=1%perPage=30",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }
  );
};

export default function Login() {
  const loggedin = useSelector(selectValue);
  const dispatch = useDispatch();

  const onSuccess = (res: any) => {
    dispatch(login(res.profileObj.email));
    createUser(res.profileObj.name, res.profileObj.email);
  };

  const onLogoutSuccess = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.signInButton}>
      {!loggedin ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      )}
    </div>
  );
}
