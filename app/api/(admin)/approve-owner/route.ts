import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../../middleware/auth';


export async function POST(req: NextRequest) {
  await authMiddleware(req);
  const { ownerId } = await req.json();

  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const owner = await prisma.user.update({
    where: { id: ownerId, role: 'OWNER' },
    data: { approved: true },
  });

  return NextResponse.json(owner);
}
