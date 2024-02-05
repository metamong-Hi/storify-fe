export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex justify-center items-center bg-[#FAF3E0]/80 font-Kids">{children}</div>
    </section>
  );
}
