import { Stethoscope, Activity, UserRound } from "lucide-react";

export default function Header({ patient }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Stethoscope className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Clinical Bot</h1>
            <p className="text-xs text-gray-500">AI-assisted patient intake & triage</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <Activity className="size-4 text-emerald-600" />
            <span className="font-medium">Connected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium">{patient.name}</div>
              <div className="text-xs text-gray-500">{patient.age} • {patient.sex}</div>
            </div>
            <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center">
              <UserRound className="size-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
