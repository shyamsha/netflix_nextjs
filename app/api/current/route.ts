import { NextResponse, NextRequest } from "next/server";
import serverAuth from "../../../lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentUser } = await serverAuth(body);
    return NextResponse.json({ currentUser });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
