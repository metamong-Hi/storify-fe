import SimpleCardSkeleton from '@/components/skeleton/SimpleCard';
import ComplexCardSkeleton from '@/components/skeleton/ComplexCard';

export default function Loading() {
  return (
    <>
      <SimpleCardSkeleton />
      <ComplexCardSkeleton />
    </>
  );
}
