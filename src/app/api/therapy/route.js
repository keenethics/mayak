import { prisma } from "@/lib/db";

export async function GET(request) {
  const therapies = await prisma.therapy.findMany();
  return Response.json(therapies);
}

export async function POST(request) {
  const { price } = await request.json();
  const therapy = await prisma.therapy.create({ data: { price } });
  return Response.json(therapy);
}
