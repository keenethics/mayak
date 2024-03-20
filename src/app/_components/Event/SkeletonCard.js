const fakeCardArray = [7, 8, 9, 10, 11, 12, 13, 14];
export function SkeletonCard() {
  return (
    <div className="flex h-[310px] w-full flex-col gap-4 self-stretch rounded-3xl border-2 border-gray-200 bg-other-white p-4">
      {fakeCardArray.map(item => (
        <div key={item} className="h-5 w-full bg-gray-200" />
      ))}
    </div>
  );
}
