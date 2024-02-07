
import React from 'react';
export default function WritingLayout({ children }: { children: React.ReactNode }) {

  return (
    <section >
      <div className="min-h-[100vh] w-full flex flex-col items-center">
        <div className="w-full h-full flex flex-row justify-center items-center mt-5">
          {children}
        </div>
      </div>
    </section>
  );
}
