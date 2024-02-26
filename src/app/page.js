import { TherapiesSection } from '@components';

// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,

export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги в м.Львів',
};

export default function Page() {
  return (
    <>
      <TherapiesSection />
    </>
  );
}
