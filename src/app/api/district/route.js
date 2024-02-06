import { prisma } from "@/lib/db";

export async function GET() {
  const districts = await prisma.district.findMany();
  return Response.json(districts);
}

export async function POST(request) {
  const { name } = await request.json();
  const district = await prisma.district.create({ data: { name } });
  return Response.json(district);
}
