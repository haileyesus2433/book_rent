import prisma from '@/lib/prisma';
import { CategorySchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../middleware/auth';




export async function GET(req: NextRequest) {
  await authMiddleware(req);
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  await authMiddleware(req);
  const body = await req.json();
  const validation = CategorySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { name } = validation.data;

  const user = await prisma.user.findUnique({ where: { id: req.headers.get('userId') as string } });
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const category = await prisma.category.create({
    data: { name },
  });

  return NextResponse.json(category, { status: 201 });
}
