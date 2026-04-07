import { FAQItem } from "@/content/faqs";

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-surface-border rounded-xl border border-surface-border bg-white overflow-hidden">
      {items.map((item, index) => (
        <details key={item.question} className="group" open={index === 0}>
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-text transition-colors hover:bg-surface-muted select-none">
            {item.question}
            <svg
              className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200 group-open:rotate-180"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </summary>
          <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
