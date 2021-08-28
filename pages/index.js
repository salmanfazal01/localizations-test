import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import AppBar from "../components/Appbar";
import firebase from "../config/firebase";
import Auth from "./auth";
import Localizations from "./Localizations";
import "../config/intl";

const Home = (props) => {
  // Firestore
  const db = firebase.database();

  // User Authentication
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) return <div>loading...</div>;

  if (!user) return <Auth />;

  return (
    <div>
      <AppBar />
      <Localizations />
    </div>
  );
};

export default Home;
