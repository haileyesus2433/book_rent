import prisma from "@/lib/prisma";
import { UserSchema } from "@/lib/validations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = UserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { email, password, location, phoneNumber } = validation.data;

  const existingUserEmail = await prisma.user.findUnique({ where: { email } });
  if (existingUserEmail) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 }
    );
  }

  const existingUserPhone = await prisma.user.findUnique({
    where: { phoneNumber: +phoneNumber },
  });
  if (existingUserPhone) {
    return NextResponse.json(
      { error: "Phone number already in use" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      location,
      phoneNumber: +phoneNumber,
      role: 'USER',
    },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return NextResponse.json({ user, token }, { status: 201 });
}
