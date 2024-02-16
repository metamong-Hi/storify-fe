export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex justify-center items-center p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-10">{children}</div>
    </section>
  );
}
