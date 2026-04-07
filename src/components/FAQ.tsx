import { FAQItem } from "@/content/faqs";

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.question} className="rounded-2xl border border-mist bg-white/90 p-5">
          <h3 className="text-base font-semibold text-ink">{item.question}</h3>
          <p className="mt-2 text-sm text-ink/70">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
