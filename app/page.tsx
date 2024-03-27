"use client";
import useCurrentUser from "../hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSidePros(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      // session,
    },
  };
}

export default function Home() {
  const { data: user, error } = useCurrentUser();
  console.log(user);

  return (
    <main>
      <h1 className="text-4xl text-green-500">netflix clone</h1>
      <p className="text-white">
        logged in as: <span className="text-green-500">{"user?.name"}</span>
      </p>
      <button
        onClick={() => signOut()}
        className="h-10 w-full bg-white
"
      >
        Logout!
      </button>
    </main>
  );
}
