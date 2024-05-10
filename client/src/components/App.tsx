import { initializeApp } from "firebase/app";
import "../styles/App.css";
import AuthRoute from "./AuthRoute";
import Header from "./Header";
import LogoutPage from "./LogoutPage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);
/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <Header />
      <AuthRoute gatedContent={<LogoutPage />} />
    </div>
  );
}

export default App;
