export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="min-h-[100vh] w-full flex flex-col items-center">
          <div className="hero min-h-[60vh] rounded-2xl shadow-lg p-4 glass mt-5 mb-10 ">
            <div className="hero-content text-center min-h-[60vh]">
              {children}
            </div>
        </div>
      </div>
    </section>
  );
}
