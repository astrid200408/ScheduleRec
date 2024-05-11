import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import { addLoginCookie, removeLoginCookie } from "./utils/cookie";

export interface ILoginPageProps {
  authing: boolean;
  setAuthing: React.Dispatch<React.SetStateAction<boolean>>;
  gatedContent: React.ReactNode;
}

const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const userEmail = response.user.email || "";

      // Check if the email ends with the allowed domain
      if (userEmail.endsWith("@brown.edu")) {
        console.log(response.user.uid);
        addLoginCookie(response.user.uid);
        props.setAuthing(true);
      } else {
        // User is not allowed, sign them out and show a message
        await auth.signOut();
        console.log("User not allowed. Signed out.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-box">
      <LoginPage />
      <button
        className="google-login-button"
        aria-label="google authorization login button"
        aria-description="button to login with Brown email to access application"
        onClick={() => signInWithGoogle()}
        disabled={props.authing}
      >
        Login
      </button>
    </div>
  );
};

const Logout: React.FunctionComponent<ILoginPageProps> = (props) => {
  const signOut = () => {
    removeLoginCookie();
    props.setAuthing(false);
  };
  return (
    <div className="logout-box">
      {props.gatedContent}
      <button
        className="SignOut"
        aria-label="sign out button"
        aria-description="button to sign user out"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

const LoginLogout: React.FunctionComponent<ILoginPageProps> = (props) => {
  return <>{!props.authing ? <Login {...props} /> : <Logout {...props} />}</>;
};

export default LoginLogout;
