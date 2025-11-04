import React from "react";

export default function HeaderBar({ screen, onNext }) {
  const label = screen === "dashboard" ? "Go to Appointment" : screen === "appointment" ? "Go to Report" : "Back to Dashboard";
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-xl font-semibold text-sky-700 flex items-center gap-2">
        🩺 Clinical Bot — Patient Portal
      </h1>
      <button
        onClick={onNext}
        className="px-5 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
      >
        {label}
      </button>
    </header>
  );
}
