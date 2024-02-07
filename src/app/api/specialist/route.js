import { prisma } from '@/lib/db';

export async function GET() {
  const specialists = await prisma.specialist.findMany();
  return Response.json(specialists);
}

export async function POST(request) {
  const data = await request.json();
  const specialist = await prisma.specialist.create({ data });
  return Response.json(specialist);
}

// POST
/*
{
  "firstName": "Alice",
  "lastName": "Smith",
  "gender": "FEMALE",
  "yearsOfExperience": 8,
  "description": "Experienced specialist in...",
  "isFreeReception": true,
  "specializations": {
  "connect": {
    "id": "0f86eb23-a39d-4f69-8801-3a4588a81772"
  }
},
  "formatOfWork": "BOTH",
  "placesOfWork": {
  "connect": {
    "id": "01e8cb96-9871-4d9d-8483-fa830b6206fc"
  }
},
  "therapies": {
  "connect": {
    "id": "1461b40b-046d-431c-84bd-94a98b016cc0"
  }
},
  "phone": "1234567890",
  "email": "alice.smith@example.com",
  "website": "https://www.alicesmith.com"
}
 */
