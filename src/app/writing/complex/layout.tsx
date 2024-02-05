export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="min-h-[100vh] bg-[#FAF3E0] w-full flex flex-col items-center">
        <div className="mt-5 mb-10">
          <div className="hero min-h-[60vh] rounded-2xl shadow-lg p-4 glass">
            <div className="hero-content text-center min-h-[60vh]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
