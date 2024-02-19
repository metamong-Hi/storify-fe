import SimpleCardSkeleton from '@/components/skeleton/writing/SimpleCard';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SimpleCardSkeleton />
      <SimpleCardSkeleton />
    </div>
  );
}
