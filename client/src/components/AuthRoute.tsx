import { useState } from "react";
import LoginLogout from "./LoginLogout";
import { getLoginCookie } from "./utils/cookie";

interface AuthRouteProps {
  gatedContent: React.ReactNode;
}

function AuthRoute(props: AuthRouteProps) {
  const [loggedIn, setLogin] = useState(false);

  // SKIP THE LOGIN BUTTON IF YOU HAVE ALREADY LOGGED IN.
  if (!loggedIn && getLoginCookie() !== undefined) {
    setLogin(true);
  }

  return (
    <>
      <LoginLogout
        authing={loggedIn}
        setAuthing={setLogin}
        gatedContent={props.gatedContent}
      />

      {/* {loggedIn ? props.gatedContent : null} */}
    </>
  );
}

export default AuthRoute;
