import React, { useState } from "react";
import { signup, login } from "../firebase.js";
import { Navigate } from "react-router-dom";

export default function Login({ user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");

  const user_auth = async () => {
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <h2>Login Page</h2>
      <form>
        {signState}
        <fieldset>
          <ul>
            {signState === "Sign Up" ? (
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </li>
            ) : (
              <></>
            )}
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </li>
          </ul>
          <button type="button" onClick={user_auth}>
            {signState}
          </button>
        </fieldset>
        {signState === "Sign In" ? (
          <p>
            New to Netflix{" "}
            <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
          </p>
        )}
      </form>
    </section>
  );
}
