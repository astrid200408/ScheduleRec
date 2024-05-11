import { useState } from "react";
import LoginLogout from "./LoginLogout";
import { getLoginCookie } from "./utils/cookie";

interface AuthRouteProps {
  gatedContent: React.ReactNode;
}

function AuthRoute(props: AuthRouteProps) {
  const [authing, setAuthing] = useState(false);

  // SKIP THE LOGIN BUTTON IF YOU HAVE ALREADY LOGGED IN.
  if (!authing && getLoginCookie() !== undefined) {
    setAuthing(true);
  }
  return (
    <>
      <LoginLogout
        authing={authing}
        setAuthing={setAuthing}
        gatedContent={authing ? props.gatedContent : null}
      />
    </>
  );
}

export default AuthRoute;
