
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";

export async function GET(req: NextRequest) {
  await authMiddleware(req);
  const user = await prisma.user.findUnique({
    where: { id: req.headers.get("userId") as string },
  });

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    where: { role: "OWNER" },
    select: { id: true, location: true, email: true, approved: true },
  });

  return NextResponse.json(users);
}
