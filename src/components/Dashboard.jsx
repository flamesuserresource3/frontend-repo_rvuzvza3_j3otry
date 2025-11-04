import React from "react";

function StatCard({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-2xl font-semibold text-sky-700 mt-2">{value}</div>
    </div>
  );
}

function MiniChart() {
  return (
    <svg className="w-full h-28 text-sky-500" viewBox="0 0 200 60" preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,40 30,30 60,20 90,28 120,18 150,26 180,14 200,20" />
    </svg>
  );
}

function ChatWidget() {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border border-sky-100">
      <h4 className="font-semibold text-sky-700 mb-3">Chat with Clinical Bot</h4>
      <div className="h-64 overflow-auto rounded-lg p-3 border border-slate-200 bg-sky-50">
        <div className="mb-3"><strong>Bot:</strong> How are you feeling today?</div>
      </div>
      <div className="mt-3 flex gap-2">
        <input className="flex-1 p-3 rounded-lg border border-slate-200" placeholder="Ask the bot…" />
        <button className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">Send</button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-lg p-6 rounded-2xl lg:col-span-2 border border-sky-100">
        <h3 className="text-lg font-semibold text-sky-700 mb-4">Health Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Heart Rate" value="78 bpm" />
          <StatCard label="Blood Pressure" value="118/76" />
          <StatCard label="Glucose" value="98 mg/dL" />
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-sky-700 mb-2">Weekly Trends</h4>
          <MiniChart />
        </div>
      </div>

      <ChatWidget />
    </section>
  );
}
