import { DistrictSearch, TherapiesSection } from '@components';
import { prisma } from '@/lib/db';

// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,

export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export default async function Page() {
  const activeTherapies = await prisma.therapy.findMany({
    where: { isActive: true },
    orderBy: { priority: 'desc' },
  });

  return (
    <>
      <DistrictSearch className="my-8" />
      <TherapiesSection therapies={activeTherapies} />
      <section>TBD goal section</section>
      <section>FAQ section</section>
    </>
  );
}
