import prisma from '@/lib/prisma';
import { RentalSchema } from '@/lib/validations';
import defineAbility from '@/utils/defineAbility';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../middleware/auth';





export async function POST(req: NextRequest) {
  await authMiddleware(req);
  const body = await req.json();
  const validation = RentalSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { bookId, startDate, endDate } = validation.data;

  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const ability = defineAbility(user);
  if (ability.cannot('create', 'Rental')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || !book.approved || book.status === 'UNAVAILABLE') {
    return NextResponse.json({ error: 'Book not available' }, { status: 400 });
  }

  const rental = await prisma.$transaction(async (prisma) => {
    const rental = await prisma.rental.create({
      data: {
        bookId,
        userId: user.id,
        startDate,
        endDate,
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: {
        available: { decrement: 1 },
        status: book.available === 1 ? 'UNAVAILABLE' : 'AVAILABLE',
      },
    });

    await prisma.user.update({
      where: { id: book.ownerId },
      data: { wallet: { increment: book.price } },
    });

    return rental;
  });

  return NextResponse.json(rental, { status: 201 });
}

export async function GET(req: NextRequest) {
  await authMiddleware(req);
  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const ability = defineAbility(user);
  let rentals;

  if (user.role === 'ADMIN') {
    rentals = await prisma.rental.findMany({ include: { book: true, user: true } });
  } else if (user.role === 'OWNER') {
    rentals = await prisma.rental.findMany({
      where: { book: { ownerId: user.id } },
      include: { book: true, user: true },
    });
  } else {
    rentals = await prisma.rental.findMany({
      where: { userId: user.id },
      include: { book: true },
    });
  }

  return NextResponse.json(rentals);
}
