export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex justify-center items-center p-8">{children}</div>
    </section>
  );
}
