import { defaultHandler } from "ra-data-simple-prisma";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const handler = auth(async (req, res) => {
  if (!req.auth) {
    return NextResponse.json({message: "unauthorized"},{
      status: 401,
    });
  }
  const json = await req.json();
  try {
    const result = await defaultHandler(json, prisma, {
      getList: { debug: false },
      audit: {
        model: prisma.audit,
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.error(err);
  }
});

export { handler as GET, handler as POST };
