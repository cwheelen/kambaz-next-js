"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FormControl } from "react-bootstrap";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (e: any) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="wd-signin-screen">
      <h1>Sign In</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl
        className="mb-2"
        placeholder="username"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        className="mb-2"
        type="password"
        placeholder="password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={signin} className="btn btn-primary w-100 mb-2">
        Sign In
      </button>
      <Link href="/account/signup">Sign Up</Link>
    </div>
  );
}
