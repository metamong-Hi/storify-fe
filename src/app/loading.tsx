import SkeletonLoader from '@/components/skeleton/home/Home';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SkeletonLoader />
    </div>
  );
}