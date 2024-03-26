import bcrypt from "bcrypt";
import prismadb from "../../../lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Please fill all the fields" },
      { status: 400 }
    );
  }
  const existingUser = await prismadb.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return NextResponse.json({ error: "Email was already used" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prismadb.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image: "",
      emailVerified: new Date(),
    },
  });
  return NextResponse.json({ user });
}
