import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import defineAbility from '../../abilities/defineAbility';
import { authMiddleware } from '../../middleware/auth';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await authMiddleware(req);
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: { category: true, owner: true },
  });

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await authMiddleware(req);
  const body = await req.json();
  const user = await prisma.user.findUnique({ where: { id: body.userId } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const ability = defineAbility(user);
  const book = await prisma.book.findUnique({ where: { id: params.id } });

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  if (ability.cannot('update', { ...book, __caslSubjectType__: "Book" })) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const updatedBook = await prisma.book.update({
    where: { id: params.id },
    data: {
      title: body.title,
      author: body.author,
      categoryId: body.categoryId,
      quantity: body.quantity,
      price: body.price,
      available: body.quantity,
      status: body.quantity > 0 ? 'AVAILABLE' : 'UNAVAILABLE',
    },
  });

  return NextResponse.json(updatedBook);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await authMiddleware(req);
  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const ability = defineAbility(user);
  const book = await prisma.book.findUnique({ where: { id: params.id } });

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  if (ability.cannot('delete', { ...book, __caslSubjectType__: "Book" })) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  await prisma.book.delete({ where: { id: params.id } });

  return NextResponse.json({ message: 'Book deleted successfully' });
}
