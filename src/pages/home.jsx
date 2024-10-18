import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebase";

export default function Home() {
  return (
    <section>
      <h2>Home Page</h2>
      <Link to="/player">To Player</Link>
      <button onClick={() => logout()}>Log Out</button>
    </section>
  );
}
