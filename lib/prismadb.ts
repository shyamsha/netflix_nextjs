import { PrismaClient } from "@prisma/client";

// hot re-loading if prisma also not interrupting
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
