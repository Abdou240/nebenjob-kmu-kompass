import { Disclaimer } from "@/content/disclaimers";

type DisclaimerBoxProps = {
  disclaimer: Disclaimer;
};

export function DisclaimerBox({ disclaimer }: DisclaimerBoxProps) {
  return (
    <div className="rounded-xl border border-warning-500/20 bg-warning-50 p-4">
      <div className="flex items-start gap-3">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning-500" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 8a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        </svg>
        <div>
          <h3 className="text-sm font-semibold text-warning-700">{disclaimer.title}</h3>
          <ul className="mt-2 space-y-1 text-xs text-warning-700/80">
            {disclaimer.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
