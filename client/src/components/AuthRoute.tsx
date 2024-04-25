import { useState } from "react";
import Example from "./example";
import LoginLogout from "./LoginLogout";

function AuthRoute() {
  const [authing, setAuthing] = useState(false);

  // USEFUL FOR PLAYWRIGHT TESTING PURPOSES: auto sets authing to true in test environment
  if (!authing && import.meta.env.VITE_APP_NODE_ENV === "test") {
    setAuthing(true);
  }

  return (
    <>
      {authing ? <Example /> : null}
      <LoginLogout authing={authing} setAuthing={setAuthing} />
    </>
  );
}

export default AuthRoute;
