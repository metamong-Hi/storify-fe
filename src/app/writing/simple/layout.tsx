import { WritingStyles } from "@/utils/WritingStyle";

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={WritingStyles.container}>
      <div className={WritingStyles.outerWrapper}>
        <div className={WritingStyles.innerWrapper}>
          {children}
        </div>
      </div>
    </section>
  );
}
