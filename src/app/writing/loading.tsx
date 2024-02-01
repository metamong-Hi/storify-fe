import SimpleCardSkeleton from '@/components/skeleton/simpleCardSkeleton';
import ComplexCardSkeleton from '@/components/skeleton/complexCardSkeleton';

export default function Loading() {
  return (
    <>
      <SimpleCardSkeleton />
      <ComplexCardSkeleton />
    </>
  );
}
