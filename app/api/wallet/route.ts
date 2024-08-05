import prisma from '@/lib/prisma';
import { WalletSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../middleware/auth';

export async function POST(req: NextRequest) {
  await authMiddleware(req);
  const body = await req.json();
  const validation = WalletSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { amount } = validation.data;

  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { wallet: { increment: amount } },
  });

  return NextResponse.json({ wallet: updatedUser.wallet });
}

export async function GET(req: NextRequest) {
  await authMiddleware(req);
  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ wallet: user.wallet });
}
