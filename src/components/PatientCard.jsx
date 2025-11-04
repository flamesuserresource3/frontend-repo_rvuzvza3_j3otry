import { HeartPulse, Syringe, Thermometer, Pill, Plus } from "lucide-react";
import { useState } from "react";

const COMMON_SYMPTOMS = [
  { label: "Fever", icon: Thermometer },
  { label: "Cough", icon: HeartPulse },
  { label: "Headache", icon: Pill },
  { label: "Sore throat", icon: Syringe },
  { label: "Shortness of breath", icon: HeartPulse },
];

export default function PatientCard({ patient, symptoms, onAddSymptom, onSetComplaint }) {
  const [complaint, setComplaint] = useState("");

  const handleAdd = (label) => {
    if (!symptoms.includes(label)) onAddSymptom(label);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    const c = complaint.trim();
    if (c) {
      onSetComplaint(c);
      setComplaint("");
    }
  };

  return (
    <aside className="w-full shrink-0 space-y-4 sm:w-80">
      {/* Patient summary */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <HeartPulse className="size-5" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Patient</div>
            <div className="font-medium">{patient.name}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Info label="Age" value={patient.age} />
          <Info label="Sex" value={patient.sex} />
          <Info label="ID" value={patient.id} />
          <Info label="Allergies" value={patient.allergies || "None known"} />
        </div>
      </div>

      {/* Chief complaint */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Chief complaint</h3>
        </div>
        <form onSubmit={handleComplaintSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe the issue"
            className="w-full flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
          >
            <Plus className="size-4" />
            Add
          </button>
        </form>
      </div>

      {/* Quick symptoms */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="font-medium">Quick add symptoms</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {COMMON_SYMPTOMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => handleAdd(label)}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:border-blue-400 hover:bg-blue-50"
            >
              <Icon className="size-4 text-blue-600" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {symptoms.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-medium text-gray-500">Selected</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {symptoms.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs text-blue-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
