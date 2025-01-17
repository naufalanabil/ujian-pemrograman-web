"use server";

import { signIn } from "next-auth/react";
const login = async (email: string) =>
  signIn("email", { email, redirect: false });

export default login;
