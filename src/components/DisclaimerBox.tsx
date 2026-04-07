import { Disclaimer } from "@/content/disclaimers";

type DisclaimerBoxProps = {
  disclaimer: Disclaimer;
};

export function DisclaimerBox({ disclaimer }: DisclaimerBoxProps) {
  return (
    <div className="rounded-2xl border border-clay/60 bg-mist/70 p-5 text-sm text-ink/70">
      <h3 className="text-base font-semibold text-ink">{disclaimer.title}</h3>
      <ul className="mt-3 space-y-2">
        {disclaimer.body.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
