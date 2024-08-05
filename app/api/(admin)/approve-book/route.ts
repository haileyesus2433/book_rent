import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../../middleware/auth';

export async function POST(req: NextRequest) {
  await authMiddleware(req);
  const { bookId } = await req.json();

  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const book = await prisma.book.update({
    where: { id: bookId },
    data: { approved: true },
  });

  return NextResponse.json(book);
}
