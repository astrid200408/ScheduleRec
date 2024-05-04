import { useState } from "react";
import LoginLogout from "./LoginLogout";
import LogoutPage from "./LogoutPage";

function AuthRoute() {
  const [authing, setAuthing] = useState(false);

  // USEFUL FOR PLAYWRIGHT TESTING PURPOSES: auto sets authing to true in test environment
  if (!authing && import.meta.env.VITE_APP_NODE_ENV === "test") {
    setAuthing(true);
  }

  return (
    <>
      {/* {authing ? <LogoutPage /> : null} */}
      {/* change true to authing later */}
      <LoginLogout authing={true} setAuthing={setAuthing} />
    </>
  );
}

export default AuthRoute;
