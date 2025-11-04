import React from "react";

function ReportCard({ title, summary }) {
  return (
    <div className="p-4 rounded-lg border border-sky-100 mb-4">
      <div className="font-semibold text-sky-700">{title}</div>
      <div className="text-sm text-slate-600 mt-2">{summary}</div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-2 rounded border border-sky-300 text-sky-700 hover:bg-sky-100 text-sm">Open</button>
        <button className="px-3 py-2 rounded border border-sky-300 text-sky-700 hover:bg-sky-100 text-sm">Share</button>
      </div>
    </div>
  );
}

export default function Reports() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-lg p-6 rounded-2xl lg:col-span-2 border border-sky-100">
        <h3 className="text-lg font-semibold text-sky-700 mb-4">Reports</h3>
        <ReportCard title="Blood Test — Oct 20, 2025" summary="All markers normal. Follow-up in 6 months." />
        <ReportCard title="ECG — Sep 12, 2025" summary="Sinus rhythm, no acute changes." />

        <div className="mt-6">
          <h4 className="font-semibold text-sky-700 mb-2">AI Recommendations</h4>
          <ul className="list-disc pl-5 text-sm text-slate-600">
            <li>Track BP logs daily.</li>
            <li>Schedule physiotherapy for lower-back pain.</li>
          </ul>
        </div>
      </div>

      <div className="bg-sky-50 p-6 rounded-2xl shadow-inner border border-sky-100">
        <h4 className="font-semibold text-sky-700 mb-3">Download & Share</h4>
        <button className="p-3 rounded border border-sky-300 text-sky-700 hover:bg-sky-100 mb-2">Download PDF</button>
        <button className="p-3 rounded border border-sky-300 text-sky-700 hover:bg-sky-100">Share with Doctor</button>
      </div>
    </section>
  );
}
