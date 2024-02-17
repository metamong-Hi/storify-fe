import React from 'react';

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="min-h-[100vh] w-full flex flex-row justify-center items-center">
        {children}
      </div>
    </section>
  );
}
