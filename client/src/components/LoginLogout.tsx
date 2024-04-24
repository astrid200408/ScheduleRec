import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export interface ILoginPageProps {
  authing: boolean;
  setAuthing: React.Dispatch<React.SetStateAction<boolean>>;
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
      <h1>Login Page</h1>
      <button
        className="google-login-button"
        onClick={() => signInWithGoogle()}
        disabled={props.authing}
      >
        Sign in with Google
      </button>
    </div>
  );
};

const Logout: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    <div className="logout-box">
      <button
        className="SignOut"
        onClick={() => {
          props.setAuthing(false);
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
