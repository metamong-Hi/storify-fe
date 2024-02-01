export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-[92vh] bg-[#FAF3E0]/80">{children}</div>
  );
}
