export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="min-h-[100vh] bg-[#FAF3E0] w-full flex flex-col items-center  ">
        <div className="w-full h-full flex  flex-col sm :flex-col md:flex-row lg:flex-row justify-center mt-5">
          {children}
        </div>
      </div>
    </section>
  );
}
