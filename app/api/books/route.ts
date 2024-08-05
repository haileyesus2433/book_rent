import prisma from '@/lib/prisma';
import { BookSchema } from '@/lib/validations';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import defineAbility from '../abilities/defineAbility';
import { authMiddleware } from '../middleware/auth';




export async function GET(req: NextRequest) {
  await authMiddleware(req);
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  const author = searchParams.get('author');
  const owner = searchParams.get('owner');

  const where: Prisma.BookWhereInput = {
    ...(category && { categoryId: category }),
    ...(author && {
      author: { contains: author, mode: "insensitive" as Prisma.QueryMode },
    }),
    ...(owner && { ownerId: owner }),
  };

  const books = await prisma.book.findMany({
    where,
    include: { category: true, owner: true },
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.book.count({ where });

  return NextResponse.json({
    books,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  await authMiddleware(req);
  const body = await req.json();
  const validation = BookSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { title, author, categoryId, quantity, price } = validation.data;

  const user = await prisma.user.findUnique({ where: { id: body.userId } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const ability = defineAbility(user);
  if (ability.cannot('create', 'Book')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      categoryId,
      quantity,
      available: quantity,
      price,
      ownerId: user.id,
    },
  });

  return NextResponse.json(book, { status: 201 });
}
