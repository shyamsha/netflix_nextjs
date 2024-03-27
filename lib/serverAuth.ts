import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";

import { getSession } from "next-auth/react";
import prismadb from "./prismadb";

// todo
const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    throw new Error("No user session found");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("No sign in");
  }

  return { currentUser };
};

export default serverAuth;
