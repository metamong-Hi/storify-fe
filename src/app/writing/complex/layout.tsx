export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex justify-center items-center min-h-screen w-full">
      <div className="hero bg-opacity-20 glass rounded-2xl shadow-lg p-4 mt-5 flex flex-col items-center justify-center w-[100vw] sm:w-[95vw] md:w-[90vw] lg: w-[85vw] xl:w-[80vw] min-h-[60vh]">
        <div className="text-center">
          {children}
        </div>
      </div>
    </section>
  );
}
