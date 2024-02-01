import ButtonUseClient from "./ButtonAsTest";
import { prisma } from "@/lib/db";

//example: division into client and server components 
export default async function Home() {
  // const therapies = await prisma.therapy.findMany();

  return (
    <main >
      {/* {therapies.map(item => <div>{item.id}</div>)} */}

      <ButtonUseClient />
    </main>
  );
}
