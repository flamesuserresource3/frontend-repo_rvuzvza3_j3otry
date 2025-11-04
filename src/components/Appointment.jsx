import React from "react";

function AppointmentItem({ date, doctor, time }) {
  return (
    <div className="p-4 rounded-lg border border-sky-100 flex items-center justify-between mb-3">
      <div>
        <div className="font-semibold text-sky-700">{doctor}</div>
        <div className="text-sm text-slate-600">{date} • {time}</div>
      </div>
      <button className="px-3 py-2 rounded border border-sky-300 text-sky-700 hover:bg-sky-100">View</button>
    </div>
  );
}

export default function Appointment() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-lg p-6 rounded-2xl lg:col-span-2 border border-sky-100">
        <h3 className="text-lg font-semibold text-sky-700 mb-4">Appointments</h3>
        <AppointmentItem date="2025-11-10" doctor="Dr. Anjali Rao" time="10:30 AM" />
        <AppointmentItem date="2025-12-02" doctor="Dr. Vikram Patel" time="2:00 PM" />

        <div className="mt-6 border-t pt-4 border-sky-100">
          <h4 className="font-semibold text-sky-700 mb-2">Book New Appointment</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="p-3 rounded border border-slate-200" placeholder="Specialty" />
            <input className="p-3 rounded border border-slate-200" placeholder="Date" />
            <input className="p-3 rounded border border-slate-200" placeholder="Time" />
            <button className="p-3 rounded bg-sky-600 text-white hover:bg-sky-700">Request</button>
          </div>
        </div>
      </div>

      <div className="bg-sky-50 p-6 rounded-2xl shadow-inner border border-sky-100">
        <h4 className="font-semibold text-sky-700 mb-3">Reminders</h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• Take BP medication — 8:00 AM</li>
          <li>• Upload blood test — Due Nov 15</li>
          <li>• Teleconsult — Nov 10</li>
        </ul>
      </div>
    </section>
  );
}
