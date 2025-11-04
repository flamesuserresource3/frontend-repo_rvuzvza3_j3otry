import { AlertTriangle, ClipboardList, CheckCircle2, FileText } from "lucide-react";

export default function TriageSummary({ symptoms, riskLevel, conditions, nextSteps, onFinalize }) {
  return (
    <aside className="w-full sm:w-80 shrink-0 space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`size-5 ${riskColor(riskLevel)}`} />
          <h3 className="font-medium">Risk assessment</h3>
        </div>
        <div className="mt-3">
          <div className="text-sm text-gray-500">Risk level</div>
          <div className="mt-1 text-lg font-semibold">{riskLevel}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">Symptoms</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {symptoms.length === 0 ? (
              <span className="text-xs text-gray-400">None added yet</span>
            ) : (
              symptoms.map((s) => (
                <span key={s} className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-700 border border-amber-200">
                  {s}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-5 text-blue-600" />
          <h3 className="font-medium">Probable conditions</h3>
        </div>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
          {conditions.length === 0 ? (
            <li className="text-gray-400">Add details to see suggestions</li>
          ) : (
            conditions.map((c) => <li key={c}>{c}</li>)
          )}
        </ul>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-5 text-emerald-600" />
          <h3 className="font-medium">Next steps</h3>
        </div>
        <ol className="mt-3 list-decimal pl-5 text-sm text-gray-700 space-y-1">
          {nextSteps.length === 0 ? (
            <li className="text-gray-400">Guidance will appear as you chat</li>
          ) : (
            nextSteps.map((n, i) => <li key={`${n}-${i}`}>{n}</li>)
          )}
        </ol>
        <button
          onClick={onFinalize}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <FileText className="size-4" />
          Create clinical note
        </button>
      </div>
    </aside>
  );
}

function riskColor(level) {
  if (level === "High") return "text-red-600";
  if (level === "Moderate") return "text-amber-600";
  return "text-emerald-600";
}
