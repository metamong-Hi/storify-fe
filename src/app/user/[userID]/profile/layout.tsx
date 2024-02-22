export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex  flex-col justify-center items-center mt-10">
        <span className="text-base-content text-xl text-bold sm:text-2xl lg:text-3xl 2xl:text-4xl">
          마이 페이지
        </span>
        {children}
      </div>
    </section>
  );
}
